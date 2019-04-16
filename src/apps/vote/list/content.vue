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
            <img v-if="content && content.thumb" :src="content.thumb[0].url" style="margin-left: 5px;height: 50px;">
          </div>
          <div class="art-abstarcts"><strong>[说明]</strong>
            <div v-html="content.content"></div>
          </div>
          <!--<div class="f-14" v-html="article.content"></div>-->

          <div class="art-relate f-14" style="margin-bottom: 20px;">
            <h3 class="b c-8" style="margin-bottom: 10px;margin-top: 0;color: #444;">头图：</h3>
            <div style="margin-top: 10px;">
              <img :src="content.headThumb.url" alt="" style="width: 100%;">
            </div>
          </div>

          <div v-if="content.templateType == 1 && content.templateStyle == 1" style="padding: 20px;border: 1px solid #ddd;border-radius: 10px;">
            <table style="border: 0;">
              <tr class="list" v-for="(item, index) in content.list" style="border: 0;">
                <td style="width: 140px;padding-right: 50px;">{{item.title}}</td>
                <td>
                  <div class="flex" style="align-items: center;">
                    <div class="list_div"><span :style="{width: item.ratio + '%'}"></span></div>
                    <span style="width: 100px;">{{parseInt(item.virtualVotes) + parseInt(item.realVotes)}}</span>
                  </div>
                </td>
                <td style="width: 50px;">{{item.ratio}} %</td>
              </tr>
            </table>
          </div>

          <div v-if="content.templateType == 1 && content.templateStyle == 2" style="padding: 20px;border: 1px solid #ddd;border-radius: 10px;">
            <table style="border: 0;">
              <tr class="list" v-for="(item, index) in content.list" style="border: 0;">
                <td><img style="margin-right: 10px;width: 100px;" :src="item.thumb.url" alt=""></td>
                <td style="width: 140px;">{{item.title}}</td>
                <td>
                  <div class="flex" style="align-items: center;">
                    <div class="list_div"><span :style="{width: item.ratio + '%'}"></span></div>
                    <span style="width: 60px;">{{parseInt(item.virtualVotes) + parseInt(item.realVotes)}}</span>
                  </div>
                </td>
                <td style="width: 50px;">{{item.ratio}} %</td>
              </tr>
            </table>
          </div>

          <div v-if="content.templateType == 2" style="overflow: hidden;">
            <ul style="display: flex;align-items: center;flex-wrap: wrap;">
              <li v-for="(item, index) in content.list" class="list2">
                <img style="margin-bottom: 10px;width: 100%;" :src="item.thumb.url" alt="">
                <p>{{item.title}}</p>
                <p v-if="content.templateStyle == 3" style="height: 90px;text-align: left;border-top: 1px solid #ddd;overflow: hidden;">{{item.description}}</p>
                <p style="border-top: 1px solid #ddd;padding-top: 8px;">{{parseInt(item.virtualVotes) + parseInt(item.realVotes)}} 票</p>
              </li>
            </ul>
          </div>

        </div>
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

export default {
  name: 'app-vote-content',
  props: {
    id: String,
    channels: {
      type: Array,
      default: () => []
    },
    getUrl: {
      type: String,
      default: '/cri-cms-platform/vote/get.monitor'
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
        this.content = res.content || {}
        this.content.content = res.vote.content
        this.content.headThumb = res.vote.headThumb
        this.content.list = res.options
        this.content.templateType = res.vote.templateType
        this.content.templateStyle = res.vote.templateStyle

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
  .list{
    padding: 10px 0;
  }
  .list2{
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box;
    width: calc(25% - 15px);
    text-align: center;
    line-height: 30px;
  }
  .list2:nth-child(4n){
    margin-right: 0;
  }
  .list2 p{
    margin: 0;
  }
  .list span{
    display: block;
  }
  .list_div{
    width: 250px;
    height: 10px;
    border: 1px solid #ddd;
    margin-right: 10px;
  }
  .list_div *{
    overflow: hidden;
  }
  .list_div span{
    height: 100%;
    background: #00a0e9;
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
