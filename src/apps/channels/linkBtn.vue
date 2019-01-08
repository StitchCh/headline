<template>
  <div class="relative">
    <icon-btn small @click="show = !show">link</icon-btn>
    <transition name="fade">
      <div v-show="show" class="slebox">
        <div class="flex" style="justify-content: space-between;align-items: center;margin-bottom: 10px;">
          <span style="color: #999;">开启链接</span>
          <switcher v-model="olinkShow" @change="change" mode="Number"/>
        </div>
        <input v-if="olinkShow == 1" @blur="testLink" @change="change" v-model="olink" :class="{sleboxerr: err}" type="text">
      </div>
    </transition>
    <div v-if="show" class="closebox" @click="closeLink"></div>
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
      err: false,
      olinkShow: '',
      urlif: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
    }
  },
  mounted () {
    this.olink = this.link
    this.olinkShow = this.linkShow == 1 ? 1 : 0
  },
  methods: {
    closeLink () {
      if (!this.show) {
        this.show = true
        return
      }
      if (this.olinkShow == 1 && !this.urlif.test(this.olink)) {
        this.err = true
        this.$toast('请输入正确的链接')
      } else {
        this.err = false
        this.show = false
      }
    },
    testLink () {
      if (!this.urlif.test(this.olink)) {
        this.err = true
        this.$toast('请输入正确的链接')
      } else {
        this.err = false
      }
    },
    change () {
      if (this.olink != "") {
        this.$emit('linkchange', { link: this.olink, linkshow: this.olinkShow})
      }
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
    position: absolute;top: 40px;width: 300px;right: 0;border: 1px solid #ddd;background: #fff;z-index: 10;
    padding: 10px;
    border-radius: 6px;
  }
  .slebox input{
    width: 100%;
    width: 100%;border: 1px solid #ddd;box-sizing: border-box;
  }
  .slebox .sleboxerr{
    border-color: #f00;
  }
  .closebox{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
  }
</style>
