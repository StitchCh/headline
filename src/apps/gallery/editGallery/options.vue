<template>
  <div class="gallery-options c-4 scroll-y">
    <div style="width: 280px;margin: 0 20px;">
      <div class="option-item flex-v-center relative a" @click="ui.channelShow=!ui.channelShow">
        <span class="flex-item">{{channelNames}}</span>
        <i class="icon f-20 c-a">keyboard_arrow_down</i>
        <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
          <div style="padding: 10px 0;width: 280px;">
            <tree :data="ui.channels" pid-txt="channelPartentId" nameTxt="channelName" show-checkbox :checked-list.sync="channelIds"></tree>
          </div>
        </bubble>
      </div>
      <div class="option-item flex-v-center">
        <icon-btn small v-tooltip:top="'推荐'" :class="{ active: form.isRecommnd }" @click="form.isRecommnd = ~~!form.isRecommnd">thumb_up</icon-btn>
        <span class="flex-item"></span>
        <icon-btn small v-tooltip:top="'发布到 PC 页面'" :class="{ active: form.terminalPc }" @click="form.terminalPc = ~~!form.terminalPc">computer</icon-btn>
        <icon-btn small v-tooltip:top="'发布到客户端'" :class="{ active: form.terminalApp }" @click="form.terminalApp = ~~!form.terminalApp">phone_iphone</icon-btn>
        <icon-btn small v-tooltip:top="'发布到移动网页'" :class="{ active: form.terminalWeb }" @click="form.terminalWeb = ~~!form.terminalWeb">public</icon-btn>
      </div>
      <div style="margin: 10px 0;">
        <add-thumb scale v-model="thumb.thumb1" height="160px" style="margin-bottom: 8px;"/>
        <div v-if="form.thumbType == 2" class="flex">
          <add-thumb scale v-model="thumb.thumb2" height="80px" class="flex-item" style="margin-right: 8px;"/>
          <add-thumb scale v-model="thumb.thumb3" height="80px" class="flex-item"/>
        </div>
        <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <!-- <div class="flex-item"><radio-box text="默认" :label="1" v-model="form.thumbType"/></div> -->
          <!-- <div class="flex-item"><radio-box text="三图" :label="2" v-model="form.thumbType"/></div> -->
          <!-- <div><radio-box text="16:9 大图" style="margin: 0;" :label="3" v-model="form.thumbType"/></div> -->
        </div>
      </div>
      <div class="option-item relative">
        <textarea placeholder="摘要，限制 128 字。" v-model="form.abstarcts" rows="8"></textarea>
        <span style="position: absolute;bottom: 3px;right: 0;" :style="{ color: form.abstarcts.length > 128 ? '#F44336' : '#999' }">{{form.abstarcts.length}} / 128</span>
      </div>
      <div class="option-item">
        <input type="text" placeholder="关键词，逗号分隔。" v-model="form.keywords"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item">©原创声明</span>
        <switcher mode="Number" v-model="form.isOriginal"/>
      </div>
      <div class="option-item flex" v-if="!form.isOriginal">
        <input type="text" class="flex-item" placeholder="来源名称" v-model="form.originalFrom">
        <input type="text" class="flex-item" placeholder="来源URL" v-model="form.originalUrl">
      </div>
      <div class="option-item">
        <input type="text" placeholder="作者，逗号分隔" v-model="form.author">
      </div>
      <div class="option-item flex-v-center" v-if="form.createDate !== undefined">
        <div class="flex-item">创建时间</div>
        <div class="relative flex-v-center a">
          <span v-if="!form.createDate" class="flex-v-center" style="position: absolute;right: 0;">
            <span>设置</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.createDate"></vue-datepicker-local>
        </div>
      </div>

      <!-- <div class="option-item flex-v-center">
        <span class="flex-item">水印</span>
        <switcher mode="Number" v-model="form.isWatermarked"/>
      </div> -->

      <div class="option-item flex-v-center">
        <span>初始阅读量</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualPv">
      </div>
      <div class="option-item flex-v-center">
        <span>初始分享量</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualShare">
      </div>
      <div class="option-item flex-v-center">
        <span>初始点赞量</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualDigg">
      </div>
      <div class="option-item">
        <div class="flex-v-center">
          <span class="flex-item">开启评论</span>
          <switcher mode="Number" v-model="form.isOpenComment"/>
        </div>
        <add-comment v-if="form.isOpenComment" v-model="form.virtualComment"/>
      </div>
      <!--<add-relates single :channels="ui.channels" v-model="form.galleryId" title="相关图集" icon="collections" url="/cri-cms-platform/article/associate/gallery.monitor">-->
        <!--<template slot="afterTitle">-->
          <!--<span class="flex-item"></span>-->
          <!--<i class="add-gallery-setting-btn icon c-8" @click.stop="ui.gallerySettingShow = true">settings</i>-->
        <!--</template>-->
        <!--<layer v-if="ui.gallerySettingShow" :title="'图集设置'" width="800px" mask-click @close="ui.gallerySettingShow = false">-->
          <!--<div class="layer-text add-gallery-setting">-->
            <!--<ul>-->
              <!--<li><div class="flex-v-center">组图最大宽度 <span class="flex-item"></span><input type="number" placeholder="请输入" v-model="form.gallerySettingMaxWidth"></div></li>-->
              <!--<li><div class="flex-v-center">组图最小高度 <span class="flex-item"></span><input type="number" placeholder="请输入" v-model="form.gallerySettingMinHeight"></div></li>-->
              <!--<li><div class="flex-v-center">缩略图宽度 <span class="flex-item"></span><input type="number" placeholder="请输入" v-model="form.gallerySettingThumbWidth"></div></li>-->
              <!--<li><div class="flex-v-center">缩略图高度 <span class="flex-item"></span><input type="number" placeholder="请输入" v-model="form.gallerySettingThumbHeight"></div></li>-->
              <!--<li><div class="flex-v-center">显示位置 <span class="flex-item"></span><span class="a" @click="ui.gallerySettingDisplayPositionShow = true">{{form.gallerySettingDisplayPosition | gallerySettingDisplayPosition}}<i class="icon">keyboard_arrow_right</i></span></div></li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<select-card :value="form.gallerySettingDisplayPosition" v-if="ui.gallerySettingDisplayPositionShow" title="显示位置" width="600px" maskClick @close="ui.gallerySettingDisplayPositionShow = false">-->
            <!--<select-card-option value="1" @click="form.gallerySettingDisplayPosition = '1';ui.gallerySettingDisplayPositionShow = false">正文正上方</select-card-option>-->
            <!--<select-card-option value="2" @click="form.gallerySettingDisplayPosition = '2';ui.gallerySettingDisplayPositionShow = false">正文正下方</select-card-option>-->
          <!--</select-card>-->
        <!--</layer>-->
      <!--</add-relates>-->
      <add-relates :channels="ui.channels" v-model="form.relateIds" title="相关图集" icon="collections" url="/cri-cms-platform/article/associate/gallery.monitor"></add-relates>
      <!--<add-relates single :channels="ui.channels" v-model="form.specialId" title="相关专题" icon="assignment" url="/cri-cms-platform/article/associate/special.monitor"></add-relates>-->
      <!--<add-attachment v-model="form.attachmentIds" :default-list="attachmentDefaultList"></add-attachment>-->
    </div>
  </div>
