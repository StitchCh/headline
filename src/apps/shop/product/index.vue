<template>
  <div class="flex-item flex-col">
    <div class="flex-item scroll-y" style="background: #eee;">
      <div class="relative article-content c-6" style="max-width: 1200px;">
        <div class="flex-v-center product_top">
          <div class="flex-v-center a" @click="$router.push('/shopAdd')">
            <i class="icon">add_box</i><span style="padding-left: 4px;">添加商品</span>
          </div>
          <div>
            <input type="text" v-model="searchText" class="search_input" >
            <btn @click="search">搜索</btn>
          </div>
        </div>

        <div v-if="productList.length != 0" class="setting-card f-14">
          <table style="margin-bottom: 30px;">
            <thead style="text-align: center;">
              <th>序号</th>
              <th>商品图片</th>
              <th style="width: 200px;">商品名称</th>
              <th>分类名称</th>
              <th>商品价格</th>
              <th>库存</th>
              <th>创建日期</th>
              <th style="width: 100px;">操作</th>
            </thead>
            <tbody style="text-align: center;">
              <tr v-for="(item, index) in productList">
                <td>{{index+1}}</td>
                <td>
                  <div class="imgbox" style="margin: 10px 0;">
                    <img :src="item.pic1" alt="">
                  </div>
                </td>
                <td>{{item.commodityName}}</td>
                <td>{{item.typeName}}</td>
                <td>{{item.commodityIntegral}}</td>
                <td>{{item.inventoryNum}}</td>
                <td>{{item.createDate}}</td>
                <td style="text-align: right;">
                  <icon-btn v-tooltip="'编辑'" small @click="edit(item.id)">edit</icon-btn>
                  <icon-btn v-tooltip="'推荐'" small :class="{active: item.isRecommend == 1}" @click="recommend(item.id, item.isRecommend)">thumb_up</icon-btn>
                  <icon-btn v-tooltip="'删除'" small @click="removeItem(item.id)">delete</icon-btn>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="af-bottombar flex-center relative">
            <icon-btn small class="a" @click="onPrev" :disabled="toPage <= 1">keyboard_arrow_left</icon-btn>
            <span class="f-14 c-6" style="margin: 0 10px;line-height: 1em;">第 {{toPage}} / {{totalPage}} 页</span>
            <icon-btn small class="a" @click="onNext" :disabled="toPage >= totalPage">keyboard_arrow_right</icon-btn>
            <span v-if="totalRowsAmount" style="position:absolute; right: 10px;bottom: 8px;font-size: 12px;color: #999;">共 {{totalRowsAmount}} 项</span>
          </div>
        </div>

        <div v-if="productList.length == 0" class="setting-card f-14">
          <p class="nolist">暂无商品...</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product',
  data () {
    return {
      toPage: 1,
      totalPage: 1,
      totalRowsAmount: false,
      productList:[],
      searchText: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    search () {
      this.$http.post('/cri-cms-platform/mall/queryListCommodity.monitor', {
        commodityName: this.searchText
      }).then(res => {
        this.productList = res
      })
    },
    edit (id) {
      this.$router.push({path: '/shopAdd', query: {id: id}})
    },
    removeItem (id) {
      let othis = this
      this.$confirm({
        title: '您确定要删除商品吗？',
        text: '删除后将无法恢复。',
        btns: ['取消', '删除'],
        color: 'red',
        yes () {
          othis.$http.post('/cri-cms-platform/mall/delCommodity.monitor', {
            id: id
          }).then(res => {
            othis.getList()
          })
        },
        no () {

        }
      })
    },
    getList () {
      this.$http.post('/cri-cms-platform/mall/queryListCommodity.monitor').then(res => {
        this.productList = res
      })
    },
    recommend (id, data) {
      this.$http.post('/cri-cms-platform/mall/updateCommodity.monitor', {
        id: id,
        isRecommend: data == 1 ? 0 : 1
      }).then(res => {
        this.getList()
      })
    },
    onPrev () {

    },
    onNext () {

    }
  }
}
</script>

<style scoped>
  .search_input{
    height: 25px;
    width: 200px;
    padding: 0 10px;
  }
  .product_top{
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .a:hover{
    color: #318fff;
  }
  .article-content{
    margin: 20px auto 0;
    max-width: 1000px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }
  tr{
    border-bottom: 1px solid #ddd;
  }
  .active {color: #018be6;}
  tr:last-child{
    border:0;
  }
  .nolist{
    text-align: center;
    line-height: 100px;
    color: #999;
    font-size: 20px;
  }
  .imgbox{
    display: inline-block;
  }
  .imgbox img{
    width: 150px;
  }
  .af-bottombar{display: flex;align-items: center;height: 40px;border-top: 1px solid rgba(0, 0, 0, .1);padding: 0 15px;}
</style>
