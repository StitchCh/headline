<template>
  <div class="relative uploadBox f-14" tabindex="-1">
    <btn @click="$refs.uploadInput.click()">{{btnText}}</btn>
    <input type="file" :accept="accept" class="uploadInput" ref="uploadInput" @change="handleChange" :multiple="multiple">
    <div v-if="tips" class="tips">{{tips}}</div>
    <transition-group name="slide" tag="div" style="margin-top: 15px;">
      <div v-for="(item, index) in fileList" :key="item.uid" class="flex-v-center uploadListItem">
        <img v-if="isImg(item.type)" :src="item.url" alt="" width="24" height="24">
        <i v-else class="icon uploadDocument">description</i>
        <span class="flex-item">{{item.name}}</span>
        <!-- <div class="flex-item"></div> -->
        <div style="border: 1px solid #ddd;width: 100px;height: 6px;padding: 0;margin: 0 10px 0 0;">
          <span style="background: #3bb4f2;display: block;height: 100%;width: 0;padding: 0;margin: 0;" :style="{width: item.datalength}"></span>
        </div>
        <p>{{item.datalength}}</p>
        <!--<div class="loadingBox" v-if="item.status === 'uploading'">-->
          <!--<Loading size="20"></Loading>-->
        <!--</div>-->
        <i class="icon uploadStatus" v-if="item.status === 'done'">done</i>
        <i class="icon uploadStatus upload-error" v-if="item.status === 'error'">error_outline</i>
        <icon-btn small @click="removeFile(item, index)">close</icon-btn>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import Btn from '../Button/Btn'
  import IconBtn from '../Button/IconBtn'
  import Tag from '../Tag/Tag'
  import Loading from '../Loading/Loading'

  export default {
    name: 'upload-box',
    components: { Btn, IconBtn, Tag, Loading },
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      fileList: {
        type: Array,
        required: true
      },
      onchange: {
        type: Function,
        default () {}
      },
      onremove: {
        type: Function,
        default () { return Promise.resolve() }
      },
      tips: {
        type: String,
        default: ''
      },
      previewSrc: {
        type: String,
        default: ''
      },
      btnText: {
        type: String,
        default: '点击上传'
      },
      accept: {
        type: String,
        default: ''
      }
    },
    // data () {
    //   return {
    //     imgReg: /\.jpg$|\.jpeg$|\.gif$|\.png$|\.tiff$|\.bmp$/i
    //   }
    // },
    methods: {
      getUrl (file) {
        return URL.createObjectURL(file)
      },
      getType (file) {
        return file.type.split('/')[0]
      },
      isImg (type) {
        return type === 'image'
      },
      handleChange (e) {
        this.$emit('beforeChange')
        let files = Array.from(e.target.files)
        files.forEach(v => {
          let file = {
            name: v.name,
            size: v.size,
            type: this.getType(v),
            status: 'ready',
            url: this.getUrl(v),
            uid: Math.random(),
            source: v
          }
          this.fileList.push(file)
          this.onchange(file, this.fileList)
        })
        this.$emit('afterChanged')
      },
      removeFile (item, i) {
        let that = this
        this.$confirm({
          text: '确定移除 ' + item.name + ' 么？',
          btns: ['取消', '确定'],
          yes () {
            let file = that.fileList[i]
            that.onremove(file, that.fileList).then(
              () => {
                that.fileList.splice(i, 1)
                that.$emit('removed', file, that.fileList)
              }
            ).catch(
              res => {
                that.$toast({
                  text: res.message,
                  type: 'error'
                })
              }
            )
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .uploadBox {
    .uploadInput {display: none}
    .tips {color: #999;}
    .uploadListItem {margin-top: 5px;
      .uploadDocument {line-height: 30px;font-size: 26px;}
      span {margin-left: 10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;line-height: 30px;}
      .uploadStatus {color: #67c23a;font-size: 20px;padding: 5px;}
      .uploadStatus.upload-error{color: rgb(252, 61, 61);}
      .loadingBox {width: 30px;height: 30px;padding: 5px;}
      button {display: none;}
    }
    .uploadListItem:hover {background-color: #f5f7fa;
      span {color: #0299ff;}
      .uploadStatus {display: none;}
      .loadingBox {display: none;}
      button {display: block;}
    }
    .slide-enter-active, .slide-leave-active{transform: translateY(0);opacity: 1;transition: opacity .3s linear, transform .3s ease;}
    .slide-enter, .slide-leave-to{transform: translateY(5px);opacity: 0;}
  }
</style>
