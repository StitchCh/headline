<template>
<div class="slider">
  <div class="slider-bar"
    @mousedown="onMousedown"
    @mousemove="onMousemove"
    @mouseup="onMouseup"
    @mouseout="onMouseout">

    <div v-if="step">
      <div class="slider-step"
        v-for="(s, i) in stepLen"
        :key="i"
        :style="{left: i * step / len * 100 + '%'}"
      ></div>
      <div class="slider-step" style="left: 100%"></div>
    </div>
  </div>
  <div class="slider-track"
  :style="{
    left: trackLeft + '%',
    width: trackWidth + '%'
  }">
  <div class="slider-thumb" :class="{'owe': value < 0}">

    <span v-if="tip" class="tooltip tooltip-top hover-tooltip" style="bottom: 25px;width: 40px;margin-left: -25px;left: 50%;">{{value}}</span>
  </div>
  <div v-if="min < 0 && value !== 0" class="slider-base" v-tooltip:top="'0'" :class="{'owe': value < 0}"></div>
</div>
</div>
</template>

<script>
export default {
  name: 'slider',
  props: {
    tip: Boolean,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      mousedown: false
    }
  },
  computed: {
    len () {
      return this.max - this.min
    },
    stepLen () {
      return Math.ceil(this.len / this.step)
    },
    trackLeft () {
      if (this.min < 0) return this.value > 0 ? Math.abs(this.min) / this.len * 100 : (this.value - this.min) / this.len * 100
      return 0
    },
    trackWidth () {
      if (this.min < 0) return (Math.abs(this.value) / this.len * 100)
      return (this.value - this.min) / this.len * 100
    },
    tipValue () {
      return 0
    }
  },
  methods: {
    onMousedown (e) {
      this.mousedown = true
      let x = e.offsetX
      this.setValue(x)
    },
    onMousemove (e) {
      if (!this.mousedown) return
      let x = e.offsetX
      this.setValue(x)
    },
    onMouseup (e) {
      this.mousedown = false
    },
    onMouseout (e) {
      this.mousedown = false
    },
    setValue (x) {
      let _x = x < 0 ? 0 : x
      _x = _x / (this.$el.clientWidth) // _x： 0.xx 鼠标点在坐标轴上的百分比
      let value = 0
      if (this.min < 0) {
        let basePos = Math.abs(this.min) / this.len
        value = (_x - basePos) * this.len
      } else {
        value = _x * this.len + this.min
      }
      let step = this.step
      if (step) {
        let _val = Math.abs(value % step)
        if (value >= 0) {
          if (_val < step / 2) value = value - _val
          else value = value + (step - _val)
        } else {
          if (_val < step / 2) value = value + _val
          else value = value + (_val - step)
        }
      }
      this.$emit('input', Math.round(value * 100) / 100)
    }
  }
}
</script>

<style lang="less">
.slider{
  // background: rgba(0, 0, 0, .05);
  position: relative;height: 30px;overflow: visible;cursor: pointer;pointer-events: auto;user-select: none;
  .hover-tooltip{text-align: center;}
  .slider-bar{position: relative;height: 18px;height: 100%;padding: 14px 0;pointer-events: auto;
    &:after{content: '';display: block;height: 2px;;background: rgba(0, 0, 0, .2);}
    &:hover{.hover-tooltip{opacity: 1;}}
  }
  .slider-thumb{position: absolute;width: 18px;height: 18px;left: 0;top: 0;background: #008be6;margin-left: -9px;margin-top: -8px;
    border-radius: 10px;box-shadow: 0 2px 5px rgba(0, 0, 0, .2);transform: scale(.6);transition: transform .3s;
    left: 100%;z-index: 5;pointer-events: none;}
  .slider-thumb.owe{left: 0;}
  .hover-tooltip{opacity: 0;pointer-events: none;}
  &:hover{
    .slider-thumb{transform: scale(1);}
    .hover-tooltip{opacity: 1;}
  }
  .slider-track{position: absolute;height: 2px;top: 14px;background: #008be6;transition: none;pointer-events: none;}
  .slider-step, .slider-base{width: 4px;height: 4px;background: #fff;background: orange;margin: -2px 0 0 -2px;position: absolute;z-index: 2;
    left: 0;top: 15px;border-radius: 4px;background: #fff;pointer-events: none;
  }
  .slider-base{background: transparent;width: 18px;height: 18px;left: 0;top: 1px;margin: -9px 0 0 -9px;padding: 5px;z-index: 4}
  .slider-base:after{content: '';display: block;width: 8px;height: 8px;background: #008be6;border-radius: 4px;}
  .slider-base.owe{left: 100%;}
  .no-transition{transition: none!important;}
}
</style>
