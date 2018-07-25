<template>
<div class="bg-f works-layout f-14 c-6" :class="{'open': open, 'new': layout.new}">
  <div class="flex-v-center title a" style="line-height: 1em;">
    <div class="flex-v-center flex-item drag-handle" @click="open=!open">
      <i class="icon" style="margin-right: 10px;">{{listIcon}}</i>
      <span class="c-5 b" style="margin-right: 15px;">{{layout.layoutName}}</span>
      <span v-if="add.length" class="f-12" style="margin: 0 10px;color:#008eff;">新增 {{add.length}} 项</span>
      <span v-if="changed" class="f-12" style="margin: 0 10px;color:#ec5d00;">已修改 {{changed}} 项</span>
      <span v-if="removed.length" class="f-12" style="margin: 0 10px;color:#ec5d00;">移除 {{removed.length}} 项</span>
      <div class="relative" v-tooltip:top="'显示/隐藏已移除项'" v-if="removed.length">
        <switcher v-model="showDelected" :style="{transform: 'scale(.75)', transformOrigin: 'right'}"/>
      </div>
    </div>
    <icon-btn small v-if="layout.type !== '3'" v-tooltip:top="'添加文章'" @click="$router.replace({path: '/works/unpublished', query: $route.query})" style="margin-right: 10px;">add</icon-btn>
  </div>
  <div class="content relative" v-if="open">
    <div v-if="loading" class="abs bg-light-rgb-3 flex-center"><loading size="30"/></div>
    <div v-if="layout.type !== '3'">
      <draggable
        v-if="viewList && viewList.length"
        v-model="viewList" @end="sort"
        :options="{handle: '.can-drag'}">
        <transition-group tag="ul" name="flip-list">
          <li class="item flex-v-center"
            v-for="li in viewList"
            v-if="!(li.del && !showDelected)"
            :key="li.contentLayoutId || li.key"
            :class="{'del': li.del, 'new': li.new, 'can-drag': !li.top}">
            <span class="f-12 fix-top" v-if="li.top">置顶</span>
            <span class="flex-item item-title">{{li.newTitle}}</span>
            <span class="f-12 c-5">
              <vue-datepicker-local v-model="li.dateRange" format="YYYY-MM-DD HH:mm:ss" show-buttons></vue-datepicker-local>
              <span style="margin-left: 10px;" :style="{color: getPublishStatus(li).color}">{{getPublishStatus(li).str}}</span>
            </span>
            <icon-btn small v-tooltip="'恢复'" v-if="li.del" @click="li.del=false">undo</icon-btn>
            <span class="relative opera-btns" v-if="!li.del">
              <icon-btn small>more_vert</icon-btn>
              <bubble pos="left" align="center">
                <div style="padding: 3px 10px;">
                  <icon-btn small v-if="!li.top" v-tooltip="'置顶'" :key="li.top" @click="top(li)">vertical_align_top</icon-btn>
                  <icon-btn small v-if="li.top" v-tooltip="'取消置顶'" :key="li.top" @click="unTop(li)" class="un-top">vertical_align_top</icon-btn>
                  <icon-btn small v-tooltip="'编辑'" @click="toEdit(li)">edit</icon-btn>
                  <icon-btn small v-tooltip="'移除'" @click="del(li)">delete</icon-btn>
                </div>
              </bubble>
            </span>
          </li>
        </transition-group>
      </draggable>
      <div v-else class="f-14 t-center c-a" style="padding: 5px;">暂无数据</div>
    </div>
    <div v-else>
      <div class="flex" v-if="layout.cl && layout.cl.length" style="flex-wrap: wrap;">
        <tag v-for="item in layout.cl" :key="item.channelId">{{item.channelName}}</tag>
      </div>
      <div v-else class="flex-center c-8 f-12">无频道</div>
    </div>
  </div>
  <layer v-if="edit.item" title="编辑" width="300px">
    <div class="layer-text">
      <div class="flex">
        <input-box v-model="edit.title" label="标题" class="flex-item"></input-box>
      </div>
      <div class="flex">
        <input-box v-model="edit.abstarcts" label="摘要" multi-line class="flex-item"></input-box>
      </div>
    </div>
    <div class="layer-btns">
      <btn flat @click="edit = { item: null, title: '', abstarcts: '' }">取消</btn>
      <btn flat color="#008eff" @click="submitEdit" :disabled="!edit.title">更新</btn>
    </div>
  </layer>
</div>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'
import draggable from 'vuedraggable'
import moment from 'moment'

