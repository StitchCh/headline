<template>
<label class="check-box" :class="{'check-box-disabled':disabled}">
  <input
  :disabled="disabled"
  :name="name"
  :value="label"
  v-model="model"
  @change="handleChange"
  ref="input"
  type="checkbox">
  <i></i>
  <span class="check-box-text" v-text="text"></span>
  <!-- {{checked}} -->
</label>
</template>

<script>
export default {
  name: 'check-box',
  props: {
    disabled: Boolean,
    label: [String, Object],
    value: [Boolean, Array],
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
.check-box { display: inline-flex;max-width:100%;height:20px;margin-right:10px;align-items: center;cursor: pointer;vertical-align: middle;}
.check-box input { display: none }
.check-box i {position:relative;  display: block; width:15px; height:15px; border-radius: 2px; border:2px solid #aaa;box-sizing: border-box;}
.check-box input:checked + i { background:#018be6; border:1px solid #018be6;
}
.check-box-text{
  width: calc(100% - 27px);
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.check-box input:checked + i:after { position:absolute;left:4px;top:1px; content:''; height: 7px; width:3px;
border:2px solid #fff; transform:rotate(40deg);border-width: 0 2px 2px 0 }
.check-box label { cursor:pointer; }
.check-box label:hover i { border-color: #018be6; }
.check-box-disabled { cursor: not-allowed;opacity: .6;}
/* .check-box-disabled span { color:#b4bccc } */
/* .check-box-disabled:hover i {} */
.check-box-disabled input:checked + i { background:#edf2fc; border:1px solid #d8dce5; }
.check-box-disabled input:checked + i:after { position:absolute;left:4px;top:0; content:'';height: 7px; width:3px;border:1px solid transparent; transform:rotate(40deg);border-bottom-color:#d8dce5;border-right-color:#d8dce5; }
.check-box .check-box-text{margin-left: 8px;white-space: nowrap;}
</style>
