<template>
<transition name="toast-animate">
  <div v-show="show" :class="['toast', 'toast-' + type, 'toast-' + position]">
    {{text}}
  </div>
</transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    show: {
      default: false,
      type: Boolean
    },
    text: String,
    type: String,
    position: String
  }
}
</script>

<style>
.toast{
  padding: 14px 24px;
  border-radius: 2px;
  pointer-events: auto;
  min-width: 288px;
  max-width: 568px;
  height: 48px;
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  transition: .4s cubic-bezier(.25,.8,.5,1);
  position: fixed;
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
  margin-bottom:0;
  z-index: 9999;
}
.toast-default {
  background-color: #323232;
}
.toast-left {
  left: 5px;
  bottom:5px;
}
.toast-middle {
  bottom:0;
  left: 50%;
  transform:translateX(-50%);
}
.toast-right {
  right:5px;
  bottom:5px;
}
.toast-info {
  background-color: #2196F3 !important;
}
.toast-error {
  background-color: #ff422e !important;
}
.toast-warning {
  background-color:#ffb647;
  color: #733300;
}
.toast-success {
  background-color: #4CAF50 !important;
}
.toast-animate-enter-active,.toast-animate-leave-active {
  opacity:1;
  margin-bottom:0;
  transition: margin .4s ease,opacity .2s ease;
}
.toast-animate-enter,.toast-animate-leave-to {
  margin-bottom:-30px;
  opacity:0;
}
</style>
