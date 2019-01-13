<template>
<div class="image-editor">
  <div class="content flex">
    <div class="tool-bar flex-center">
      <div style="padding: 12px;">
        <icon-btn :disabled="toolActive!==''&&toolActive!=='crop'" @click="toolActive='crop'" v-tooltip:right="'裁剪'" :key="toolActive+'1'">crop</icon-btn>
        <icon-btn :disabled="toolActive!==''&&toolActive!=='flip'" @click="toolActive='flip'" v-tooltip:right="'翻转'" :key="toolActive+'2'">flip</icon-btn>
        <icon-btn :disabled="toolActive!==''&&toolActive!=='rotate'" @click="toolActive='rotate'" v-tooltip:right="'旋转'" :key="toolActive+'3'">rotate_90_degrees_ccw</icon-btn>
        <div style="height: 1px;background: rgba(255,255,255,0.2);margin: 10px;"></div>
        <icon-btn v-tooltip:right="'移动'" class="move-icon" @click="cropper.setDragMode('move')">pan_tool</icon-btn>
        <icon-btn v-tooltip:right="'放大'" @click="cropper.zoom(0.5)">zoom_in</icon-btn>
        <icon-btn v-tooltip:right="'缩小'" @click="cropper.zoom(-0.5)">zoom_out</icon-btn>
        <div style="height: 1px;background: rgba(255,255,255,0.2);margin: 10px;"></div>
        <icon-btn v-tooltip:bottom="'撤销'" :disabled="history.index === -1" @click="undo">undo</icon-btn>
        <icon-btn v-tooltip:bottom="'恢复'" :disabled="history.index === history.list.length - 1" @click="redo">redo</icon-btn>
        <!-- <icon-btn v-tooltip:right="'涂鸦'">brush</icon-btn>
        <icon-btn v-tooltip:right="'文字'">text_fields</icon-btn> -->
         <icon-btn v-tooltip:right="'水印'" :disabled="toolActive !== ''"  @click="watermark = !watermark">branding_watermark</icon-btn>
      </div>
    </div>
    <transition name="fade">
      <div class="tool-bar flex-center option-bar" v-if="toolActive">
        <div style="width: 60px;padding: 12px;" v-if="toolActive === 'crop'">
          <icon-btn v-tooltip:right="'16 : 9'" :class="{ on: optionActive === '16 : 9'}" @click="setRatio(1)">crop_16_9</icon-btn>
          <icon-btn v-tooltip:right="'4 : 3'" :class="{ on: optionActive === '4 : 3'}" @click="setRatio(2)">crop_5_4</icon-btn>
          <icon-btn v-tooltip:right="'1 : 1'" :class="{ on: optionActive === '1 : 1'}" @click="setRatio(3)">crop_din</icon-btn>
          <icon-btn v-tooltip:right="'自由裁切'" :class="{ on: optionActive === 'free' }" @click="setRatio">crop_free</icon-btn>
          <icon-btn v-tooltip:right="'应用'" color="#45ff45" class="on" @click="crop">done</icon-btn>
          <icon-btn v-tooltip:right="'取消'" color="#ff3131" class="on" @click="cancelCrop">close</icon-btn>
        </div>
        <div style="width: 60px;padding: 12px;" v-if="toolActive === 'flip'">
          <icon-btn v-tooltip:right="'水平翻转'" class="on" @click="flip('x')">flip</icon-btn>
          <icon-btn v-tooltip:right="'垂直翻转'" class="on flip-y-btn" @click="flip('y')">flip</icon-btn>
          <icon-btn v-tooltip:right="'应用'" color="#45ff45" @click="toolActive=''" class="on">done</icon-btn>
        </div>
        <div style="width: 60px;padding: 12px;" v-if="toolActive === 'rotate'">
          <icon-btn v-tooltip:right="'逆时针旋转 90°'" class="on" @click="rotate('left')">rotate_left</icon-btn>
          <icon-btn v-tooltip:right="'顺时针旋转 90°'" class="on" @click="rotate('right')">rotate_right</icon-btn>
          <!--<div class="rotater flex-col" ref="rotater">-->
            <!--<div class="flex-item rot-scale">-->
              <!--<div :style="{transform: `translateY(${rotate.deg}px)`}"></div>-->
            <!--</div>-->
            <!--<div class="t-center" style="padding: 10px;pointer-events:none;">{{rotate.deg}}°</div>-->
            <!--<div class="flex-item rot-scale">-->
              <!--<div :style="{transform: `translateY(${rotate.deg}px)`}"></div>-->
            <!--</div>-->
          <!--</div>-->
          <icon-btn v-tooltip:right="'应用'" color="#45ff45" class="on" @click="toolActive=''">done</icon-btn>
        </div>
      </div>
    </transition>
    <div class="flex-item flex-col">
      <div ref="imgbox" class="flex-item flex-center" style="position: relative">
        <div class="watermark_box"
             :style="{top: watermarkData.top + 'px', left: watermarkData.left + 'px', width: watermarkData.width + 'px'}"
             @mousedown="watermarkDown"
             v-if="watermark && toolActive === ''"
        >
          <img ref="watermark_img" ondragstart="return false;" :src="waterImg" alt="" style="width: 100%;">
          <div @mousedown="watermarkResize" style="width: 10px;height: 10px;position: absolute;right: -5px;bottom: -5px;border-radius: 50%;background: #00a0e9;cursor: nwse-resize;"></div>
        </div>
        <img style="max-width: 100%;" :src="src" ref="cropper"/>
      </div>
      <div class="layer-btns">
        <btn flat @click="$emit('close')">取消</btn>
        <btn flat @click="submit">保存</btn>
      </div>
    </div>
  </div>
  <!--<canvas style="position: fixed;top: 0px;left: 0px;z-index: -10;" ref="mycanvasbox"></canvas>-->
