<template>
<div class="bg-f works-layout f-14 c-6" :class="{'open': open}">
  <div class="flex-v-center title a" style="line-height: 1em;" @click="open=!open">
    <i class="icon" style="margin-right: 10px;">{{item.type === '1' ? 'view_carousel' : 'list'}}</i>
    <span class="flex-item c-5 b">{{item.layoutName}}</span>
    <span v-if="add.length" class="f-12" style="margin: 0 10px;color:#008eff;">新增 {{add.length}} 项</span>
    <span v-if="changed" class="f-12" style="margin: 0 10px;color:#ec5d00;">已修改 {{changed}} 项</span>
    <span v-if="removed.length" class="f-12" style="color:#ec5d00;">移除 {{removed.length}} 项</span>
    <div class="relative" v-tooltip:top="'显示/隐藏\n已移除项'" v-if="removed.length">
      <switcher v-model="showDelected" :style="{transform: 'scale(.75)', transformOrigin: 'right'}"/>
    </div>
    <!-- <span class="f-12 c-8" style="margin-left: 10px;">共 {{list.length}} 条数据</span> -->
  </div>
  <div class="content relative" v-if="open">
    <div v-if="loading" class="abs bg-light-rgb-3 flex-center"><loading size="30"/></div>
    <div v-if="viewList && viewList.length">
      <draggable v-model="viewList" @end="sort">
        <transition-group tag="ul" name="flip-list">
          <!-- v-if="i >= (page - 1) * size && i < page * size"
          :options="{draggable:'.can-drag'}"
          :class="{'can-drag': !li.top}"-->
          <li class="item flex-v-center"
            v-for="li in viewList"
            v-if="!(li.del && !showDelected)"
            :key="li.contentLayoutId || li.key"
            :class="{'del': li.del, 'new': li.new}">
            <span class="f-12 fix-top" v-if="li.top">置顶</span>
            <span class="flex-item item-title">{{li.newTitle}}</span>
            <!-- <span class="f-12 c-8">{{li.sortOrder + ', ' + li.order}}</span>,
            <span class="f-12 c-8">{{li.id}}</span> -->
            <span class="f-12 c-5">
              <span>{{li.sendDate}}</span>
              <span> ~ </span>
              <span>{{li.endDate}}</span>
            </span>
            <!-- <icon-btn small v-tooltip="'定时上/下线'" v-if="!li.del">access_time</icon-btn> -->
            <icon-btn small v-tooltip="'恢复'" v-if="li.del" @click="li.del=false">undo</icon-btn>
            <span class="relative opera-btns" v-else>
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
    </div>
    <div v-else class="f-14 t-center c-a" style="padding: 5px;">暂无数据</div>
    <!-- <pagination :page="page" :size="size" :total="list.length" @change="$event => page=$event"/> -->
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
// import uniqBy from 'lodash/uniqBy'

// const submitKeys = ['id', 'sortOrder', 'newTitle', 'newAbstract', 'sendDate', 'contentLayoutId', 'endDate']

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
      add: [], // 新增项
      list: [],
      viewList: [],
      showDelected: true,
      edit: {
        item: null,
        title: '',
        abstarcts: ''
      }
    }
  },
  watch: {
    open (val) {
      if (val && !this.list.length) this.getList()
    },
    add (val) {
      this.viewList = val.concat(this.list)
      this.sort()
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
          type: this.item.type,
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
    result () {
      return {
        layoutId: this.item.id,
        type: this.item.type,
        top: this.topItem,
        remove: this.removed.map(item => item.contentLayoutId),
        data: this.viewList.filter(item => (!item.del && !item.top)).map(item => {
          return {
            id: item.id,
            newTitle: item.newTitle,
            newAbstract: item.newAbstract,
            sortOrder: item.sortOrder,
            type: this.item.type,
            sendDate: item.sendDate || '',
            contentLayoutId: item.contentLayoutId || '',
            endDate: item.endDate || ''
          }
        })
      }
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/issue/getLayoutContentList.monitor', {
        layoutId: this.item.id,
        type: this.item.type
      }).then(res => {
        let len = res.data.length
        res.data.forEach((item, i) => {
          item.editSendDate = item.sendDate
          item.editEndDate = item.endDate
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
    sendIssueDate (item) {}
  }
}
</script>

<style lang="less">
.works-layout{
  border-radius: 5px;margin: 2px 0;
  &[draggable=true] .title{background: rgb(190, 231, 255);}
  &.open{margin-bottom: 15px;margin-top: 15px;}
  .title{padding: 10px 20px;}
  .content{border-top: 1px solid #eee;padding: 10px;}
  .item{line-height: 1em;padding: 3px 10px;line-height: 1.3em;
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
    input{padding: 0 22px 0 10px;height: 30px;border: none;font-size: 12px;}
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
}
</style>
