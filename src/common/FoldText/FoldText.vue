<template>
<div class="fold-text">
  <div
    class="fold-text-mask"
    :class="{'fold-text-folded': over && !open, 'fold-text-open': over && open}"
    :style="{'height':  over && !open ? (~~height-10)+'px' : 'auto'}"
  >
    <div class="fold-text-ctn">
      <slot/>
    </div>
  </div>
  <div v-if="over" class="t-center">
    <div class="fold-text-btn" @click="toggle()">
      {{ open ? '收起' : '展开' }}
      <i class="icon">{{  open ? 'arrow_drop_up' : 'arrow_drop_down' }}</i>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'fold-text',
  props: {
    height: { default: 60 }
  },
  data () {
    return {
      over: false,
      open: false
    }
  },
  mounted () {
    this.over = this.$el.clientHeight > ~~this.height
    let imgs = this.$el.querySelectorAll('img')
    imgs.forEach(img => {
      img.addEventListener('load', () => {
        this.over = this.$el.clientHeight > ~~this.height
      })
    })
  },
  methods: {
    toggle () {
      let mask = this.$el.querySelector('.fold-text-mask')
      if (!this.open) {
        let h = this.$el.querySelector('.fold-text-ctn').clientHeight
        mask.style.height = h + 'px'
        setTimeout(() => {
          this.open = true
        }, 300)
      } else {
        let h = this.$el.querySelector('.fold-text-ctn').clientHeight
        mask.style.height = h + 'px'
        setTimeout(() => {
          mask.style.height = ''
          this.open = false
        }, 10)
      }
    }
  }
}
</script>

<style>
.fold-text{}
.fold-text-folded{-webkit-mask-image: -webkit-linear-gradient(top, rgba(0,0,0,.99), rgba(0,0,0,.01));overflow: hidden!important;}
/* .fold-text-folded .fold-text-ctn{} */
.fold-text-btn{color: #018be6;cursor: pointer;user-select: none;font-size: 13px;}
.fold-text-open{height: auto;}
.fold-text-mask{transition: all .3s ease;overflow: visible;}
</style>
