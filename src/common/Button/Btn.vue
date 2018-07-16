<template>
<button class="btn" :class="{
  'btn-small': small,
  'btn-big': big,
  'btn-flat': flat,
  'btn-disabled': disabled,
  'btn-outline': outline
}"
@click="$emit('click')"
:style="style"
:disabled="disabled || loading">
  <i class="icon" v-if="prependIcon">{{prependIcon}}</i>
  <slot></slot>
  <i class="icon" v-if="appendIcon">{{appendIcon}}</i>
  <transition name="fade">
  <div class="btn-cover" v-if="loading">
    <loading size="20" class="btn-loading"></loading>
  </div>
  </transition>
</button>

</template>

<script>
export default {
  name: 'btn',
  props: {
    color: { type: String, default: '' },
    flat: Boolean,
    big: Boolean,
    small: Boolean,
    disabled: Boolean,
    prependIcon: String,
    appendIcon: String,
    loading: Boolean,
    outline: Boolean
  },
  computed: {
    style () {
      let res = { color: (this.flat || this.outline) ? this.color : '#fff' }
      if (!this.flat && !this.outline) res.backgroundColor = this.color
      if (this.outline) res.borderColor = this.color
      return res
    }
  }
}
</script>

<style>
.btn{font-size: 14px;padding: 7px 13px;background: #0299ff;color: #fff;border-radius: 2px;transition: background-color .2s;line-height: 16px;
  position: relative;}
.btn-small{font-size: 13px;padding: 6px 12px;line-height: 14px;}
.btn-small .icon{font-size: 20px;padding: 6px 12px;line-height: 14px;}
.btn-big{font-size: 16px;padding: 8px 14px;line-height: 18px;}
.btn-flat{background: transparent;color: #444;}
.btn-flat:hover{background: rgba(0, 0, 0, .1)}
.btn-flat:active{background: rgba(0, 0, 0, .2)}
.btn[disabled]{opacity: .7;pointer-events: none;}
.btn-cover{position: absolute;top: 0;left: 0;right: 0;bottom: 0;background-color: #c9c9c9;border-radius: 2px}
.btn .btn-loading{position: absolute; color: rgba(0,0,0,.26);top: 0;bottom: 0;left: 0;right: 0;margin: auto;}
.btn-outline{border: 1px solid #aaa;background: transparent;color: #444;}
</style>
