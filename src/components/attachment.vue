<template>
  <div class="option-item add-attachment">
    <div class="flex-v-center blue a">
      <i class="icon f-20 add-other-icon">attach_file</i>
      <span class="flex-item" @click="$refs.input.click()">添加附件</span>
      <input type="file" style="display: none;" ref="input" @change="uploadFile" multiple>
    </div>
    <ul v-if="list.length || uploadList.length" style="margin-top: 10px;">
      <li class="flex-v-center item relative" v-for="(item, index) in list" :key="item.id">
        <div class="file-thumb flex-center">
          <i class="icon" style="color: #888;">insert_drive_file</i>
        </div>
        <div class="flex-item" :title="item.alias">
          <div class="f-12 file-title">{{item.alias}}</div>
          <div class="c-a f-12">{{item.size | filesize}}</div>
        </div>
        <a :href="item.url" :download="item.alias" target="_blank"><icon-btn small v-tooltip:top="'下载'">file_download</icon-btn></a>
        <icon-btn small v-tooltip:top="'删除'" @click="removeFile(index)">delete</icon-btn>
      </li>

      <li class="flex-v-center item relative" v-for="item in uploadList" :key="item.id">
        <div class="file-thumb flex-center">
          <i class="icon" style="color: #888;">insert_drive_file</i>
        </div>
        <div class="flex-item" :title="item.alias">
          <div class="f-12 file-title">{{item.alias}}</div>
          <div class="c-a f-12">{{item.size | filesize}}</div>
          <div v-if="item.status === 'uploading'" style="height: 2px;background: #4CAF50;transition: width .3s;" :style="{ width: item.progress + '%' }"></div>
        </div>
        <div style="width: 40px;height: 30px;font-size: 12px;line-height: 30px;">{{Math.round(item.progress)}}%</div>
        <icon-btn small v-tooltip:top="'删除'" @click="item.source.cancel('取消上传')">delete</icon-btn>
      </li>
    </ul>
  </div>
</template>

<script>
class File {
  constructor (file) {
    this.id = file.lastModified
    this.alias = file.name
    this.size = file.size
    this.status = 'uploading'
    this.progress = 0
    this.source = null
  }
}

export default {
  name: 'add-attachment',
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultList: Array,
    url: String
  },
  data () {
    return {
      list: [],
      uploadList: []
    }
  },
  methods: {
    uploadFile (e) {
      let files = Array.from(e.target.files)
      files.forEach(v => {
        let file = new File(v)
        file.source = this.$http.CancelToken.source()
        this.uploadList.push(file)
        this.$http.post(this.url, {file: v}, {
          onUploadProgress (e) {
            if (e.lengthComputable) {
              file.progress = (e.loaded / e.total) * 100
            }
          },
          cancelToken: file.source.token
        }).then(
          res => {
            file.status = 'done'
            this.uploadList.splice(this.uploadList.findIndex(v => v === file), 1)
            this.list.push(res[0])
          }
        ).catch(
          res => {
            console.log(res)
            this.uploadList.splice(this.uploadList.findIndex(v => v === file), 1)
            this.$toast(res.msg || res.message || '上传失败')
          }
        )
      })
    },
    removeFile (index) {
      let { list } = this
      this.$confirm({
        title: '您确定要删除该文件吗？',
        text: `文件删除后将无法恢复。`,
        btns: ['取消', '删除'],
        color: 'red',
        yes: () => {
          list.splice(index, 1)
        }
      })
    }
  },
  created () {
    if (this.defaultList) {
      this.list = JSON.parse(JSON.stringify(this.defaultList))
    }
  },
  watch: {
    'list' (newValue) {
      this.$emit('input', newValue.map(v => v.id).join(','))
    }
  }
}
</script>

<style lang="less">
.add-attachment {
  .item {padding: 3px;border-radius: 2px;margin-bottom: 4px;line-height: 1.2em;
    &:hover {background: rgba(0, 0, 0, .08);}
    .flex-item{margin: 0 6px;overflow: hidden;}
    .file-title{white-space: nowrap;overflow: hidden;width: 100%;text-overflow: ellipsis;}
    .file-list{flex-wrap: wrap;}
  }
}
</style>
