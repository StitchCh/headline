<template>
<div class="relative input-box f-14" :class="{ 'no-label-action': !labelAction }" tabindex="-1">
  <input
    v-if="!multiLine"

    class="f-14"
    :placeholder="labelAction ? ' ' : label"

    :type="type"
    :disabled="disabled"
    :value="value"
    :autocomplete="autocomplete"
    :readonly="readonly"
    :class="{'input-box-readonly': readonly}"
    ref="input"

    @input="updateValue($event.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @click="$emit('click')"
    @keypress="$emit('keypress')"
    @keydown="$emit('keydown')"
    @keyup="$emit('keyup')"
  >
  <textarea
    v-if="multiLine"

    class="f-14"
    :placeholder="labelAction ? ' ' : label"

    :type="type"
    :disabled="disabled"
    :value="value"
    :rows="rows"
    :autocomplete="autocomplete"
    :readonly="readonly"
    :class="{'input-box-readonly': readonly}"
    ref="textarea"

    @input="updateValue($event.target.value)"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @click="$emit('click')"
    @keypress="$emit('keypress')"
    @keydown="$emit('keydown')"
    @keyup="$emit('keyup')"
  ></textarea>
  <label class="label" v-if="labelAction" v-text="label"></label>
  <div class="input-line"></div>
  <div v-if="hint" class="input-hint f-12 c-6" v-text="hint"></div>
</div>
</template>

<script>
export default {
  name: 'input-box',
  props: {
    type: { type: String, default: 'text' },
    value: { type: [String, Number], default: '' },
    hint: { type: String, default: '' },
    label: { type: String, default: '' },
    labelAction: { type: Boolean, default: true },
    disabled: Boolean,
    readonly: Boolean,
    autocomplete: { type: String, default: '' },
    rows: [Number, String],
    multiLine: Boolean,
    format: Function
  },
  methods: {
    updateValue (val) {
      let value = val
      if (this.format) {
        value = this.format(value)
        if (value !== val) {
          this.$refs.input.value = value
        }
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less">
.input-box{padding: 18px 0;
  input{height: 30px;}
  textarea{vertical-align: top;min-height: 100px;resize: none;}
  input, textarea{padding: 0;width: 100%;font-size: 14px;border: none;box-sizing: border-box;border-bottom: 1px solid rgba(0, 0, 0, .2);padding-left: 0;transition: all .3s;outline: none;background: transparent;}
  label{position: absolute;color: rgba(0, 0, 0, .4);line-height: 30px;left: 0;top: 18px;pointer-events: none;transform-origin: left top;transition: all .3s ease;}
  input:focus+.label, textarea:focus+.label{transform: scale(.85) translateY(-26px);color: #0199ff;}
  input:not(:placeholder-shown)+.label, textarea:not(:placeholder-shown)+.label{transform: scale(.85) translateY(-26px);}
  input:focus+label+.input-line,
  input:focus+label+.prefix+.input-line,
  textarea:focus+label+.input-line,
  textarea:focus+label+.prefix+.input-line
  {transform: scaleX(1);}
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{color: rgba(0, 0, 0, .4);}
  .input-hint{margin-top: 3px;}
  input[disabled], textarea[disabled]{border-bottom-style: dashed;}
  .input-line{display: block;left: 0;margin-top: -1px;bottom: 20px;width: 100%;height: 2px;background: #0199ff;transform: scaleX(0);transition: all .3s;pointer-events: none;transform-origin: left;}
  &.no-label-action{padding: 5px 0;}
}
</style>
