<template>
<div class="works-published">
  <works-layout
    v-for="(item, i) in newlayout"
    ref="layout"
    :key="item.id"
    :item="item"
    @delete="del(i)"
  />
</div>
</template>

<script>
import WorksLayout from './layout'
import uniqBy from 'lodash/uniqBy'
import moment from 'moment'

export default {
  name: 'works-published',
  components: { WorksLayout },
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
      addShow: false,
      newlayout: this.layout
    }
  },
  watch: {
    layout () {
      this.newlayout = this.layout
      console.log(this.layout)
    }
  },
  computed: {
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
          item.timeing = 0
          item.dateRange = [moment().format('yyyy-MM-dd HH:mm:ss'), '9998-12-31 23:59:59']
          // item.editSendDate = item.sendDate || moment().format('yyyy-MM-dd HH:mm:ss')
          // item.editEndDate = item.endDate || '9999-12-30 23:59:59'
          item.sortOrder = item.order = 1
          item.key = Math.random().toString(16).replace('0.', '')
          item.newTitle = item.title
          item.newAbstract = item.abstarcts || ''
        })
        layout.add = uniqBy(addItems.concat(layout.add), 'id')
      })
    },
    getIssueResult () {
      return this.$refs.layout.map(item => item.getIssueResult())
    }
  }
}
</script>

<style lang="less">
.works-published{}
</style>
