<template>
<label class="radio-box" :class="{'radio-box-disabled':disabled}">
  <input 
  :disabled="disabled" 
  :name="name"
  :value="label"
  v-model="model"
  @change="handleChange"
  type="radio">
  <i></i>
  <span class="radio-box-text" v-if="text" v-text="text"></span>
</label>
</template>

<script>
export default {
  name: 'radio-box',
  props: {
    disabled: Boolean,
    label: [String, Number],
    value: [String, Number],
    name: String,
    text: String
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

<style>
.radio-box { display: inline-flex; font-size:14px; height:20px;margin-right:10px;align-items: center;cursor: pointer;}
.radio-box input { display: none }
.radio-box i {display: inline-block;width:15px; height:15px; border-radius: 50%; border:2px solid #aaa;vertical-align: bottom;box-sizing: border-box;position: relative;}
.radio-box input:checked + i { border:2px solid #018be6;}
.radio-box input:checked + i:after{content: '';position: absolute;display: block;width: 7px;height: 7px;border-radius: 4px;background: #018be6;left: 2px;top: 2px;}
.radio-box label { cursor:pointer; }
.radio-box label:hover i { border-color: #018be6; }
.radio-box-disabled { cursor: not-allowed; opacity: .6}
/* .radio-box-disabled span { color:#b4bccc } */
/* .radio-box-disabled:hover i { border:1px solid #d8dce5; }
.radio-box-disabled:hover i { border:1px solid #d8dce5; } */
/* .radio-box-disabled input:checked + i { border:4px solid #d8dce5; background:#fff; } */
.radio-box .radio-box-text{margin-left: 8px;white-space: nowrap;}
</style>
