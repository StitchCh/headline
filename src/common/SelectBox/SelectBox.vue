<template>
<div class="select-box" :class="{'select-viewTop': viewTop,'select-active':show,'select-disabled':disabled}">

  <div class="select-label" @click.stop="dropDown" tabindex="-1">
    <!-- <input type="text" readonly :placeholder="label" :style="{height:height}" @blur="blur" v-model="model"> -->
    <input-box
      type="text"
      :readonly="!filterable && !remote"
      :label="label"
      :hint="hint"
      @blur="blur"
      v-model="model"
      ref="input"
      :labelAction="labelAction"
    />
    <i :class="{ icon: true, labelAction_icon: !labelAction }">arrow_drop_down</i>
  </div>

  <transition name="slide-y">
    <ul class="select-option scroll-y" v-if="show">
      <li v-for="(item,i) in (filterable ? filterList : list)" :class="item[optionText] === model ? 'active':''" :value="item[optionValue]" @click="select(item)" :key="i">{{item[optionText]}}</li>
    </ul>
  </transition>
</div>
</template>

<script>
import InputBox from '../InputBox/InputBox'

export default {
  name: 'select-box',
  components: { InputBox },
  data () {
    return {
      show: false,
      viewTop: false,
      filterList: [],
      selected: false,
      text: ''
    }
  },
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    label: String,
    value: [String, Number],
    disabled: Boolean,
    optionText: {
      type: String,
      default: 'text'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    hint: String,
    filterable: Boolean,
    labelAction: { type: Boolean, default: true },
    filterMethod: Function,
    remote: Boolean
  },
  watch: {
    show (bol) {
      if (bol) {
        this.$emit('focus')
        this.beViewTop()
      }
    },
    list (newValue) {
      if (this.filterable) {
        this.filterList = newValue
      }
    }
  },
  created () {
    this.filterList = this.list
  },
  mounted () {
    document.body.addEventListener('click', this.close)
  },
  destroyed () {
    document.body.removeEventListener('click', this.close)
  },
  methods: {
    close () {
      this.show = false
    },
    beViewTop () {
      this.viewTop = false
      this.$nextTick(() => {
        if ((document.body.clientHeight - Math.ceil(this.$el.querySelector('.select-option').getBoundingClientRect().bottom)) <= 0) {
          this.viewTop = true
          // console.log((document.body.clientHeight - Math.ceil(this.$el.querySelector('.select-option').getBoundingClientRect().bottom)))
        }
      })
    },
    select (item) {
      if (this.filterable || this.remote) {
        this.text = item[this.optionText]
        this.$emit('input', item[this.optionValue])
      } else {
        this.model = item[this.optionValue]
      }
      this.$emit('change')
    },
    dropDown () {
      this.show = !this.show
    },
    blur () {
      if (this.filterable) {
        if (this.model === '') {
          this.$refs.input.$refs.input.value = ''
        } else {
          this.$refs.input.$refs.input.value = this.model
        }
        this.filterList = this.list
      }
      if (this.remote) {
        if (this.model === '') {
          this.$refs.input.$refs.input.value = ''
        } else {
          this.$refs.input.$refs.input.value = this.text
        }
      }
      this.close()
      this.$emit('blur')
    },
    getFilterList (data) {
      if (!this.filterMethod) {
        let optionText = this.optionText
        let value = this.$refs.input.$refs.input.value
        if (value === '') {
          return true
        }
        return data[optionText].indexOf(value) !== -1
      }
      return this.filterMethod(this.$refs.input.$refs.input.value, data)
    }
  },
  computed: {
    model: {
      get () {
        var arr = this.list.filter(item => {
          return item[this.optionValue] === this.value
        })
        if (arr.length === 0) {
          if (this.remote) {
            return this.text
          }
          return ''
        } else {
          this.text = arr[0][this.optionText]
          return arr[0][this.optionText]
        }
      },
      set (val) {
        if (this.filterable) {
          this.filterList = this.list.filter(this.getFilterList)
        } else if (this.remote) {
          this.$emit('remoteMethod', this.$refs.input.$refs.input.value)
        } else {
          this.$emit('input', val)
        }
      }
    }
  }
}
</script>

<style lang="less">
.select-box{ display: block;position:relative; color:rgba(0,0,0,.87);font-size:14px;
  &.select-disabled { opacity:0.6 }
  &.select-disabled .select-label { pointer-events:none; }
  .select-label { cursor:pointer; }
  .select-option{top: 48px;height: auto;}
  &.select-viewTop .select-option{bottom: 50px;top: auto;}
  .select-label i { color: #aaa;position:absolute;font-size:22px;transition:transform .4s;right: 0;top: 24px; }
  .select-label i.labelAction_icon { top: 11px; }
  &.select-active .select-label i { transform:rotate(-180deg) }
  .select-option { max-height: 300px;box-sizing:border-box;padding:8px 0;min-width:100%;position:absolute; background:#fff;border-radius:2px; box-shadow: 0 0 2px 1px rgba(0,0,0,.06), 0 3px 8px rgba(0, 0, 0, .15);z-index:200;}
  .select-option li { padding:5px 15px;cursor:pointer;color:#666;white-space: nowrap; }
  .select-option li.active { color:#2196F3; }
  .select-option li:hover { background: rgba(0,0,0,.05); }
}
</style>
