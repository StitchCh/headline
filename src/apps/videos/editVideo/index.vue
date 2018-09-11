<template>
  <div class="abs bg-f flex c-6 f-14 app-video-edit">
    <div class="flex-item flex-col">
      <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
        <div class="a flex-v-center" @click="$router.back()">
          <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
          <span class="f-18">返回</span>
        </div>
        <div class="flex-item"></div>
        <div class="flex-v-center">
          <btn big flat style="margin-right: 10px;">预览</btn>
          <btn big flat style="margin-right: 10px;" @click="autoSave">保存草稿</btn>
          <btn big style="margin-right: 20px;" @click="submit">保存</btn>
          <icon-btn v-tooltip:bottom="'发布选项'" @click="ui.optionShow=!ui.optionShow">menu</icon-btn>
        </div>
      </div>
      <div class="flex-item scroll-y">
        <video-editor ref="editor"></video-editor>
      </div>
    </div>
  </div>
</template>

<script>
import VideoEditor from './editor'

export default {
  name: 'app-video-edit',
  components: { VideoEditor },
  data () {
    return {
      ui: {
        optionShow: true
      }
    }
  },
  methods: {
    submit () {},
    autoSave () {}
  }
}
</script>

<style lang="less">
.app-video-edit{

}
</style>
