<template>
<div class="star-rate" :class="{'disabled': disabled}">
  <i class="icon"
    v-for="(item, i) in max"
    :key="i"
    :style="{fontSize: size + 'px'}"
    :class="{'star-rate-on': i < view}"
    @mouseover="onMouseover(i)"
    @mouseout="onMouseout(i)"
    @click="onClick(i)"
    v-tooltip:top="disabled ? [] : tooltip[i]"
  >star</i>
  <i class="icon clear-star"
    v-if="!disabled && closeBtn"
    :style="{fontSize: size + 'px'}"
    v-tooltip:top="'清空'"
    @click="clear"
  >close</i>
</div>
</template>

<script>
export default {
  name: 'star-rate',
  props: {
    size: {
      type: Number,
      default: 20
    },
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    tooltip: {
      type: Array,
      default () {
        return []
      }
    },
    closeBtn: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },
  created () {
    if (!this.value && !this.disabled) this.$emit('input', 0)
    this.view = this.value
  },
  data () {
    return {
      view: 0
    }
  },
  watch: {
    value (val) {
      this.view = val
    }
  },
  methods: {
    onMouseover (i) {
      this.view = i + 1
      this.$emit('hover', i)
    },
    onMouseout (i) {
      this.view = this.value
    },
    onClick (i) {
      this.$emit('input', i + 1)
    },
    clear () {
      this.$emit('input', 0)
    }
  }
}
</script>

<style lang="less">
.star-rate{
  display: inline-block;
  i.icon{color: rgba(0, 0, 0, .15);cursor: pointer;position: relative;}
  i.icon.star-rate-on{color: orange;}
  i.clear-star{color: rgba(0, 0, 0, .3)}
  i.clear-star:hover{color: orange;}
}
.star-rate.disabled{
  i.icon{cursor: auto;pointer-events: none;}
}
</style>
