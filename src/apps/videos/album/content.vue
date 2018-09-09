<template>
  <div class="flex-item flex-col">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex-item flex-center">
        <loading></loading>
      </div>
      <div v-else class="flex-item scroll-y">
        <div class="relative album-content c-6">
          <div v-if="!album || !album.id" class="abs flex-center" style="height: 400px;">
            <no-data/>
          </div>
          <div v-else class="album-ctn">
            <h1 class="b">{{album.title}}</h1>
            <div class="f-14 c-a album-info flex-v-center">
              <span>{{album.createDate}}</span>
              <!--<span>作者：{{content.author}}</span>-->
              <!--<span>创建者：{{content.createUser}}</span>-->
              <span class="flex-item"></span>
              <img v-if="album && album.thumb" v-for="item in content.thumb" :key="item.id" :src="item.url" @click="thumbItem.url = item.url;thumbItem.show = true;" style="margin-left: 5px;height: 50px;cursor: pointer;">
            </div>
            <p class="album-abstarcts"><strong>[摘要]</strong>{{album.videoAbstract}}</p>
            <ul class="list-view">
              <li v-for="item in content" :key="item.id" class="list-item c-6 f-14 a flex-v-center" @click="$router.push(`/video/list/${item.id}?scope=all&status=all`)">
                <div class="list-thumb flex-center">
                  <img v-if="item.thumb.length" :src="item.thumb[0].url" alt="">
                </div>
                <div class="flex-item">
                  <div class="b" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis">{{item.title}}</div>
                  <div class="c-8 f-12" style="white-space: nowrap;overflow:hidden;text-overflow:ellipsis;margin-top: 10px;">{{item.abstarcts}}</div>
                  <div class="c-8 f-12 flex-v-center" style="margin-top: 10px;">
                    <span v-tooltip:top="'阅读'">{{item.pv}}</span>/<span v-tooltip:top="'评论'">{{item.commentCount}}</span>/<span v-tooltip:top="'分享'">{{item.shareCount}}</span>/<span v-tooltip:top="'点赞'">{{item.diggCount}}</span>
                    <span class="flex-item"></span>
                    <span style="margin-right: 15px;">作者：{{item.author}}</span>
                    <span style="margin-right: 15px;">创建者：{{item.createUser}}</span>
                    <span>{{item.createDate}}</span>
                  </div>
                </div>
              </li>
              <li></li>
              <!--<video-player class="vjs-custom-skin"-->
                            <!--ref="videoPlayer"-->
                            <!--:options="playerOptions"-->
                            <!--:playsinline="true"></video-player>-->
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'album-content',
  components: { videoPlayer },
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: true,
      album: {},
      content: []
    }
  },
  methods: {
    getAlbum () {
      this.loading = true
      this.$http.post('/cri-cms-platform/video/albumGet.monitor', {
        id: this.id
      }).then(
        res => {
          console.log(res)
          this.album = res.album || {}
          this.content = res.content || []
          this.loading = false
        }
      )
    }
  },
  created () {
    this.getAlbum()
  },
  watch: {
    id () {
      this.getAlbum()
    }
  }
}
</script>

<style lang="less">
  .album-content {
    .album-ctn {max-width: 900px;margin: 0 auto;padding: 30px;}
    h1{line-height: 1.3em;font-size: 26px;}
    .album-info {height: 50px;
      span{margin-right: 15px;}
    }
    .album-abstarcts {padding: 10px 20px;font-size: 14px;background: #f3f3f3;border-radius: 8px;}
    .list-item .list-thumb{width: 100px;height: 75px;margin-right: 15px;}
  }
  .album-thumb-cover {position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0, 0, 0, .7);z-index: 99;text-align: center;
    img {max-width: 900px;margin: 50px auto;}
  }
</style>
