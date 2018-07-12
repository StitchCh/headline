<template>
<transition name="slide-y">
  <div class="bubble" :class="['bubble-'+pos]" :style="style" @click="onElClick">
    <div class="bubble-arrow bg-f" :style="arrowStyle"></div>
    <div class="bubble-ctn relative bg-f scroll-y">
      <slot></slot>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'bubble',
  props: {
    pos: { type: String, default: 'bottom' }, // left, top, right, bottom
    align: { type: String, default: 'center' } // center, start, end
  },
  data () {
    return {
      style: '',
      arrowStyle: ''
    }
  },
  mounted () {
    this.style = this.getStyle()
    this.arrowStyle = this.getArrowStyle()
    document.body.addEventListener('click', this.close)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.close)
  },
  methods: {
    getStyle () {
      let pel = this.$el ? this.$el.parentElement : null
      if (!pel) return ''
      if (this.pos === 'left' || this.pos === 'right') {
        switch (this.align) {
          case 'center':
            return `top: ${pel.clientHeight / 2 - this.$el.clientHeight / 2}px;`
          case 'start':
            return 'top: 0;'
          case 'end':
            return 'bottom: 0;'
        }
      } else if (this.pos === 'top' || this.pos === 'bottom') {
        switch (this.align) {
          case 'center':
            return `left: ${(pel.clientWidth - this.$el.clientWidth) / 2}px;`
          case 'start':
            return 'left: 0;'
          case 'end':
            return 'right: 0;'
        }
      }
    },
    getArrowStyle () {
      let pel = this.$el ? this.$el.parentElement : null
      if (!pel) return ''
      if (this.pos === 'left' || this.pos === 'right') {
        switch (this.align) {
          case 'center':
            return `top: ${this.$el.clientHeight / 2 - 6}px;`
          case 'start':
            return `top: ${pel.clientHeight / 2 - 6}px;`
          case 'end':
            return `bottom: ${pel.clientHeight / 2 - 6}px;`
        }
      } else if (this.pos === 'top' || this.pos === 'bottom') {
        switch (this.align) {
          case 'center':
            return `left: ${this.$el.clientWidth / 2 - 6}px;`
          case 'start':
            return `left: ${pel.clientWidth / 2 - 6}px;`
          case 'end':
            return `right: ${pel.clientWidth / 2 - 6}px;`
        }
      }
    },
    onElClick (e) {
      e.stopPropagation()
    },
    close (e) {
      if (e.target === this.$el) return
      this.$emit('close')
    }
  }
}
</script>

<style>
.bubble{position: absolute;z-index: 100;}
.bubble-left{right: 100%;padding-right: 10px;}
.bubble-right{left: 100%;padding-left: 10px;}
.bubble-top{bottom: 100%;padding-bottom: 10px;}
.bubble-bottom{top: 100%;padding-top: 10px;}

.bubble-arrow{position: absolute;width: 12px;height: 12px;border: 1px solid rgba(0, 0, 0, .12);border-width: 1px 0 0 1px;border-radius: 2px 0 0 0;z-index: 2;}
.bubble-left .bubble-arrow{right: 4px;transform: rotate(135deg);}
.bubble-right .bubble-arrow{left: 4px;transform: rotate(-45deg);}
.bubble-top .bubble-arrow{bottom: 4px;transform: rotate(225deg);}
.bubble-bottom .bubble-arrow{top: 4px;transform: rotate(45deg);}

.bubble-ctn{padding: 0;height: 100%;text-align: left;
  border-radius: 5px;box-shadow: 0 0 0 1px rgba(0,0,0,.12);pointer-events: auto;}
</style>
