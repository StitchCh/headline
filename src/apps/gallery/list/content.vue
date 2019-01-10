<template>
  <div class="flex-item flex-col">
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="flex-item flex-center">
        <loading></loading>
      </div>
      <div v-else class="flex-item scroll-y">
        <div class="relative gallery-content c-6">
          <div v-if="!content || !content.id" class="abs flex-center" style="height: 400px;">
            <no-data/>
          </div>
          <div v-else class="ctn">
            <h1 class="b" :style="{ color: content.titleColor }">{{content.title}}</h1>
            <div class="f-14 c-a info flex-v-center">
              <span>{{content.createDate}}</span>
              <span>作者：{{content.author}}</span>
              <span>创建者：{{content.createUser}}</span>
              <span class="flex-item"></span>
              <img v-if="content && content.thumb" v-for="item in content.thumb" :key="item.id" :src="item.url" @click="thumbItem.url = item.url;thumbItem.show = true;" style="margin-left: 5px;height: 50px;cursor: pointer;">
            </div>
            <p class="abstarcts"><strong>[摘要]</strong>{{content.abstarcts}}</p>
            <div class="flex">
              <div class="flex-item column">
                <div class="gallery-item relative" v-for="item in column1" :key="item.id">
                  <div class="bg-e">
                    <img :src="item.url">
                  </div>
                  <div class="description" v-if="item.description">{{item.description}}</div>
                </div>
              </div>
              <div class="flex-item column">
                <div class="gallery-item relative" v-for="item in column2" :key="item.id">
                  <div class="bg-e">
                    <img :src="item.url">
                  </div>
                  <div class="description" v-if="item.description">{{item.description}}</div>
                </div>
              </div>
              <div class="flex-item column">
                <div class="gallery-item relative" v-for="item in column3" :key="item.id">
                  <div class="bg-e">
                    <img :src="item.url">
                  </div>
                  <div class="description" v-if="item.description">{{item.description}}</div>
                </div>
              </div>
            </div>

            <div v-if="relateGallery.length" class="relate f-14">
              <div class="b c-8" style="margin-bottom: 10px;">相关图集：</div>
              <ul>
                <li v-for="item in relateGallery" :key="item.id">
                  <a class="a c-8" @click="toLink(item)">{{item.title}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="af-bottombar c-6 f-14">
      <div v-if="channelIds" style="padding: 0 15px;">
        <span v-for="(channel, index) in channelNames" :key="index" v-tooltip:top="'频道：' + channel">{{index !== 0 ? '，' : ''}}{{channel}}</span>
      </div>
      <div v-if="content.keywords" style="padding: 0 15px;">
        <span v-for="(keyword, index) in content.keywords.split(',')" :key="index" v-tooltip:top="'关键词：' + keyword">{{index !== 0 ? '，' : ''}}{{keyword}}</span>
      </div>
      <div v-if="content.originalFrom" style="padding: 0 15px;">
        <span v-tooltip:top="'来源：' + content.originalFrom">{{content.originalFrom}}</span>
      </div>
      <div v-if="content.author" style="padding: 0 15px;">
        <span v-tooltip:top="'作者：' + content.author">{{content.author}}</span>
      </div>
      <div class="flex-item"></div>
      <div>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.isRecommnd }">thumb_up</i>
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalPc }">computer</i>-->
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalApp }">phone_iphone</i>-->
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalWeb }">public</i>-->
      </div>
    </div>

    <transition name="fade">
      <div v-if="thumbItem.show" class="thumb-cover scroll-y" @click="thumbItem.show = false">
        <div class="flex-center" style="min-height: 100%;">
          <img :src="thumbItem.url" @click.stop>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app-gallery-content',
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    },
    getUrl: {
      type: String,
      default: '/cri-cms-platform/gallery/get.monitor'
    }
  },
  data () {
    return {
      content: {},
      gallery: {},
      relateGallery: [],
      channelIds: '',
      thumbItem: {
        show: false,
        url: ''
      },
      loading: false
    }
  },
  computed: {
    channelNames () {
      if (!this.channelIds) return []
      return this.channelIds.split(',').map(v => this.getChannel(v))
    },
    column1 () {
      if (this.gallery.content) {
        return this.gallery.content.filter((v, i) => i % 3 === 0)
      }
      return []
    },
    column2 () {
      if (this.gallery.content) {
        return this.gallery.content.filter((v, i) => i % 3 === 1)
      }
      return []
    },
    column3 () {
      if (this.gallery.content) {
        return this.gallery.content.filter((v, i) => i % 3 === 2)
      }
      return []
    }
  },
  methods: {
    getGallery () {
      this.loading = true
      this.$http.post(this.getUrl, {
        id: this.id
      }).then(
        res => {
          this.content = res.content || {}
          if (res.gallery) {
            this.gallery = res.gallery
          }
          this.relateGallery = res.relateGallery || []
          this.channelIds = res.channelIds || ''
          this.loading = false
        }
      ).catch(console.log)
    },
    getChannel (id) {
      let channel = this.channels.find(v => v.id === id)
      return channel ? channel.channelName : ''
    }
  },
  created () {
    this.getGallery()
  },
  watch: {
    id () {
      this.getGallery()
    }
  }
}
</script>

<style lang="less">
.gallery-content {
  .ctn {max-width: 900px;margin: 0 auto;padding: 30px;}
  h1{line-height: 1.3em;font-size: 26px;}
  .info {height: 50px;
    span{margin-right: 15px;}
  }
  .abstarcts {padding: 10px 20px;font-size: 14px;background: #f3f3f3;border-radius: 8px;}
  .relate{margin-top: 20px;border: 1px solid #ddd;padding: 10px 20px;border-radius: 8px;
    li{padding: 2px 0;}
    a{text-decoration: none;}
    a:hover{text-decoration: underline;}
  }
  .column+.column {margin-left: 12px;}
  .gallery-item {margin-bottom: 12px;width: 100%;border: 1px solid #eee;
    img {width: 100%;}
    .description {padding: 8px;font-size: 14px;}
  }
}
.thumb-cover {position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0, 0, 0, .7);z-index: 99;text-align: center;
  img {max-width: 900px;margin: 50px auto;}
}
</style>
