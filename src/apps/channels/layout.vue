<template>
<div class="channel-layout card"
  :class="{'new': item.new, 'del': item.del, 'edit': item.edit}">
  <div class="flex-v-center title">
    <span v-if="!item.edit" class="flex-item layout-name flex-v-center handle" @click="item.open=!item.open">{{item.layoutName}}</span>
    <input v-else type="text" v-model="item.editLayoutName" class="flex-item f-14 layout-name-input">
    <icon-btn small v-if="!item.edit && !item.del" @click="item.edit=true">edit</icon-btn>
    <icon-btn small v-if="item.edit && !item.del" @click="item.edit=false;item.layoutName=item.editLayoutName" class="green">check</icon-btn>
    <icon-btn small v-if="item.edit && !item.del" @click="item.edit=false">close</icon-btn>
    <div class="relative c-4" v-if="!item.del && !item.edit">
      <icon-btn small v-tooltip:top="'布局设置'" @click="settingShow=!settingShow" :style="{backgroundColor: settingShow ? 'rgba(0,0,0,.2)' : ''}">settings</icon-btn>
      <bubble v-if="settingShow" pos="bottom" align="end" @close="settingShow=false">
        <div class="layout-setting relative">
          <div v-if="settingLoading" class="abs flex-center bg-light-rgb-8" style="z-index: 3;">
            <loading size="30"/>
          </div>
          <div class="b f-16" style="padding: 10px 0;">布局设置</div>
          <div v-if="item.type === '1'">
            <div class="flex-v-center setting-item">
              <div class="flex-item">幻灯片默认数量</div>
              <input type="number" v-model="item.setting.pptNumber" class="t-right">
              <span style="margin-left: 10px;">张</span>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">自动播放</div>
              <switcher v-model="item.setting.autoPlay" style="transform: scale(.8);margin-right: 20px;"/>
            </div>
            <div class="flex-v-center setting-item" :style="item.setting.autoPlay ? {} : {opacity: .5, pointerEvents: 'none'}">
              <div class="flex-item">自动播放时间</div>
              <input type="number" v-model="item.setting.time" class="t-right">
              <span style="margin-left: 10px;">秒</span>
            </div>
          </div>
          <div v-if="item.type === '2'">
            <div class="flex-v-center setting-item">
              <div class="flex-item">列表类型</div>
              <div class="flex-v-center">
                <radio-box v-model="item.setting.listType" label="1" text="文字"></radio-box>
                <radio-box v-model="item.setting.listType" label="2" text="图文"></radio-box>
                <radio-box v-model="item.setting.listType" label="3" text="图片"></radio-box>
              </div>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">图片格式</div>
              <select v-model="item.setting.picword" dir="rtl">
                <option value="1">上图下文字</option>
                <option value="2">上文字下图</option>
                <option value="3">左图右文字</option>
                <option value="4">右图左文字</option>
              </select>
            </div>
            <div class="flex-v-center setting-item">
              <div class="flex-item">图文格式</div>
              <select v-model="item.setting.layout" dir="rtl">
                <option value="1">左图有标题无摘要</option>
                <option value="2">左图有标题有摘要</option>
                <option value="3">大图列表</option>
              </select>
            </div>
          </div>
          <div v-if="item.type === '3'">
            <div class="flex-v-center setting-item">
              <div class="flex-item">子频道显示数量</div>
              <input type="text" v-model="item.setting.singShowNum">
            </div>
          </div>
          <div class="t-right" style="padding-top: 15px;">
            <!-- <btn small flat @click="cancelEditSetting">取消</btn> -->
            <btn v-if="!item.new" @click="submitSetting">保存设置</btn>
          </div>
        </div>
      </bubble>
    </div>
    <icon-btn small v-if="(!item.edit && !item.del) || item.new" @click="del">delete</icon-btn>
    <icon-btn small v-if="!item.edit && item.del" @click="item.del=false">undo</icon-btn>
  </div>
  <div class="content" v-if="item.type === '3' && item.open && !item.del">
    <div class="flex" style="flex-wrap: wrap;">
      <draggable v-if="item.cl && item.cl.length">
        <transition-group name="flip-list">
          <tag :close="channelIds.length>1" v-for="channel in item.cl" :key="channel.channelId" @close="toggleChannel(channel)">{{channel.channelName}}</tag>
        </transition-group>
      </draggable>
    </div>
    <div class="relative" style="display: inline-block;">
      <icon-btn small v-tooltip:top="'添加子频道'" @click="addChannelShow=!addChannelShow">add</icon-btn>
      <bubble pos="right" align="start" v-if="addChannelShow" @close="addChannelShow=false">
        <div v-if="!activeChannelChildren.length" class="c-8" style="white-space: nowrap;padding: 20px;">没有可添加项</div>
        <ul v-else class="add-channel-list">
          <li class="c-6 flex-v-center a" v-for="c in activeChannelChildren" :key="c.id" @click="toggleChannel(c)">
            <i class="icon f-16 green" :style="{visibility: channelIds.includes(c.id) ? 'visible' : 'hidden'}">check</i>
            <span class="flex-item">{{c.channelName}}</span>
          </li>
        </ul>
      </bubble>
    </div>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'channel-layout',
  components: { draggable },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    activeChannelChildren: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      item: this.data,
      settingShow: false,
      addChannelShow: false,
      settingLoading: false
      // clRaw: JSON.parse(JSON.stringify(this.data.cl)) // cl 原始数据
    }
  },
  created () {
    let { item, activeChannelChildren } = this
    if (item.type === '3' && item.new && activeChannelChildren.length) {
      this.toggleChannel(activeChannelChildren[0])
    }
  },
  computed: {
    settingChanged () {
      return true
    },
    channelIds () {
      return this.item.cl.map(item => item.channelId)
    }
  },
  watch: {
    'item.setting.autoPlay' (val) {
      this.item.setting.playType = val ? 'auto' : 'handle'
    },
    settingShow (show) {
      if (show && !this.item.new) this.getSetting()
    }
  },
  methods: {
    getSetting () {
      this.settingLoading = true
      this.$http.post('cri-cms-platform/channel/getLayoutSetting.monitor', {
        layoutId: this.item.id,
        dataType: this.item.type
      }).then(res => {
        this.settingLoading = false
        let setting = JSON.parse(res.setting)
        if (res.layoutType === '1') {
          setting.autoPlay = setting.playType === 'auto' ? true : false
        }
        this.item.setting = setting
      }).catch(e => {
        this.settingLoading = false
        this.$toast(e.msg)
      })
    },
    submitSetting () {
      let setting = JSON.parse(JSON.stringify(this.item.setting))
      delete setting.autoPlay
      setting.layoutId = this.item.id
      setting.layoutType = this.item.type
      this.settingLoading = true
      this.$http.post('cri-cms-platform/channel/saveLayoutSetting.monitor', setting).then(res => {
        this.$toast('设置保存成功')
        this.settingLoading = false
        this.settingShow = false
        this.getSetting()
      }).catch(e => {
        this.settingLoading = true
        this.$toast(e.msg)
      })
    },
    del () {
      if (this.item.new) {
        this.$emit('deleteNew', this.item)
        return
      }
      this.item.del = true
    },
    toggleChannel (channel) {
      // console.log(channel)
      let { item, channelIds } = this
      let channelId = channel.channelId || channel.id
      if (channelIds.includes(channelId)) {
        if (channelIds.length <= 1) return
        let i = channelIds.indexOf(channelId)
        item.cl.splice(i, 1)
        return
      }
      item.cl.push({
        layoutId: item.new ? '' : item.id,
        channelId: channelId,
        channelName: channel.channelName,
        type: channel.type
      })
    }
  }
}
</script>

