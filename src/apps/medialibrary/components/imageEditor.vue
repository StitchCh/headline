<template>
<div class="image-editor flex">
  <div class="tool-bar flex-center">
    <div style="padding: 12px;">
      <icon-btn :disabled="toolActive!==''&&toolActive!=='crop'" @click="toolActive='crop'" v-tooltip:right="'裁剪'" :key="toolActive+'1'">crop</icon-btn>
      <icon-btn :disabled="toolActive!==''&&toolActive!=='flip'" @click="toolActive='flip'" v-tooltip:right="'翻转'" :key="toolActive+'2'">flip</icon-btn>
      <icon-btn :disabled="toolActive!==''&&toolActive!=='rotate'" @click="toolActive='rotate'" v-tooltip:right="'旋转'" :key="toolActive+'3'">rotate_90_degrees_ccw</icon-btn>
      <div style="height: 1px;background: rgba(255,255,255,0.2);margin: 10px;"></div>
      <icon-btn v-tooltip:right="'移动'" class="move-icon">pan_tool</icon-btn>
      <icon-btn v-tooltip:right="'放大'">zoom_in</icon-btn>
      <icon-btn v-tooltip:right="'缩小'">zoom_out</icon-btn>
      <div style="height: 1px;background: rgba(255,255,255,0.2);margin: 10px;"></div>
      <icon-btn v-tooltip:bottom="'撤销'">undo</icon-btn>
      <icon-btn v-tooltip:bottom="'恢复'">redo</icon-btn>
      <!-- <icon-btn v-tooltip:right="'涂鸦'">brush</icon-btn>
      <icon-btn v-tooltip:right="'文字'">text_fields</icon-btn> -->
      <!-- <icon-btn v-tooltip:right="'水印'">branding_watermark</icon-btn> -->
    </div>
  </div>
  <div class="tool-bar flex-center option-bar" v-if="toolActive">
    <div style="padding: 12px;width: 80px;" v-if="toolActive === 'crop'">
      <icon-btn v-tooltip:right="'16 : 9'">crop_16_9</icon-btn>
      <icon-btn v-tooltip:right="'4 : 3'">crop_5_4</icon-btn>
      <icon-btn v-tooltip:right="'3 :2'">crop_3_2</icon-btn>
      <icon-btn v-tooltip:right="'1 : 1'">crop_din</icon-btn>
      <icon-btn v-tooltip:right="'自由裁切'">crop_free</icon-btn>
      <icon-btn v-tooltip:right="'应用'" color="#45ff45" class="on">done</icon-btn>
      <icon-btn v-tooltip:right="'取消'" color="#ff3131" class="on" @click="toolActive=''">close</icon-btn>
    </div>
    <div style="padding: 12px;width: 80px;" v-if="toolActive === 'flip'">
      <icon-btn v-tooltip:right="'水平翻转'" class="on">flip</icon-btn>
      <icon-btn v-tooltip:right="'垂直翻转'" class="on flip-y-btn">flip</icon-btn>
      <icon-btn v-tooltip:right="'应用'" color="#45ff45" @click="toolActive=''" class="on">done</icon-btn>
    </div>
    <div style="padding: 12px;width: 80px;" v-if="toolActive === 'rotate'">
      <icon-btn v-tooltip:right="'旋转 90°'" class="on">rotate_90_degrees_ccw</icon-btn>
      <div class="rotater c-f flex-col" ref="rotater">
        <div class="flex-item rot-scale">
          <div :style="{transform: `translateY(${rotate.deg}px)`}"></div>
        </div>
        <div class="t-center" style="padding: 10px;pointer-events:none;">{{rotate.deg}}°</div>
        <div class="flex-item rot-scale">
          <div :style="{transform: `translateY(${rotate.deg}px)`}"></div>
        </div>
      </div>
      <icon-btn v-tooltip:right="'应用'" color="#45ff45" class="on" @click="toolActive=''">done</icon-btn>
    </div>
    <!-- <div style="padding: 12px;">
      <icon-btn v-tooltip:right="'应用'" color="#45ff45">done</icon-btn>
    </div> -->
  </div>
  <div class="flex-item flex-col">
    <div class="opera-bar flex-v-center">
      <div class="flex-item"></div>
      <btn flat style="margin-left: 15px;color: #fff;">取消</btn>
      <btn style="margin-left: 10px;">保存</btn>
    </div>
    <div class="flex-item flex-center">
      <img :src="src" ref="cropper"/>
    </div>
  </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.min.css'
