<template>
  <div class="relative">
    <icon-btn small @click="show = true">link</icon-btn>
    <transition name="fade">
      <div v-show="show" class="slebox">
        <input @focus="show = false" style="border: 0;" type="text">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'linkBtn',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
