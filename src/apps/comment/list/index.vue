<template>
  <div>
    <div class="af-topbar flex">
      <span class="f-18">{{title}}</span>
      <div v-if="$route.query.audit == 2" style="padding-left: 40px;">
        <btn style="margin-right: 20px;" @click="checkedShow = !checkedShow">批量操作</btn>
        <span v-if="checkedShow">
          <check-box style="width: 60px" v-model="allChecked" text="全选"></check-box>

          <icon-btn v-tooltip:bottom="'通过'" color="#4caf50" @click="plAudit">check_circle</icon-btn>
          <icon-btn v-tooltip:bottom="'驳回'" color="#ff5252" @click="plReject">error</icon-btn>
          <icon-btn v-tooltip:bottom="'删除'" color="#D81B60" @click="plDelete">delete</icon-btn>
        </span>
      </div>
    </div>
    <div class="flex-item scroll-y bg-e relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"/>
        </div>
      </transition>
      <div v-if="list.length">
        <div class="setting-card f-14" v-for="item in list" :key="item.id">
          <div class="flex-v-center comment-item-info">
            <check-box v-if="checkedShow && $route.query.audit == 2" v-model="item.checked"></check-box>
            <strong class="f-16"><a :href="item.contentUrl" target="_blank">{{item.contentTitle}}</a></strong>
            <span class="flex-item"></span>
            <i class="icon state-icon f-20" :style="{ color: stateList[item._state].color }">{{stateList[item._state].icon}}</i>
            <span :style="{ color: stateList[item._state].color }">{{stateList[item._state].text}}</span>
          </div>
          <div class="flex comment-item-info f-12 c-a">
            <span>{{item.memberName}}</span>
            <span style="margin-left: 10px;">{{item.clientIp}}</span>
            <span class="flex-item"></span>
            <span>{{item.createTime}}</span>
          </div>
          <div class="comment-item-info pre-wrap" style="word-wrap:break-word;">{{item.content}}</div>
          <div v-if="item.deleteStatus === '1' && !checkedShow" class="flex comment-item-info">
            <span class="flex-item"></span>
            <icon-btn v-tooltip="'通过'" color="#4caf50" style="margin-right: 5px;" v-if="(item.isAudit === '2' || (item.isAudit === '3' && item.auditStatus === '0')) && $route.query.auditStatus != 0" @click="pass(item.id)">check_circle</icon-btn>
            <icon-btn v-tooltip="'驳回'" color="#ff5252" style="margin-right: 5px;" v-if="(item.isAudit === '2' || (item.isAudit === '3' && item.auditStatus === '1')) && $route.query.auditStatus != 1" @click="reject(item.id)">error</icon-btn>
            <icon-btn v-tooltip="'修改评论'" style="margin-right: 5px;" @click="openEdit(item)">edit</icon-btn>
            <icon-btn v-tooltip="'删除'" color="#D81B60" @click="deleteItem(item.id)">delete</icon-btn>
          </div>
        </div>
      </div>
      <div class="abs flex-center" v-else>
        <no-data/>
      </div>
      <div class="af-bottombar flex-center relative">
        <icon-btn small class="a" @click="onPrev" :disabled="toPage <= 1">keyboard_arrow_left</icon-btn>
        <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{toPage}} / {{totalPage}} 页</span>
        <icon-btn small class="a" @click="onNext" :disabled="toPage >= totalPage">keyboard_arrow_right</icon-btn>
        <span v-if="totalRowsAmount" style="position:absolute; right: 10px;bottom: 8px;font-size: 12px;color: #999;">共 {{totalRowsAmount}} 项</span>
      </div>
    </div>

    <layer v-if="editShow" title="修改评论" width="600px">
      <div class="layer-text">
        <input-box v-model="editForm.content" multi-line label="地址"/>
      </div>
      <div class="layer-btns">
        <btn flat @click="editShow = false">取消</btn>
        <btn flat color="#008cff" @click="submitEdit">提交</btn>
      </div>
    </layer>
  </div>
</template>

