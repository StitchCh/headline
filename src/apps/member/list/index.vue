<template>
  <div class="member_list">
    <div class="af-topbar">
      <span class="f-18">全部</span>
    </div>
    <div class="flex-item scroll-y bg-e relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>
      <div class="setting-card f-14" style="position: relative;">
        <div style="text-align: right;margin-bottom: 20px;">
          <vue-datepicker-local v-model="searchTime" format="YYYY-MM-DD" show-buttons></vue-datepicker-local>
          <btn style="margin-left: 10px;" @click="search">搜索</btn>
        </div>
        <table>
          <thead>
          <th>序号</th>
          <th>昵称</th>
          <th>手机</th>
          <th>邮箱</th>
          <th>区域</th>
          <th>注册时间</th>
          <th>最后登录</th>
          <th>积分</th>
          <th>状态</th>
          <th colspan="2">操作</th>
          </thead>
          <tbody>
          <tr v-for="(item, index) in list" :key="item.id">
            <td>{{index+1}}</td>
            <td>{{item.nickname}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.email || '--' }}</td>
            <td>
              <span v-if="item.province || item.city">{{item.province || ''}}{{item.province && item.city ? '-' : ''}}{{item.city || ''}}</span>
              <span v-else>--</span>
            </td>
            <td>{{item.registTime}}</td>
            <td>{{item.thisLoginTime}}</td>
            <td>{{item.credits}}</td>
            <td class="relative">
              <span class="a state" @click.stop="item.stateShow = !item.stateShow">{{item.state | state}} <i class="icon" :class="{ active: item.stateShow }">keyboard_arrow_down</i></span>
              <bubble v-if="item.stateShow">
                <div v-if="item.state === '0'" class="a stateBox" @click="enable(item.id)">正常</div>
                <div v-if="item.state === '1'" class="a stateBox" @click="disable(item.id)">屏蔽</div>
              </bubble>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'编辑'" small @click="openEdit(item)">edit</icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'查看'" small @click="openDetail(item.id)">info</icon-btn>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="filter.toPage" :size="filter.pageSize" :total="total" @change="p => { filter.toPage = p;getList(); }"></pagination>
        </div>
        <p style="position: absolute;right: 20px;bottom: 0px;">会员总数：{{totalRowsAmount}}</p>
      </div>
    </div>

    <layer v-if="detailShow" title="会员信息" width="600px" maskClick @close="detailShow = false">
      <div class="layer-text">
        <table>
          <tbody>
          <tr>
            <th align="right">昵称</th>
            <td>{{detail.member.nickname || '--'}}</td>
          </tr>
          <tr>
            <th align="right">真实姓名</th>
            <td>{{detail.member.trueName || '--'}}</td>
          </tr>
          <tr>
            <th align="right">身份证号</th>
            <td>{{detail.member.idNo || '--'}}</td>
          </tr>
          <tr>
            <th align="right">邮箱</th>
            <td>{{detail.member.email || '--'}}</td>
          </tr>
          <tr>
            <th align="right">手机</th>
            <td>{{detail.member.mobile || '--'}}</td>
          </tr>
          <tr>
            <th align="right">地址</th>
            <td>{{detail.member.address || '--'}}</td>
          </tr>
          <tr>
            <th align="right">QQ昵称</th>
            <td>{{detail.social.QQ || '--'}}</td>
          </tr>
          <tr>
            <th align="right">微信昵称</th>
            <td>{{detail.social.WECHAT || '--'}}</td>
          </tr>
          <tr>
            <th align="right">新浪微博</th>
            <td>{{detail.social.SINA_WEIBO || '--'}}</td>
          </tr>
          <tr>
            <th align="right">GOOGLE</th>
            <td>{{detail.social.GOOGLE || '--'}}</td>
          </tr>
          <tr>
            <th align="right">FACEBOOK</th>
            <td>{{detail.social.FACEBOOK || '--'}}</td>
          </tr>
          <tr>
            <th align="right">TWITER</th>
            <td>{{detail.social.TWITER || '--'}}</td>
          </tr>
          <tr>
            <th align="right">所属站点</th>
            <td>{{detail.site.name}}</td>
          </tr>
          <tr>
            <th align="right">站点域名</th>
            <td>{{detail.site.url}}</td>
          </tr>
          <tr>
            <th align="right">创建时间</th>
            <td>{{detail.member.registTime}}</td>
          </tr>
          <tr>
            <th align="right">注册IP</th>
            <td>{{detail.member.registIp}}</td>
          </tr>
          <tr>
            <th align="right">最后一次登录时间</th>
            <td>{{detail.member.thisLoginTime}}</td>
          </tr>
          <tr>
            <th align="right">最后一次登录IP</th>
            <td>{{detail.member.thisLoginIp}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="layer-btns">
        <btn flat color="#008cff" @click="detailShow = false">关闭</btn>
      </div>
    </layer>

    <layer v-if="editShow" title="修改会员信息" width="600px">
      <div class="layer-text">
        <input-box v-model="form.nickname" label="昵称"/>
        <input-box v-model="form.address" label="地址"/>
      </div>
      <div class="layer-btns">
        <btn flat @click="editShow = false">取消</btn>
        <btn flat color="#008cff" @click="submitEdit">提交</btn>
      </div>
    </layer>
  </div>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local'
  import moment from 'moment'

export default {
  name: 'settings-member',
  components: { VueDatepickerLocal },
  data () {
    return {
      searchTime: [new Date(), new Date()],
      loading: false,
      list: [],
      filter: {
        pageSize: 15,
        toPage: 1
      },
      total: 1,
      detail: {},
      form: {
        id: '',
        nickname: '',
        address: ''
      },
      detailShow: false,
      editShow: false,
      totalRowsAmount: ''
    }
  },
  methods: {
    search () {
      this.loading = true
      this.$http.post('/cri-cms-platform/member/list.monitor', {
        pageSize: 15,
        toPage: 1,
        startTime: moment(this.searchTime[0]).format('YYYY-MM-DD'),
        endTime: moment(this.searchTime[1]).format('YYYY-MM-DD')
      }).then(
        res => {
          console.log(res)
          res.pages.forEach(v => {
            v.stateShow = false
          })
          this.list = res.pages
          this.totalRowsAmount = res.totalRowsAmount
          this.total = res.totalPage * 15
          this.loading = false
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    },
    open (item) {
      console.log(666)
      item.stateShow = true
    },
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/member/list.monitor', this.filter).then(
        res => {
          console.log(res)
          res.pages.forEach(v => {
            v.stateShow = false
          })
          this.list = res.pages
          this.totalRowsAmount = res.totalRowsAmount
          this.total = res.totalPage * 15
          this.loading = false
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    },
    openDetail (id) {
      this.$http.post('/cri-cms-platform/member/view.monitor', { id }).then(
        res => {
          this.detail = res
          this.detailShow = true
        }
      ).catch(console.log)
    },
    openEdit (item) {
      this.form.id = item.id
      this.form.nickname = item.nickname
      this.form.address = item.address
      this.editShow = true
    },
    submitEdit () {
      this.$http.post('/cri-cms-platform/member/update.monitor', this.form).then(
        () => {
          this.getList()
          this.editShow = false
        }
      )
    },
    stateBoxOff () {
      this.list.forEach(v => {
        v.stateShow = false
      })
    },
    enable (id) {
      this.$http.post('/cri-cms-platform/member/enable.monitor', { id }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    },
    disable (id) {
      this.$http.post('/cri-cms-platform/member/disable.monitor', { id }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    }
  },
  filters: {
    state (value) {
      if (!value) return value
      let list = {
        '1': '正常',
        '0': '屏蔽'
      }
      return list[value]
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    document.addEventListener('click', this.stateBoxOff)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.stateBoxOff)
  }
}
</script>

<style lang="less">
  .member_list .datepicker-popup {
    width: 500px!important;
    right: -50px;
    left: auto;
  }
</style>
