<template>
  <div class="bigbigbox">
    <div style="width: 100%;background: #fff;">
      <div class="topbox">
        <div v-if="getend" class="option-item flex-v-center relative a" @click="ui.channelShow=!ui.channelShow">
          <span class="flex-item">{{channelNames}}</span>
          <i class="icon f-20 c-a">keyboard_arrow_down</i>
          <bubble v-if="ui.channelShow" pos="bottom" align="center" @close="ui.channelShow=false">
            <div style="padding: 10px 0;width: 280px;">
              <tree :data="ui.channels" pid-txt="channelPartentId" nameTxt="channelName" show-checkbox :checked-list.sync="channelIds"></tree>
            </div>
          </bubble>
        </div>
      </div>
      <div style="padding: 0 10px;">
        <input v-model="form.title" class="title" type="text" placeholder="请输入标题">
        <textarea v-model="form.abstarcts" @change="" placeholder="摘要"></textarea>
      </div>
      <div class="option-item" style="margin: 0 10px;background: #fff;padding: 10px;">
        <div class="flex-v-center">
          <span class="flex-item" style="font-size: 14px;">是否显示头图</span>
          <switcher mode="Number" v-model="form.hasThumb"/>
        </div>
      </div>
      <article-editor ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>
    </div>

    <div class="btn" @click="btn">发布文章</div>
  </div>
</template>

<script>
import ArticleEditor from './editor'

const from = {
  article: {
    getUrl: '/cri-cms-platform/article/get.monitor'
  },
  draft: {
    getUrl: '/cri-cms-platform/articleAutoSave/getAuto.monitor'
  }
}

export default {
  name: 'moblePush',
  components: { ArticleEditor },
  data () {
    return {
      minh: document.documentElement.clientHeight,
      ui: {
        channelShow: false,
        channels: []
      },
      getend: false,
      form: {
        title: '',
        content: '',
        channelIds: '',
        abstarcts: '',
        hasThumb: 1
      }
    }
  },
  watch: {
    'form.abstarcts' (newValue) {
      this.form.abstarcts = newValue.substring(0, 128)
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
  created () {
    this.getChannels()
  },
  methods: {
    btn () {
      let { content } = this.$refs.editor
      if (!this.form.title) {
        this.$toast('请输入标题')
        return
      }
      if (!content) {
        this.$toast('请输入内容')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      let othis = this
      this.$confirm({
        title: '发布确认',
        text: '您确定将文章发布到所选栏目中吗？',
        btns: ['取消', '发布'],
        color: 'red',
        yes () {
          othis.submit()
        },
        no () {

        }
      })
    },
    submit () {
      let { content } = this.$refs.editor
      let form = {...this.form}
      form.content = content
      this.$http.post('/cri-cms-platform/article/mobileDispatchSave.monitor', form).then(res => {
        console.log(res)
        this.$toast('发布成功')
        this.form = {
          title: '',
          content: '',
          channelIds: '',
          abstarcts: ''
        }
        this.$refs.editor.content = ''
      })
    },
    getChannels () {
      this.$http.post('/cri-cms-platform/article/getChannels.monitor').then(res => {
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
    }
  },
  mounted () {
    let obox = document.getElementById('app')
    obox.style.minWidth = '0px'
    obox.style.position = 'absolute'
    obox.style.overflow = 'auto'
  }
}
</script>

<style scoped>
  .bigbigbox{
    width: 100%;
  }
  textarea{
    outline: none;
    width: 100%;
    height: 60px;
    resize: none;
    padding: 6px;
    box-sizing: border-box;
  }
  .title{font-size: 15px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 10px 6px;color: #555;box-sizing: border-box;
  }
  #app{
    min-width: auto !important;
  }
  .topbox{
    background: #fff;
    border-bottom: 1px solid #ddd;
    padding: 10px;
  }
  .btn{
    width: 100%;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
    background: #00a0e9;
    color: #fff;
    z-index: 9999;
  }
</style>

