<template>
<div class="media-upload relative">
  <div class="flex-v-center">
    <btn flat class="b flex-v-center" @click="bubbleShow=!bubbleShow" color="#008eff" style="padding: 5px 10px;">
      <span>上传</span>
      <loading v-if="status === 'uploading'" size="25" style="margin-left: 5px;"/>
      <i class="icon red f-20" v-if="status === 'error'" style="margin-left: 5px;">error_outline</i>
    </btn>
  </div>
  <bubble v-if="bubbleShow" pos="bottom" align="end">
    <div style="width: 400px;">
      <div class="flex-v-center" style="border-bottom: 1px solid #eee;padding: 15px;">
        <div class="flex-item"></div>
        <div class="tab">
          <div class="tab-item" :class="{'on': tab === 1}" @click="tab = 1">网络地址</div>
          <div class="tab-item" :class="{'on': tab === 2}" @click="tab = 2">本地上传</div>
        </div>
        <div class="flex-item t-right">
          <icon-btn small @click="bubbleShow=false">close</icon-btn>
        </div>
      </div>
      <div style="padding: 20px;max-height: 500px;overflow-y: auto;">
        <div v-if="tab === 1">
          <div class="flex-v-center">
            <input-box label="网络地址" class="flex-item" hint="请输入素材完整地址"></input-box>
            <btn small style="margin: 0 0 20px 15px;">上传</btn>
          </div>
        </div>
        <div v-if="tab === 2">
          <upload-box
            accept="image/png, image/jpeg, image/gif, image/jpg"
            btn-text="选择文件"
            multiple
            :onchange="onChange"
            :file-list="fileList"
          ></upload-box>
        </div>
      </div>
    </div>
  </bubble>
</div>
</template>

<script>
export default {
  name: 'media-upload',
  props: {
    type: {
      type: [Number, String],
      default: 0
    },
    folderId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      bubbleShow: false,
      tab: 1,
      fileList: []
    }
  },
  computed: {
    status () {
      let res = ''
      this.fileList.forEach(item => {
        if (item.status === 'error' && res !== 'uploading') res = 'error'
        if (item.status === 'uploading') res = 'uploading'
      })
      return res
    }
  },
  methods: {
    onChange (file, fileList) {
      // console.log(file)
      let data = {
        type: this.type,
        folderId: this.folderId,
        file: file.source
      }
      file.status = 'uploading'
      this.$http.post('/cri-cms-platform/media/uploadIAU.monitor', data).then(res => {
        file.status = 'done'
        this.$emit('uploaded')
        setTimeout(() => {
          this.fileList.splice(this.fileList.indexOf(file), 1)
        }, 500)
      }).catch(e => {
        this.$toast(e.msg || `上传失败:（${file.name}）`)
        file.status = 'error'
      })
    }
  }
}
</script>

<style lang="less">
.media-upload{
  //
}
</style>
