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
        <!--<btn big flat style="margin-right: 10px;" @click="autoSave">保存草稿</btn>-->
        <btn big style="margin-right: 20px;" @click="submit">保存</btn>
        <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
      </div>
    </div>
    <div class="flex-item scroll-y">
      <article-editor v-if="getif" :otitle="form.title" ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>

      <div style="max-width: 900px;margin: 0 auto;padding: 20px 10px;border-top: 1px solid #ddd;border-bottom: 1px solid #ddd;">
        <h2>选择头图</h2>
        <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <div class="flex-item"><radio-box text="单图" :label="1" v-model="form.headPicType"/></div>
          <div class="flex-item"><radio-box text="幻灯片" :label="2" v-model="form.headPicType"/></div>
        </div>
        <div v-show="form.headPicType == 1" style="max-width: 300px;margin: 20px;">
          <app-article-add-thumb v-if="getif" v-model="headList_type1" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
          <p style="font-size: 12px;color: #f00;">建议择尺寸为16：10的图片作为头图</p>
        </div>
        <div v-show="form.headPicType == 2">
          <app-article-add-relates v-if="getif && getif1" :channels="ui.channels" :limit="form.headPicType" v-model="headList_type2" :channelId="form.channelIds" title="文章" icon="book" url="/cri-cms-platform/special/getArticList.monitor"></app-article-add-relates>
        </div>
      </div>

      <div class="setlistbox">
        <div style="width: 80%;float: right">
          <div class="list_content">
            <div v-for="(item, index) in list">
              <div v-if="moble_index == item.id">
                <p class="list_content_title">
                  {{item.name}}
                  <span v-if="form.listType == 2" style="float: right">
                  时间：
                  <vue-datepicker-local v-model="item.time" format="YYYY-MM-DD" show-buttons></vue-datepicker-local>
                </span>
                </p>
                <div style="padding: 10px;">
                  <app-article-add-relates v-if="getif" :channels="ui.channels" v-model="item.list" :channelId="form.channelIds" title="文章" icon="book" url="/cri-cms-platform/special/getArticList.monitor"></app-article-add-relates>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="width: 20%;float: left;padding-top: 10px;">

          <draggable element="div" :options="{ghostClass:'movelist'}" v-model="list" >
            <div v-for="(item,index) in list" @click="conl(item.id)" class="channel-tree-item flex-v-center">
              <div class="flex-item flex-v-center" style="height: 40px;overflow:hidden;">
                <span class="flex-item channel-name" v-if="!item.edit">{{item.name}}</span>
                <input type="text" v-else v-model="item.name" class="flex-item f-14">
              </div>
              <icon-btn small v-if="item.edit" @click.native.stop="item.edit = false">add</icon-btn>
              <icon-btn small v-if="!item.edit" @click.native.stop="item.edit = true">edit</icon-btn>
              <icon-btn small @click="removeList(index)" >delete</icon-btn>
            </div>
          </draggable>

          <div @click="addlist" class="channel-tree-item channel-tree-item1 flex-v-center" style="cursor: pointer;">
            <icon-btn small style="margin-right: 10px;">add</icon-btn>
            <span class="flex-item channel-name" style="height: 40px;line-height: 40px;">添加板块</span>
          </div>

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
          <!--<div><radio-box text="16:10 大图" style="margin: 0;" :label="3" v-model="form.thumbType"/></div>-->
        <!--</div>-->
      </div>

      <div class="option-item">
        <div class="flex-v-center">
          <span class="flex-item">列表中是否显示图片</span>
          <switcher mode="Number" v-model="form.isListShowPic"/>
        </div>
      </div>

      <div>
        <div class="flex-v-center" style="padding: 10px 5px 0 5px;">
          <div class="flex-item"><radio-box text="微图模式" :label="1" v-model="form.listType"/></div>
          <div class="flex-item"><radio-box text="时间轴模式" :label="2" v-model="form.listType"/></div>
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
          <vue-datepicker-local show-buttons :clearable="false" format="YYYY-MM-dd HH:mm:ss" v-model="form.createDate"></vue-datepicker-local>
        </div>
      </div>
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
      idnumber: 0,
      scaleshow: false,
      getend: false,
      moble_index: 1,
      list: [],
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
        listType: 1,
        headPicType: 1,
        headJson: '',
        headJsonId: '',
        specialListId: '',
        specialListJson: '',
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
        // isOpenComment: 1,
        // isOriginal: 0,
        // originalFrom: '',
        // originalUrl: '',
        isRecommnd: 0,
        abstarcts: '',
        keywords: '',
        // author: '中俄头条',
        weight: '',
        // isWatermarked: 0,
        // upLineTime: '',
        // downLineTime: '',
        virtualPv: '',
        // virtualComment: '',
        // virtualShare: '',
        virtualDigg: '',
        // hasThumb: 0,
        // thumbType: 1,
        thumb: '',
        isListShowPic: ''
        // terminalPc: 0,
        // terminalApp: 0,
        // terminalWeb: 0,
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
      // console.log(this.ui.channels.channels.find)
      return this.channelIds.map(val => this.ui.channels.find(v => v.id === val).channelName).join('，')
    }
  },
  methods: {
    conl (id) {
      this.moble_index = id
    },
    beforeClose () {
      if (this.ui.submited) {
        clearInterval(this.autoSaveTimer)
        window.opener = null
        //window.close()
        this.$router.go(-1)
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
          //window.close()
          that.$router.go(-1)
        },
        no () {

        }
      })
    },
    removeList (index) {
      this.list.splice(index, 1)
    },
    addlist () {
      if (this.form.channelIds == '') {
        this.$toast('请选择频道')
        return false
      }
      this.idnumber++
      this.list.push({
        name: '新建板块',
        time: this.nowDate,
        edit: false,
        id: this.idnumber,
        list: {
          selected: [],
          unselected: []
        }
      })
    },
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
      let url = this.id ? '/cri-cms-platform/special/update.monitor' : '/cri-cms-platform/special/save.monitor'
      let { title, titleColor } = this.$refs.editor
      if (!title) {
        this.$toast('请输入标题')
        return
      }
      if (!this.form.channelIds) {
        this.$toast('请选择栏目')
        return
      }
      if (!this.form.thumb) {
        this.$toast('请选头图')
        return
      }
      this.form.title = title
      this.form.titleColor = titleColor

      let obj = {...this.form}

      let jsonarr = []
      this.list.forEach((item, index, arr) => {
        let jsonsarr = []
        if (item.list.selected.length == 0) {
          this.$toast('板块内容不能为空')
          return false
        }
        item.list.selected.forEach((item1, index1) => {
          jsonsarr[index1] = {
            id: item1.id,
            abstarcts: item1.abstracts,
            order: index1,
            title: item1.title,
            createDate: item1.createDate,
            thumb: item1.thumb.indexOf('[') >= 0 ? JSON.parse(item1.thumb)[0].url : item1.thumb
          }
          if (obj.specialListId.indexOf(item1.id) < 0) {
            obj.specialListId += (item1.id + ',')
          }
        })
        let oDate = arr[index].time
        jsonarr[index] = {
          templateName: item.name,
          templateContentListList: jsonsarr,
          orderDate: obj.listType == 2 ? oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate() : ''
        }
      })

      obj.specialListJson = JSON.stringify(jsonarr)

      if (obj.headPicType == 1) {
        let data = {
          thumb: this.headList_type1.url
        }
        obj.headJson = JSON.stringify([ data ])
      } else if (obj.headPicType == 2) {
        let arr = []
        this.headList_type2.selected.forEach(item => {
          let data = {
            abstarcts: item.abstracts,
            id: item.id,
            createDate: item.createDate,
            thumb: item.thumb.indexOf('[') >= 0 ? JSON.parse(item.thumb)[0].url : item.thumb,
            title: item.title
          }
          arr.push(data)
          obj.headJsonId += (item.id + ',')
        })
        obj.headJson = JSON.stringify(arr)
      }
      // obj.thumb = obj.thumb.id

      if (this.id) {
        obj.specialId = obj.id
        obj.id = this.id
      }

      if (this.form.createDate) obj.createDate = moment(this.form.createDate).format('YYYY-MM-dd HH:mm:ss')

      obj.isListShowPic = obj.isListShowPic == 1 ? 0 : 1

      this.$http.post(url, obj).then(res => {
        this.ui.submited = true
        // window.opener.location.reload()
        // window.opener = null
        //window.close()
        this.$router.go(-1)
      }).catch(
        res => {
          this.$toast(res || res.msg || '保存失败')
          console.log(res)
        }
      )

      // let form = {...this.form}
      // if (form.createDate) form.createDate = moment(form.createDate).format('YYYY-MM-dd HH:mm:ss')
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
        this.$http.post('/cri-cms-platform/special/queryDetail.monitor', {
          id: this.id
        }).then(res => {
          this.form = res.special
          this.form.specialListId = ''
          this.form.headJsonId = ''
          if (res.special.headJson === 'object') {
            this.form.headJson = res.special.headJson
          } else {
            this.form.headJson = JSON.parse(res.special.headJson)
          }
          if (res.special.thumb) {
            this.form.thumb = JSON.parse(res.special.thumb)
            this.thumb.thumb1 = res.special.thumb[0]
          }
          this.form.isListShowPic = Number(res.special.isListShowPic)
          this.form.channelIds = res.channelIds || ''
          this.form.specialListJson = JSON.parse(this.form.specialListJson)

          for (let i = 0; i < res.special.specialListJson.length; i++) {
            this.idnumber++
            this.list.push({
              id: this.idnumber,
              name: res.special.specialListJson[i].templateName,
              time: res.special.specialListJson[i].orderDate ? res.special.specialListJson[i].orderDate : this.nowDate,
              edit: false,
              list: {
                selected: res.special.specialListJson[i].templateContentListList
              }
            })
          }

          console.log(this.list)

          if (this.form.headPicType == 1 && this.form.headJson.length != 0) {
            this.headList_type1 = {
              url: this.form.headJson[0].thumb
            }
          } else if (this.form.headPicType == 2 && this.form.headJson.length != 0) {
            this.headList_type2 = {
              selected: this.form.headJson
            }
          }
          this.form.isListShowPic = this.form.isListShowPic == 1 ? 0 : 1
          this.getif = true
        })
      }
    } else {
      this.getif = true
      this.form.virtualPv = 400 + parseInt(Math.random() * 200)
      this.form.virtualShare = 400 + parseInt(Math.random() * 200)
      this.form.virtualDigg = 400 + parseInt(Math.random() * 200)
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
  .movelist{
    background: #008eff;
    color: #008eff;
    opacity: 0.5;
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