export default {
  name: 'works-layout',
  components: { VueDatepickerLocal, draggable },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      open: false,
      page: 1,
      size: 10,
      //
      layout: this.item, // props.item 副本
      add: [], // 新增文章项
      list: [], // 文章列表
      viewList: [], // 显示列表（已删除、新增、原文章的合集）
      showDelected: true, // 是否显示已删除
      edit: {
        item: null,
        title: '',
        abstarcts: ''
      }
    }
  },
  watch: {
    open (val) {
      if (this.layout.new || this.layout.type === '3') return
      if (val && !this.list.length) {
        this.getList()
      }
    },
    add (val) {
      this.viewList = val.concat(this.list)
      this.sort()
    },
    item (val) {
      this.layout = val
    },
    settingShow (val) {
      if (!val) return
      if (this.layout.new) return
      if (!this.setting) {
        this.getSetting()
      } else {
        this.editSetting = JSON.parse(JSON.stringify(this.setting))
      }
    }
  },
  computed: {
    changed () {
      let res = 0
      this.list.forEach(item => {
        if (item.changed) res += 1
      })
      return res
    },
    topItem () {
      let res = {}
      let top = null
      this.viewList.forEach(item => {
        if (item.top && !item.del) top = item
      })
      if (top) {
        res = {
          id: top.id,
          newTitle: top.newTitle,
          newAbstract: top.newAbstract,
          sortOrder: top.sortOrder,
          type: this.layout.type,
          sendDate: top.sendDate || '',
          endDate: top.endDate || '',
          contentLayoutId: top.contentLayoutId || ''
        }
      }
      return res
    },
    removed () {
      return this.list.filter(item => item.del)
    },
    listIcon () {
      if (this.layout.type === '1') return 'view_carousel'
      if (this.layout.type === '2') return 'view_list'
      if (this.layout.type === '3') return 'radio'
    }
  },
  methods: {
    // 获取文章列表
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/issue/getLayoutContentList.monitor', {
        layoutId: this.layout.id,
        type: this.layout.type
      }).then(res => {
        let len = res.data.length
        res.data.forEach((item, i) => {
          item.dateRange = [item.sendDate, item.endDate]
          // item.editSendDate = item.sendDate
          // item.editEndDate = item.endDate
          item.changed = false
          item.del = false
          if (parseInt(item.sortOrder) > 9000000) {
            item.top = true
            item.order = item.sortOrder = ~~(item.sortOrder)
          } else {
            item.top = false
            item.order = item.sortOrder = (len - i)
          }
        })
        this.loading = false
        this.list = res.data
        this.viewList = this.add.concat(res.data)
        this.totalPage = res.totalPage
        this.sort()
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    top (item) {
      this.viewList.forEach(item => { item.top = false })
      let i = this.viewList.indexOf(item)
      this.viewList.splice(i, 1)
      this.viewList.unshift(item)
      item.top = true
      this.sort()
    },
    unTop (item) {
      item.top = false
      this.sort()
    },
    del (item) {
      if (item.new) {
        let i = this.add.indexOf(item)
        this.add.splice(i, 1)
        return
      }
      item.del = true
    },
    sort () {
      let len = this.viewList.length
      let res = []
      this.viewList.forEach((item, i) => {
        if (item.top) {
          item.sortOrder = 9999999
          res.unshift(item)
        } else {
          item.sortOrder = len - i
          res.push(item)
        }
        if (item.sortOrder !== item.order && !item.new) item.changed = true
      })
      this.viewList = res
    },
    toEdit (item) {
      this.edit.item = item
      this.edit.title = item.newTitle || ''
      this.edit.abstarcts = item.newAbstract || ''
    },
    submitEdit () {
      let { item, title, abstarcts } = this.edit
      if (item.newTitle !== title || item.newAbstract !== abstarcts) item.changed = true
      item.newTitle = title
      item.newAbstract = abstarcts
      this.edit.item = null
    },
    onSendTimeConfirm (e) {
      console.log(e)
    },
    getPublishStatus (item) {
      if (item.new) return { state: 1, color: '#008eff', str: '未上线' }
      let now = moment()
      if (now.isBefore(item.sendDate)) {
        return { state: 1, color: '#008eff', str: '未上线' }
      }
      if (now.isAfter(item.endDate)) {
        return { state: 3, color: '#ff3f3f', str: '已下线' }
      }
      return {
        state: 2,
        color: '#008e22',
        str: '已上线'
      }
    },
    getIssueResult () {
      return {
        layoutId: this.layout.id,
        type: this.layout.type,
        top: this.topItem,
        remove: this.removed.map(item => item.contentLayoutId),
        data: this.viewList.filter(item => (!item.del && !item.top)).map(item => {
          return {
            id: item.id,
            newTitle: item.newTitle,
            newAbstract: item.newAbstract,
            sortOrder: item.sortOrder,
            type: this.layout.type,
            contentLayoutId: item.contentLayoutId || '',
            sendDate: moment(item.dateRange[0]).format('YYYY-MM-DD HH:mm:ss') || '',
            endDate: moment(item.dateRange[1]).format('YYYY-MM-DD HH:mm:ss') || ''
          }
        })
      }
    }

  }
}
</script>

<style lang="less">
.works-layout{
  border-radius: 5px;margin: 1px 0;border: 1px solid rgba(0, 0, 0, .08);
  &[draggable=true] .title{background: rgb(190, 231, 255);}
  &.open{margin-bottom: 15px;margin-top: 15px;}
  .drag-handle{padding: 10px 20px;}
  .content{border-top: 1px solid rgba(0, 0, 0, .08);padding: 10px;}
  .item{line-height: 1em;padding: 3px 10px;line-height: 1.3em;height: 36px;box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
    &:last-child{border: none;}
    .icon{color: #ddd;}
    &:hover{
      background: rgba(0, 0, 0, .05);
      .icon{color: #666;}
    }
    &.del{background: #fffbfb;color: #ad8686;text-decoration:line-through}
    &.new{background: #f2f8ff;color: #516e8c;}
    &[draggable=true]{background: rgb(190, 231, 255);}
  }
  .date-picker-container{position: absolute;left: 0;top: 0;}
  .datepicker{
    &.datepicker-range{min-width: 280px;}
    input{padding: 0 10px 0 10px;width: 280px;height: 30px;border: none;font-size: 12px;background: transparent;}
    &:before{content: none;}
  }
  .opera-btns{
    .bubble{visibility: hidden;white-space: nowrap;overflow: visible;}
    .bubble-ctn{overflow: visible;}
    &:hover{
      .bubble{visibility: visible;}
    }
  }
  .fix-top{display: inline-block;line-height: 1em;margin-right: 10px;border: 1px solid orange;padding: 3px;border-radius: 3px;color: darkorange;}
  .un-top .icon{transform: rotate(180deg)}
  .item-title{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
  .datepicker-popup{width: 500px!important;right: -50px;left: auto;}
}
</style>
