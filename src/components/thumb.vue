<template>
  <div class="app-article-add-thumb">
    <div class="add-photo-btn a flex-center" :style="{ width, height }" @click="show = true">
      <img v-if="image.id" :src="image.url" width="100%" alt="">
      <i v-else class="icon f-32 c-a">add_photo_alternate</i>
    </div>
    <layer v-if="show" title="选择图片"  width="1000px"  class="tc_box">
      <div class="layer-text relative" style="height: 800px;">
        <media-photos select-mode single-select ref="mediaPhotos"  @preview="onPreview"></media-photos>
      </div>
      <div class="layer-btns">
        <btn flat @click="show = false">取消</btn>
        <btn flat color="#008eff" @click="selectImage">选择</btn>
      </div>
    </layer>

    <media-preview
      v-if="preview.show"
      :list="preview.list"
      :index="preview.index"
      :type="$route.meta.type"
      @close="preview.show=false"
      @refresh="$refs.mediaPhotos.getList();preview.show = false;"
      @delected="onDelected"/>
  </div>
</template>

<script>
import MediaPhotos from '../apps/medialibrary/pages/photos'
import MediaPreview from '../apps/medialibrary/components/mediaPreview'

export default {
  name: 'app-article-add-thumb',
  components: { MediaPhotos, MediaPreview },
  props: {
    scale: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
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
      },
      preview: {
        show: false,
        list: [],
        index: 0
      }
    }
  },
  methods: {
    onDelected (e) {
      this.$refs.mediaPhotos.getList()
    },
    selectImage () {
      let image = this.$refs.mediaPhotos.selected[0] || null
      if (this.scale) {
        console.log(image.scale == sessionStorage.imageratio)
        if (image.scale != sessionStorage.imageratio) {
          this.$toast('请选择比例为' + sessionStorage.imageratio + '的图片')
          return false
        }
      }
      this.image = {
        id: image ? image.id : '',
        url: image ? this.$refs.mediaPhotos.imgOrigin + image.filePath + image.fileName : ''
      }
      this.$emit('input', image ? this.image : image)
      this.show = false
    },
    onPreview (e) {
      this.preview.list = e.list || []
      this.preview.index = e.index || 0
      this.preview.show = true
    },
  },
  created () {
    if (this.value) this.image = JSON.parse(JSON.stringify(this.value))
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
