<template>
    <div class="app-sites flex-col c-6">
      <div class="af-topbar">
        <span class="f-18">创建推送</span>
      </div>

      <div class="flex-item scroll-y bg-e relative">
        <div class="box">
          <textarea v-model="text" placeholder="推送内容..."></textarea>

          <div class="push_box">
            <div class="radio_box_push">
              <span>推送方式：</span>

              <div class="flex-item"><radio-box text="全部推送" :label="0" v-model="device"/></div>
              <div class="flex-item"><radio-box text="安卓" :label="1" v-model="device"/></div>
              <div class="flex-item"><radio-box text="IOS" :label="2" v-model="device"/></div>
            </div>

            <div class="radio_box_push">
              <span>延迟推送：</span>

              <div class="flex-item"><radio-box text="是" :label="1" v-model="delayPush"/></div>
              <div class="flex-item"><radio-box text="否" :label="0" v-model="delayPush"/></div>

              <span v-if="delayPush == 1" style="float: right">
                时间：
                <vue-datepicker-local show-buttons clearable v-model="delayPushTime" format="YYYY-MM-DD HH:mm:ss"></vue-datepicker-local>
              </span>
            </div>

            <div class="radio_box_push"></div>

            <div style="display: flex;align-items: start;justify-content: space-between;">
              <app-article-add-relates @changetext="changetext" v-if="getif" :channels="ui.channels.channels" v-model="list" :channelId="form.channelIds" title="文章" icon="book" url="/cri-cms-platform/special/getArticList.monitor"></app-article-add-relates>
              <btn @click="submit">推送</btn>
            </div>
          </div>



        </div>
      </div>

    </div>

</template>

<script>
import AppArticleAddRelates from './relates'
import VueDatepickerLocal from 'vue-datepicker-local'
import moment from 'moment'

export default {
  components: { AppArticleAddRelates, VueDatepickerLocal },
  data () {
    return {
      getif: false,
      list: [],
      device: 0,
      delayPush: 0,
      text: '',
      delayPushTime: new Date(),
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
        contentId: this.list.selected[0].id,
        content: encodeURI(this.text),
        device: this.device == 0 ? '1,2' : this.device,
        delayPush: this.delayPush,
        delayPushTime: this.delayPush == 1 ? moment(this.delayPushTime).format('YYYY-MM-DD HH:mm:ss') : ''
      }

      this.$http.post('/cri-cms-platform/appPush/save.monitor', obj).then(res => {
        console.log(res)
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
  .radio_box_push{
    display: flex;
    align-items: center;
    justify-content: flex-start !important;
    margin-bottom: 20px;
  }
  .radio_box_push .flex-item{
    max-width: 200px;
  }
  .push_box{
    padding: 20px;
    background: #fff;
    display: block !important;
    border-radius: 10px;
  }
</style>
