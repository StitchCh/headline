<template>
  <div class="flex-item flex-col">
    <div class="flex-item scroll-y">
      <div class="relative article-content c-6">
        <div v-if="!content.id" class="abs flex-center" style="height: 400px;">
          <no-data/>
        </div>
        <div class="art-ctn" v-else>
          <h1 class="b" :style="{ color: content.titleColor }">{{content.title}}</h1>
          <div class="f-14 c-a art-info flex-v-center">
            <span>{{content.createDate}}</span>
            <span>作者：{{content.author}}</span>
            <span>创建者：{{content.createUser}}</span>
            <span class="flex-item"></span>
            <img v-if="content && content.thumb" v-for="item in content.thumb" :key="item.id" :src="item.url" @click="thumbItem.url = item.url;thumbItem.show = true;" style="margin-left: 5px;height: 50px;cursor: pointer;">
          </div>
          <p class="art-abstarcts"><strong>[摘要]</strong>{{content.abstarcts}}</p>
          <div class="f-14" v-html="article.content"></div>
          <div v-if="relateArticle.length" class="art-relate f-14">
            <div class="b c-8" style="margin-bottom: 10px;">相关阅读：</div>
            <ul>
              <li v-for="item in relateArticle" :key="item.id">
                <a class="a c-8" @click="toLink(item)">{{item.title}}</a>
              </li>
            </ul>
          </div>
          <div v-if="relateGallery.id" class="art-relate f-14">
            <div class="b c-8" style="margin-bottom: 10px;">相关图集：</div>
            <ul>
              <li>
                <a class="a c-8">{{relateGallery.title}}</a>
              </li>
            </ul>
            <div v-if="relateGalleryContent.length" style="margin-top: 10px;">
              <swiper :options="swiperOptionTop" class="gallery-top" :style="{ width: gallerySetting.gallerySettingMaxWidth + 'px', height: gallerySetting.gallerySettingMinHeight + 'px' }" ref="swiperTop">
                <swiper-slide v-for="(item, index) in relateGalleryContent" :key="item.url" class="flex-center relative" :style="{ height: gallerySetting.gallerySettingMinHeight + 'px' }">
                  <img :src="item.url" :style="{ 'max-width': gallerySetting.gallerySettingMaxWidth + 'px', 'max-height': gallerySetting.gallerySettingMinHeight + 'px' }">
                  <div class="description">
                    <span style="font-weight: 700;font-size: 20px;margin-right: 20px;">{{index + 1}} / {{relateGalleryContent.length}}</span>
                    <span>{{item.description}}</span>
                  </div>
                </swiper-slide>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              </swiper>
              <!-- swiper2 Thumbs -->
              <swiper :options="swiperOptionThumbs" class="gallery-thumbs" :style="{ width: gallerySetting.gallerySettingMaxWidth + 'px' }" ref="swiperThumbs">
                <swiper-slide v-for="item in relateGalleryContent" :key="item.url" class="flex-center" :style="{ width: gallerySetting.gallerySettingThumbWidth + 'px', height: gallerySetting.gallerySettingThumbHeight + 'px' }">
                  <img :src="item.url" :alt="item.description" :style="{ 'max-width': gallerySetting.gallerySettingThumbWidth + 'px', 'max-height': gallerySetting.gallerySettingThumbHeight + 'px' }">
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <div v-if="relateSpecial.length" class="art-relate f-14">
            <div class="b c-8" style="margin-bottom: 10px;">相关专题：</div>
            <ul>
              <li v-for="item in relateArticle" :key="item.id">
                <a class="a c-8">{{item.title}}</a>
              </li>
            </ul>
          </div>
          <div v-if="attachments.length" class="art-relate art-attachments f-14">
            <div class="b c-8" style="margin-bottom: 10px;">附件下载：</div>
            <ul>
              <li v-for="item in attachments" :key="item.id">
                <a class="a c-8 flex-v-center" :href="item.url" target="_blank" :download="item.alias">{{item.alias}}<span class="flex-item"></span>{{item.size | filesize}}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalPc }">computer</i>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalApp }">phone_iphone</i>
        <i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalWeb }">public</i>
      </div>
    </div>
    <transition name="fade">
      <div v-if="thumbItem.show" class="art-thumb-cover scroll-y" @click="thumbItem.show = false">
        <div class="flex-center" style="min-height: 100%;">
          <img :src="thumbItem.url" @click.stop>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'app-article-content',
  components: { swiper, swiperSlide },
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    },
    getUrl: {
      type: String,
      default: '/cri-cms-platform/special/get.monitor'
    }
  },
  data () {
    return {
      content: {},
      article: {},
      channelIds: '',
      relateArticle: [],
      relateGallery: {},
      relateGalleryContent: [],
      gallerySetting: {
        gallerySettingDisplayPosition: '1',
        gallerySettingMaxWidth: '640',
        gallerySettingMinHeight: '480',
        gallerySettingThumbWidth: '80',
        gallerySettingThumbHeight: '60'
      },
      relateSpecial: [],
      attachments: [],
      thumbItem: {
        show: false,
        url: ''
      },
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  computed: {
    channelNames () {
      if (!this.channelIds) return []
      return this.channelIds.split(',').map(v => this.getChannel(v))
    }
  },
  created () {
    this.getArticle()
  },
  watch: {
    id () {
      this.getArticle()
    }
  },
  methods: {
    getArticle () {
      this.$http.post(this.getUrl, {
        id: this.id
      }).then(res => {
        this.content = res.content || {}
        this.article = res.article || {}
        this.relateArticle = res.relateArticle || []
        this.channelIds = res.channelIds || ''
        this.relateArticle = res.relateArticle || []
        this.relateGallery = res.relateGallery || {}
        this.relateGalleryContent = res.relateGalleryContent || []
        this.swiperOptionTop.loopedSlides = this.swiperOptionThumbs.loopedSlides = this.relateGalleryContent.length
        this.gallerySetting.gallerySettingDisplayPosition = res.gallerySettingDisplayPosition || '1'
        this.gallerySetting.gallerySettingMaxWidth = res.gallerySettingMaxWidth || '640'
        this.gallerySetting.gallerySettingMinHeight = res.gallerySettingMinHeight || '480'
        this.gallerySetting.gallerySettingThumbWidth = res.gallerySettingThumbWidth || '80'
        this.gallerySetting.gallerySettingThumbHeight = res.gallerySettingThumbHeight || '60'
        this.relateSpecial = res.relateSpecial || {}
        this.attachments = res.attachments || []
        if (this.relateGalleryContent.length) {
          this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper
            const swiperThumbs = this.$refs.swiperThumbs.swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
          })
        }
      }).catch(e => {
        this.content = {}
        this.article = {}
        this.relateArticle = []
        this.channelIds = ''
        this.relateArticle = []
        this.relateGallery = {}
        this.relateSpecial = {}
        this.attachments = []
      })
    },
    toLink (item) {
      this.$router.push({
        path: `/special/list/${item.id}`,
        query: this.$route.query
      })
    },
    getChannel (id) {
      let channel = this.channels.find(v => v.id === id)
      return channel ? channel.channelName : ''
    }
  }
}
</script>

