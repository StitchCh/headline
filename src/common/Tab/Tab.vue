<template>
  <ul class="tab flex-v-center">
    <slot></slot>
    <div class="tab-slider" :style="sliderStyle"></div>
  </ul>
</template>

<script>
export default {
  name: 'tab',
  props: {
    value: String
  },
  data () {
    return {
      sliderStyle: ''
    }
  },
  mounted () {
    this.computedStyle()
  },
  watch: {
    value () {
      this.computedStyle()
    }
  },
  methods: {
    computedStyle () {
      var cds = [...(this.$el.children)]
      cds.pop()
      var left = 0
      var width = 0
      for (var i = 0; i < cds.length; i++) {
        if (cds[i].children[0].getAttribute('hrefs') === this.value) {
          width = cds[i].clientWidth
          break
        } else {
          left += parseFloat(cds[i].clientWidth)
        }
      }
      this.sliderStyle = {
        left: left + 'px',
        width: width + 'px'
      }
    }
  }
}
</script>

<style>
.tab {
  width:100%;
   position:relative;
  border-bottom:1px solid #ddd;
  min-height:50px;
  overflow: visible;
}
.tab .tab-slider {
  position:absolute;
  transition:all .2s;
  left:0;
  height: 3px;
  background:#2196f3;
  bottom:-1px;
}
</style>
