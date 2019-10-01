<template>
  <div class="settings-common flex-col c-6">
    <div class="af-topbar">
      <span class="f-18">通用设置</span>
    </div>
    <div class="flex-item scroll-y content relative">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 10;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div v-if="!loading" class="setting-card">
        <ul>
          <li v-for="item in list" :key="item.id" v-if="item.key != 'watermark_path'">
            <div v-if="item.key != 'mobileDispatch'" class="flex">
              <span>{{item.explain}}</span>
              <div class="flex-item"></div>
              <switcher v-if="switcherShow(item.key)" mode="Number" v-model="item.value" @change="switchValue(item.app, item.key, item.value)"></switcher>
              <span v-else class="flex-v-center" style="line-height: 25px;cursor: pointer;" @click="openSettingBox(item)">{{item.value | style | sharemodel}}<i class="icon">keyboard_arrow_right</i></span>
            </div>
            <div v-if="item.key == 'mobileDispatch'">
              <span>{{item.explain}}</span>
              <div class="flex" style="justify-content: center;align-items: center;">
                <app-article-add-thumb scale v-model="item.value[0]" @setMobileDispatch="setMobileDispatch(item)" height="160px" style="margin-bottom: 8px;"></app-article-add-thumb>
              </div>
            </div>
          </li>
          <li v-if="watermarkShow">
            <p>选择水印图片</p>
            <div style="text-align: center">
              <label>
                <i v-if="!watermark" class="icon c-a" style="font-size: 50px;">add_photo_alternate</i>
                <img v-if="watermark" :src="watermark" alt="" style="width: 100px;">
                <input type="file" ref="fileimg" @change="updateImg($event)" accept="image/*" style="display: none">
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <select-card :value="item.value" v-if="styleShow" title="风格设置" width="600px" maskClick @close="styleShow = false">
      <select-card-option value="red" @click="switchOption(item, 'red')">红色</select-card-option>
      <select-card-option value="blue" @click="switchOption(item, 'blue')">蓝色</select-card-option>
    </select-card>

    <select-card :value="item.value" v-if="imageratioShow" title="图片尺寸" width="600px" maskClick @close="imageratioShow = false">
      <select-card-option value="16:10" @click="switchOption(item, '16:10')">16:10</select-card-option>
      <select-card-option value="4:3" @click="switchOption(item, '4:3')">4:3</select-card-option>
      <select-card-option value="1:1" @click="switchOption(item, '1:1')">1:1</select-card-option>
    </select-card>

    <select-card :value="item.value" v-if="sharemodelShow" title="分享显示形式" width="600px" maskClick @close="sharemodelShow = false">
      <select-card-option value="logo" @click="switchOption(item, 'logo')">显示Logo</select-card-option>
      <select-card-option value="image" @click="switchOption(item, 'image')">显示缩略图</select-card-option>
    </select-card>

    <select-card :value="item.value" v-if="titlemaxShow" title="标题最多行数" width="600px" maskClick @close="titlemaxShow = false">
      <select-card-option :value="2" @click="switchOption(item, 2)">2</select-card-option>
      <select-card-option :value="3" @click="switchOption(item, 3)">3</select-card-option>
      <select-card-option :value="4" @click="switchOption(item, 4)">4</select-card-option>
      <select-card-option :value="5" @click="switchOption(item, 5)">5</select-card-option>
    </select-card>
  </div>
</template>

<script>
import SelectCard from '@/components/select-card/index'
import SelectCardOption from '@/components/select-card/option'
import AppArticleAddThumb from './thumb'

export default {
  name: 'settings-common',
  components: { SelectCard, SelectCardOption, AppArticleAddThumb },
  data () {
    return {
      loading: true,
      list: [],
      item: {},
      watermark: null,
      watermarkid: null,
      styleShow: false,
      imageratioShow: false,
      sharemodelShow: false,
      titlemaxShow: false,
      watermarkShow: false
    }
  },
  methods: {
    setMobileDispatch (item) {
      console.log(item)
      let imglist = JSON.stringify(item.value)
      this.$http.post('/cri-cms-platform/site/setting/update.monitor', {
        app: item.app,
        key: item.key,
        value: imglist,
        explain: item.explain
      }).then(res => {

      }).catch(
        res => {
          this.getList()
          this.$toast(res.msg ? res.msg : '修改失败')
        }
      )
    },
    updateImg (event) {
      let othis = this
      var fileimg = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(fileimg)
      reader.onloadend = function () {
        othis.watermark = this.result
        othis.$http.post('/cri-cms-platform/site/setting/uploadWaterMarkPic.monitor', {
          id: othis.watermarkid,
          file: fileimg
        }).then(res => {
          console.log(res)
          othis.$store.commit('setWaterImg', res[0].waterMarkPath)
        })
      }
    },
    getList () {
      this.loading = true
      let siteId = sessionStorage.siteId || localStorage.siteId
      this.$http.post('/cri-cms-platform/site/setting/index.monitor', { siteId }).then(
        res => {
          console.log(res)
          for (let i = 0; i < res.length; i++) {
            let temp = Number(res[i].value)
            res[i].value = isNaN(temp) ? res[i].value : temp
            if (res[i].key == 'watermark_path') {
              this.watermarkid = res[i].id
              if (res[i].value != 1) {
                this.watermark = res[i].value
              }
            }
            if (res[i].key == 'watermark') {
              this.watermarkShow = res[i].value == 1 ? true : false
            }
            if (res[i].key == 'mobileDispatch') {
              res[i].value = JSON.parse(res[i].value)
            }
          }
          this.list = res
          console.log(res)
          this.loading = false
        }
      )
    },
    switcherShow (key) {
      if (key === 'style') return false
      if (key === 'imageratio') return false
      if (key === 'sharemodel') return false
      if (key === 'titlemax') return false
      return true
    },
    openSettingBox (item) {
      this.item = item
      this[item.key + 'Show'] = true
    },
    switchValue (app, key, value, isOption) {
      let data = {
        app,
        key,
        value
      }
      this.$http.post('/cri-cms-platform/site/setting/update.monitor', data).then(
        res => {
          if (isOption) this[key + 'Show'] = false
          if (key == 'watermark') {
            this.watermarkShow = !this.watermarkShow
          }
        }
      ).catch(
        res => {
          this.getList()
          this.$toast(res.msg ? res.msg : '修改失败')
        }
      )
    },
    switchOption (item, value) {
      item.value = value
      this.switchValue(item.app, item.key, item.value, true)
    }
  },
  filters: {
    style (value) {
      if (value === 'red') return '红色'
      if (value === 'blue') return '蓝色'
      return value
    },
    sharemodel (value) {
      if (value === 'logo') return '显示logo'
      if (value === 'image') return '显示缩略图'
      return value
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
  .settings-common{background: #fafafa;
    .content {background: #eee;}
    .setting-card {max-width: 800px;margin: 20px auto;border-radius: 10px;padding-left: 20px;background: #fff;
    }
    .setting-card > ul > li {padding: 12px 20px 12px 0;border-bottom: 1px solid #e1e1e1;
      &:last-child {border-bottom: 0;}
    }
  }
</style>
