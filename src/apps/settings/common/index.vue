<template>
  <div class="settings-common flex-col">
    <div class="af-topbar">
      <span class="f-18">通用设置</span>
    </div>
    <div class="flex-item scroll-y content relative">
      <transition name="fade">
        <div v-if="loading" class="abs" style="background: #eee;z-index: 10;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div v-if="!loading" class="setting-card">
        <ul>
          <li class="flex">
            <span>是否设置水印</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_watermark" @change="switchValue('system_watermark')"></switcher>
          </li>
          <li class="flex">
            <span>是否开启自动相关阅读</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_autoread" @change="switchValue('system_autoread')"></switcher>
          </li>
          <li class="flex">
            <span>是否开启自动推荐图集</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_autorecommend" @change="switchValue('system_autorecommend')"></switcher>
          </li>
          <li class="flex">
            <span>专题-阅读量是否显示</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.special_pvshow" @change="switchValue('special_pvshow')"></switcher>
          </li>
          <li class="flex">
            <span>专题-通讯社是否显示</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.special_agencyshow" @change="switchValue('special_agencyshow')"></switcher>
          </li>
          <li class="flex">
            <span>专题-发布时间是否显示</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.special_releasetimeshow" @change="switchValue('special_releasetimeshow')"></switcher>
          </li>
          <li class="flex">
            <span>风格设置</span>
            <div class="flex-item"></div>
            <span class="flex-v-center" style="line-height: 25px;cursor: pointer;" @click="styleShow = true">{{settings.system_style | style}}<i class="icon">keyboard_arrow_right</i></span>
          </li>
          <li class="flex">
            <span>图片尺寸</span>
            <div class="flex-item"></div>
            <span class="flex-v-center" style="line-height: 25px;cursor: pointer;" @click="imageratioShow = true">{{settings.system_imageratio}}<i class="icon">keyboard_arrow_right</i></span>
          </li>
          <li class="flex">
            <span>是否显示小印章</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_sealshow" @change="switchValue('system_sealshow')"></switcher>
          </li>
          <li class="flex">
            <span>分享显示形式</span>
            <div class="flex-item"></div>
            <span class="flex-v-center" style="line-height: 25px;cursor: pointer;" @click="sharemodelShow = true">{{settings.system_sharemodel | sharemodel}}<i class="icon">keyboard_arrow_right</i></span>
          </li>
          <li class="flex">
            <span>标题最多行数</span>
            <div class="flex-item"></div>
            <span class="flex-v-center" style="line-height: 25px;cursor: pointer;" @click="titlemaxShow = true">{{settings.system_titlemax}}<i class="icon">keyboard_arrow_right</i></span>
          </li>
          <li class="flex">
            <span>阅读量是否显示</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_pvshow" @change="switchValue('system_pvshow')"></switcher>
          </li>
          <li class="flex">
            <span>通讯社是否显示</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_agencyshow" @change="switchValue('system_agencyshow')"></switcher>
          </li>
          <li class="flex">
            <span>发布时间是否显示</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_releasetimeshow" @change="switchValue('system_releasetimeshow')"></switcher>
          </li>
          <li class="flex">
            <span>评论是否需要审核</span>
            <div class="flex-item"></div>
            <switcher mode="Number" v-model="settings.system_commentaudit" @change="switchValue('system_commentaudit')"></switcher>
          </li>
        </ul>
      </div>
    </div>

    <layer v-if="styleShow" title="风格设置" width="600px" maskClick @close="styleShow = false">
      <ul>
        <setting-option :check="settings.system_style === 'red'" @click.native="switchOption('system_style', 'red')">红色</setting-option>
        <setting-option :check="settings.system_style === 'blue'" @click.native="switchOption('system_style', 'blue')">蓝色</setting-option>
      </ul>
    </layer>

    <layer v-if="imageratioShow" title="图片尺寸" width="600px" maskClick @close="imageratioShow = false">
      <ul>
        <setting-option :check="settings.system_imageratio === '16:9'" @click.native="switchOption('system_imageratio', '16:9')">16:9</setting-option>
        <setting-option :check="settings.system_imageratio === '4:3'" @click.native="switchOption('system_imageratio', '4:3')">4:3</setting-option>
        <setting-option :check="settings.system_imageratio === '1:1'" @click.native="switchOption('system_imageratio', '1:1')">1:1</setting-option>
      </ul>
    </layer>

    <layer v-if="sharemodelShow" title="分享显示形式" width="600px" maskClick @close="sharemodelShow = false">
      <ul>
        <setting-option :check="settings.system_sharemodel === 'logo'" @click.native="switchOption('system_sharemodel', 'logo')">显示Logo</setting-option>
        <setting-option :check="settings.system_sharemodel === 'image'" @click.native="switchOption('system_sharemodel', 'image')">显示缩略图</setting-option>
      </ul>
    </layer>

    <layer v-if="titlemaxShow" title="标题最多行数" width="600px" maskClick @close="titlemaxShow = false">
      <ul>
        <setting-option :check="settings.system_titlemax === 2" @click.native="switchOption('system_titlemax', 2)">2</setting-option>
        <setting-option :check="settings.system_titlemax === 3" @click.native="switchOption('system_titlemax', 3)">3</setting-option>
        <setting-option :check="settings.system_titlemax === 4" @click.native="switchOption('system_titlemax', 4)">4</setting-option>
        <setting-option :check="settings.system_titlemax === 5" @click.native="switchOption('system_titlemax', 5)">5</setting-option>
      </ul>
    </layer>
  </div>
