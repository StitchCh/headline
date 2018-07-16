<template>
  <layer :title="title" :width="width" :maskClick="maskClick" :side="side" :transparent="transparent" @close="$emit('close')">
    <ul>
      <slot></slot>
    </ul>
  </layer>
</template>

<script>
export default {
  name: 'select-card',
  props: {
    value: [Array, Number, String],
    multiple: {
      type: Boolean,
      default: false
    },
    title: {type: String, default: ''},
    width: { default: 'auto' },
    maskClick: Boolean,
    side: Boolean,
    transparent: Boolean
  },
  methods: {
    handleClick (e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>
