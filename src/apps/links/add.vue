<template>
<div class="abs bg-f flex c-6 f-14 app-article-add">
  <template v-if="!ui.loading">
  <div class="flex-item flex-col">
    <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
      <div class="a flex-v-center" @click="beforeClose">
        <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
        <span class="f-18">返回</span>
      </div>
      <div class="flex-item"></div>
      <div class="flex-v-center">
        <!--<btn big flat style="margin-right: 15px;">递交审核</btn>-->
        <!-- <btn big flat style="margin-right: 10px;">预览</btn> -->
        <btn big flat style="margin-right: 10px;" @click="autoSave">保存草稿</btn>
        <btn big style="margin-right: 20px;" @click="submit">保存</btn>
        <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <article-editor @changeTitle="(data) => { form.keywords = data }" :flink="linkdata" ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>
    </div>
  </div>
  <div class="art-options c-4 scroll-y" :style="{width: ui.optionShow ? '320px' : '0px'}">
    <div style="width: 280px;margin: 0 20px;">
      <div v-if="getend" class="option-item flex-v-center relative a" @click="ui.channelShow=!ui.channelShow">
        <span class="flex-item">{{channelNames}}</span>
        <i class="icon f-20 c-a">keyboard_arrow_down</i>
        <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
          <!--<ul class="bubble-list">-->
            <!--<li v-for="item in ui.channels.channels" :key="item.id">-->
              <!--<check-box :text="item.channelName" :label="item.id" v-model="channelIds"/>-->
            <!--</li>-->
          <!--</ul>-->
          <div style="padding: 10px 0;width: 280px;">
            <tree :data="ui.channels" pid-txt="channelPartentId" nameTxt="channelName" show-checkbox :checked-list.sync="channelIds"></tree>
          </div>
        </bubble>
      </div>
      <div class="option-item flex-v-center">
        <icon-btn small v-tooltip:top="'推荐'" :class="{ active: form.isRecommnd }" @click="form.isRecommnd = ~~!form.isRecommnd">thumb_up</icon-btn>
        <span class="flex-item"></span>
        <!--<icon-btn small v-tooltip:top="'发布到 PC 页面'" :class="{ active: form.terminalPc }" @click="form.terminalPc = ~~!form.terminalPc">computer</icon-btn>-->
        <!--<icon-btn small v-tooltip:top="'发布到客户端'" :class="{ active: form.terminalApp }" @click="form.terminalApp = ~~!form.terminalApp">phone_iphone</icon-btn>-->
        <!--<icon-btn small v-tooltip:top="'发布到移动网页'" :class="{ active: form.terminalWeb }" @click="form.terminalWeb = ~~!form.terminalWeb">public</icon-btn>-->
      <!---->
      </div>
      <div v-show="form.wide == 0" style="margin: 10px 0;">
        <app-article-add-thumb scale v-model="thumb.thumb1" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
        <!-- <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <div class="flex-item"><radio-box text="默认" :label="1" v-model="form.thumbType"/></div>
          <div class="flex-item"><radio-box text="三图" :label="2" v-model="form.thumbType"/></div>
          <div><radio-box text="16:10 大图" style="margin: 0;" :label="3" v-model="form.thumbType"/></div>
        </div> -->
      </div>
      <div v-show="form.wide == 1" style="margin: 10px 0;">
        <app-article-add-thumb sle="10:2" v-model="thumb.thumb1" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
        <!-- <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <div class="flex-item"><radio-box text="默认" :label="1" v-model="form.thumbType"/></div>
          <div class="flex-item"><radio-box text="三图" :label="2" v-model="form.thumbType"/></div>
          <div><radio-box text="16:10 大图" style="margin: 0;" :label="3" v-model="form.thumbType"/></div>
        </div> -->
      </div>
      <div class="option-item">
        <div class="flex-v-center">
          <span class="flex-item">显示头图</span>
          <switcher mode="Number" v-model="form.hasThumb"/>
        </div>
      </div>
      <div class="option-item">
        <div class="flex-v-center">
          <span class="flex-item">列表中是否显示图片</span>
          <switcher mode="Number" v-model="form.isListShowPic"/>
        </div>
      </div>
      <div class="option-item relative">
        <textarea placeholder="摘要，限制 128 字。" v-model="form.abstarcts" rows="8"></textarea>
        <span style="position: absolute;bottom: 3px;right: 0;" :style="{ color: form.abstarcts.length > 128 ? '#F44336' : '#999' }">{{form.abstarcts.length}} / 128</span>
      </div>
      <div class="option-item">
        <input type="text" placeholder="关键词，逗号分隔。" v-model="form.keywords"/>
      </div>
      <!--<div class="option-item flex-v-center">-->
        <!--<span class="flex-item">©原创声明</span>-->
        <!--<switcher mode="Number" v-model="form.isOriginal"/>-->
      <!--</div>-->
      <!--<div class="option-item flex" v-if="!form.isOriginal">-->
        <!--<input type="text" class="flex-item" placeholder="来源名称" v-model="form.originalFrom">-->
        <!--<input type="text" class="flex-item" placeholder="来源URL" v-model="form.originalUrl">-->
      <!--</div>-->
      <div class="option-item" style="display: flex">
        <input style="width: calc(100% - 70px);" type="text" placeholder="作者，逗号分隔" v-model="form.author">
        <div class="relative" style="padding: 0 4px;width: 70px;">
          <p @click="scaleshow = true" style="cursor: pointer;text-align: right;margin: 0;">
            选择预设
          </p>
          <bubble style="left: -80px;" v-if="scaleshow" @close="scaleshow = false">
            <ul class="f-14 c-5" style="padding: 4px 0;width: 150px;text-align: center;line-height: 24px;">
              <li v-for="(item, index) in $store.state.account.authorList" class="a flex-v-center listhover" @click="form.author = item; scaleshow = false">
                <span class="flex-item">{{item}}</span>
              </li>
            </ul>
          </bubble>
        </div>
      </div>
      <div class="option-item flex-v-center" v-if="form.createDate !== undefined">
        <div class="flex-item">创建时间</div>
        <div class="relative flex-v-center a">
          <span v-if="!form.createDate" class="flex-v-center" style="position: absolute;right: 0;">
            <span>设置</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <vue-datepicker-local show-buttons :clearable="false" format="YYYY-MM-DD HH:mm:ss" v-model="form.createDate"></vue-datepicker-local>
        </div>
      </div>
      <!--<div class="option-item">-->
        <!--<input type="number" placeholder="权重，范围 0 ~ 100" v-model="form.weight">-->
      <!--</div>-->
      <!-- <div class="option-item flex-v-center">
        <span class="flex-item">水印</span>
        <switcher mode="Number" v-model="form.isWatermarked"/>
      </div> -->
      <div class="option-item flex-v-center">
        <span class="flex-item">是否窄图</span>
        <switcher mode="Number" v-model="form.wide"/>
      </div>
      <!--<div class="option-item flex-v-center">-->
        <!--<span class="flex-item">是否显示广告图章</span>-->
        <!--<switcher mode="Number" v-model="form.wide"/>-->
      <!--</div>-->
      <!--<div class="option-item flex-v-center">-->
        <!--<div class="flex-item">定时上线</div>-->
        <!--<div class="relative flex-v-center a">-->
          <!--<span v-if="!form.upLineTime" class="flex-v-center" style="position: absolute;right: 0;">-->
            <!--<span>设置</span>-->
            <!--<i class="icon f-18 c-a">keyboard_arrow_down</i>-->
          <!--</span>-->
          <!--<vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.upLineTime"></vue-datepicker-local>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="option-item flex-v-center">-->
        <!--<div class="flex-item">定时下线</div>-->
        <!--<div class="relative flex-v-center a">-->
          <!--<span v-if="!form.downLineTime" class="flex-v-center" style="position: absolute;right: 0;">-->
            <!--<span>设置</span>-->
            <!--<i class="icon f-18 c-a">keyboard_arrow_down</i>-->
          <!--</span>-->
          <!--<vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.downLineTime"></vue-datepicker-local>-->
        <!--</div>-->
      <!--</div>-->
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
      <!--<div class="option-item">-->
        <!--<div class="flex-v-center">-->
          <!--<span class="flex-item">开启评论</span>-->
          <!--<switcher mode="Number" v-model="form.isOpenComment"/>-->
        <!--</div>-->
        <!--<app-article-add-comment v-if="form.isOpenComment" v-model="form.virtualComment"></app-article-add-comment>-->
      <!--</div>-->
      <!--<app-article-add-relates single :channels="ui.channels.channels" v-model="form.galleryId" title="相关图集" icon="collections" url="/cri-cms-platform/article/associate/gallery.monitor">-->
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
      <!--</app-article-add-relates>-->
      <!--<app-article-add-relates :channels="ui.channels.channels" v-model="form.relateIds" title="相关阅读" icon="book" url="/cri-cms-platform/article/associate/article.monitor"></app-article-add-relates>-->
      <!--<app-article-add-relates single :channels="ui.channels.channels" v-model="form.specialId" title="相关专题" icon="assignment" url="/cri-cms-platform/article/associate/special.monitor"></app-article-add-relates>-->
      <!--<app-article-add-attachment v-model="form.attachmentIds" :default-list="attachmentDefaultList"></app-article-add-attachment>-->
      <!--<div class="option-item flex-v-center blue a">-->
        <!--<i class="icon f-20 add-other-icon">attach_file</i>-->
        <!--<span class="flex-item">添加附件</span>-->
      <!--</div>-->
      <!--<div class="option-item flex-v-center blue a">-->
        <!--<i class="icon f-20 add-other-icon">how_to_vote</i>-->
        <!--<span class="flex-item">添加投票挂件</span>-->
      <!--</div>-->
      <!--<div class="option-item flex-v-center blue a">-->
        <!--<i class="icon f-20  add-other-icon">link</i>-->
        <!--<span class="flex-item">关联投票链接</span>-->
      <!--</div>-->
      <!--<div class="option-item flex-v-center blue a">-->
        <!--<i class="icon f-20  add-other-icon">link</i>-->
        <!--<span class="flex-item">关联活动报名链接</span>-->
      <!--</div>-->
      <!--<div class="option-item flex-v-center blue a">-->
        <!--<i class="icon f-20  add-other-icon">movie</i>-->
        <!--<span class="flex-item">添加视频</span>-->
      <!--</div>-->
    </div>
  </div>
  </template>
  <div v-else class="abs flex-center bg-light-rgb-5" style="z-index: 10;">
    <loading size="50"/>
  </div>

