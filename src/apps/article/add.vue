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
        <span class="flex-item">选择栏目</span>
        <i class="icon f-20 c-a">keyboard_arrow_down</i>
        <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
          <ul class="bubble-list">
            <li v-for="item in ui.channels" :key="item.id">
              <check-box :text="item.name"/>
            </li>
          </ul>
        </bubble>
      </div>
      <div class="option-item flex-v-center">
        <icon-btn small v-tooltip:top="'推荐'">thumb_up</icon-btn>
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
          <div class="flex-item"><radio-box text="默认"/></div>
          <div class="flex-item"><radio-box text="三图"/></div>
          <div><radio-box text="16:9 大图" style="margin: 0;"/></div>
        </div>
      </div>
      <div class="option-item">
        <textarea placeholder="摘要，限制 128 字。"></textarea>
      </div>
      <div class="option-item">
        <input type="text" placeholder="关键词，逗号分隔。"/>
      </div>
      <div class="option-item flex-v-center">
        <span class="flex-item">©原创声明</span>
        <switcher/>
      </div>
      <div class="option-item flex">
        <input type="text" class="flex-item" placeholder="来源名称">
        <input type="text" class="flex-item" placeholder="来源URL">
      </div>
      <div class="option-item">
        <input type="text" placeholder="作者，逗号分隔">
      </div>
      <div class="option-item">
        <input type="text" placeholder="权重，范围 0 ~ 100">
      </div>
      <div class="option-item flex-v-center">
        <div class="flex-item">定时上线</div>
        <div class="relative flex-v-center a">
          <span>设置</span>
          <i class="icon f-18 c-a">keyboard_arrow_down</i>
        </div>
      </div>
      <div class="option-item flex-v-center">
        <div class="flex-item">定时下线</div>
        <div class="relative flex-v-center a">
          <span>设置</span>
          <i class="icon f-18 c-a">keyboard_arrow_down</i>
        </div>
      </div>
      <div class="option-item flex-v-center">
        <span>初始阅读量</span>
        <input class="flex-item t-right" type="number" placeholder="请输入">
      </div>
      <div class="option-item flex-v-center">
        <span>初始点赞量</span>
        <input class="flex-item t-right" type="number" placeholder="请输入">
      </div>
      <div class="option-item">
        <div class="flex-v-center">
          <span class="flex-item">开启评论</span>
          <switcher/>
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

export default {
  name: 'app-article-add',
  components: { ArticleEditor },
  data () {
    return {
      ui: {
        loading: false,
        optionShow: true,
        channelShow: false,
        channels: []
      },
      form: {
        title: '',
        content: '',
        channelIds: []
      }
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
      console.log(title, content, text)
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
  .bubble-list{padding: 10px 0;
    li{padding: 5px 15px;}
    li:hover{background: #eee;}
  }
}
</style>
