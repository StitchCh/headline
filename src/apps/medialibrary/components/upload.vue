<template>
<div class="media-upload relative">
  <div class="flex-v-center">
    <btn flat class="b flex-v-center" @click="bubbleShow=!bubbleShow" color="#008eff" style="padding: 5px 10px;">
      <span>上传</span>
      <loading v-if="status === 'uploading'" size="25" style="margin-left: 5px;"/>
      <i class="icon red f-20" v-if="status === 'error'" style="margin-left: 5px;">error_outline</i>
    </btn>
  </div>
  <bubble v-if="bubbleShow"
          :style="{
            'max-width': $route.path.indexOf('mobilePush') < 0 ? 'auto' : '300px'
          }"
          pos="bottom" align="end">
    <div style="width: 400px;">
      <div class="flex-v-center" style="border-bottom: 1px solid #eee;padding: 15px;">
        <div class="flex-item"></div>
        <div class="tab">
          <div class="tab-item" :class="{'on': tab === 2}" @click="tab = 2">本地上传</div>
          <div class="tab-item" :class="{'on': tab === 1, disabled: type == 2 || type == 1}" @click="(type == 2 || type == 1) ? tab = 2 : tab = 1">网络地址</div>
        </div>
        <div class="flex-item t-right">
          <icon-btn small @click="bubbleShow=false">close</icon-btn>
        </div>
      </div>
      <div style="padding: 20px;max-height: 500px;overflow-y: auto;">
        <div v-if="tab === 1" class="relative">
          <div v-if="urlLoading" class="abs flex-center bg-light-rgb-4" style="z-index:10;">
            <loading size="30"/>
          </div>
          <div class="flex-v-center">
            <input-box label="网络地址" v-model="picUrl" class="flex-item" hint="请输入素材完整地址"></input-box>
            <btn small @click="uploadImgOnLine" :disabled="!picUrl" style="margin: 0 0 20px 15px;">上传</btn>
          </div>
        </div>
        <div v-if="tab === 2">
          <upload-box
            :accept="accept"
            btn-text="选择文件"
            multiple
            :onchange="onChange"
            :file-list="fileList"
            :datalength="datalength"
          ></upload-box>
        </div>
      </div>
    </div>
  </bubble>
</div>
</template>



<script>
  var limit = [
    'ROLE_SUPERMAN',
    'SUPER_ADMIN',
    'ADMIN_ROLE'
  ]


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
      tab: 2,
      fileList: [],
      urlLoading: false,
      picUrl: '',
      datalength: '0%'
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
    },
    accept () {
      let { type } = this
      type = parseInt(type)
      if (type === 0) return 'image/png, image/jpeg, image/gif, image/jpg'
      if (type === 1) return 'audio/*'
      if (type === 2) return 'video/*'
    }
  },
  methods: {
    onChange (file, fileList) {
      let arr = sessionStorage.getItem('roleName').split(',')
      var uplimit = false
      arr.forEach(item => {
        if (limit.indexOf(item) >= 0) {
          uplimit = true
        }
      })

      if (file.size > (1024 * 1024 * 80) && !uplimit) {
        this.$toast('请上传大小80M以内的文件')
        return
      }

      let data = {
        type: this.type,
        folderId: this.folderId,
        file: file.source
      }
      file.status = 'uploading'
      let config = {
        onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          file.datalength = complete
          this.fileList.splice(this.fileList.indexOf(file), 1, file)
        }
      }
      this.$http.post('/cri-cms-platform/media/uploadIAU.monitor', data, config).then(res => {
        file.status = 'done'
        this.$emit('uploaded')
        setTimeout(() => {
          this.fileList.splice(this.fileList.indexOf(file), 1)
        }, 500)
      }).catch(e => {
        this.$toast(e.msg || `上传失败:（${file.name}）`)
        file.status = 'error'
      })
    },
    uploadImgOnLine () {
      if (!this.picUrl) return
      this.urlLoading = true
      this.$http.post('/cri-cms-platform/media/uploadImgOnLine.monitor', {
        folderId: this.folderId,
        picUrl: this.picUrl
      }).then(res => {
        this.urlLoading = false
        this.$emit('uploaded')
        this.picUrl = ''
      }).catch(e => {
        this.urlLoading = false
        this.$toast(e.msg)
      })
    }
  }
}
</script>

<style lang="less">
.media-upload{
  //
  .disabled {
    background: rgba(0, 0, 0, .2);cursor: no-drop;
    &:hover {color: #666;border-color: transparent;}
  }
}
</style>
