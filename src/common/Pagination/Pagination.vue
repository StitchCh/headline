<template>
<!-- <transition-group> -->
<ul class="pagination f-12">
  <li :class="{'disabled': page <= 1}" @click="prev()">
    <i class="icon">keyboard_arrow_left</i>
  </li>
  <li
    v-for="item in arr"
    :key="item"
    :style="{ color: item === page ? color : '' }"
    @click="changePage(item)"
    v-text="typeof item === 'string' ? '...' : item"
  ></li>
  <li :class="{'disabled': page >= len}" @click="next()">
    <i class="icon">keyboard_arrow_right</i>
  </li>
</ul>
<!-- </transition-group> -->
</template>

<script>
export default {
  name: 'pagination',
  props: {
    total: { type: Number, default: 1 },
    size: { type: Number, default: 10 },
    page: { type: Number, default: 1 },
    color: { type: String, default: '#018be6' }
  },
  computed: {
    len () { return Math.ceil(this.total / this.size) },
    arr () {
      let result = []
      let len = this.len
      if (len <= 7) {
        for (let i = 0; i < len; i++) result.push(i + 1)
      } else {
        if (this.page < 5) {
          result = [1, 2, 3, 4, 5, 6, '>', len]
        } else if (this.page > len - 4) {
          result = [1, '<', len - 5, len - 4, len - 3, len - 2, len - 1, len]
        } else {
          result = [1, '<', this.page - 2, this.page - 1, this.page, this.page + 1, this.page + 2, '>', this.len]
        }
      }
      return result
    }
  },
  methods: {
    changePage (p) {
      if (p === '<') p = this.page - 5 < 1 ? 2 : this.page - 5
      if (p === '>') p = this.page + 5 > this.len ? this.len - 1 : this.page + 5
      if (p !== this.page) this.$emit('change', p)
    },
    prev () {
      let p = this.page > 1 ? this.page - 1 : 1
      this.$emit('change', p)
    },
    next () {
      let p = this.page < this.len ? this.page + 1 : this.len
      this.$emit('change', p)
    }
  }
}
</script>

<style>
.pagination{display: flex;align-items: center;font-weight: bold;user-select: none;}
.pagination li{display: inline-block;width: 30px;height: 30px;cursor: pointer;border-radius: 15px;text-align: center;line-height: 30px;transition: background-color .2s;}
.pagination li:hover{background: rgba(0, 0, 0, .06)}
.pagination li i.icon{font-size: 20px;}
/* .pagination li.on{} */
.pagination li.disabled{opacity: .5;pointer-events: none;}
</style>