</div>
</template>

<script>
import moment from 'moment'
import ArticleEditor from './editor'
import VueDatepickerLocal from 'vue-datepicker-local'
import SelectCard from '@/components/select-card/index'
import SelectCardOption from '@/components/select-card/option'
import AppArticleAddComment from './comment'
import AppArticleAddRelates from './relates'
import AppArticleAddAttachment from './attachment'
import AppArticleAddThumb from './thumb'

const from = {
  article: {
    getUrl: '/cri-cms-platform/link/get.monitor'
  },
  draft: {
    getUrl: '/cri-cms-platform/articleAutoSave/getAuto.monitor'
  }
}

export default {
  name: 'app-article-add',
  components: { ArticleEditor, VueDatepickerLocal, SelectCard, SelectCardOption, AppArticleAddComment, AppArticleAddRelates, AppArticleAddAttachment, AppArticleAddThumb },
  props: [ 'from', 'id' ],
  data () {
    return {
      scaleshow: false,
      getend: false,
      article: null,
      linkdata: {
        link: '',
        title: '',
        titleColor: '#000000'
      },
      ui: {
        loading: false,
        optionShow: true,
        channelShow: false,
        channels: [],
        gallerySettingShow: false,
        gallerySettingDisplayPositionShow: false,
        submited: false
      },
      form: {
        app: 'LINK',
        title: '',
        titleColor: '',
        // content: '',
        channelIds: '',
        // galleryId: '',
        // gallerySettingMaxWidth: '640',
        // gallerySettingMinHeight: '480',
        // gallerySettingThumbWidth: '80',
        // gallerySettingThumbHeight: '60',
        // gallerySettingDisplayPosition: '1',
        // relateIds: '',
        // specialId: '',
        isOpenComment: 1,
        isOriginal: 0,
        originalFrom: '',
        originalUrl: '',
        isRecommnd: 0,
        abstarcts: '',
        keywords: '',
        author: this.$store.state.account.authorList[0],
        weight: '',
        isWatermarked: 0,
        wide: 0,
        upLineTime: '',
        downLineTime: '',
        virtualPv: '',
        virtualComment: '',
        virtualShare: '',
        virtualDigg: '',
        hasThumb: 0,
        // thumbType: 1,
        thumb: '',
        isListShowPic: 1
        // terminalPc: 0,
        // terminalApp: 0,
        // terminalWeb: 0
        // attachmentIds: ''
      },
      thumb: {
        thumb1: null,
        thumb2: null,
        thumb3: null
      },
      attachmentDefaultList: [],
      addCommentShow: false,
      autoSaveId: '',
      autoSaveTimer: null
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
      return this.channelIds.map(val => this.ui.channels.find(v => v.id === val).channelName).join('，')
    }
  },
  methods: {
    beforeClose () {
      if (this.ui.submited) {
        clearInterval(this.autoSaveTimer)
        window.opener = null
        window.close()
        // this.$router.go(-1)
        return
      }
      let that = this
      this.$confirm({
        title: '您确定要离开吗？',
        text: '未保存的内容将无法恢复。',
        btns: ['取消', '离开'],
        color: 'red',
        yes () {
          clearInterval(that.autoSaveTimer)
          window.opener = null
          window.close()
          // this.$router.go(-1)
        },
        no () {

        }
      })
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/link/getChannels.monitor').then(res => {
        this.ui.channels = res || []
        this.getend = true
      }).catch(console.log)
    },
    getKeyGenerate () {
      if (this.from || this.id) return
      let doc = this.$refs.editor.getText()
      if (!doc.trim()) return
      if (sessionStorage.siteId == 1002) {
        this.form.abstarcts = doc.split('.')[0].substring(0, 128)
      } else {
        this.$http.post('/cri-cms-platform/article/getKeyGenerate.monitor', { doc }).then(
          res => {
            this.form.abstarcts = res.gerenate
            this.form.keywords = res.key.join(',')
          }
        )
      }
    },
    disabledDate (time, format) {
      return time <= new Date()
    },
    autoSave () {
      let { title } = this.$refs.editor
      this.form.title = title
      let form = {...this.form}
      if (this.autoSaveId) form.id = this.autoSaveId
      return this.$http.post('/cri-cms-platform/articleAutoSave/saveAuto.monitor', form).then(
        res => {
          this.autoSaveId = res.autoSaveId
          this.$toast('保存成功')
        }
      ).catch(
        res => {
          this.$toast(res.msg || res || '保存失败')
        }
      )
    },
    submit () {
      let url = this.id ? '/cri-cms-platform/link/update.monitor' : '/cri-cms-platform/link/save.monitor'
      let { title, titleColor, link, linkhead } = this.$refs.editor
      if (!title) {
        this.$toast('请输入标题')
        return
      }
      if (this.author) {
        this.$toast('请输入作者')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      if (!link) {
        this.$toast('请输入链接')
        return
      }

      this.form.thumb = this.thumb.thumb1.id

      if (!this.form.thumb) {
        this.$toast('请选头图')
        return
      }

      this.form.title = title
      this.form.titleColor = titleColor
      this.form.content = linkhead + link
      let form = {...this.form}
      if (form.createDate) form.createDate = moment(form.createDate).format('YYYY-MM-DD HH:mm:ss')
      if (this.id) form.id = this.id
      form.isListShowPic = form.isListShowPic == 1 ? 0 : 1
      this.$http.post(url, form).then(
        res => {
          console.log(res)
          this.ui.submited = true
          window.opener.location.reload()
          window.opener = null
          window.close()
          // this.$router.go(-1)
        }
      ).catch(
        res => {
          this.$toast(res || res.msg || '保存失败')
          console.log(res)
        }
      )
    }
  },
  filters: {
    gallerySettingDisplayPosition (value) {
      if (value === '1') return '正文正上方'
      if (value === '2') return '正文正下方'
    }
  },
  created () {
    this.getChannels()
    this.autoSaveTimer = setInterval(() => {
      this.autoSave()
    }, 60000)
  },
  mounted () {
    if (this.from && this.id) {
      this.ui.loading = true
      let url = ''
      let obj = {
        id: this.id
      }
      if (this.from === 'draft') {
        this.autoSaveId = this.id
        url = '/cri-cms-platform/articleAutoSave/getAuto.monitor'
        obj.app = 'LINK'
      } else if (this.from === 'editor') {
        url = '/cri-cms-platform/link/get.monitor'
      }
      this.$http.post(url, obj).then(res => {

        for (let k in this.form) {
          if (k === 'virtualComment') {
            if (res.content[k] === '') {
              this.form[k] = ''
            } else {
              this.form[k] = JSON.stringify(res.content[k])
            }
            continue
          }
          if (k === 'thumb') {
            this.thumb.thumb1 = res.content.thumb[0]
            this.thumb.thumb2 = res.content.thumb[1]
            this.thumb.thumb3 = res.content.thumb[2]
            console.log(this.thumb.thumb1)
          }
          if (k === 'isDelete' || k === 'isOpenComment' || k === 'isOriginal' || k === 'isRecommnd' || k === 'isWatermarked' || k === 'terminalApp' || k === 'terminalPc' || k === 'terminalWeb' || k === 'hasThumb' || k === 'isListShowPic') {
            this.form[k] = Number(res.content[k])
            continue
          }
          this.form[k] = res.content[k]
        }
        this.form.isListShowPic = this.form.isListShowPic == 1 ? 0 : 1
        this.form.wide = Number(res.link.wide)
        this.form.createDate = res.content.createDate
        // this.form.content = res.article.content
        this.form.channelIds = res.channelIds || ''
        // this.form.relateIds = res.relateArticle.map(v => v.id).join(',')
        // this.form.specialId = res.relateSpecial.id || ''
        // this.attachmentDefaultList = res.attachments
        // this.form.gallerySettingDisplayPosition = res.gallerySettingDisplayPosition || '1'
        // this.form.gallerySettingMaxWidth = res.gallerySettingMaxWidth || '640'
        // this.form.gallerySettingMinHeight = res.gallerySettingMinHeight || '480'
        // this.form.gallerySettingThumbHeight = res.gallerySettingThumbHeight || '80'
        // this.form.gallerySettingThumbWidth = res.gallerySettingThumbWidth || '60'
        this.ui.loading = false
        this.linkdata.link = res.link.content
        this.linkdata.title = res.content.title
        this.linkdata.titleColor = res.content.titleColor
        // this.$nextTick(() => {
        //   this.$refs.editor.title = this.form.title
        //   this.$refs.editor.titleColor = this.form.titleColor
        //   this.$refs.editor.content = this.form.content
        // })
      }).catch(e => {
        console.log(e)
      })
    } else {
      this.form.virtualPv = 500 + parseInt(Math.random() * 300)
      this.form.virtualShare = 5 + parseInt(Math.random() * 5)
      this.form.virtualDigg = 5 + parseInt(Math.random() * 5)
    }
  }
}
</script>