<script>
export default {
  name: 'app-comments-list',
  props: [ 'audit' ],
  data () {
    return {
      allChecked: false,
      toPage: 1,
      checkedShow: false,
      totalPage: 1,
      totalRowsAmount: 0,
      loading: false,
      list: [],
      editShow: false,
      editForm: {
        id: '',
        content: ''
      },
      stateList: [
        { text: '已删除', icon: 'delete', color: '#D81B60' },
        { text: '通过', icon: 'check_circle', color: '#4caf50' },
        { text: '待审', icon: 'hourglass_full', color: '#ffc107' },
        { text: '驳回', icon: 'error', color: '#ff5252' }
      ]
    }
  },
  computed: {
    title () {
      let { query } = this.$route
      if (query.audit === '2') return '待审'
      if (query.audit === '3') return '已审'
      if (query.delete === '0') return '已删除'
      return '全部'
    }
  },
  methods: {
    plDelete () {
      let arr = []
      this.list.forEach(item => {
        if (item.checked) {
          arr.push(item.id)
        }
      })
      this.$http.post('/cri-cms-platform/comment/delete.monitor', {
        ids: arr.join(',')
      }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    },
    plReject () {
      let arr = []
      this.list.forEach(item => {
        if (item.checked) {
          arr.push(item.id)
        }
      })
      this.$http.post('/cri-cms-platform/comment/audit/reject.monitor', {
        ids: arr.join(',')
      }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    },
    plAudit () {
      let arr = []
      this.list.forEach(item => {
        if (item.checked) {
          arr.push(item.id)
        }
      })
      this.$http.post('/cri-cms-platform/comment/audit/pass.monitor', {
        ids: arr.join(',')
      }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    },
    onNext () {
      if (this.toPage+1 > this.totalPage) {
        return
      }
      this.toPage++
      this.getList()
    },
    onPrev () {
      if (this.toPage <= 1) {
        return
      }
      this.toPage--
      this.getList()
    },
    getList () {
      this.loading = true
      let obj = this.$route.query
      obj.toPage = this.toPage
      this.$http.post('/cri-cms-platform/comment/list.monitor', obj).then(
        res => {
          this.totalPage = res.totalPage
          this.totalRowsAmount = res.totalRowsAmount
          this.toPage = res.current
          res.pages.forEach(v => {
            v._state = this.getState(v)
          })
          this.list = res.pages
          console.log(this.list)
          this.list.forEach(item => {
            item.checked = false
          })
          this.loading = false
        }
      ).catch(console.log)
    },
    getState (item) {
      let { isAudit, auditStatus, deleteStatus } = item
      if (deleteStatus === '0') return 0
      if (isAudit === '1') return 1
      if (isAudit === '2') return 2
      if (isAudit === '3') {
        if (auditStatus === '1') return 1
        if (auditStatus === '0') return 3
      }
    },
    pass (ids) {
      this.$http.post('/cri-cms-platform/comment/audit/pass.monitor', { ids }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    },
    reject (ids) {
      this.$http.post('/cri-cms-platform/comment/audit/reject.monitor', { ids }).then(
        () => {
          this.getList()
        }
      ).catch(console.log)
    },
    openEdit (item) {
      this.editForm.id = item.id
      this.editForm.content = item.content
      this.editShow = true
    },
    submitEdit () {
      this.$http.post('/cri-cms-platform/comment/update.monitor', this.editForm).then(
        () => {
          this.getList()
          this.editShow = false
        }
      ).catch(console.log)
    },
    deleteItem (ids) {
      let othis = this
      this.$confirm({
        title: '提示',
        text: '是否删除本条评论？',
        btns: ['取消', '删除'],
        color: 'red',
        yes () {
          othis.$http.post('/cri-cms-platform/comment/delete.monitor', { ids }).then(
            () => {
              othis.getList()
            }
          ).catch(console.log)
        },
        no () {}
      })
    }
  },
  created () {
    this.getList()
  },
  watch: {
    'allChecked' (val) {
      if (val) {
        this.list.forEach(item => {
          item.checked = true
        })
      } else {
        this.list.forEach(item => {
          item.checked = false
        })
      }
    },
    '$route.query' () {
      this.toPage = 1
      this.getList()
    }
  }
}
</script>

<style lang="less">

</style>
