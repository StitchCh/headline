<template>
  <div class="abs bg-f flex app-member">
    <af-left color="#555" vibrant-color="#008cff" bg-color="#fafafa" title="积分商城" :defaultActive="$route.name">
      <navigator-item icon="shopping_basket" @click="$router.replace('/shop/product')" index="product">商品管理
      </navigator-item>
      <navigator-item icon="assignment" @click="$router.replace('/shop/order')" index="order">订单管理
      </navigator-item>
      <navigator-item icon="widgets" @click="$router.replace('/shop/category')" index="category">分类管理
      </navigator-item>
      <navigator-item icon="credit_card" @click="$router.replace('/shop/credit')" index="credit">积分设置
      </navigator-item>
    </af-left>

    <div class="flex-item flex-col">
      <div class="af-topbar flex-v-center">
        <div class="flex-item"></div>
        <account/>
      </div>
      <div class="flex-item flex flex-col">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-shop',
  components: {Account, AfLeft},
  computed: {
    defaultActive () {
      let { name } = this.$route
      name = name || ''
      console.log(name)
      return name.replace('Content', '')
    }
  }
}
</script>

<style lang="less">
  .app-member {
    .account {position: absolute;right: 15px;top: 8px;z-index: 30;}
    .navigator-item.active {background: #008cff;color: #fff;}
    .navigator-item .icon {transition: none;}
    .member-content {
      .setting-card {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
        th,td {padding: 5px 10px;}
        tr {border-top: 1px solid #e1e1e1;}
        tr:hover {background: rgba(0, 0, 0, .05);}
      }

      .layer-text {
        th, td {padding: 5px 15px;}
        th {width: 150px;}
      }
      /*.state {color: #008cff;border-bottom: 1px dashed #008cff;}*/
      .stateBox {width: 60px;padding: 10px 0;text-align: center;}
      .state i {
        transition: transform .2s;
        &.active {transform: rotate(180deg)}
      }
    }
  }
</style>
