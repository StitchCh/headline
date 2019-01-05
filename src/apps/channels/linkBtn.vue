<template>
  <div class="relative">
    <icon-btn small @click="show = !show">link</icon-btn>
    <transition name="fade">
      <div v-show="show" class="slebox">
        <div class="flex" style="justify-content: space-between;align-items: center;margin-bottom: 10px;">
          <span style="color: #999;">开启链接</span>
          <switcher v-model="olinkShow" @change="change" mode="Number"/>
        </div>
        <input v-if="olinkShow == 1" @change="change" v-model="olink" style="width: 100%;border: 1px solid #ddd;box-sizing: border-box;" type="text">
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'linkBtn',
  props: ['link', 'linkShow'],
  data () {
    return {
      show: false,
      olink: '',
      olinkShow: ''
    }
  },
  mounted () {
    this.olink = this.link
    this.olinkShow = this.linkShow == 1 ? 1 : 0
  },
  methods: {
    change () {
      this.$emit('linkchange', { link: this.olink, linkshow: this.olinkShow})
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
  .slebox{
    padding: 10px;
    border-radius: 6px;
  }
</style>
