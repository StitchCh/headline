<template>
<div class="abs bg-f flex app-special">
  <af-left color="#66637b" bg-color="#e9e7f7" vibrant-color="#4131b5" title="专题" :defaultActive="defaultActive">
    <navigator-item icon="folder" index="all-all" @click="$router.replace('/special?scope=all&status=all')">全部</navigator-item>
    <!-- <navigator-item-group defaultExtended index="2" icon="face">
    <span slot="title">我的</span> -->
    <navigator-item icon="check_circle" index="my-all" @click="$router.replace('/special?scope=my&status=all')">已发</navigator-item>
    <navigator-item icon="hourglass_full" index="my-AUDITING" @click="$router.replace('/special?scope=my&status=AUDITING')">待审</navigator-item>
    <navigator-item icon="error" index="my-REJECT" @click="$router.replace('/special?scope=my&status=REJECT')">驳回</navigator-item>
    <!-- <navigator-item icon="class" index="my-4" @click="$router.replace('/special?scope=my&status=4')">草稿</navigator-item> -->
    <!-- </navigator-item-group> -->
    <navigator-item icon="delete" index="3-1" @click="$router.replace('/special/recycle')">回收站</navigator-item>
  </af-left>
  <!--<af-center-->
    <!--@add="$router.push('/specialAdd')"-->
    <!--:scope="$route.query.scope"-->
    <!--:status="$route.query.status"-->
    <!--url="/cri-cms-platform/special/queryList.monitor"-->
    <!--ref="afCenter">-->
    <!--<div class="list-item a" slot-scope="slotProps" @click="onItemClick(slotProps.item)" :class="{'on': slotProps.item.id == $route.params.id}">-->
      <!--<div class="list-title flex-v-center">-->
        <!--<i v-if="~~(slotProps.item.isRecommnd)" class="icon f-16 blue">thumb_up</i>-->
        <!--<i v-if="~~(slotProps.item.hasThumb)" class="icon f-16 orange">image</i>-->
        <!--<i v-if="~~(slotProps.item.isOriginal)" class="icon f-16 green">copyright</i>-->
        <!--<span class="flex-item c-6 f-14 b">{{slotProps.item.title}}</span>-->
      <!--</div>-->
      <!--<div class="list-info f-12 c-8 flex-v-center">-->
        <!--<span>{{slotProps.item.createDate}}</span>-->
        <!--<span>{{slotProps.item.createUser}}</span>-->
        <!--<span class="list-info-num">-->
          <!--<i v-tooltip:top="'阅读'">6</i>/<i v-tooltip:top="'评论'">0</i>/<i v-tooltip:top="'分享'">0</i>-->
        <!--</span>-->
        <!--<span class="flex-item"></span>-->
        <!--<i class="icon f-14 tg-icon c-a">computer</i>-->
        <!--<i class="icon f-14 tg-icon c-a">phone_iphone</i>-->
        <!--<i class="icon f-14 tg-icon c-a">public</i>-->
      <!--</div>-->
    <!--</div>-->
  <!--</af-center>-->

  <router-view></router-view>
</div>
</template>

<script>
import AfCenter from '@/components/app-frame/afCenter'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-special',
  components: { AfCenter, AfLeft },
  computed: {
    defaultActive () {
      return `${this.$route.query.scope}-${this.$route.query.status}`
    }
  }
}
</script>

<style lang="less">
.app-special{
  .navigator-item.active{color: #4131b5;}
}
</style>
