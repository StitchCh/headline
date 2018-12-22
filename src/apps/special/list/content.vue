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
            <!--<span>{{content.createDate}}</span>-->
            <!--<span>作者：{{content.author}}</span>-->
            <!--<span>创建者：{{content.createUser}}</span>-->
            <!--<span class="flex-item"></span>-->
            <img v-if="content && content.thumb" :src="content.thumb[0].url" style="margin-left: 5px;height: 50px;">
          </div>
          <p class="art-abstarcts"><strong>[摘要]</strong>{{content.abstarcts}}</p>
          <!--<div class="f-14" v-html="article.content"></div>-->

          <div class="art-relate f-14">
            <h3 class="b c-8" style="margin-bottom: 10px;margin-top: 0;color: #444;">头图：</h3>
            <div v-if="headJson.length" style="margin-top: 10px;">
              <swiper :options="swiperOptionTop" class="gallery-top" :style="{ width: gallerySetting.gallerySettingMaxWidth + 'px', height: gallerySetting.gallerySettingMinHeight + 'px' }" ref="swiperTop">
                <swiper-slide v-for="(item, index) in headJson" :key="index" class="flex-center relative" :style="{ height: gallerySetting.gallerySettingMinHeight + 'px' }">
                  <img :src="item.thumb" :style="{ 'width': gallerySetting.gallerySettingMaxWidth + 'px', 'height': gallerySetting.gallerySettingMinHeight + 'px' }">
                  <div class="description">
                    <span style="font-weight: 700;font-size: 20px;margin-right: 20px;">{{index + 1}} / {{headJson.length}}</span>
                    <span>{{item.title}}</span>
                  </div>
                </swiper-slide>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              </swiper>
              <!-- swiper2 Thumbs -->
              <!--<swiper :options="swiperOptionThumbs" class="gallery-thumbs" :style="{ width: gallerySetting.gallerySettingMaxWidth + 'px' }" ref="swiperThumbs">-->
                <!--<swiper-slide v-for="item in headJson" :key="item.thumb" class="flex-center" :style="{ width: gallerySetting.gallerySettingThumbWidth + 'px', height: gallerySetting.gallerySettingThumbHeight + 'px' }">-->
                  <!--<img :src="item.thumb" :alt="item.description" :style="{ 'max-width': gallerySetting.gallerySettingThumbWidth + 'px', 'max-height': gallerySetting.gallerySettingThumbHeight + 'px' }">-->
                <!--</swiper-slide>-->
              <!--</swiper>-->
            </div>
          </div>

          <div v-if="specialListJson.length" v-for="item in specialListJson">
            <h3 v-if="content.listType == 1" style="line-height: 40px;background: #eee;padding-left: 10px;color: #444;">{{item.templateName}}</h3>
            <h3 v-if="content.listType == 2" style="line-height: 40px;background: #eee;padding-left: 10px;color: #444;">{{item.orderDate}}</h3>
            <div class="art-relate f-14"  v-for="item1 in item.templateContentListList" style="overflow: hidden">
              <div style="float: left">
                <img :src="item1.thumb" style="width: 200px;height: 112px;" alt="">
              </div>
              <div style="width: calc(100% - 220px); float: right;">
                <p style="text-align: left;height: 22px;overflow: hidden;">{{item1.title}}</p>
                <p style="height: 44px;overflow: hidden;">{{item1.abstarcts}}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <!--<div class="af-bottombar c-6 f-14">-->
      <!--<div v-if="channelIds" style="padding: 0 15px;">-->
        <!--<span v-for="(channel, index) in channelNames" :key="index" v-tooltip:top="'频道：' + channel">{{index !== 0 ? '，' : ''}}{{channel}}</span>-->
      <!--</div>-->
      <!--<div v-if="content.keywords" style="padding: 0 15px;">-->
        <!--<span v-for="(keyword, index) in content.keywords.split(',')" :key="index" v-tooltip:top="'关键词：' + keyword">{{index !== 0 ? '，' : ''}}{{keyword}}</span>-->
      <!--</div>-->
      <!--<div v-if="content.originalFrom" style="padding: 0 15px;">-->
        <!--<span v-tooltip:top="'来源：' + content.originalFrom">{{content.originalFrom}}</span>-->
      <!--</div>-->
      <!--<div v-if="content.author" style="padding: 0 15px;">-->
        <!--<span v-tooltip:top="'作者：' + content.author">{{content.author}}</span>-->
      <!--</div>-->
      <!--<div class="flex-item"></div>-->
      <!--<div>-->
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.isRecommnd }">thumb_up</i>-->
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalPc }">computer</i>-->
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalApp }">phone_iphone</i>-->
        <!--<i class="icon f-14 tg-icon c-a" :class="{ active: ~~content.terminalWeb }">public</i>-->
      <!--</div>-->
    <!--</div>-->
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
      default: '/cri-cms-platform/special/queryDetail.monitor'
    }
  },
  data () {
    return {
      showid: '',
      getif: false,
      content: {},
      article: {},
      channelIds: '',
      specialListJson: [],
      relateGallery: {},
      headJson: [],
      gallerySetting: {
        gallerySettingDisplayPosition: '1',
        gallerySettingMaxWidth: '640',
        gallerySettingMinHeight: '380',
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
        console.log(res)
        this.content = res.special || {}
        this.content.thumb = JSON.parse(res.special.thumb)
        // this.article = res.article || {}
        this.specialListJson = JSON.parse(res.special.specialListJson) || []
        // this.channelIds = res.channelIds || ''
        // this.relateArticle = res.relateArticle || []
        // this.relateGallery = res.relateGallery || {}
        this.headJson = JSON.parse(res.special.headJson) || []
        // this.swiperOptionTop.loopedSlides = this.swiperOptionThumbs.loopedSlides = this.relateGalleryContent.length
        // this.gallerySetting.gallerySettingDisplayPosition = res.gallerySettingDisplayPosition || '1'
        // this.gallerySetting.gallerySettingMaxWidth = res.gallerySettingMaxWidth || '640'
        // this.gallerySetting.gallerySettingMinHeight = res.gallerySettingMinHeight || '480'
        // this.gallerySetting.gallerySettingThumbWidth = res.gallerySettingThumbWidth || '80'
        // this.gallerySetting.gallerySettingThumbHeight = res.gallerySettingThumbHeight || '60'
        // this.relateSpecial = res.relateSpecial || {}
        // this.attachments = res.attachments || []
        // if (this.relateGalleryContent.length) {
        //   this.$nextTick(() => {
        //     const swiperTop = this.$refs.swiperTop.swiper
        //     const swiperThumbs = this.$refs.swiperThumbs.swiper
        //     swiperTop.controller.control = swiperThumbs
        //     swiperThumbs.controller.control = swiperTop
        //   })
        // }
        this.getif = true
      }).catch(e => {
        this.getif = true
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
