<template>
  <li class="navigator-item relative" @click="$emit('click')">
    <i class="icon" v-if="icon">{{icon}}</i>
    <span :class="[ 'status',  status ]" v-if="status"></span>
    <slot></slot>
  </li>
</template>

<script>
  export default {
    name: 'navigator-item',
    props: {
      icon: String,
      status: String
    },
    created () {
      console.log(this.$parent)
    }
  }
</script>

<style lang="less">
.navigator-item {height: 45px;border-bottom: 1px solid rgba(0, 0, 0, .05);box-sizing: border-box;padding: 10px 20px;cursor: pointer;
  .icon {font-size: 20px;margin-right: 5px;}
  .status {display: inline-block;width: 10px;height: 10px;border-radius: 5px;margin-right: 5px;}
  .done {background: #4ab36b;}
  .warning {background: #f89972;}
  .error {background: #d74947;}
  .disabled {background: #b8a59a;}
}
</style>