</template>

<script>
import VueDatepickerLocal from 'vue-datepicker-local'
import AddComment from '@/components/comment'
import AddRelates from '@/components/relates'
import AddAttachment from '@/components/attachment'
import AddThumb from '@/components/thumb'

export default {
  name: 'app-gallery-edit-option',
  components: { VueDatepickerLocal, AddComment, AddRelates, AddAttachment, AddThumb },
  props: [ 'res' ],
  data () {
    return {
      ui: {
        channelShow: false,
        channels: []
        // gallerySettingShow: false,
        // gallerySettingDisplayPositionShow: false
      },
      form: {
        app: 'GALLERY',
        channelIds: '',
        // galleryId: '',
        // gallerySettingMaxWidth: '640',
        // gallerySettingMinHeight: '480',
        // gallerySettingThumbWidth: '80',
        // gallerySettingThumbHeight: '60',
        // gallerySettingDisplayPosition: '1',
        relateIds: '',
        // specialId: '',
        isOpenComment: 0,
        isOriginal: 0,
        originalFrom: '',
        originalUrl: '',
        isRecommnd: 0,
        abstarcts: '',
        keywords: '',
        author: '',
        isWatermarked: 0,
        virtualPv: '',
        virtualComment: '',
        virtualShare: '',
        virtualDigg: '',
        hasThumb: 0,
        thumbType: 2,
        thumb: '',
        terminalPc: 0,
        terminalApp: 0,
        terminalWeb: 0
        // attachmentIds: ''
      },
      thumb: {
        thumb1: null,
        thumb2: null,
        thumb3: null
      }
      // attachmentDefaultList: [],
      // addCommentShow: false
    }
  },
  computed: {
    channelIds: {
      get () {
        return this.form.channelIds === '' ? [] : this.form.channelIds.split(',')
      },
      set (newValue) {
        this.form.channelIds = newValue.join(',')
      }
    },
    channelNames () {
      if (!this.channelIds.length) return '选择栏目'
      if (!this.ui.channels.length) return '选择栏目'
      return this.channelIds.map(val => this.ui.channels.find(v => v.id === val).channelName).join('，')
    }
  },
  methods: {
    getChannels () {
      this.$http.post('/cri-cms-platform/gallery/getChannels.monitor').then(res => {
        this.ui.channels = res || []
      }).catch(e => {
        console.log(e)
      })
    }
  },
  created () {
    this.getChannels()
    if (this.res) {
      let { form, res } = this
      console.log(res)
      for (let k in this.form) {
        if (k === 'virtualComment') {
          if (res.content[k] === '') {
            form[k] = ''
          } else {
            form[k] = JSON.stringify(res.content[k])
          }
          continue
        }
        if (k === 'thumb') {
          console.log('a')
          this.thumb.thumb1 = res.content.thumb[0]
          this.thumb.thumb2 = res.content.thumb[1]
          this.thumb.thumb3 = res.content.thumb[2]
        }
        if (k === 'isDelete' || k === 'isOpenComment' || k === 'isOriginal' || k === 'isRecommnd' || k === 'isWatermarked' || k === 'terminalApp' || k === 'terminalPc' || k === 'terminalWeb' || k === 'hasThumb') {
          this.form[k] = Number(res.content[k])
          continue
        }
        this.form[k] = res.content[k]
      }
      this.form.createDate = res.content.createDate
      this.form.channelIds = res.channelIds || ''
      this.form.relateIds = res.relateGallery.map(v => v.id).join(',')

      // this.form.specialId = res.relateSpecial.id || ''
      // this.attachmentDefaultList = res.attachments
      // this.form.gallerySettingDisplayPosition = res.gallerySettingDisplayPosition || '1'
      // this.form.gallerySettingMaxWidth = res.gallerySettingMaxWidth || '640'
      // this.form.gallerySettingMinHeight = res.gallerySettingMinHeight || '480'
      // this.form.gallerySettingThumbHeight = res.gallerySettingThumbHeight || '80'
      // this.form.gallerySettingThumbWidth = res.gallerySettingThumbWidth || '60'
    }
  },
  watch: {
    'thumb.thumb1' (newValue) {
      if (this.form.thumbType === 2) {
        if (!(newValue || this.thumb.thumb2 || this.thumb.thumb3)) {
          this.form.hasThumb = 0
          this.form.thumb = ''
        } else {
          this.form.hasThumb = 1
          this.form.thumb = [ newValue, this.thumb.thumb2, this.thumb.thumb3 ].filter(v => v).map(v => v.id).join(',')
        }
      } else {
        if (!newValue) {
          this.form.hasThumb = 0
          this.form.thumb = ''
        } else {
          this.form.hasThumb = 1
          this.form.thumb = newValue.id
        }
      }
    },
    'thumb.thumb2' (newValue) {
      if (!(this.thumb.thumb1 || newValue || this.thumb.thumb3)) {
        this.form.hasThumb = 0
        this.form.thumb = ''
      } else {
        this.form.hasThumb = 1
        this.form.thumb = [ this.thumb.thumb1, newValue, this.thumb.thumb3 ].filter(v => v).map(v => v.id).join(',')
      }
    },
    'thumb.thumb3' (newValue) {
      if (!(this.thumb.thumb1 || this.thumb.thumb2 || newValue)) {
        this.form.hasThumb = 0
        this.form.thumb = ''
      } else {
        this.form.hasThumb = 1
        this.form.thumb = [ this.thumb.thumb1, this.thumb.thumb2, newValue ].filter(v => v).map(v => v.id).join(',')
      }
    },
    // 'form.thumbType' (newValue) {
    //   if (newValue === 2) {
    //     if (!(this.thumb.thumb1 || this.thumb.thumb2 || this.thumb.thumb3)) {
    //       this.form.hasThumb = 0
    //       this.form.thumb = ''
    //     } else {
    //       this.form.hasThumb = 1
    //       this.form.thumb = [ this.thumb.thumb1, this.thumb.thumb2, this.thumb.thumb3 ].filter(v => v).map(v => v.id).join(',')
    //     }
    //   } else {
    //     if (!this.thumb.thumb1) {
    //       this.form.hasThumb = 0
    //       this.form.thumb = ''
    //     } else {
    //       this.form.hasThumb = 1
    //       this.form.thumb = this.thumb.thumb1.id
    //     }
    //   }
    //   console.log('4', this.form.thumb)
    // }
  }
}
</script>

<style>

</style>
