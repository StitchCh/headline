<template>
  <div class="list">
    <div class="imgbox txbox" style="float: left;">
      <img src="http://60.247.77.208:58088/image/20181215/1544858411816.png" alt="">
    </div>
    <div style="float: right;" class="textbox">
      <p class="text_title">123</p>
      <p class="text_content">123</p>
      <p class="text_time">123</p>
    </div>
    <div class="xiala">
      <div class="bg-f flex-center a b">
        <i class="icon" @click="addShow = true">add</i>
      </div>
      <bubble v-if="addShow" @close="addShow=false">
        <ul class="f-14 c-5 add-select" style="padding: 4px 0;width: 60px;text-align: center">
          <li class="a flex-v-center">
            <span class="flex-item">置顶</span>
          </li>
          <li class="a flex-v-center">
            <span class="flex-item">修改</span>
          </li>
          <li class="a flex-v-center">
            <span class="flex-item" @click="remove">删除</span>
          </li>
        </ul>
      </bubble>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listblock',
  data () {
    return {
      addShow: false
    }
  },
  methods: {
    remove () {
      this.$http.post('/cri-cms-platform/live/message/delete.monitor', {
        liveMessageId: 1
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .xiala{
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .text_content{
    line-height: 24px;
    margin-bottom: 10px;
    padding: 4px 10px;
    background: #f3f3f3;
    border-radius: 6px;
  }
  .text_title{
    font-size: 16px;
    margin-bottom: 10px;
  }
  p{
    margin: 0;
  }
  .list{
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    position: relative;
    margin-bottom: 20px;
  }
  .textbox{
    width: calc(100% - 80px);
  }
  .list:after{
    content: '';
    display: block;
    clear: both;
  }
  .txbox{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .imgbox{
    overflow: hidden;
  }
</style>