<style lang="less">
.channel-layout{border-radius: 5px;margin: 5px 0;
  .title{height: 38px;padding: 0 20px;}
  .content{border-top: 1px solid #eee;padding: 12px;}
  &:last-child{border: none;}
  .title:hover{
    .icon-btn{opacity: 1;}
  }
  &.edit .icon-btn{opacity: 1;}
  &.del{color: #b12121;background: #fff4f4;}
  &.new{color: #0299ff;background: #f1faff;}
  &.del .layout-name{text-decoration:line-through;}
  &[draggable=true] .title{background: #bee7ff;}
  .title .icon-btn{opacity: .2;}
  .layout-name-input{height: 30px;margin: 0 10px 0 0;padding: 0 10px;border: 1px solid #ddd;}
  .layout-name{height: 100%;}
  .layout-setting{padding: 15px;white-space: nowrap;width: 300px;}
  .setting-item{padding: 6px 0;
    input, select{font-size: 14px;padding: 4px;border-radius: 3px;border: 1px solid #ddd;background: transparent;appearance: none;text-align: right;}
    input{width: 60px;}
    select{width: auto;}
  }
  .add-channel-list{padding: 10px 0;z-index: 3;position: relative;
    li{white-space: nowrap;line-height: 1em;padding: 5px 10px;}
    li:hover{background: rgba(0, 0, 0, .1)}
    .icon{margin-right: 6px;}
  }
}
</style>
