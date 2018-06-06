<template>
<div class="abs bg-f flex zxy">
  <af-center>
    <div slot-scope="slotProps" :class="{'on': slotProps.item.id === 1}">{{slotProps.item.id}}</div>
  </af-center>
</div>
</template>

<script>
import AfCenter from '@/components/app-frame/afCenter'
export default {
  name: 'zxy',
  components: { AfCenter }
}
</script>

<style lang="less">
.zxy{
  //
}
</style>
