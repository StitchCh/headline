<template>
<div class="no-data">
  <i class="icon">insert_drive_file</i>
  <p>{{text}}</p>
</div>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    text: { default: '暂无数据' }
  }
}
</script>

<style lang="less">
.no-data{
  text-align: center;opacity: .5;color: #666;
  i.icon{font-size: 60px;color: #aaa;}
}
</style>
