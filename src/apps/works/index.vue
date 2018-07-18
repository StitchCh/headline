<template>
<div class="abs bg-f flex app-work">
  <af-left bg-color="#fafafa" vibrant-color="#008cff" title="工作台" style="width: 220px;">
    <div class="f-12 c-8" style="padding: 3px 20px;">频道列表</div>
    <tree
      class="c-4"
      :data="channel"
      :activeId="$route.query.channelId"
      openAll
      pidTxt="channelPartentId"
      @select="onTreeSelect"></tree>
  </af-left>
  <div class="flex-item flex-col" style="overflow: hidden;">
    <div class="af-topbar flex-v-center" style="background:rgb(244, 244, 244);">
      <div style="width: 150px;margin-left: 5px;" v-if="$route.query.channelId">
        <div v-show="$route.name === 'works-published'">
          <btn @click="publish">发布</btn>
          <btn flat @click="refresh">撤销更改</btn>
        </div>
      </div>
      <div class="flex-item flex-center">
        <div class="tab" v-if="$route.query.channelId">
          <div class="tab-item" :class="{'on': $route.name==='works-published'}" @click="onTab('/works')">已发布</div>
          <div class="tab-item" :class="{'on': $route.name==='works-unpublished'}" @click="onTab('/works/unpublished')">未发布</div>
        </div>
      </div>
      <account/>
    </div>
    <div class="flex-item flex-col relative" v-if="$route.query.channelId" style="background: #f4f4f4;">
      <div v-if="loading" class="abs flex-center bg-light-rgb-2" style="z-index:10;"><loading/></div>
      <div class="flex-item relative scroll-y" style="padding: 20px;">
        <keep-alive>
          <router-view
            :layout="layout"
            :channel="channel"
            ref="published"
            @add="onAdd"
          ></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
  <layer v-if="publishLoading">
    <div class="layer-text relative flex-center">
      <loading size="30"/>
      <span class="b c-6 f-16" style="margin: 0 10px;line-height: 1em;">正在发布</span>
    </div>
  </layer>
</div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-work',
  components: { Account, AfLeft },
  data () {
    return {
      loading: false,
      publishLoading: false,
      channel: [],
      layout: []
    }
  },
  created () {
    this.getChannel()
    this.getLayout()
  },
  watch: {
    '$route.query.channelId' () {
      this.getLayout()
    }
  },
  methods: {
    getChannel () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        res.channels.forEach(item => {
          item.name = item.channelName
        })
        this.channel = res.channels
      }).catch(e => {
        this.$toast(e.msg)
      })
    },
    getLayout () {
      if (!this.$route.query.channelId) return
      this.loading = true
      this.$http.post('/cri-cms-platform/issue/getChannelLayoutList.monitor', {
        channelId: this.$route.query.channelId
      }).then(res => {
        this.loading = false
        this.layout = res
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg)
      })
    },
    onTreeSelect (e) {
      this.$router.replace({
        path: this.$route.path,
        query: {
          channelId: e.id
        }
      })
    },
    onTab (path) {
      this.$router.replace({
        path,
        query: this.$route.query
      })
    },
    publish () {
      let data = this.$refs.published.result
      let result = { results: { data } }
      result = JSON.stringify(result)
      this.publishLoading = true
      this.$http.post('/cri-cms-platform/issue/saveIssue.monitor', {
        issueJson: result
      }).then(res => {
        this.publishLoading = false
        this.$toast('发布成功')
        this.refresh()
      }).catch(e => {
        this.publishLoading = false
        this.$toast(e.msg)
      })
    },
    refresh () {
      let query = this.$route.query
      let path = this.$route.path
      this.$router.replace({ path })
      setTimeout(() => {
        this.$router.replace({ path, query })
      }, 10)
    },
    onAdd (e) {
      this.$router.replace({
        path: '/works',
        query: this.$route.query
      })
      setTimeout(() => {
        this.$refs.published.add(e)
      }, 50)
    }
  }
}
</script>

<style lang="less">
.app-work{
  //
}
</style>
