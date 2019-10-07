<template>
  <div class="app-article-add-thumb">
    <div class="add-photo-btn a flex-center" :style="{ width, height }" @click="show = true">
      <img :src="image.url" style="max-width: 100%;max-height: 31px;" alt="">
      <i v-if="!image.url" class="icon f-32 c-a">add_photo_alternate</i>
    </div>
    <layer v-if="show" title="选择图片"  width="1000px" class="tc_box">
      <p style="padding-left: 20px;color: #f00;font-size: 12px;">仅支持png格式图片</p>
      <div class="layer-text relative" style="height: 800px;">
        <media-photos select-mode single-select ref="mediaPhotos"></media-photos>
      </div>
      <div class="layer-btns">
        <btn flat @click="show = false">取消</btn>
        <btn flat color="#008eff" @click="selectImage">选择</btn>
      </div>
    </layer>
  </div>
</template>

<script>
import MediaPhotos from '../medialibrary/pages/photos'

export default {
  name: 'app-article-add-thumb',
  components: { MediaPhotos },
  props: {
    value: {
      // type: Object,
      default: null
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      image: {
        id: '',
        url: ''
      }
    }
  },
  methods: {
    selectImage () {
      let image = this.$refs.mediaPhotos.selected[0] || null
      this.image = {
        id: image ? image.id : '',
        url: image ? this.$refs.mediaPhotos.imgOrigin + image.filePath + image.fileName : ''
      }
      let oimg = image ? this.image : image
      this.$emit('input', oimg.url)
      this.show = false
    }
  },
  created () {
    // if (this.value) this.image = JSON.parse(JSON.stringify(this.value))
    if (this.value) this.image.url = this.value
  }
}
</script>

<style lang="less">
  .app-article-add-thumb {
    .layer-ctn {max-width: 1000px;
      .af-left{width: 280px;background: #fff;border-right: 1px solid rgba(0, 0, 0, .05);}
      .nav-item{height: 40px;border-bottom: 1px solid #eee;line-height: 1em;padding: 0 5px 0 15px;
        &.nav-item-folder{padding-left: 30px;}
        &:hover{background: rgba(0, 0, 0, .05);}
        &.on{background: #318fff;border-color: #fff;color: #fff;
          .icon-btn{color: #fff;}
        }
        input{border: none;height: 36px;background: transparent;
          &::-webkit-input-placeholder{color: #aaa;}
        }
        .nav-item-icon{margin-right: 15px;}
      }
      .search-bar input{width:150px;height: 100%;border:none;margin-left: 10px;}
      .media-group{padding: 13px 30px;
        ul{flex-wrap: wrap;}
        li{margin: 0 6px 6px 0}
      }
      .media-group-title{padding: 15px 0;}
      .media-group-title{padding: 15px 0;}
    }
  }
</style>
