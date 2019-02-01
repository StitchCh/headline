<template>
<div class="abs bg-f flex c-6 f-14 app-article-add">
  <template v-if="!ui.loading">
  <div class="flex-item flex-col">
    <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
      <div class="a flex-v-center" @click="$router.back()">
        <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
        <span class="f-18">返回</span>
      </div>
      <div class="flex-item"></div>
      <div class="flex-v-center">
        <!--<btn big flat style="margin-right: 15px;">递交审核</btn>-->
        <!-- <btn big flat style="margin-right: 10px;">预览</btn> -->
        <!--<btn big flat style="margin-right: 10px;" @click="autoSave">保存草稿</btn>-->
        <btn big style="margin-right: 20px;" @click="submit">保存</btn>
        <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <article-editor v-if="getif" :otitle="form.title" ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>
      <div v-if="form.category != 'PICTURE'" style="margin: 0 auto;max-width: 900px;padding: 0 24px; margin-bottom: 20px;border-top: 1px solid #ddd;padding-top: 16px;">
        <input style="height: 40px;font-size: 26px;width: 100%;border: 0;" type="text" :placeholder="form.category == 'VIDEO' ? '添加视频直播源' : '添加音频直播源'" v-model="form.liveSource"/>
      </div>
      <div style="max-width: 900px;margin: 0 auto;padding: 0 20px 10px;border-top: 1px solid #ddd;display: flex;justify-content: space-between;">
        <div style="width: 50%;">
          <h2>选择头图</h2>
          <div style="max-width: 300px;margin: 20px;">
            <app-article-add-thumb v-if="getif" v-model="form.headThumb" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
          </div>
        </div>
        <div style="width: 50%;">
          <div style="overflow: hidden">
            <h2 style="float: left;">拖拽排序</h2>
          </div>
          <draggable element="ul" :options="{ghostClass:'movelist'}" v-model="tagOrder" >
            <li v-for="(item, index) in tagOrder" class="flex-v-center orderitem">
              <span style="margin-right: 10px;">{{index+1}}. {{item === 'LIVE' ? '直播窗口' : '聊天室'}}</span>
            </li>
          </draggable>
        </div>
      </div>

    </div>
  </div>
  <div class="art-options c-4 scroll-y" :style="{width: ui.optionShow ? '320px' : '0px'}">
    <div style="width: 280px;margin: 0 20px;">
      <div v-if="getend" class="option-item flex-v-center relative a" @click="ui.channelShow=!ui.channelShow">
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
        <!--<icon-btn small v-tooltip:top="'发布到 PC 页面'" :class="{ active: form.terminalPc }" @click="form.terminalPc = ~~!form.terminalPc">computer</icon-btn>-->
        <!--<icon-btn small v-tooltip:top="'发布到客户端'" :class="{ active: form.terminalApp }" @click="form.terminalApp = ~~!form.terminalApp">phone_iphone</icon-btn>-->
        <!--<icon-btn small v-tooltip:top="'发布到移动网页'" :class="{ active: form.terminalWeb }" @click="form.terminalWeb = ~~!form.terminalWeb">public</icon-btn>-->
      <!---->
      </div>
      <div style="margin: 10px 0;">
        <app-article-add-thumb scale v-if="getif" v-model="thumb.thumb1" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
        <!--<div v-if="form.thumbType == 2" class="flex">-->
          <!--<app-article-add-thumb v-model="thumb.thumb2" height="80px" class="flex-item" style="margin-right: 8px;"></app-article-add-thumb>-->
          <!--<app-article-add-thumb v-model="thumb.thumb3" height="80px" class="flex-item"></app-article-add-thumb>-->
        <!--</div>-->
        <!--<div class="flex-v-center" style="padding: 10px 5px 0 5px;">-->
          <!--<div class="flex-item"><radio-box text="默认" :label="1" v-model="form.thumbType"/></div>-->
          <!--<div class="flex-item"><radio-box text="三图" :label="2" v-model="form.thumbType"/></div>-->
          <!--<div><radio-box text="16:9 大图" style="margin: 0;" :label="3" v-model="form.thumbType"/></div>-->
        <!--</div>-->
      </div>
      <div>
        <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <div class="flex-item"><radio-box text="图文直播" :label="'PICTURE'" v-model="form.category"/></div>
          <div class="flex-item"><radio-box text="视频直播" :label="'VIDEO'" v-model="form.category"/></div>
          <div class="flex-item"><radio-box text="音频直播" :label="'AUDIO'" v-model="form.category"/></div>
        </div>
      </div>
      <div class="option-item relative">
        <textarea placeholder="导语，限制 128 字。" v-model="form.introduction" rows="8"></textarea>
        <span style="position: absolute;bottom: 3px;right: 0;" :style="{ color: form.introduction.length > 128 ? '#F44336' : '#999' }">{{form.introduction.length}} / 128</span>
      </div>
      <div class="option-item">
        <input type="text" placeholder="关键词，逗号分隔。" v-model="form.keywords"/>
      </div>
      <div class="option-item">
        <input type="text" placeholder="回放地址" v-model="form.playback"/>
      </div>
      <!--<div class="option-item flex-v-center">-->
        <!--<span class="flex-item">是否开启弹幕</span>-->
        <!--<switcher mode="Number" v-model="form.openBulletScreen"/>-->
      <!--</div>-->
      <!--<div class="option-item flex" v-if="!form.isOriginal">-->
        <!--<input type="text" class="flex-item" placeholder="来源名称" v-model="form.originalFrom">-->
        <!--<input type="text" class="flex-item" placeholder="来源URL" v-model="form.originalUrl">-->
      <!--</div>-->
      <!--<div class="option-item">-->
        <!--<input type="text" placeholder="作者，逗号分隔" v-model="form.author">-->
      <!--</div>-->
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
      <div class="option-item flex-v-center">
        <span>虚拟观看数</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualPv">
      </div>
      <div class="option-item flex-v-center">
        <span>虚拟点赞数</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualDigg">
      </div>
      <div class="option-item flex-v-center">
        <span>虚拟分享数</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualShare">
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item" style="margin-right: 10px;">是否开启聊天室</span>
        <switcher mode="Number" v-model="form.openChatroom"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item" style="margin-right: 10px;">是否显示阅读数</span>
        <switcher mode="Number" v-model="form.showPv"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item" style="margin-right: 10px;">是否显示点赞数</span>
        <switcher mode="Number" v-model="form.showDigg"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item" style="margin-right: 10px;">是否显示分享数</span>
        <switcher mode="Number" v-model="form.showShare"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item" style="margin-right: 10px;">是否显示评论数</span>
        <switcher mode="Number" v-model="form.showComment"/>
      </div>
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
import draggable from 'vuedraggable'

