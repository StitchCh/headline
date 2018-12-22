<template>
  <div>
    <div class="af-topbar">
      <span class="f-18">全部</span>
    </div>
    <div class="flex-item scroll-y bg-e relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>
      <div class="setting-card f-14">
        <table>
          <thead>
          <th>会员ID</th>
          <th>昵称</th>
          <th>手机</th>
          <th>邮箱</th>
          <th>区域</th>
          <th>最后登录</th>
          <th>积分</th>
          <th>状态</th>
          </thead>
          <tbody>
          <tr v-for="item in list" :key="item.id" @click="openDetail(item.id)">
            <td>{{item.id}}</td>
            <td>{{item.nickname}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.email?item.email:'-'}}</td>
            <td>{{item.province?item.province:''}}-{{item.city?item.city:''}}</td>
            <td>{{item.thisLoginTime}}</td>
            <td>{{item.credits}}</td>
            <td v-if="item.state == 1">正常</td>
            <td v-if="item.state == 0">屏蔽</td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'编辑'" small @click.stop.native="openEdit(item.id)">edit</icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'查看'" small @click.stop.native="openDetail(item.id)">
                info
              </icon-btn>
            </td>
            <td style="width: 30px;">
              <icon-btn v-tooltip="'审核'" v-if="item.userStatus === '01'" small @click.stop.native="auditUser(item.id)">
                find_in_page
              </icon-btn>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="filter.toPage" :size="filter.pageSize" :total="total" @change="p => { filter.toPage = p;getList(); }"></pagination>
        </div>
      </div>
    </div>

    <layer v-if="detailShow" title="会员信息" width="600px" maskClick @close="detailShow = false">
      <div class="layer-text">
        <table>
          <tbody>
          <tr>
            <th align="right">昵称</th>
            <td>{{detail.member.nickname ? detail.member.nickname : '无'}}</td>
          </tr>
          <tr>
            <th align="right">真实姓名</th>
            <td>{{detail.member.trueName ? detail.member.trueName : '无'}}</td>
          </tr>
          <tr>
            <th align="right">身份证号</th>
            <td>{{detail.member.idNo ? detail.member.idNo : '无'}}</td>
          </tr>
          <tr>
            <th align="right">邮箱</th>
            <td>{{detail.member.email ? detail.member.email:'无'}}</td>
          </tr>
          <tr>
            <th align="right">手机</th>
            <td>{{detail.member.mobile ? detail.member.mobile: '无'}}</td>
          </tr>
          <tr>
            <th align="right">QQ昵称</th>
            <td>{{detail.social.QQ == '' ?detail.social.QQ: '无'}}</td>
          </tr>
          <tr>
            <th align="right">微信昵称</th>
            <td>{{detail.social.WECHAT?detail.social.WECHAT: '无'}}</td>
          </tr>
          <tr>
            <th align="right">新浪微博</th>
            <td>{{detail.social.SINA_WEIBO? detail.social.SINA_WEIBO :'无'}}</td>
          </tr>
          <tr>
            <th align="right">GOOGLE</th>
            <td>{{detail.social.GOOGLE ? detail.social.GOOGLE :'无'}}</td>
          </tr>
          <tr>
            <th align="right">FACEBOOK</th>
            <td>{{detail.social.FACEBOOK ?detail.social.FACEBOOK: '无'}}</td>
          </tr>
          <tr>
            <th align="right">TWITER</th>
            <td>{{detail.social.TWITER ? detail.social.TWITER:'无'}}</td>
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
        <btn flat color="#66BB6A" @click="detailShow = false">关闭</btn>
      </div>
    </layer>

    <layer v-if="editShow" title="会员信息" width="600px">
      <div class="layer-text">
        asdsa
      </div>
      <div class="layer-btns">
        <btn flat @click="editShow = false">取消</btn>
        <btn flat color="#66BB6A" @click="submitEdit">提交</btn>
      </div>
    </layer>
  </div>
</template>

<script>
export default {
  name: 'settings-user',
  data () {
    return {
      loading: false,
      list: [],
      filter: {
        pageSize: 15,
        toPage: 1
      },
      total: 1,
      detail: {},
      detailShow: false,
      editShow: false
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/member/list.monitor', this.filter).then(
        res => {
          console.log(res)
          this.list = res.pages
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
      this.$http.post('/cri-cms-platform/member/view.monitor', {
        id: id
      }).then(
        res => {
          this.detailShow = true
          this.detail = res
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    },
    openEdit (id) {
      this.$http.post('/cri-cms-platform/member/view.monitor', {
        id: id
      }).then(
        res => {
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">

</style>