import Cropper from 'cropperjs'
// const fixNums = [[16, 9], [4, 3], [3, 2], [1, 1]]

export default {
  name: 'image-editor',
  data () {
    return {
      src: '/static/img/icon-links.png',
      toolActive: '',
      cropper: null,
      crop: {
        width: 1,
        height: 1
      },
      rotate: {
        move: false,
        deg: 0,
        sdeg: 0,
        sy: 0,
        y: 0
      }
    }
  },
  mounted () {
    this.init()
    window.addEventListener('mousedown', this.onRotateStart)
    window.addEventListener('mousemove', this.onRotate)
    window.addEventListener('mouseup', this.onRotateEnd)
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy () {
    window.removeEventListener('mousedown', this.onRotateStart)
    window.removeEventListener('mousemove', this.onRotate)
    window.removeEventListener('mouseup', this.onRotateEnd)
    window.addEventListener('resize', this.onWindowResize)
  },
  methods: {
    init () {
      this.cropper = new Cropper(this.$refs.cropper, {
        autoCrop: false,
        dragMode: 'move'
      })
    },
    onRotateStart (e) {
      if (e.target !== this.$refs.rotater) return
      this.rotate.move = true
      this.rotate.sy = e.clientY
    },
    onRotate (e) {
      if (!this.rotate.move) return
      let y = e.clientY
      let deg = this.rotate.sdeg + (y - this.rotate.sy) / 2
      if (deg >= 45) {
        this.rotate.deg = 45
        return
      } else {
        if (deg <= -45) {
          this.rotate.deg = -45
          return
        }
      }
      this.rotate.deg = parseInt(deg)
    },
    onRotateEnd (e) {
      this.rotate.move = false
      this.rotate.sy = 0
      this.rotate.sdeg = this.rotate.deg
    },
    onWindowResize (e) {
      this.cropper.restore()
    }
  }
}
</script>

<style lang="less">
.image-editor{
  position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 20;background: rgba(0, 0, 0, .9);
  .icon-btn{color: #fff;margin: 10px;
    &:hover{background: rgba(255, 255, 255, .1);}
  }
  .btn-flat:hover{background: rgba(255, 255, 255, .1);}
  .tool-bar{width: 80px;}
  .option-bar{background: rgba(255, 255, 255, .05);
    .btn{color: #fff;}
    .icon-btn{opacity: .6;}
    .icon-btn.on{opacity: 1;}
  }
  .opera-bar{height: 60px;padding: 0 20px;
    .icon-btn{margin: 5px;}
  }
  .crop-bl{color: rgba(255, 255, 255, .8);display: inline-block;line-height: 1em;padding: 8px 10px;border-radius: 3px;margin: 0 5px;box-sizing: border-box;
    border: 1px solid transparent;
    &:hover{background: rgba(255, 255, 255, .1);}
    &.on{border-color: rgba(255, 255, 255, .8);}
  }
  .flip-y-btn .icon{transform: rotate(90deg);}
  .rotater{height: 240px;width: 56px;user-select: none;}
  .rot-scale{
    position: relative;overflow: hidden;pointer-events: none;
    div{width: 4px;height: 400%;border-left: 4px dotted rgba(255, 255, 255, .3);position: absolute;left: 45%;top: -100%;pointer-events: none;}
  }
  .move-icon .icon{transform: scale(.85);}
  .cropper-bg{background-image: none!important;}
}
</style>
