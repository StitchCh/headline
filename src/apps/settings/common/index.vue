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
          <li class="flex"  v-for="item in list" :key="item.id">
            <span>{{item.explain}}</span>
            <div class="flex-item"></div>
            <switcher v-if="switcherShow(item.key)" mode="Number" v-model="item.value" @change="switchValue(item.app, item.key, item.value)"></switcher>
            <span v-else class="flex-v-center" style="line-height: 25px;cursor: pointer;" @click="openSettingBox(item)">{{item.value | style | sharemodel}}<i class="icon">keyboard_arrow_right</i></span>
          </li>
        </ul>
      </div>
    </div>

    <layer v-if="styleShow" title="风格设置" width="600px" maskClick @close="styleShow = false">
      <ul>
        <setting-option :check="item.value === 'red'" @click.native="switchOption(item, 'red')">红色</setting-option>
        <setting-option :check="item.value === 'blue'" @click.native="switchOption(item, 'blue')">蓝色</setting-option>
      </ul>
    </layer>

    <layer v-if="imageratioShow" title="图片尺寸" width="600px" maskClick @close="imageratioShow = false">
      <ul>
        <setting-option :check="item.value === '16:9'" @click.native="switchOption(item, '16:9')">16:9</setting-option>
        <setting-option :check="item.value === '4:3'" @click.native="switchOption(item, '4:3')">4:3</setting-option>
        <setting-option :check="item.value === '1:1'" @click.native="switchOption(item, '1:1')">1:1</setting-option>
      </ul>
    </layer>

    <layer v-if="sharemodelShow" title="分享显示形式" width="600px" maskClick @close="sharemodelShow = false">
      <ul>
        <setting-option :check="item.value === 'logo'" @click.native="switchOption(item, 'logo')">显示Logo</setting-option>
        <setting-option :check="item.value === 'image'" @click.native="switchOption(item, 'image')">显示缩略图</setting-option>
      </ul>
    </layer>

    <layer v-if="titlemaxShow" title="标题最多行数" width="600px" maskClick @close="titlemaxShow = false">
      <ul>
        <setting-option :check="item.value === 2" @click.native="switchOption(item, 2)">2</setting-option>
        <setting-option :check="item.value === 3" @click.native="switchOption(item, 3)">3</setting-option>
        <setting-option :check="item.value === 4" @click.native="switchOption(item, 4)">4</setting-option>
        <setting-option :check="item.value === 5" @click.native="switchOption(item, 5)">5</setting-option>
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
      list: [],
      item: {},
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
          for (let i = 0; i < res.length; i++) {
            let temp = Number(res[i].value)
            res[i].value = isNaN(temp) ? res[i].value : temp
          }
          this.list = res
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
      return this.$http.post('/cri-cms-platform/site/setting/update.monitor', data).then(
        res => {
          if (isOption) this[key + 'Show'] = false
          this.$toast(res.msg ? res.msg : '修改成功')
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
      li {padding: 12px 20px 12px 0;border-bottom: 1px solid #e1e1e1;
        &:last-child {border-bottom: 0;}
      }
    }
  }
</style>