const from = {
  article: {
    getUrl: '/cri-cms-platform/special/get.monitor'
  },
  draft: {
    getUrl: '/cri-cms-platform/specialAutoSave/getAuto.monitor'
  }
}

export default {
  name: 'app-article-add',
  components: { ArticleEditor, draggable, VueDatepickerLocal, SelectCard, SelectCardOption, AppArticleAddComment, AppArticleAddRelates, AppArticleAddAttachment, AppArticleAddThumb },
  props: [ 'from', 'id' ],
  data () {
    return {
      liveShow: 1,
      tagOrder: ['LIVE', 'CHATROOM'],
      getif: false,
      getend: false,
      getif1: false,
      article: null,
      ui: {
        loading: false,
        optionShow: true,
        channelShow: false,
        channels: [],
        gallerySettingShow: false,
        gallerySettingDisplayPositionShow: false,
        submited: false
      },
      headList_type1: {},
      headList_type2: [],
      nowDate: new Date(),
      form: {
        openBulletScreen: 0,
        headThumb: {},
        liveSource: '',
        tagOrder: '',
        playback: '',
        category: 'PICTURE',
        // app: 'ARTICLE',
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
        // isOpenComment: 0,
        // isOriginal: 0,
        // originalFrom: '',
        // originalUrl: '',
        isRecommnd: 0,
        introduction: '',
        keywords: '',
        // author: '',
        // weight: '',
        // isWatermarked: 0,
        // upLineTime: '',
        // downLineTime: '',
        virtualPv: '',
        // virtualComment: '',
        virtualShare: '',
        virtualDigg: '',
        // hasThumb: 0,
        // thumbType: 1,
        thumb: '',
        // terminalPc: 0,
        // terminalApp: 0,
        // terminalWeb: 0,
        // attachmentIds: ''
        showPv: 1,
        showDigg: 1,
        showShare: 1,
        showComment: 1,
        openChatroom: 1
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
    autoSave () {
      // let { title, titleColor, content } = this.$refs.editor
      // this.form.title = title
      // this.form.titleColor = titleColor
      // this.form.content = content
      // let form = {...this.form}
      // if (this.autoSaveId) form.id = this.autoSaveId
      // return this.$http.post('/cri-cms-platform/articleAutoSave/saveAuto.monitor', form).then(
      //   res => {
      //     this.autoSaveId = res.autoSaveId
      //     this.$toast('保存成功')
      //   }
      // ).catch(
      //   res => {
      //     this.$toast(res.msg || res || '保存失败')
      //   }
      // )
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/live/getChannels.monitor').then(res => {
        this.getif1 = true
        this.ui.channels = res || []
        this.getend = true
      }).catch(e => {
        console.log(e)
      })
    },
    getKeyGenerate () {
      if (this.from || this.id) return
      let doc = this.$refs.editor.getText()
      if (!doc.trim()) return
      this.$http.post('/cri-cms-platform/article/getKeyGenerate.monitor', { doc }).then(
        res => {
          this.form.abstarcts = res.gerenate
          this.form.keywords = res.key.join(',')
        }
      )
    },
    disabledDate (time, format) {
      return time <= new Date()
    },
    submit () {
      let url = this.id ? '/cri-cms-platform/live/update.monitor' : '/cri-cms-platform/live/save.monitor'
      let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/

      let { title, titleColor } = this.$refs.editor
      if (!title) {
        this.$toast('请输入标题')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      if (!this.form.liveSource && this.form.category != 'PICTURE') {
        this.$toast('请输入直播源')
        return
      }
      // if (!reg.test(this.form.liveSource)) {
      //   this.$toast('请输入正确格式的直播源地址')
      //   return
      // }
      this.form.title = title
      this.form.titleColor = titleColor

      let obj = {...this.form}
      obj.tagOrder = this.tagOrder.join(',')
      obj.headThumb = obj.headThumb.id

      if (this.id) {
        obj.id = this.id
      }

      this.$http.post(url, obj).then(res => {
        this.ui.submited = true
        this.$router.push('/live/list?status=all')
      }).catch(
        res => {
          this.$toast(res || res.msg || '保存失败')
        }
      )

      // let form = {...this.form}
      // if (form.createDate) form.createDate = moment(form.createDate).format('YYYY-MM-DD hh:mm:ss')
      // if (this.id) form.id = this.id

      // this.$http.post(url, form).then(
      //   res => {
      //     this.ui.submited = true
      //     this.$router.replace('/article/list?scope=all&status=all')
      //   }
      // ).catch(
      //   res => {
      //     this.$toast(res || res.msg || '保存失败')
      //     console.log(res)
      //   }
      // )
    }
  },
  filters: {
    gallerySettingDisplayPosition (value) {
      if (value === '1') return '正文正上方'
      if (value === '2') return '正文正下方'
    }
  },
  beforeMount () {
    this.getChannels()
    if (this.from && this.id) {
      if (this.from == 'edit') {
        this.$http.post('/cri-cms-platform/live/get.monitor', {
          id: this.id
        }).then(res => {
          console.log(res)
          this.form.channelIds = res.channelIds
          this.tagOrder = res.live.tagOrder.split(',')
          this.form.title = res.content.title
          this.form.contentId = res.live.contentId
          this.form.virtualDigg = res.content.virtualDigg
          this.form.virtualPv = res.content.virtualPv
          this.form.virtualShare = res.content.virtualShare
          this.form.openBulletScreen = res.content.openBulletScreen
          this.form.introduction = res.live.introduction
          this.form.playback = res.live.playback
          this.form.keywords = res.content.keywords
          this.form.headThumb = res.live.headThumb[0]
          this.thumb.thumb1 = res.content.thumb[0]
          this.form.terminalPc = res.content.terminalPc
          this.form.terminalApp = res.content.terminalApp
          this.form.terminalWeb = res.content.terminalWeb
          this.form.category = res.live.category
          this.form.liveSource = res.live.liveSource
          this.form.showPv = parseInt(res.live.showPv)
          this.form.showDigg = parseInt(res.live.showDigg)
          this.form.showShare = parseInt(res.live.showShare)
          this.form.showComment = parseInt(res.live.showComment)
          this.form.openChatroom = parseInt(res.live.openChatroom)
          this.getif = true
        })
      }
    } else {
      this.getif = true
    }


    // if (this.from && this.id) {
    //   if (this.from === 'draft') this.autoSaveId = this.id
    //   this.$http.post(from[this.from].getUrl, {
    //     id: this.id
    //   }).then(res => {
    //     for (let k in this.form) {
    //       if (k === 'virtualComment') {
    //         if (res.content[k] === '') {
    //           this.form[k] = ''
    //         } else {
    //           this.form[k] = JSON.stringify(res.content[k])
    //         }
    //         continue
    //       }
    //       if (k === 'thumb') {
    //         this.thumb.thumb1 = res.content.thumb[0]
    //         this.thumb.thumb2 = res.content.thumb[1]
    //         this.thumb.thumb3 = res.content.thumb[2]
    //       }
    //       if (k === 'isDelete' || k === 'isOpenComment' || k === 'isOriginal' || k === 'isRecommnd' || k === 'isWatermarked' || k === 'terminalApp' || k === 'terminalPc' || k === 'terminalWeb' || k === 'hasThumb') {
    //         this.form[k] = Number(res.content[k])
    //         continue
    //       }
    //       this.form[k] = res.content[k]
    //     }
    //     this.form.createDate = res.content.createDate
    //     this.form.content = res.article.content
    //     this.form.channelIds = res.channelIds || ''
    //     this.form.relateIds = res.relateArticle.map(v => v.id).join(',')
    //     this.form.specialId = res.relateSpecial.id || ''
    //     this.attachmentDefaultList = res.attachments
    //     this.form.gallerySettingDisplayPosition = res.gallerySettingDisplayPosition || '1'
    //     this.form.gallerySettingMaxWidth = res.gallerySettingMaxWidth || '640'
    //     this.form.gallerySettingMinHeight = res.gallerySettingMinHeight || '480'
    //     this.form.gallerySettingThumbHeight = res.gallerySettingThumbHeight || '80'
    //     this.form.gallerySettingThumbWidth = res.gallerySettingThumbWidth || '60'
    //     this.ui.loading = false
    //     this.$nextTick(() => {
    //       this.$refs.editor.title = this.form.title
    //       this.$refs.editor.titleColor = this.form.titleColor
    //       this.$refs.editor.content = this.form.content
    //     })
    //   }).catch(e => {
    //     console.log(e)
    //   })
    // }
    // this.getChannels()
  },
  watch: {
    'liveShow' (newValue) {
      if (newValue == 1) {
        this.tagOrder = ['LIVE', 'CHATROOM']
      } else {
        this.tagOrder = ['LIVE']
      }
    },
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
    'form.thumbType' (newValue) {
      if (newValue === 2) {
        if (!(this.thumb.thumb1 || this.thumb.thumb2 || this.thumb.thumb3)) {
          this.form.hasThumb = 0
          this.form.thumb = ''
        } else {
          this.form.hasThumb = 1
          this.form.thumb = [ this.thumb.thumb1, this.thumb.thumb2, this.thumb.thumb3 ].filter(v => v).map(v => v.id).join(',')
        }
      } else {
        if (!this.thumb.thumb1) {
          this.form.hasThumb = 0
          this.form.thumb = ''
        } else {
          this.form.hasThumb = 1
          this.form.thumb = this.thumb.thumb1.id
        }
      }
    }
  },
  beforeRouteLeave (from, to, next) {
    if (this.ui.submited) {
      // clearInterval(this.autoSaveTimer)
      next()
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
        next()
      },
      no () {
        next(false)
      }
    })
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
  .setlistbox{
    max-width: 900px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .orderitem{
    line-height: 40px;
  }
  .setlistbox:after{
    content: '';
    display: block;
    clear: both;
    padding-left: 20px;
  }
  .movelist{
    background: #008eff;
    color: #008eff;
    opacity: 0.5;
  }
  .additem{
    padding: 4px 0;
  }
  .list_content_title{
    background: #f3f3f3;
    line-height: 40px;
    height: 40px;
    padding: 0 10px;
    margin: 0;
    color: #333;
  }
  .list_content{
    padding: 10px;
  }
  .channel-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
  .channel-tree-item{line-height: 1em;border: 1px solid rgba(0,0,0,.08);
    margin-bottom: 10px;
    padding: 0 7px;
    .icon-btn{opacity: .2;}
    input{height: 30px;background: #fff;border: 1px solid #ddd;padding: 0 5px;border-width: 0 1px;}
    &:hover{background: rgba(0,0,0,.1);
      .icon-btn{opacity: 1;}
    }
    &.edit .icon-btn{opacity: 1;}
    &.on{background: #0299ff;color: #fff;
      .icon{color: #fff;}
    }
    &.new.edit{border-color: #ddd;}
    &.new{color: #0299ff;}
    &.new .tree-icon{color: #93cdff;}
    &.del{color: #ff0d0d;}
    &.del .tree-icon{color: #ff8585;}
    &.del .channel-name{text-decoration:line-through;}
  }
  .channel-tree-item1{
    background: rgba(0,0,0,.1);
    .icon-btn{opacity: 1;}
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
