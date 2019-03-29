<template>
<div class="abs bg-e c-6 f-14 flex-col app-channels">
  <div class="flex-v-center af-topbar bg-f">
    <dock color="#009aff" title="频道管理"/>
    <div class="flex-item"></div>
    <account />
  </div>
  <div class="flex-item flex">
    <channel-editor @changeChannel="changeChannel" @channelsLoad="onChannelsLoad" @refresh="refresh"/>
    <div class="right flex-item flex-col" v-if="$route.query.channelId">
      <div class="flex-v-center" style="padding: 15px 30px;">
        <span class="flex-item b">布局编辑</span>
        <span>是否启用</span>
        <switcher v-model="channelState.showLocal" style="transform: scale(.8);margin-right: 20px;"/>
        <span>是否评论</span>
        <switcher v-model="channelState.isPingLun" style="transform: scale(.8);margin-right: 20px;"/>
        <span>是否审核</span>
        <switcher v-model="channelState.isShenHe" style="transform: scale(.8);margin-right: 20px;"/>
        <btn flat style="margin-right: 5px;" @click="refresh()">撤销修改</btn>
        <btn @click="submit">保存</btn>
      </div>
      <div class="flex-item scroll-y" style="padding: 15px 30px;">
        <div class="relative f-14 c-6" style="margin-bottom: 10px;line-height: 1em;">
          <div class="bg-f card flex-center a b" @click="addShow=!addShow" :key="'0000000'" style="padding: 10px;">
            <i class="icon" style="margin-right: 10px;">add</i>
            <span>新增布局</span>
          </div>
          <bubble v-if="addShow" @close="addShow=false">
            <ul class="f-14 c-5 add-select" style="padding: 10px 0;width: 200px;">
              <li class="a flex-v-center" @click="addLayout('1', '幻灯片')">
                <i class="icon f-20">view_carousel</i>
                <span class="flex-item">幻灯片</span>
              </li>
              <li :style="!liebiao ? {opacity: .5,pointerEvents: 'none'} : ''" class="a flex-v-center" @click="addLayout('2', '列表')">
                <i class="icon f-20">view_list</i>
                <span class="flex-item">列表</span>
              </li>
              <li class="a flex-v-center" @click="addLayout('3', '子频道')"
                :style="!activeChannelChildren.length ? {opacity: .5,pointerEvents: 'none'} : ''">
                <i class="icon f-20">radio</i>
                <span class="flex-item">子频道</span>
              </li>
            </ul>
          </bubble>
        </div>
        <draggable  v-model="layout" :options="{handle: '.handle'}">
          <transition-group tag="div" name="flip-list">
            <channel-layout
              v-for="item in layout"
              :key="item.id"
              :data="item"
              :activeChannelChildren="activeChannelChildren"
              @deleteNew="onDel"/>
          </transition-group>
        </draggable>
        <draggable  v-model="layout1" :options="{handle: '.handle'}">
          <transition-group tag="div" name="flip-list">
            <channel-layout
              v-for="item in layout1"
              :key="item.id"
              :data="item"
              :activeChannelChildren="activeChannelChildren"
              @deleteNew="onDel"/>
          </transition-group>
        </draggable>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Account from '@/components/account'
import Dock from '@/components/dock'
import ChannelEditor from './channel'
import draggable from 'vuedraggable'
import ChannelLayout from './layout'

const defaultSettings = {
  '1': {
    pptNumber: '5',
    autoPlay: true,
    playType: 'auto',
    time: '10'
  },
  '2': {
    listType: '1',
    picword: '1',
    layout: '1'
  },
  '3': {
    singShowNum: '5'
  }
}

