<template>
<label class="switcher" :class="{'switcher-disabled': disabled}">
  <input
    :disabled="disabled"
    :checked="checked"
    :value="value"
    v-model="model"
    @change="handleChange"
    type="checkbox">
  <span class="switcher-ctn"><i></i></span>
</label>
</template>

<script>
export default {
  name: 'switcher',
  props: {
    disabled: Boolean,
    checked: Boolean,
    value: Boolean
  },
  methods: {
    handleChange () {
      this.$nextTick(() => {
        this.$emit('change', this.model)
      })
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="less">
.switcher{
  display: inline-block;cursor: pointer;padding: 3px;width: 34px;height: 20px;box-sizing: border-box;
  input{display: none;}
  .switcher-ctn{display: inline-block;position: relative;width: 28px;height: 14px;background: rgba(0, 0, 0, .2);border-radius: 8px;
    overflow: visible;transition: all .3s;
    i{display: block;position: absolute;width: 20px;height: 20px;left: -3px;top: -3px;background: #999;border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, .2);transition: all .3s;}
  }
  input:checked+.switcher-ctn{
    background: rgba(0, 139, 230, 0.35);
    i{transform: translateX(15px);background: #008be6;}
  }
}
.switcher-disabled{pointer-events: none;opacity: .6;}
</style>
