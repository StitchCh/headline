<template>
<div class="abs bg-f flex app-work">
  <af-left bg-color="#fafafa" vibrant-color="#008cff" title="工作台" style="width: 220px;">
    <div class="f-12 c-8" style="padding: 3px 20px;">频道列表</div>
    <tree
      class="c-4"
      :data="channels"
      :activeId="$route.query.channelId"
      openAll
      pidTxt="channelPartentId"
      @select="onTreeSelect"></tree>
  </af-left>
  <div class="flex-item flex-col">
    <div class="af-topbar flex-v-center">
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item flex-col relative" v-if="$route.query.channelId" style="background: #f4f4f4;">
      <div v-if="loading" class="abs flex-center bg-light-rgb-2" style="z-index:10;"><loading/></div>
      <div class="flex-v-center" style="padding: 15px 20px;">
        <div class="flex-item flex-center">
          <div class="tab">
            <div class="tab-item" :class="{'on': $route.name==='works-published'}" @click="onTab('/works')">已发布</div>
            <div class="tab-item" :class="{'on': $route.name==='works-unpublished'}" @click="onTab('/works/unpublished')">未发布</div>
          </div>
        </div>
        <div style="width: 65px;"><btn v-if="$route.name === 'works-published'">发布</btn></div>
      </div>
      <div class="flex-item relative scroll-y">
        <router-view @loading="loading=true" @endLoading="loading=false"></router-view>
      </div>
    </div>
  </div>
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
      channels: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        res.forEach(item => {
          item.name = item.channelName
        })
        this.channels = res
      }).catch(e => {
        this.$toast(e.message)
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
    }
  }
}
</script>

<style lang="less">
.app-work{
  //
}
</style>
