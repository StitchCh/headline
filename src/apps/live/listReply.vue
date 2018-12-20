<template>
  <div class="list">
    <span class="huifubtn" @click="inputshow = true">回复</span>
    <div class="imgbox txbox" style="float: left;">
      <img src="http://60.247.77.208:58088/image/20181215/1544858411816.png" alt="">
    </div>
    <div style="float: right;" class="textbox">
      <p class="text_title">123</p>
      <p class="text_content">123</p>
      <p class="text_time">123</p>
      <div class="inputbox" :class="{inputboxon: inputshow}">
        <input type="text" placeholder="请输入回复内容...">
      </div>
    </div>
    <div class="xiala">
      <div class="bg-f flex-center a b">
        <i class="icon" @click="addShow = true">add</i>
      </div>
      <bubble v-if="addShow" @close="addShow=false">
        <ul class="f-14 c-5 add-select" style="padding: 4px 0;width: 60px;text-align: center">
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
  name: 'listReply',
  data () {
    return {
      addShow: false,
      inputshow: false
    }
  },
  methods: {
    remove(){
      this.$http.post('/cri-cms-platform/live/comment/delete.monitor', {
        liveCommentId: 1
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
  .inputbox{
    overflow: hidden;
    transition: 0.4s;
    height: 0;
  }
  input{
    margin-top: 10px;
    width: calc(100% - 60px);
    height: 30px;
    outline: none;
    border-radius: 6px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 0 15px;
  }
  .text_content{
    line-height: 24px;
    margin-bottom: 10px;
    padding: 4px 10px;
    background: #f3f3f3;
    border-radius: 6px;
  }
  .huifubtn{
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  }
  .huifubtn:hover{
    color: #002d70;
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
  .inputboxon{
    height: 45px;
  }
</style>
