<template>
<div class="image-editor flex">
  <div class="tool-bar flex-center">
    <div style="padding: 12px;">
      <icon-btn v-tooltip:right="'裁剪'">crop</icon-btn>
      <icon-btn v-tooltip:right="'翻转'">flip</icon-btn>
      <icon-btn v-tooltip:right="'旋转'">rotate_90_degrees_ccw</icon-btn>
      <icon-btn v-tooltip:right="'涂鸦'">brush</icon-btn>
      <icon-btn v-tooltip:right="'文字'">text_fields</icon-btn>
      <icon-btn v-tooltip:right="'水印'">branding_watermark</icon-btn>
    </div>
  </div>
  <div class="tool-bar flex-center option-bar">
    <!-- <div style="padding: 12px;">
      <icon-btn v-tooltip:right="'16 : 9'">crop_16_9</icon-btn>
      <icon-btn v-tooltip:right="'3 : 2'">crop_3_2</icon-btn>
      <icon-btn v-tooltip:right="'4 : 3'">crop_5_4</icon-btn>
      <icon-btn v-tooltip:right="'3 : 4'">crop_portrait</icon-btn>
      <icon-btn v-tooltip:right="'1 : 1'">crop_din</icon-btn>
      <icon-btn v-tooltip:right="'自由裁切'">crop_free</icon-btn>
      <icon-btn v-tooltip:right="'应用'" color="#45ff45">done</icon-btn>
      <icon-btn v-tooltip:right="'取消'" color="#ff3131">close</icon-btn>
    </div> -->
    <!-- <div style="padding: 12px;">
      <icon-btn v-tooltip:right="'水平翻转'">flip</icon-btn>
      <icon-btn v-tooltip:right="'垂直翻转'" class="flip-y-btn">flip</icon-btn>
      <icon-btn v-tooltip:right="'应用'" color="#45ff45">done</icon-btn>
    </div> -->
    <div style="padding: 12px;">
      <icon-btn v-tooltip:right="'旋转 90°'">rotate_90_degrees_ccw</icon-btn>
      <div class="rotater c-f flex-col" @mousedown="onRotateStart" @mousemove="onRotate" @mouseup="onRotateEnd">
        <div class="flex-item rot-scale"><div></div></div>
        <div class="t-center" style="padding: 10px">{{rotate.deg}}°</div>
        <div class="flex-item rot-scale"><div></div></div>
      </div>
      <icon-btn v-tooltip:right="'应用'" color="#45ff45">done</icon-btn>
    </div>
    <!-- <div style="padding: 12px;">
      <icon-btn v-tooltip:right="'应用'" color="#45ff45">done</icon-btn>
    </div> -->
  </div>
  <div class="flex-item flex-col">
    <div class="opera-bar flex-v-center">
      <div class="flex-item"></div>
      <icon-btn v-tooltip:bottom="'撤销'">undo</icon-btn>
      <icon-btn v-tooltip:bottom="'恢复'">redo</icon-btn>
      <btn flat style="margin-left: 15px;color: #fff;">取消</btn>
      <btn style="margin-left: 10px;">保存</btn>
    </div>
    <div class="flex-item flex-center" id="image-editor-content"></div>
  </div>
</div>
</template>

<script>
import ImageEditor from 'tui-image-editor'
// console.log(ImageEditor)

export default {
  name: 'image-editor',
  data () {
    return {
      editor: null,
      rotate: {
        move: false,
        deg: 0,
        sy: 0,
        y: 0
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.editor = new ImageEditor('#image-editor-content', {
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70
        }
      })
      this.editor.loadImageFromURL('/static/img/bg.4e0ee5b.png', 'lena').then(result => {
        console.log('old : ' + result.oldWidth + ', ' + result.oldHeight)
        console.log('new : ' + result.newWidth + ', ' + result.newHeight)
      })
    },
    onRotateStart (e) {
      this.rotate.move = true
      this.rotate.sy = e.clientY
    },
    onRotate (e) {
      if (!this.rotate.move) return
      let y = e.clientY
      let deg = this.rotate.deg + (y - this.rotate.sy) / 240 * 50
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
    position: relative;overflow: hidden;
    div{width: 4px;height: 200%;border-left: 4px dotted rgba(255, 255, 255, .3);position: absolute;left: 45%;top: 0;pointer-events: none;}
  }
}
</style>
