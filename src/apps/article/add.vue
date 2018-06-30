<template>
<div class="abs bg-f flex c-6 f-14 app-article-add">
  <div class="flex-item flex-col">
    <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
      <div class="a flex-v-center" @click="$router.back()">
        <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
        <span class="f-18">返回</span>
      </div>
      <div class="flex-item"></div>
      <div class="flex-v-center">
        <btn big flat style="margin-right: 15px;">递交审核</btn>
        <btn big flat style="margin-right: 10px;">预览</btn>
        <btn big style="margin-right: 20px;" @click="submit">发布</btn>
        <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <article-editor ref="editor"></article-editor>
    </div>
  </div>
  <div class="art-options c-4 scroll-y" :style="{width: ui.optionShow ? '320px' : '0px'}">
    <div style="width: 280px;margin: 0 20px;">
      <div class="option-item flex-v-center relative a" @click="ui.channelShow=!ui.channelShow">
        <span class="flex-item">{{channelNames}}</span>
        <i class="icon f-20 c-a">keyboard_arrow_down</i>
        <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
          <ul class="bubble-list">
            <li v-for="item in ui.channels" :key="item.id">
              <check-box :text="item.channelName" :label="item.id" v-model="channelIds"/>
            </li>
          </ul>
        </bubble>
      </div>
      <div class="option-item flex-v-center">
        <icon-btn small v-tooltip:top="'推荐'" :class="{ isRecommnd: form.isRecommnd }" @click="form.isRecommnd = ~~!form.isRecommnd">thumb_up</icon-btn>
        <span class="flex-item"></span>
        <icon-btn small v-tooltip:top="'发布到 PC 页面'">computer</icon-btn>
        <icon-btn small v-tooltip:top="'发布到客户端'">phone_iphone</icon-btn>
        <icon-btn small v-tooltip:top="'发布到移动网页'">public</icon-btn>
      </div>
      <div style="margin: 10px 0;">
        <div class="add-photo-btn a flex-center" style="height:158px;margin-bottom: 8px;">
          <i class="icon f-32 c-a">add_photo_alternate</i>
        </div>
        <div class="flex">
          <div class="add-photo-btn a flex-item flex-center" style="height:120px;margin-right: 8px;">
            <i class="icon f-32 c-a">add_photo_alternate</i>
          </div>
          <div class="add-photo-btn a flex-item flex-center" style="height:120px;">
            <i class="icon f-32 c-a">add_photo_alternate</i>
          </div>
        </div>
        <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <div class="flex-item"><radio-box text="默认" :label="1" v-model="form.thumbType"/></div>
          <div class="flex-item"><radio-box text="三图" :label="2" v-model="form.thumbType"/></div>
          <div><radio-box text="16:9 大图" style="margin: 0;" :label="3" v-model="form.thumbType"/></div>
        </div>
      </div>
      <div class="option-item">
        <textarea placeholder="摘要，限制 128 字。" v-model="form.abstarcts"></textarea>
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
      <div class="option-item">
        <input type="number" placeholder="权重，范围 0 ~ 100" v-model="form.weight">
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item">水印</span>
        <switcher mode="Number" v-model="form.isWatermarked"/>
      </div>
      <div class="option-item flex-v-center">
        <div class="flex-item">定时上线</div>
        <div class="relative flex-v-center a">
          <span v-if="!form.upLineTime" class="flex-v-center" style="position: absolute;right: 0;">
            <span>设置</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.upLineTime"></vue-datepicker-local>
        </div>
      </div>
      <div class="option-item flex-v-center">
        <div class="flex-item">定时下线</div>
        <div class="relative flex-v-center a">
          <span v-if="!form.downLineTime" class="flex-v-center" style="position: absolute;right: 0;">
            <span>设置</span>
            <i class="icon f-18 c-a">keyboard_arrow_down</i>
          </span>
          <vue-datepicker-local show-buttons clearable format="YYYY-MM-DD HH:mm:ss" v-model="form.downLineTime"></vue-datepicker-local>
        </div>
      </div>
      <div class="option-item flex-v-center">
        <span>初始阅读量</span>
        <input class="flex-item t-right" type="number" placeholder="请输入" v-model="form.virtualPv">
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
        <div class="flex-v-center" style="margin-top: 10px;">
          <i class="icon f-20 c-8" style="margin-right: 10px;">comment</i>
          <span class="flex-item">已添加 0 条评论</span>
          <span class="blue a">查看</span>
        </div>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">collections</i>
        <span class="flex-item">添加组图</span>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">book</i>
        <span class="flex-item">添加相关阅读</span>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">attach_file</i>
        <span class="flex-item">添加附件</span>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">how_to_vote</i>
        <span class="flex-item">添加投票挂件</span>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">link</i>
        <span class="flex-item">关联投票链接</span>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">link</i>
        <span class="flex-item">关联活动报名链接</span>
      </div>
      <div class="option-item flex-v-center blue a">
        <i class="icon f-20  add-other-icon">movie</i>
        <span class="flex-item">添加视频</span>
      </div>
    </div>
  </div>
  <div v-if="ui.loading" class="abs flex-center bg-light-rgb-5" style="z-index: 10;">
    <loading size="50"/>
  </div>
</div>
</template>

<script>
import ArticleEditor from './editor'
import VueDatepickerLocal from 'vue-datepicker-local'

export default {
  name: 'app-article-add',
  components: { ArticleEditor, VueDatepickerLocal },
  data () {
    return {
      ui: {
        loading: false,
        optionShow: true,
        channelShow: false,
        channels: [],
        realetes: []
      },
      form: {
        app: 'ARTICLE',
        title: '',
        content: '',
        channelIds: '',
        isOpenComment: 0,
        isOriginal: 0,
        originalFrom: '',
        originalUrl: '',
        isRecommnd: 0,
        abstarcts: '',
        keywords: '',
        author: '',
        weight: '',
        isWatermarked: 0,
        upLineTime: '',
        downLineTime: '',
        virtualPv: '',
        virtualDigg: '',
        hasThumb: 0,
        thumbType: 1,
        thumb: ''
      }
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
    getChannels () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        this.ui.channels = res || []
      }).catch(e => {
        console.log(e)
      })
    },
    getRealetes () {
      this.$http.post('/cri-cms-platform/article/realtes.monitor').then(
        res => {
          this.ui.realetes = res || []
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    },
    disabledDate (time, format) {
      return time <= new Date()
    },
    submit () {
      let { title, content, getText } = this.$refs.editor
      if (!title) {
        this.$toast('请输入标题')
        return
      }
      let text = getText().replace(/\s/g, '')
      if (!text) {
        this.$toast('请输入内容')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      this.form.title = title
      this.form.content = content
      this.$http.post('/cri-cms-platform/article/save.monitor', this.form).then(
        res => {
          this.$router.replace('/article/list?scope=all&status=all')
        }
      ).catch(
        res => {
          console.log(res)
        }
      )
    }
  },
  created () {
    this.getChannels()
    this.getRealetes()
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
  .bubble-list{padding: 10px 0;
    li{padding: 5px 15px;}
    li:hover{background: #eee;}
  }
  .isRecommnd {color: #018be6;}
  .datepicker::before {content: none}
}
</style>
