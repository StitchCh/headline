<template>
<div class="tree">
  <div class="tree-no-data" v-if="!data || !data.length">无数据</div>
  <tree-node
    v-for="item in model"
    :key="item.id"
    :model="item"
    :autoOpen="autoOpen"
    :openAll="openAll"
    :hideLeaf="hideLeaf"
    :format="format"
    :childrenTxt="childrenTxt"
    :nameTxt="nameTxt"
    :activeId="activeId"
    :draggable="draggable"
    @select="$emit('select', $event)"
  />
</div>
</template>

<script>
import TreeNode from './TreeNode'
import WorkerCode from './tree.worker.js'

export default {
  name: 'tree',
  components: { TreeNode },
  props: {
    data: { type: Array, default: () => [] },
    idTxt: { type: String, default: 'id' },
    pidTxt: { type: String, default: 'parentid' },
    childrenTxt: { type: String, default: 'children' },
    nameTxt: { type: String, default: 'name' },
    rootId: { type: [Number, String], default: '0' },
    activeId: [Number, String],
    autoOpen: Boolean,
    openAll: Boolean,
    hideLeaf: Boolean,
    draggable: Boolean,
    format: {
      type: Function,
      default: function (name) {
        return name
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkedReadOnly: {
      type: Boolean,
      default: false
    },
    checkedList: Array
  },
  watch: {
    data () {
      this.analytical()
    },
    'checkedListCache' (newValue) {
      this.$emit('update:checkedList', newValue)
    }
  },
  data () {
    return {
      model: [],
      checkedListCache: []
    }
  },
  created () {
    this.analytical()
    this.checkedListCache = this.checkedList || []
  },
  methods: {
    analytical () {
      let { data, idTxt, pidTxt, childrenTxt, rootId } = this
      const worker = new WorkerCode()
      worker.postMessage({ data, idTxt, pidTxt, childrenTxt, rootId })
      worker.addEventListener('message', e => {
        // console.log(e.data)
        this.model = e.data
        worker.terminate()
      })
      worker.addEventListener('error', e => {
        worker.terminate()
      })
    }
  }
}
</script>

<style lang="less">
.tree{
  font-size: 14px;
  .tree-no-data{line-height: 40px;text-align: center;color: #aaa;}
}
</style>
