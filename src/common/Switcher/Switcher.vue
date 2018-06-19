<template>
<label class="switcher" :class="{'switcher-disabled': disabled}">
  <input
    :disabled="disabled"
    :checked="checked"
    :value="value"
    v-model="model"
    @change="handleChange"
    type="checkbox">
  <span class="abs"></span>
  <i></i>
</label>
</template>

<script>
export default {
  name: 'switcher',
  props: {
    disabled: Boolean,
    checked: Boolean,
    value: [Boolean, Number],
    mode: String
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
        let value = this.value
        if (this.mode === 'Number') value = !!value
        return value
      },
      set (val) {
        if (this.mode === 'Number') val = ~~val
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="less">
.switcher{
  position: relative;display: inline-block;cursor: pointer;padding: 3px;width: 45px;height: 25px;box-sizing: border-box;vertical-align: middle;
  input{display: none;}
  .abs{background: #ccc;border-radius: 30px;pointer-events: none;transition: background .3s;}
  input:checked+.abs{background: #52d277;}
  i{display: block;position: absolute;width: 19px;height: 19px;left: 3px;top: 3px;background: #fff;border-radius: 10px;transition: all .3s;}
  input:checked+.abs+i{transform: translateX(20px);}
}
.switcher-disabled{pointer-events: none;opacity: .6;}
</style>
