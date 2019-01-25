<template>
  <div class="gallery-editor">
    <div class="relative">
      <input v-model="title" class="title" type="text" placeholder="请输入标题" :style="{ color: titleColor }">
      <div style="position: absolute;right: 20px;top: 28px;">
        <button class="title-colorpicker-btn" @click="ui.titleColorBoxShow = !ui.titleColorBoxShow" :style="{ background: titleColor }"></button>
        <bubble v-if="ui.titleColorBoxShow" @close="ui.titleColorBoxShow = false">
          <div class="title-color-list">
            <button class="title-colorpicker-btn" style="background: #000000;" @click="changeTitleColor('#000000')"></button>
            <button class="title-colorpicker-btn" style="background: #F44336;" @click="changeTitleColor('#F44336')"></button>
            <button class="title-colorpicker-btn" style="background: #FF9800;" @click="changeTitleColor('#FF9800')"></button>
            <button class="title-colorpicker-btn" style="background: #FFEB3B;" @click="changeTitleColor('#FFEB3B')"></button>
            <button class="title-colorpicker-btn" style="background: #4CAF50;" @click="changeTitleColor('#4CAF50')"></button>
            <button class="title-colorpicker-btn" style="background: #00BCD4;" @click="changeTitleColor('#00BCD4')"></button>
            <button class="title-colorpicker-btn" style="background: #2196F3;" @click="changeTitleColor('#2196F3')"></button>
            <button class="title-colorpicker-btn" style="background: #9C27B0;" @click="changeTitleColor('#9C27B0')"></button>
          </div>
        </bubble>
      </div>
    </div>
    <div class="selector">
      <div class="flex-center pic-cover relative">
        <img v-if="selected.length" :src="selected[activeIndex].url" alt="">
        <div class="flex-center bg-e abs" v-else>
          <i class="icon" style="font-size: 60px;">add_photo_alternate</i>
        </div>
      </div>
      <div class="input">
        <textarea v-if="selected.length" v-model="selected[activeIndex].description" rows="4" placeholder="在此处输入图片说明"/>
      </div>
      <div class="flex pic-list">
        <!--<div class="pic-item flex-center a relative" :class="{ active: activeIndex === index }" v-for="(item, index) in selected" :key="item.id" @click="activeIndex = index">-->
          <!--<i class="icon" @click.stop="deleteItem(index)">cancel</i>-->
          <!--<img :src="item.url" alt="">-->
        <!--</div>-->
        <draggable style="width: 100%;" element="div" :options="{ ghostClass: 'movelist'}" v-model="selected" >
          <div style="display: inline-block;" class="pic-item flex-center a relative" :class="{ active: activeIndex === index }" v-for="(item, index) in selected" :key="item.id" @click="activeIndex = index">
            <i class="icon" @click.stop="deleteItem(index)">cancel</i>
            <img :src="item.url" alt="">
          </div>
        </draggable>
        <div class="pic-item flex-center add-btn a" @click="ui.photoSelectorShow = true">
          <i class="icon">add_photo_alternate</i>添加图片
        </div>
      </div>
      <div>
        <p>批量添加说明</p>
        <div>
          <textarea @change="allDescriptionChange" class="tysm_box" rows="4" v-model="allDescription" placeholder="在此处输入批量图片说明"></textarea>
        </div>
      </div>
    </div>

    <layer v-if="ui.photoSelectorShow" title="选择图片"  width="800px" class="tc_box">
      <div class="layer-text relative" style="height: 800px;">
        <media-photos select-mode ref="mediaPhotos"/>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.photoSelectorShow = false">取消</btn>
        <btn flat color="#008eff" @click="selectPhoto">选择</btn>
      </div>
    </layer>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import MediaVideos from '../../medialibrary/pages/videos'
import MediaPhotos from '../../medialibrary/pages/photos'
import draggable from 'vuedraggable'

export default {
  name: 'video-editor',
  components: { MediaPhotos, videoPlayer, MediaVideos, draggable },
  data () {
    return {
      ui: {
        titleColorBoxShow: false,
        photoSelectorShow: false
      },
      title: '',
      titleColor: '#000000',
      selected: [],
      activeIndex: 0,
      allDescription: ''
    }
  },
  methods: {
    allDescriptionChange () {
      this.selected.forEach((item, index) => {
        if (item.description == "") {
          let otiem = item
          otiem.description = this.allDescription
          this.selected.splice(index, 1, otiem)
        }
      })
    },
    changeTitleColor (color) {
      this.titleColor = color
      this.ui.titleColorBoxShow = false
    },
    selectPhoto () {
      let imgOrigin = this.$refs.mediaPhotos.imgOrigin
      this.selected = this.selected.concat(this.$refs.mediaPhotos.selected.map(v => {
        v.description = this.allDescription
        v.url = imgOrigin + v.filePath + v.fileName
        return v
      }))
      this.ui.photoSelectorShow = false
    },
    deleteItem (index) {
      if (index === this.selected.length - 1 && this.activeIndex === index) this.activeIndex = index - 1
      this.selected.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
.gallery-editor {max-width: 900px;margin: 0 auto;padding: 10px;
  .title{font-size: 30px;font-weight: bold;border: none;width: 100%;background: transparent;padding: 20px 15px;color: #555;
    &::-webkit-input-placeholder{color: #aaa;}
  }
  .tysm_box{
    width: 100%;
    outline: none;
    resize: none;
    padding: 10px 20px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  .title-colorpicker-btn {width: 25px;height: 25px;border: 1px solid transparent;margin: 3px;
    &:hover {border: 1px solid #000000}
  }
  .title-color-list {width: 192px;padding: 10px;}

  .selector {width: 100%;
    .pic-cover {width: 640px;height: 360px;margin: 0 auto;
      img {max-width: 100%;max-height: 100%;}
    }
    .input {width: 640px;margin: 0 auto;padding: 10px;box-sizing: border-box;
      textarea{width: 100%;outline: none;border: none;font-size: 14px;resize: none;}
    }
    .pic-list {border-top: 1px solid rgba(0, 0, 0, .05);flex-wrap: wrap;}
    .pic-item {width: 120px;height: 90px;margin: 13px;border: 2px solid transparent;transition: border-color .2s;
      &>.icon {position: absolute;top: -12px;right: -12px;border-radius: 12px;background: #fff;box-shadow: 0 0 5px;color: #d74947; visibility: hidden}
      &:hover {border-color: #eee;
        &>.icon {visibility: visible;}
      }
      &.active {border-color: #5cb6ff}
      &.add-btn {border: 2px dashed #5cb6ff;color: #5cb6ff;}
      img {max-width: 100%;max-height: 100%}
    }
  }

  .layer-ctn {max-width: 1000px;
    .af-left{width: 280px;background: #fff;border-right: 1px solid #e1e1e1;}
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
    .bubble-item{padding: 4px 15px;white-space: nowrap;cursor: pointer;}
    .bubble-item:hover{background: rgba(0, 0, 0, .1)}
    .datepicker{
      &:before{content: none;}
      input{background: transparent;border: none;padding: 0 10px;}
    }
    .datepicker-range{min-width: 200px;
      .datepicker-popup{right: 0;width: 420px;}
    }
  }
}
</style>