</div>
</template>

<script>
import 'cropperjs/dist/cropper.min.css'
import Cropper from 'cropperjs'
// const fixNums = [[16, 9], [4, 3], [3, 2], [1, 1]]

export default {
  name: 'image-editor',
  props: {
    src: String,
    current: Object
  },
  data () {
    return {
      watermarkData: {
        top: 380,
        left: 580,
        width: 40,
        height: '',
        x: 0,
        y: 0
      },
      clickState: true,
      imgboxData: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      toolActive: '',
      watermark: false,
      optionActive: '',
      cropper: null,
      // crop: {
      //   width: 1,
      //   height: 1
      // },
      history: {
        index: -1,
        list: []
      },
      waterImg: '',
      mycanvas: null
      // rotate: {
      //   move: false,
      //   deg: 0,
      //   sdeg: 0,
      //   sy: 0,
      //   y: 0
      // }
    }
  },
  mounted () {
    this.waterImg = this.$store.state.account.waterImg
    this.watermarkData.top
    this.imgboxData = {
      x: this.$refs.imgbox.offsetLeft,
      y: this.$refs.imgbox.offsetTop,
      width: this.$refs.imgbox.offsetWidth,
      height: this.$refs.imgbox.offsetHeight
    }
    console.log(this.imgboxData)
    this.init()
  //   window.addEventListener('mousedown', this.onRotateStart)
  //   window.addEventListener('mousemove', this.onRotate)
  //   window.addEventListener('mouseup', this.onRotateEnd)
  //   window.addEventListener('resize', this.onWindowResize)
  // },
  // beforeDestroy () {
  //   window.removeEven                                     tListener('mousedown', this.onRotateStart)
  //   window.removeEventListener('mousemove', this.onRotate)
  //   window.removeEventListener('mouseup', this.onRotateEnd)
  //   window.addEventListener('resize', this.onWindowResize)
  },
  methods: {
    watermarkResize (event) {
      event.stopPropagation()
      console.log(this.watermarkData.width, event.clientX , this.watermarkData.x)
      let ox = event.clientX - this.watermarkData.width
      document.body.onmousemove = (event) => {
        this.watermarkData.width = event.clientX - ox
      }
      document.body.onmouseup = () => {
        document.body.onmousemove = null
      }
    },
    watermarkDown (event) {
      this.watermarkData.x = event.clientX - this.watermarkData.left
      this.watermarkData.y = event.clientY - this.watermarkData.top
      document.body.onmousemove = (event) => {
        let oTop = event.clientY - this.watermarkData.y <= 0 ? 0 : event.clientY - this.watermarkData.y
        let oLeft = event.clientX - this.watermarkData.x <= 0 ? 0 : event.clientX - this.watermarkData.x
        if (oTop >= this.imgboxData.height - this.watermarkData.width) {
          oTop = this.imgboxData.height - this.watermarkData.width
        }
        if (oLeft >= this.imgboxData.width - this.watermarkData.width) {
          oLeft = this.imgboxData.width - this.watermarkData.width
        }
        this.watermarkData.left = oLeft
        this.watermarkData.top = oTop
      }
      document.body.onmouseup = () => {
        document.body.onmousemove = null
      }
    },
    init () {
      this.cropper = new Cropper(this.$refs.cropper, {
        viewMode: 1,
        autoCrop: false,
        dragMode: 'move'
      })
    },
    // onRotateStart (e) {
    //   if (e.target !== this.$refs.rotater) return
    //   this.rotate.move = true
    //   this.rotate.sy = e.clientY
    // },
    // onRotate (e) {
    //   if (!this.rotate.move) return
    //   let y = e.clientY
    //   let deg = this.rotate.sdeg + (y - this.rotate.sy) / 2
    //   if (deg >= 45) {
    //     this.rotate.deg = 45
    //     return
    //   } else {
    //     if (deg <= -45) {
    //       this.rotate.deg = -45
    //       return
    //     }
    //   }
    //   this.rotate.deg = parseInt(deg)
    // },
    // onRotateEnd (e) {
    //   this.rotate.move = false
    //   this.rotate.sy = 0
    //   this.rotate.sdeg = this.rotate.deg
    // },
    // onWindowResize (e) {
    //   this.cropper.restore()
    // }
    setRatio (type = 0) {
      if (type === 0) {
        this.cropper.setAspectRatio(NaN)
        this.optionActive = 'free'
      }
      if (type === 1) {
        this.cropper.setAspectRatio(16 / 9)
        this.optionActive = '16 : 9'
      }
      if (type === 2) {
        this.cropper.setAspectRatio(4 / 3)
        this.optionActive = '4 : 3'
      }
      if (type === 3) {
        this.cropper.setAspectRatio(1 / 1)
        this.optionActive = '1 : 1'
      }
      this.cropper.setDragMode('crop')
    },
    crop () {
      this.pushHistory('crop')
      let cropperCanvas = this.cropper.getCroppedCanvas().toDataURL()
      this.cropper.replace(cropperCanvas)
    },
    cancelCrop () {
      this.toolActive = ''
      this.optionActive = ''
      this.cropper.clear()
      this.cropper.setDragMode('move')
    },
    flip (type) {
      if (type === 'x') this.cropper.scaleX(-this.cropper.getData().scaleX)
      if (type === 'y') this.cropper.scaleY(-this.cropper.getData().scaleY)
      this.pushHistory('flip')
    },
    rotate (type) {
      if (type === 'left') this.cropper.rotate(-90)
      if (type === 'right') this.cropper.rotate(90)
      this.pushHistory('rotate')
    },
    pushHistory (type) {
      let { index, list } = this.history
      if (index !== list.length - 1) {
        list.splice(index + 1, list.length - 1 - index)
      }
      list.push({
        type,
        cropperData: this.cropper.getData(),
        cropperCropBoxData: this.cropper.getCropBoxData(),
        cropperCanvas: this.cropper.getCroppedCanvas().toDataURL()
      })
      this.history.index++
    },
    setHistory () {
      let { index, list } = this.history
      if (index === -1) {
        this.cropper.replace(this.src)
        return
      }
      let { type, cropperData, cropperCanvas } = list[index]
      if (type === 'crop') this.cropper.replace(cropperCanvas)
      if (type === 'flip' || type === 'rotate') this.cropper.setData(cropperData)
    },
    undo () {
      this.history.index--
      this.setHistory()
    },
    redo () {
      this.history.index++
      this.setHistory()
    },
    submit () {
      if (!this.clickState) {
        return
      } else {
        this.clickState = false
      }
      let { current } = this
      let canvasData = {
        w: this.cropper.getCroppedCanvas().width,
        h: this.cropper.getCroppedCanvas().height,
        ratio: 0,
        ratioValue: {
          w: 0,
          h: 0
        }
      }
      if (this.watermark) {
        let canvas = document.createElement("canvas")
        canvas.width = canvasData.w
        canvas.height = canvasData.h
        this.mycanvas = canvas.getContext("2d")
        let imgObj1 = new Image()
        imgObj1.src = this.cropper.getCroppedCanvas().toDataURL("image/png")
        imgObj1.onload = () => {
          this.mycanvas.drawImage(imgObj1, 0, 0)
          let imgObj = new Image()
          imgObj.setAttribute('crossOrigin', 'Anonymous')
          imgObj.src = this.waterImg
          imgObj.onload = () => {
            if (canvasData.w / canvasData.h >= this.imgboxData.width / this.imgboxData.height) {
              canvasData.ratio = this.imgboxData.width / canvasData.w
              canvasData.ratioValue = {
                w: this.imgboxData.width,
                h: canvasData.ratio * canvasData.h
              }
            } else {
              canvasData.ratio = this.imgboxData.height / canvasData.h
              canvasData.ratioValue = {
                w: canvasData.ratio * canvasData.w,
                h: this.imgboxData.height
              }
            }
            this.watermarkData.height =  (imgObj.width / imgObj.height)
            this.mycanvas.drawImage(imgObj, (this.watermarkData.left - (this.imgboxData.width - canvasData.ratioValue.w) / 2) / canvasData.ratio, (this.watermarkData.top - (this.imgboxData.height - canvasData.ratioValue.h) / 2) / canvasData.ratio, this.watermarkData.width / canvasData.ratio, (this.watermarkData.width / this.watermarkData.height) / canvasData.ratio)
            var convertBase64ToBlob = function(base64){
              var base64Arr = base64.split(',');
              var imgtype = '';
              var base64String = '';
              if(base64Arr.length > 1){
                //如果是图片base64，去掉头信息
                base64String = base64Arr[1];
                imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
              }
              // 将base64解码
              var bytes = atob(base64String);
              //var bytes = base64;
              var bytesCode = new ArrayBuffer(bytes.length);
              // 转换为类型化数组
              var byteArray = new Uint8Array(bytesCode);

              // 将base64转换为ascii码
              for (var i = 0; i < bytes.length; i++) {
                byteArray[i] = bytes.charCodeAt(i);
              }

              // 生成Blob对象（文件对象）
              return new Blob( [bytesCode] , {type : imgtype});
            }
            let img = convertBase64ToBlob(canvas.toDataURL("image/png"))
            let data = {
              type: 0,
              folderId: current.folderId,
              file: new File([img], current.alias)
            }
            console.log(data)
            this.$http.post('/cri-cms-platform/media/uploadIAU.monitor', data).then(res => {
              console.log(res)
              this.$emit('refresh')
              this.clickState = true
            }).catch(e => {
              this.clickState = true
              this.$toast(e.msg || `保存失败`)
            })
          }
        }
      } else {
        this.cropper.getCroppedCanvas().toBlob(img => {
          let data = {
            type: 0,
            folderId: current.folderId,
            file: new File([img], current.alias)
          }
          console.log(data)
          this.$http.post('/cri-cms-platform/media/uploadIAU.monitor', data).then(res => {
            console.log(res)
            this.$emit('refresh')
          }).catch(e => {
            this.$toast(e.msg || `保存失败`)
          })
        })
      }
    }
  }
}
</script>

<style lang="less">
.image-editor{
  .watermark_box{
    width: 40px;
    z-index:100;
    position: absolute;
    border: 1px solid #00a0e9;
  }
  position: fixed;left: 0;top: 0;width: 100%;height: 100%;z-index: 20;background: rgba(0, 0, 0, .9);
  .layer-ctn{max-width: 800px!important;}
  .content{height: 500px;width: 700px;position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;margin: auto;background: #fff;border-radius: 10px;}
  .tool-bar{width: 60px;border-right: 1px solid rgba(0, 0, 0, .1);}
  .option-bar{position: absolute;left: 60px;top: 0;height: 100%;z-index: 10;border-right: 1px solid rgba(0, 0, 0, .1);
    background: rgba(255, 255, 255, .7);
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
  .rotater{height: 240px;width: 60px;user-select: none;}
  .rot-scale{
    position: relative;overflow: hidden;pointer-events: none;
    div{width: 4px;height: 400%;border-left: 4px dotted rgba(0, 0, 0, .3);position: absolute;left: 45%;top: -100%;pointer-events: none;}
  }
  .move-icon .icon{transform: scale(.85);}
  .cropper-bg{background-image: none!important;}
}
</style>
