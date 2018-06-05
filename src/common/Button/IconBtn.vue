<template>
<button
  class="icon-btn c-6"
  :disabled="disabled"
  :class="{
    'icon-btn-big': big,
    'icon-btn-small': small,
    'icon-btn-disabled': disabled
  }"
  :style="{color}"
  @click="$emit('click')">
  <i class="icon"><slot></slot></i>
</button>
</template>

<script>
export default {
  name: 'icon-btn',
  props: {
    big: Boolean,
    small: Boolean,
    disabled: Boolean,
    color: String
    // tag: {type: String, default: 'button'}
  }
}
</script>

<style>
.icon-btn{background: rgba(0, 0, 0, 0);padding: 6px;border-radius: 50%;transition: background .3s;user-select: none;}
.icon-btn:hover{background: rgba(0, 0, 0, .12);}
.icon-btn:active{background: rgba(0, 0, 0, .2);}
.icon-btn-big{padding: 8px;}
.icon-btn-big .icon{font-size: 30px;}
.icon-btn-small{padding: 5px;}
.icon-btn-small .icon{font-size: 20px;}
.icon-btn-disabled{pointer-events: none;opacity: .5;}
</style>
