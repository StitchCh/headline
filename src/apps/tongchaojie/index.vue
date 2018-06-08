<template>
  <div class="abs manuscript flex-col">
    <div class="search">
      <input type="text" placeholder="输入关键字"/>
    </div>
    <div class="box flex-item scroll-y" style="width:100%;">
      <ul class="">
        <li class="" v-for="(item,i) in dataList" :key="i">
          <p><img :src="item.img"/></p>
          <p>{{ item.name }}</p>
          <p>{{ item.date }}</p>
          <icon-btn style="position:absolute; right:5px; bottom:5px;" @click="$confirm('确认删除吗？')">delete</icon-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      removeIndex: '',
      show: false,
      dataList: [
        {
          img: '/static/logo.png',
          name: '我的草稿111',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿222',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿333',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿444',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿555',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿666',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿777',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿888',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿111',
          date: '2018-06-06 13:44'
        },
        {
          img: '/static/logo.png',
          name: '我的草稿222',
          date: '2018-06-06 13:44'
        }
      ]
    }
  },
  methods: {
    removeTodo (index) {
      this.show = true
      this.removeIndex = index
    },
    remove () {
      this.dataList.splice(this.removeIndex, 1)
      this.removeIndex = ''
      this.show = false
    },
    cancel () {
      this.show = false
    }
  }
}
</script>
<style scoped lang="less">
.manuscript{
  background-color: #f8f8f8;
  min-height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  .search{
    text-align: center;
    margin-top: 20px;
    input{
      width: 300px;
      line-height: 32px;
      border:1px solid #ddd;
      border-radius: 10px;
      padding-left:10px;
    }
  }
  .box{
    flex: 1;
    ul{
      display: flex;
      flex-wrap: wrap;
      margin:10px auto;
      li{
        padding:10px;
        background-color: #fff;
        margin: 10px;
        box-shadow: 0 1px 3px rgba(0,0,0,.2)!important;
        transition: box-shadow .2s ease;
        position: relative;
        p{
          margin: 0;
          font-size: 14px;
          color: #666;
          text-align: center;
        }
        p:nth-child(2){
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        p:first-child{
          width: 100%;
          height: 220px;
          overflow: hidden;
        }
      }
      li:hover{
        box-shadow: 0 8px 20px rgba(0,0,0,.2)!important;
      }
    }
  }
}
@media screen and (min-width: 1600px) and (max-width: 1920px){
  .box ul{width: 1600px}
  .box ul li{width:226px;}
}
@media screen and (min-width: 1440px) and (max-width: 1600px){
  .box ul{width: 1440px}
  .box ul li{width:200px;}
}
@media screen and (min-width: 1280px) and (max-width: 1440px){
  .box ul{width: 1280px}
  .box ul li{width:216px;}
}
@media screen and (max-width: 1280px){
  .box ul{width: 1000px}
  .box ul li{width:210px;}
}
</style>
