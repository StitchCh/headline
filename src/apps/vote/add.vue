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
    <div class="flex-item scroll-y" ref="scrollbox">
      <article-editor v-if="getif" ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>

      <div style="max-width: 900px;margin: 0 auto;padding: 20px 10px;">
        <h2>选择头图</h2>
        <div style="max-width: 300px;margin: 20px;">
          <app-article-add-thumb v-if="getif" v-model="form.headThumb" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
          <p style="font-size: 12px;color: #f00;">建议择尺寸为16：9的图片作为头图</p>
        </div>
      </div>

      <div v-if="form.templateType == 1" class="listbox">
        <p style="font-size: 12px;color: #f00;">请选择4：3比例的图片作为投票列表图片</p>
        <draggable element="ul" :options="{ghostClass:'movelist'}" v-model="form.options">
          <li v-for="(item, index) in form.options" class="listType1">
            <div style="display: flex;align-items: center;justify-content: space-between;">
              <span style="width: 30px;display: inline-block;">{{index + 1}}</span>
              <div v-if="form.templateStyle == 2" style="margin-right: 10px;display: inline-block;width: 80px;position: relative;top: 10px;transform: translateY(-20%);">
                <app-article-add-thumb sle="4:3" v-model="item.othumb" height="40px"></app-article-add-thumb>
              </div>
              <span>标题</span>
              <input type="text" v-model="item.title">
              <span>链接</span>
              <input style="width: 200px;" type="text" v-model="item.link">
              <span>起始票数</span>
              <input type="number" v-model="item.virtualVotes" min="0">
              <icon-btn small style="float: right" @click="removeList(index)">delete</icon-btn>
            </div>
          </li>
        </draggable>
      </div>
      <div v-if="form.templateType == 2" class="listbox" style="overflow: hidden;">
        <p style="font-size: 12px;color: #f00;">请选择 4:3 比例的图片作为投票列表图片</p>
        <draggable element="ul" :options="{ghostClass:'movelist'}" v-model="form.options">
          <li v-for="(item, index) in form.options" class="listType2">
            <div>
              <p style="line-height: 1;margin: 0 0 10px;text-align: center;font-size: 16px;">{{index + 1}}</p>
              <div style="margin-bottom: 6px;">
                <app-article-add-thumb sle="4:3" v-model="item.othumb" height="100px" style="margin-bottom: 8px;"></app-article-add-thumb>
              </div>
              <span>标题</span>
              <input style="width: 100%;" type="text" v-model="item.title">
              <span>链接</span>
              <input style="width: 100%;" type="text" v-model="item.link">
              <span v-if="form.templateStyle == 3">描述</span>
              <textarea v-if="form.templateStyle == 3" v-model="item.description" style="width: 100%;resize: none;height: 40px;outline: none;"></textarea>
              <span>起始票数</span>
              <input style="width: 100%;text-align: right;" type="number" v-model="item.virtualVotes" min="0">
              <icon-btn class="listtype2_remove" small style="float: right" @click="removeList(index)">delete</icon-btn>
            </div>
          </li>
        </draggable>
        <div style="overflow: hidden;"></div>
      </div>
    </div>
    <div class="listaddbtn">
      <span style="margin-right: 10px;font-size: 16px;" @click="addList">添加</span><icon-btn small @click="addList">add</icon-btn></div>
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
      <div style="margin: 10px 0 0 0;">
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
      <div class="option-item">
        <p style="margin-top: 0;">投票类型</p>
        <div class="flex-v-center" style="padding: 0px 5px 0 5px;">
          <div class="flex-item"><radio-box text="普通投票" :label="1" v-model="form.templateType"/></div>
          <div class="flex-item"><radio-box text="评选投票" :label="2" v-model="form.templateType"/></div>
        </div>
      </div>
      <div class="option-item flex">
        <span class="flex-item">模板样式</span>
        <div class="relative" style="padding: 0 4px;width: 150px;">
          <p @click="scaleshow1 = true" style="cursor: pointer;text-align: right;margin: 0;">{{scaleshow1List[form.templateStyle-1]}}</p>
          <bubble v-if="scaleshow1" @close="scaleshow1 = false">
            <ul class="f-14 c-5" style="padding: 4px 0;width: 130px;text-align: center;line-height: 24px;">
              <li v-for="(item, index) in scaleshow1List" v-if="(form.templateType == 1 && index != 2) || (form.templateType == 2 && index != 0)" class="a flex-v-center listhover" @click="setScale1(index+1)">
                <span class="flex-item">{{item}}</span>
              </li>
            </ul>
          </bubble>
        </div>
      </div>
      <div class="option-item">
        <p style="margin-top: 0;">选择类型</p>
        <div class="flex-v-center" style="padding: 0px 5px 0 5px;">
          <div class="flex-item"><radio-box text="单选" :label="1" v-model="form.category"/></div>
          <div class="flex-item"><radio-box text="多选" :label="2" v-model="form.category"/></div>
        </div>
        <div v-if="form.category == 2" style="padding-top: 10px;">
          <input style="width: 150px;" v-model="form.maxVotes" placeholder="最多选项" type="number" min="0">
          <span style="margin-right: 20px;">强制选满</span>
          <switcher mode="Number" v-model="form.voteAll"/>
        </div>
      </div>
      <div class="option-item">
        <span class="flex-item">周期</span>
        <input style="width: 220px;text-align: right" v-model="form.cycle" type="number" min="0">
        <span>天</span>
      </div>
      <div class="option-item">
        <span class="flex-item">周期投票次数</span>
        <input style="width: 164px;text-align: right" v-model="form.cycleCount" type="number" min="0">
        <span>次</span>
      </div>
      <div class="option-item flex">
        <span class="flex-item">同IP投票时间间隔</span>
        <div class="relative" style="padding: 0 4px;width: 100px;">
          <p @click="scaleshow = true" style="cursor: pointer;text-align: right;margin: 0;">{{scaleshowList[form.ipLimitInterval-1]}}</p>
          <bubble v-if="scaleshow" @close="scaleshow = false">
            <ul class="f-14 c-5" style="padding: 4px 0;width: 100px;text-align: center;line-height: 24px;">
              <li v-for="(item, index) in scaleshowList" class="a flex-v-center listhover" @click="setScale(index+1)">
                <span class="flex-item">{{item}}</span>
              </li>
            </ul>
          </bubble>
        </div>
      </div>
      <div class="option-item flex-v-center">
        <div class="flex-item">开始时间</div>
        <div class="relative flex-v-center a">
          <span class="flex-v-center" style="position: absolute;right: 0;">
            <span>设置</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.startTime"></vue-datepicker-local>
        </div>
      </div>
      <div class="option-item flex-v-center">
        <div class="flex-item">截止时间</div>
        <div class="relative flex-v-center a">
          <span class="flex-v-center" style="position: absolute;right: 0;">
            <span>设置</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.endTime"></vue-datepicker-local>
        </div>
      </div>
      <div class="option-item">
        <p style="margin-top: 0;">显示结果</p>
        <div class="flex-v-center" style="padding: 0px 5px 0 5px;">
          <div class="flex-item"><radio-box text="投票后" :label="1" v-model="form.showResultCategory"/></div>
          <div class="flex-item"><radio-box text="截止时间后" :label="2" v-model="form.showResultCategory"/></div>
        </div>
      </div>
      <div class="option-item">
        <input type="text" placeholder="关键词，逗号分隔。" v-model="form.keywords"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item">会员登录投票</span>
        <switcher mode="Number" v-model="form.memberLoginLimit"/>
      </div>
      <div class="option-item flex-v-center">
        <span>初始阅读量</span>
        <input class="flex-item t-right" type="number" min="0" placeholder="请输入" v-model="form.virtualPv">
      </div>
      <div class="option-item flex-v-center">
        <span>初始分享量</span>
        <input class="flex-item t-right" type="number" min="0" placeholder="请输入" v-model="form.virtualShare">
      </div>
      <div class="option-item flex-v-center">
        <span>初始点赞量</span>
        <input class="flex-item t-right" type="number" min="0" placeholder="请输入" v-model="form.virtualDigg">
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
    getUrl: '/cri-cms-platform/vote/get.monitor'
  },
  draft: {
    getUrl: '/cri-cms-platform/voteAutoSave/getAuto.monitor'
  }
}