<style lang="less">
.app-article-add{line-height: 1em;
  .art-options{width: 320px;padding: 20px 0;background: #f8f8f8;transition: width .3s;
    textarea, input{border: none;width: 100%;outline: none;font-size: 14px;color: #444;resize: none;background: transparent;
      &::-webkit-input-placeholder{color: #999;}
    }
  }
  .option-item{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 12px 0;}
  .add-photo-btn{background: rgba(0, 0, 0, .06);border-radius: 5px;overflow: hidden;}
  .add-other-icon{margin-right: 10px;}
  /*.bubble-list{padding: 10px 0;*/
    /*li{padding: 5px 15px;}*/
    /*li:hover{background: #eee;}*/
  /*}*/
  .active {color: #018be6;}
  .datepicker::before {content: none}
  .add-gallery-setting-btn:hover {color:#008eff;}
  .add-gallery-setting {padding: 0;
    li {padding-left: 20px;font-size: 16px;
      div {border-bottom: 1px solid #e1e1e1;padding: 12px 0;}
      &:last-child div{border-bottom: 0;}
      input {border: none;outline: none;font-size: 14px;color: #444;background: transparent;height: 34px;width: 60px;text-align: right;padding-right: 20px;
        &::-webkit-input-placeholder{color: #999;}
      }
    }
  }
}
</style>
