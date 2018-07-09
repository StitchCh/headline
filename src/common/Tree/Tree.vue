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
    :activeId="activeId"
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
    rootId: { type: [Number, String], default: '0' },
    activeId: [Number, String],
    autoOpen: Boolean,
    openAll: Boolean,
    hideLeaf: Boolean,
    format: {
      type: Function,
      default: function (name) {
        return name
      }
    }
  },
  watch: {
    data () {
      this.analytical()
    }
  },
  data () {
    return {
      model: []
    }
  },
  created () {
    this.analytical()
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