<style lang="less">
.article-content{
  h1{line-height: 1.3em;font-size: 26px;}
  .art-ctn{max-width: 900px;margin: 0 auto;padding: 30px;}
  .art-info {height: 50px;
    span{margin-right: 15px;}
  }
  .art-abstarcts {padding: 10px 20px;font-size: 14px;background: #f3f3f3;border-radius: 8px;}
  .art-relate{margin-top: 20px;border: 1px solid #ddd;padding: 10px 20px;border-radius: 8px;
    li{padding: 2px 0;}
    a{text-decoration: none;}
    a:hover{text-decoration: underline;}
    &.art-attachments {
      li a{padding: 8px 10px;}
      li:hover a {background: #eee;color: #008eff;}
      a {text-decoration: none;}
    }
  }
  .gallery-top {
    .description{position: absolute;bottom: 0;width: 100%;background: rgba(255, 255, 255, .8);box-sizing: border-box;padding: 20px;opacity: 0;transition: opacity .3s}
    .swiper-slide:hover .description{opacity: 1;}
  }
  .gallery-thumbs {box-sizing: border-box;padding: 10px 0;border-top: 1px solid #e1e1e1}
  .gallery-thumbs .swiper-slide {opacity: 0.4;cursor: pointer;}
  .gallery-thumbs .swiper-slide-active {opacity: 1;}
}
.art-thumb-cover {position: fixed;left: 0;right: 0;top: 0;bottom: 0;background: rgba(0, 0, 0, .7);z-index: 99;text-align: center;
  img {max-width: 900px;margin: 50px auto;}
}
</style>