export default {
  name: 'app-article-add',
  components: { ArticleEditor, draggable, VueDatepickerLocal, SelectCard, SelectCardOption, AppArticleAddComment, AppArticleAddRelates, AppArticleAddAttachment, AppArticleAddThumb },
  props: [ 'from', 'id' ],
  data () {
    return {
      getend: false,
      moble_index: 0,
      list1: [],
      scaleshow1List: ['标题', '标题加图片', '标题加图片加描述'],
      scaleshowList: ['不限制', '五分钟后', '半小时后', '1小时后', '3小时后', '12小时后', '一天后'],
      scaleshow: false,
      scaleshow1: false,
      getif: false,
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
        maxVotes: 2,
        cycle: 1,
        voteAll: 1,
        content: '',
        cycleCount: 1,
        memberLoginLimit: 1,
        showResultCategory: 1,
        headThumb: {},
        templateStyle: 1,
        templateType: 1,
        ipLimitInterval: 1,
        startTime: new Date(),
        endTime: '',
        category: 1,
        listType: 1,
        headPicType: 1,
        title: '',
        titleColor: '',
        channelIds: '',
        isRecommnd: 0,
        abstarcts: '',
        keywords: '',
        virtualPv: '',
        virtualDigg: '',
        thumb: '',
        options: [],
        terminalPc: 1,
        terminalApp: 1,
        terminalWeb: 1
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
    addList () {
      this.form.options.push({
        title: '',
        othumb: {},
        thumb: '',
        link: '',
        description: '',
        virtualVotes: 0,
        width: 120,
        height: 160
      })
      this.$refs.scrollbox.scrollTo(0,this.$refs.scrollbox.clientHeight + 200)
    },
    setScale1 (data) {
      this.form.templateStyle = data
      this.scaleshow1 = false
    },
    setScale (data) {
      this.form.ipLimitInterval = data
      this.scaleshow = false
    },
    removeList (index) {
      this.form.options.splice(index, 1)
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        this.ui.channels = res || []
        this.getif1 = true
        this.getend = true
      }).catch(e => {
        console.log(e)
      })
    },
    getKeyGenerate () {
      if (this.from || this.id) return
      let doc = this.$refs.editor.getText()
      if (!doc.trim()) return
      this.$http.post('/cri-cms-platform/vote/getKeyGenerate.monitor', { doc }).then(
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
      let url = this.id ? '/cri-cms-platform/vote/update.monitor' : '/cri-cms-platform/vote/save.monitor'
      if (this.id) {
        this.form.id = this.id
      }
      let { title, titleColor, content } = this.$refs.editor
      if (!title) {
        this.$toast('请输入标题')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      if (!content) {
        this.$toast('请输入投票说明')
        return
      }
      this.form.title = title
      this.form.titleColor = titleColor
      this.form.content = content

      let obj = {...this.form}
      obj.options.forEach(item => {
        item.thumb = item.othumb.id
      })
      obj.options = JSON.stringify(obj.options)
      obj.headThumb = obj.headThumb.id
      obj.startTime = moment(obj.startTime).format('YYYY-MM-DD HH:mm:ss')
      obj.endTime = moment(obj.endTime).format('YYYY-MM-DD HH:mm:ss')

      console.log(obj)

      this.$http.post(url, obj).then(res => {
        console.log(res)
        this.ui.submited = true
        this.$router.push('/vote/list?status=all')
      }).catch(
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
  mounted () {
    if (this.from && this.id) {
      if (this.from == 'edit') {
        this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
          this.getif1 = true
          this.ui.channels = res || []
          this.$http.post('/cri-cms-platform/vote/get.monitor', {
            id: this.id
          }).then(res => {
            this.form.maxVotes = res.vote.maxVotes || 2
            this.form.cycle = res.vote.cycle || 1
            this.form.voteAll = Number(res.vote.voteAll) || 1
            this.form.content = res.vote.content || ''
            this.form.cycleCount = res.vote.cycleCount || 1
            this.form.memberLoginLimit = Number(res.vote.memberLoginLimit) || 1
            this.form.showResultCategory = res.vote.showResultCategory || 1
            this.form.headThumb = res.vote.headThumb || {}
            this.form.templateStyle = res.vote.templateStyle || 1
            this.form.templateType = res.vote.templateType || 1
            this.form.ipLimitInterval = res.vote.ipLimitInterval || 1
            this.form.startTime = res.vote.startTime || new Date()
            this.form.endTime = res.vote.endTime || ''
            this.form.category = res.vote.category || 1
            this.form.listType = 1
            this.form.headPicType = 1
            this.form.title = res.content.title || ''
            this.form.titleColor = res.content.titleColor || ''
            this.form.channelIds = res.channelIds || ''
            this.form.isRecommnd = res.content.isRecommnd || 0
            this.form.abstarcts = res.content.abstarcts || ''
            this.form.keywords = res.content.keywords || ''
            this.form.virtualPv = res.content.virtualPv || ''
            this.form.virtualDigg = res.content.virtualDigg || ''
            this.form.thumb = ''
            this.form.options = res.options || []
            this.form.terminalPc = res.content.terminalPc || 0
            this.form.terminalApp = res.content.terminalApp || 0
            this.form.terminalWeb = res.content.terminalWeb || 0

            this.thumb.thumb1 = res.content.thumb[0]

            this.form.options.forEach(item => {
              item.othumb = item.thumb
            })

            this.$nextTick(() => {
              this.$refs.editor.title = this.form.title
              this.$refs.editor.titleColor = this.form.titleColor
              this.$refs.editor.content = this.form.content
            })
            this.getif = true
          })
        }).catch(e => {
          console.log(e)
        })
        this.getChannels()
      }
    } else {
      this.getChannels()
      this.getif = true
    }
  },
  watch: {
    'form.templateType' (newValue) {
      if (newValue == 1) {
        this.form.templateStyle = this.form.templateStyle == 3 ? 2 : this.form.templateStyle
      } else {
        this.form.templateStyle = this.form.templateStyle == 1 ? 2 : this.form.templateStyle
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
  .listType2{
    width: 24%;
    margin-right: 1%;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    position: relative;
    float: left;
  }
  .listtype2_remove{
    position: absolute;
    top: 1px;
    right: 1px;
    z-index: 10;
    background: #fff;
  }
  .listType2 input, .listType2 textarea{
    border: 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 6px;
    height: 20px;
  }
  .listaddbtn{
    padding: 10px 20px;
    border: 1px solid #ddd;
    text-align: right;
    line-height: 30px;
  }
  .listType1{
    padding: 10px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    border-radius: 6px;
  }
  .listType1 input, .listType1 textarea{
    margin-right: 10px;
    height: 30px;
    border: 0;
    border-bottom: 1px solid #ddd;
    padding: 0 10px;
  }
  .movelist{
    background: #008eff;
    color: #008eff;
    opacity: 0.5;
  }
  .setlistbox{
    max-width: 900px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .setlistbox:after{
    content: '';
    display: block;
    clear: both;
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
  .listbox{
    width: 900px;
    margin: 0 auto;
    padding-bottom: 100px;
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
