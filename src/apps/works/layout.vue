<template>
<div class="bg-f works-layout f-14 c-6" :class="{'open': open, 'del': delected}">
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
      <span class="flex-item"></span>
    </div>
    <div class="relative" v-if="!delected">
      <icon-btn small v-tooltip:top="'布局设置'" @click="settingShow=!settingShow">settings</icon-btn>
      <bubble v-if="settingShow" pos="bottom" align="end" @close="settingShow=false">
        <div class="layout-setting relative">
          <div v-if="settingLoading" class="abs flex-center bg-light-rgb-8" style="z-index: 3;">
            <loading size="30"/>
          </div>
          <div class="b f-16" style="padding: 10px 0;">布局设置</div>
          <div v-if="layout.type === '1'">
            <div class="flex-v-center setting-item">
              <div class="flex-item">幻灯片默认数量</div>
              <input type="number" v-model="editSetting.pptNumber" class="t-right">
              <span style="margin-left: 10px;">张</span>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">自动播放</div>
              <switcher v-model="editSetting.autoPlay" style="transform: scale(.8)"/>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">自动播放时间</div>
              <input type="number" v-model="editSetting.time" class="t-right">
              <span style="margin-left: 10px;">秒</span>
            </div>
          </div>
          <div v-if="layout.type === '2'">
            <div class="flex-v-center setting-item">
              <div class="flex-item">列表类型</div>
              <div class="flex-v-center">
                <radio-box v-model="editSetting.listType" label="1" text="文字"></radio-box>
                <radio-box v-model="editSetting.listType" label="2" text="图文"></radio-box>
                <radio-box v-model="editSetting.listType" label="3" text="图片"></radio-box>
              </div>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">图片格式</div>
              <select v-model="editSetting.picword" dir="rtl">
                <option value="1">上图下文字</option>
                <option value="2">上文字下图</option>
                <option value="3">左图右文字</option>
                <option value="4">右图左文字</option>
              </select>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">图文格式</div>
              <select v-model="editSetting.layout" dir="rtl">
                <option value="1">左图有标题无摘要</option>
                <option value="2">左图有标题有摘要</option>
                <option value="3">大图列表</option>
              </select>
            </div>
          </div>
          <div v-if="layout.type === '3'">
            <div class="flex-v-center setting-item">
              <div class="flex-item">子频道显示数量</div>
              <input type="text" value="5">
            </div>
          </div>
          <div class="t-right" style="padding-top: 15px;">
            <!-- <btn small flat @click="cancelEditSetting">取消</btn> -->
            <btn :disabled="!settingChanged" @click="submitSetting">保存设置</btn>
          </div>
        </div>
      </bubble>
    </div>
    <icon-btn small v-if="!delected" style="margin: 0 10px;" v-tooltip:top="'删除布局'" @click="delected=true">delete</icon-btn>
    <icon-btn small v-else style="margin: 0 10px;" v-tooltip:top="'撤销删除'" @click="delected=false">undo</icon-btn>
  </div>
  <div class="content relative" v-if="open">
    <div v-if="loading" class="abs bg-light-rgb-3 flex-center"><loading size="30"/></div>
    <div v-if="viewList && viewList.length">
      <draggable v-model="viewList" @end="sort" :disabled="delected" :options="{handle: '.can-drag'}">
        <transition-group tag="ul" name="flip-list">
          <li class="item flex-v-center"
            v-for="li in viewList"
            v-if="!(li.del && !showDelected)"
            :key="li.contentLayoutId || li.key"
            :class="{'del': li.del, 'new': li.new, 'can-drag': !li.top && !delected}">
            <span class="f-12 fix-top" v-if="li.top">置顶</span>
            <span class="flex-item item-title">{{li.newTitle}}</span>
            <span class="f-12 c-5">
              <span>{{li.sendDate}}</span>
              <span> ~ </span>
              <span>{{li.endDate}}</span>
            </span>
            <!-- <icon-btn small v-tooltip="'定时上/下线'" v-if="!li.del">access_time</icon-btn> -->
            <icon-btn small v-tooltip="'恢复'" v-if="li.del && !delected" @click="li.del=false">undo</icon-btn>
            <span class="relative opera-btns" v-if="!li.del && !delected">
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
      //
      layout: this.item, // props.item 副本
      add: [], // 新增文章项
      list: [], // 文章列表
      viewList: [], // 显示列表（已删除、新增、原文章的合集）
      showDelected: true, // 是否显示已删除
      // 设置
      settingShow: false,
      settingLoading: false,
      setting: null,
      editSetting: {},
      //
      delected: false, // 是否已被删除
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
    },
    item (val) {
      this.layout = val
    },
    settingShow (val) {
      if (!val) return
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
    result () {
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
            sendDate: item.sendDate || '',
            contentLayoutId: item.contentLayoutId || '',
            endDate: item.endDate || ''
          }
        })
      }
    },
    settingChanged () {
      let res = false
      if (!this.setting || !this.editSetting) return false
      for (let key in this.setting) {
        if (key !== 'playType' && this.setting[key] !== this.editSetting[key]) res = true
      }
      return res
    },
    listIcon () {
      if (this.layout.type === '1') return 'view_carousel'
      if (this.layout.type === '2') return 'view_list'
      if (this.layout.type === '2') return 'radio'
    }
  },
  methods: {
    getList () {
      this.loading = true
      this.$http.post('/cri-cms-platform/issue/getLayoutContentList.monitor', {
        layoutId: this.layout.id,
        type: this.layout.type
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
    getSetting () {
      this.settingLoading = true
      this.$http.post('cri-cms-platform/channel/getLayoutSetting.monitor', {
        layoutId: this.layout.id,
        dataType: this.layout.type
      }).then(res => {
        this.settingLoading = false
        let setting = JSON.parse(res.setting)
        if (res.layoutType === '1') {
          setting.autoPlay = setting.playType === 'auto' ? true : false
        }
        this.setting = setting
        this.editSetting = JSON.parse(JSON.stringify(setting))
      }).catch(e => {
        this.settingLoading = false
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
    sendIssueDate (item) {},
    submitSetting () {
      if (this.layout.type === '1') {
        this.editSetting.playType = this.editSetting.autoPlay ? 'auto' : 'handle'
      }
      let params = {
        layoutId: this.layout.id,
        layoutType: this.layout.type
      }
      for (let key in this.editSetting) {
        if (key !== 'autoPlay') params[key] = this.editSetting[key]
      }
      this.settingLoading = true
      this.$http.post('cri-cms-platform/channel/saveLayoutSetting.monitor', params).then(res => {
        this.$toast('设置保存成功')
        this.settingLoading = false
        this.getSetting()
      }).catch(e => {
        this.settingLoading = true
        this.$toast(e.msg)
      })
    }
  }
}
</script>

<style lang="less">
.works-layout{
  border-radius: 5px;margin: 2px 0;
  &[draggable=true] .title{background: rgb(190, 231, 255);}
  &.open{margin-bottom: 15px;margin-top: 15px;}
  &.del{background: #fdf6f6;color: #ad8686;text-decoration:line-through;}
  // .title{padding: 0;}
  .drag-handle{padding: 10px 20px;}
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
  .layout-setting{padding: 15px;white-space: nowrap;width: 300px;}
  .setting-item{padding: 6px 0;
    input, select{font-size: 14px;padding: 4px;border-radius: 3px;border: 1px solid #ddd;background: transparent;appearance: none;text-align: right;}
    input{width: 60px;}
    select{width: auto;}
    // select{padding: 4px;display: inline-block;font-size: 14px;border: 1px solid #ddd;}
  }
}
</style>
