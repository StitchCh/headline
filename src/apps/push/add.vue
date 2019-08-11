<template>
    <div class="app-sites flex-col c-6">
      <div class="af-topbar">
        <span class="f-18">创建推送</span>
      </div>

      <div class="flex-item scroll-y bg-e relative">
        <div class="box">
          <textarea v-model="text" placeholder="推送内容..."></textarea>
          <div>
            <app-article-add-relates @changetext="changetext" v-if="getif" :channels="ui.channels.channels" v-model="list" :channelId="form.channelIds" title="文章" icon="book" url="/cri-cms-platform/special/getArticList.monitor"></app-article-add-relates>
            <btn @click="submit">推送</btn>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
import AppArticleAddRelates from './relates'

export default {
  components: { AppArticleAddRelates },
  data () {
    return {
      getif: false,
      list: [],
      text: '',
      ui: {
        channelIds: ''
      },
      form: {
        channelIds: null
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
      // console.log(this.ui.channels.channels.find)
      return this.channelIds.map(val => this.ui.channels.find(v => v.id === val).channelName).join('，')
    }
  },
  beforeMount () {
    this.getChannels()
  },
  methods: {
    getChannels () {
      this.$http.post('/cri-cms-platform/sysRoles/getChannels.monitor').then(res => {
        this.ui.channels = res || []
        this.getif = true
      }).catch(e => {
        console.log(e)
      })
    },
    changetext (data) {
      this.text = data.abstracts
    },
    submit () {
      let obj = {

      }

      this.$http.post('/cri-cms-platform/appPush/save.monitor', obj).then(res => {
        console.log(res)
        this.$router.push('/push/list')
      })
    }
  }
}
</script>

<style scoped>
  .box{
    max-width: 1000px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .box textarea{
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    margin-bottom: 20px;
    height: 100px;
  }
  .box>div{
    display: flex;
    align-items: start;
    justify-content: space-between;
  }
  .operlog_list{
    width: calc(100% - 200px);
  }
  .search_navbox{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search_navbox .datepicker-range .datepicker-popup{
    width: 415px !important;
  }
</style>
