<template>
<div class="works-published">
  <draggable v-model="newlayout" :options="{handle: '.title'}">
    <transition-group tag="div" name="flip-list">
      <works-layout
        v-for="item in newlayout"
        ref="layout"
        :key="item.id"
        :item="item"
      />
    </transition-group>
  </draggable>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import WorksLayout from './layout'
import uniqBy from 'lodash/uniqBy'

export default {
  name: 'works-published',
  components: { draggable, WorksLayout },
  props: {
    channel: {
      type: Array,
      default: () => []
    },
    layout: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      newlayout: this.layout
    }
  },
  watch: {
    layout () { this.newlayout = this.layout }
  },
  computed: {
    result () {
      return this.$refs.layout.map(item => item.result)
    }
  },
  methods: {
    add (checked) {
      this.$refs.layout.forEach(layout => {
        let addItems = checked.filter(item => item.layoutId === layout.item.id)
        addItems.forEach(item => {
          item.new = true
          item.del = false
          item.top = false
          item.changed = false
          item.editSendDate = item.sendDate
          item.editEndDate = item.endDate
          item.sortOrder = item.order = 1
          item.key = Math.random().toString(16).replace('0.', '')
          item.newTitle = item.title
          item.newAbstract = item.abstracts || ''
        })
        layout.add = uniqBy(addItems.concat(layout.add), 'id')
      })
    }
  }
}
</script>

<style lang="less">
.works-published{
  //
}
</style>