export default {
  name: 'app-channels',
  components: { Account, Dock, ChannelEditor, draggable, ChannelLayout },
  data () {
    return {
      loading: false,
      addShow: false,
      channels: [],
      layout: [],
      layout1: [],
      mark: 1,
      liebiao: true,
      channelState: {
        channelId: '',
        showLocal: false,
        isPingLun: false,
        isShenHe: false
      }
    }
  },
  watch: {
    '$route.query.channelId' (channelId) {
      this.getLayout(channelId)
    }
  },
  computed: {
    activeChannelChildren () {
      let activeChannelId = this.$route.query.channelId
      if (!activeChannelId) return []
      return this.channels.filter(item => item.channelPartentId === activeChannelId)
    }
  },
  created () {
    if (!this.$route.query.channelId) return
    this.getLayout(this.$route.query.channelId)
  },
  methods: {
    changeChannel (id) {
      this.$http.post('/cri-cms-platform/channel/getChannelSetting.monitor', {
        channelId: id
      }).then(res => {
        this.channelState.channelId = res.channelId
        res.setting = JSON.parse(res.setting)
        for (let item in res.setting) {
          this.channelState[item] = res.setting[item] == 'true' ? true : false
        }
      })
    },
    setChannel () {
      this.$http.post('/cri-cms-platform/channel/channelSet.monitor', {
        channelId: this.$route.query.channelId,
        showLocal: this.channelState.showLocal ? 'true' : 'false',
        isPingLun: this.channelState.isPingLun ? 'true' : 'false',
        isShenHe: this.channelState.isShenHe ? 'true' : 'false'
      }).then(res => {

      })
    },
    getLayout (channelId) {
      if (!channelId) return
      this.loading = true
      this.layout1 = []
      this.layout = []
      this.$http.post('/cri-cms-platform/channel/getChannelIdToLayout.monitor', {
        channelId
      }).then(res => {
        res.forEach(item => {
          item.editLayoutName = item.layoutName
          item.edit = false
          item.new = false
          item.del = false
          item.open = false
          item.setting = (item.ls && item.ls[0]) ? JSON.parse(item.ls[0].setting) : {}
          if (item.type === '1') {
            item.setting.autoPlay = (item.setting.playType === 'auto')
          }
        })
        this.loading = false
        for (let i = 0; i < res.length; i++) {
          if (res[i].type == 2) {
            this.layout1.push(res[i])
          } else {
            this.layout.push(res[i])
          }
        }
        if (this.layout1.length > 0) {
          this.liebiao = false
        } else {
          this.liebiao = true
        }
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg || e.message)
      })
    },
    addLayout (type, name) {
      if (type === '3' && !this.activeChannelChildren.length) return
      if (type === '2') {
        this.liebiao = false
        this.layout1.push({
          id: Math.random().toString(16).substr(2),
          layoutName: name,
          editLayoutName: name,
          type,
          edit: false,
          new: true,
          open: true,
          setting: defaultSettings[type],
          cl: []
        })
      } else {
        this.layout.unshift({
          id: Math.random().toString(16).substr(2),
          layoutName: name,
          editLayoutName: name,
          type,
          edit: false,
          new: true,
          open: true,
          setting: defaultSettings[type],
          cl: []
        })
      }
      this.addShow = false
    },
    onChannelsLoad (e) {
      this.channels = e
    },
    onDel (e) {
      let i = this.layout.indexOf(e)
      this.layout.splice(i, 1)
    },
    submit () {
      let data = this.layout.filter(item => !item.del).map(item => {
        let layoutId = item.new ? '' : item.id
        let channelId = this.$route.query.channelId
        let setting = JSON.parse(JSON.stringify({
          layoutId: layoutId,
          layoutType: item.type,
          channelId,
          setting: item.setting
        }))
        let cl = item.cl.map(c => {
          return {
            layoutId,
            channelId: c.channelId,
            type: item.type
          }
        })
        if (setting.setting.autoPlay !== undefined) delete setting.setting.autoPlay
        return {
          layoutName: item.layoutName,
          id: layoutId,
          layoutId: layoutId,
          channelId,
          type: item.type,
          cl: cl,
          ls: item.new ? [setting] : [],
          delChildId: []
        }
      })
      if (this.layout1.length != 0) {
        var data1 = this.layout1.filter(item => !item.del).map(item => {
          let layoutId = item.new ? '' : item.id
          let channelId = this.$route.query.channelId
          let setting = JSON.parse(JSON.stringify({
            layoutId: layoutId,
            layoutType: item.type,
            channelId,
            setting: item.setting
          }))
          let cl = item.cl.map(c => {
            return {
              layoutId,
              channelId: c.channelId,
              type: item.type
            }
          })
          if (setting.setting.autoPlay !== undefined) delete setting.setting.autoPlay
          return {
            layoutName: item.layoutName,
            id: layoutId,
            layoutId: layoutId,
            channelId,
            type: item.type,
            cl: cl,
            ls: item.new ? [setting] : [],
            delChildId: []
          }
        })
      }
      if (data1 && data1[0]) {
        data.push(data1[0])
      }
      let delarr = this.layout.filter(item => item.del).map(item => item.id)
      let delarr1 = this.layout1.filter(item => item.del).map(item => item.id)
      let res = {
        result: data,
        delLayoutId: delarr.concat(delarr1)
      }
      console.log(res)
      this.$http.post('/cri-cms-platform/channel/saveChannelLayout.monitor', {
        channelId: this.$route.query.channelId,
        channelLayoutJson: JSON.stringify(res)
      }).then(res => {
        this.$toast('保存成功')
        this.refresh()
      }).catch(e => {
        this.$toast(e.msg)
      })
      this.setChannel()
    },
    refresh () {
      let query = this.$route.query
      let path = this.$route.path
      this.$router.replace({ path })
      setTimeout(() => {
        this.$router.replace({ path, query })
      }, 100)
    }
  }
}
</script>

<style lang="less">
.app-channels{
  .add-select{
    li{padding: 5px 15px;}
    .icon{margin-right: 15px;}
    li:hover{background: #eee;}
  }
}
</style>
