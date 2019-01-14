<template>
  <div class="flex-item flex-col">
    <div class="flex-item scroll-y" style="background: #eee;">
      <div class="relative article-content c-6">
        <!--<div>-->
          <!--<input type="text" v-model="searchText" placeholder="请输入要搜索的商品名称" class="search_input" >-->
          <!--<btn @click="search">搜索</btn>-->
        <!--</div>-->
        <btn v-for="(item, index) in topNav" :flat="topNavIndex != index" @click="topNavChange(index)" style="margin-right: 10px;">{{item}}</btn>
      </div>
      <div v-for="item in list" v-if="item.orderStatus == topNavType || topNavType == '全部'" class="relative article-content c-6">
        <div>
          <p class="flex-v-center mb_10">
            <span class="flex-item">订单状态：{{item.orderStatus}}</span>
            <span class="flex-item">订单号：{{item.id}}</span>
            <span class="flex-item">创建时间：{{item.createDate}}</span>
          </p>
          <div class="mb_10">
            {{item.userId}}
          </div>
          <ul class="order_product mb_10">
            <li class="order_product_list flex-v-center" v-for="item1 in item.mallCommodityList">
              <div class="imgbox" style="margin-right: 20px;">
                <img :src="item1.pic1" alt="">
              </div>
              <div style="width: calc(100% - 170px);">
                <p style="margin-bottom: 6px;font-weight: bold">{{item1.commodityName}}</p>
                <p style="font-size: 14px;margin-bottom: 6px;">商品积分：{{item1.commodityIntegral}} 分</p>
                <p style="font-size: 14px;">购买数量：{{item1.commodityNum}} 件
                  <span style="float: right">总积分：{{item1.commodityNum * item1.commodityIntegral}}</span>
                </p>
              </div>
            </li>
          </ul>
          <div class="mb_10">
            <p class="mb_10">买家留言：</p>
            <p class="content_text">{{item.buyerMessage}}</p>
          </div>
          <p style="overflow: hidden;" class="mb_10">
            <span style="float: right;">订单总积分：{{item.orderIntegral}}</span>
          </p>
          <div style="text-align: right;" class="mb_10">
            <span>快递公司：</span>
            <input type="text" v-model="logisticsName" style="margin-right: 20px;width: 200px;">
            <span>快递单号：</span>
            <input type="number" v-model="logisticsNo" style="width: 300px;">
          </div>
          <div style="text-align: right;">
            <btn v-if="item.orderStatus == '已下单'" @click="orderSend">订单发货</btn>
            <btn v-if="item.orderStatus == '已发货'">订单完成</btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      list: [],
      searchText: '',
      topNavIndex: 0,
      topNav: ['全部', '已下单', '已发货', '已完成'],
      topNavType: '全部',
      logisticsName: '',
      logisticsNo: ''
    }
  },
  beforeMount () {
    this.$http.post('/cri-cms-platform/mall/queryOrder.monitor').then(res => {
      console.log(res)
      this.list = res
    })
  },
  methods: {
    orderSend () {

    },
    topNavChange (index) {
      this.topNavIndex = index
      this.topNavType = this.topNav[index]
    },
    // search () {
    //   // this.$http.post('')
    // }
  }
}
</script>

<style scoped>
  .content_text{
    padding: 10px;
    line-height: 24px;
    font-size: 14px;
    background: #f5f5f5;
    border-radius: 6px;
  }
  p{
    margin: 0;
  }
  .mb_10{
    margin-bottom: 10px;
  }
  .search_input{
    height: 25px;
    width: 200px;
    padding: 0 10px;
  }
  .product_top{
    justify-content: space-between;
    margin-bottom: 30px;
  }
  input{
    height: 30px;
    padding: 0 10px;
  }
  .a:hover{
    color: #318fff;
  }
  .article-content{
    margin: 20px auto;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 1200px;
  }
  .imgbox{
    display: inline-block;
  }
  .imgbox img{
    width: 150px;
  }
  .order_product{
    background: #f5f5f5;
    padding: 10px 20px;
    border-radius: 6px;
  }
  .order_product_list{
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  .order_product_list:last-child{
    border: 0;
  }
  .af-bottombar{display: flex;align-items: center;height: 40px;border-top: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
</style>