</template>

<script>
import SettingOption from './option'

export default {
  name: 'settings-common',
  components: { SettingOption },
  data () {
    return {
      loading: true,
      settings: {
        system_watermark: 0,
        system_autoread: 0,
        system_autorecommend: 0,
        special_pvshow: 0,
        special_agencyshow: 0,
        special_releasetimeshow: 0,
        system_style: '',
        system_imageratio: '',
        system_sealshow: 0,
        system_sharemodel: 0,
        system_titlemax: 0,
        system_pvshow: 0,
        system_agencyshow: 0,
        system_releasetimeshow: 0,
        system_commentaudit: 0
      },
      styleShow: false,
      imageratioShow: false,
      sharemodelShow: false,
      titlemaxShow: false
    }
  },
  methods: {
    getList () {
      this.loading = true
      let siteId = sessionStorage.siteId || localStorage.siteId
      this.$http.post('/cri-cms-platform/site/setting/index.monitor', { siteId }).then(
        res => {
          console.log(res)
          for (let k in this.settings) {
            let temp = Number(res[k])
            this.settings[k] = isNaN(temp) ? res[k] : temp
          }
          this.loading = false
        }
      )
    },
    switchValue (key, isOption) {
      let temp = key.split('_')
      let data = {
        app: temp[0],
        key: temp[1],
        value: this.settings[key]
      }
      return this.$http.post('/cri-cms-platform/site/setting/update.monitor', data).then(
        res => {
          if (isOption) this[temp[1] + 'Show'] = false
          this.$toast(res.msg ? res.msg : '修改成功')
        }
      ).catch(
        res => {
          this.getList()
          this.$toast(res.msg ? res.msg : '修改失败')
        }
      )
    },
    switchOption (key, value) {
      this.settings[key] = value
      this.switchValue(key, true)
    }
  },
  filters: {
    style (value) {
      if (value === 'red') return '红色'
      if (value === 'blue') return '蓝色'
      return ''
    },
    sharemodel (value) {
      if (value === 'logo') return '显示logo'
      if (value === 'image') return '显示缩略图'
      return ''
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less">
  .settings-common{color: #666;background: #fafafa;
    .content {background: #eee;}
    .setting-card {max-width: 800px;margin: 20px auto;border-radius: 10px;padding-left: 20px;background: #fff;
      li {padding: 12px 20px 12px 0;border-bottom: 1px solid #e1e1e1;
        &:last-child {border-bottom: 0;}
      }
    }
  }
</style>
