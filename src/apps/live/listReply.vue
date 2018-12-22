<template>
  <div class="list" :class="{'listdele': data.withdrawn === '01', 'liston': data.auditStatus === '1', 'listoff': data.auditStatus === '0'}">
    {{data.auditStatus}}
    <div class="imgbox txbox" style="float: left;">
      <img :src="data.commentUserThumb" alt="">
    </div>
    <div style="float: right;" class="textbox">
      <p class="text_title">{{data.commentUserName}}</p>
      <p class="text_content">{{data.content}}</p>
      <p class="text_time" style="margin-bottom: 4px;">{{data.createTime}}</p>

      <span v-if="data.withdrawn == '00'" class="huifubtn" :class="{huifubtnon : inputshow}" @click="inputshow = inputshow == true ? false : true;text = text == '回复' ? '取消' : '回复'">{{text}}</span>

      <div class="inputbox" :class="{inputboxon: inputshow}">
        <p style="padding-left: 10px;">
          <check-box style="margin: 0;" v-model="checked"/>
          转到直播间
        </p>
        <input type="text" v-model="reply" placeholder="请输入回复内容...">
        <span class="fsbtn" @click="addReply">发送</span>
      </div>
    </div>

    <div v-if="data.replyComment" style="float: right;" class="stextbox">
      <div class="imgbox txbox" style="float: left;">
        <img :src="data.replyComment.commentUserThumb" alt="">
      </div>
      <div style="float: right;" class="textbox">
        <p class="text_title">{{data.replyComment.commentUserName}}</p>
        <p class="text_content">{{data.replyComment.content}}</p>
        <p class="text_time" style="margin-bottom: 4px;">{{data.replyComment.createTime}}</p>

        <!--<span v-if="data.replyComment.withdrawn == '00'" class="huifubtn" :class="{huifubtnon : inputshow_r}" @click="inputshow_r = inputshow_r == true ? false : true;text_r = text_r == '回复' ? '取消' : '回复'">{{text_r}}</span>-->

        <!--<div class="inputbox" :class="{inputboxon: inputshow_r}">-->
          <!--<p style="padding-left: 10px;">-->
            <!--<check-box style="margin: 0;" v-model="checked_r"/>-->
            <!--转到直播间-->
          <!--</p>-->
          <!--<input type="text" v-model="reply_r" placeholder="请输入回复内容...">-->
          <!--<span class="fsbtn" @click="addReply('reply')">发送</span>-->
        <!--</div>-->
      </div>

    </div>

    <span v-if="data.withdrawn == '01'" class="xiala">已撤回</span>

    <div v-if="data.withdrawn == '00'" class="xiala">
      <div class="bg-f flex-center a b" style="background: none;">
        <span v-if="data.audit === '3' && data.auditStatus === '1'" class="fsbtn1">已通过</span>
        <span v-if="data.audit === '3' && data.auditStatus === '0'" class="fsbtn1">已驳回</span>
        <span v-if="data.audit == 2" class="fsbtn fsbtn1" @click="pass">通过</span>
        <span v-if="data.audit == 2" class="fsbtn fsbtn1" @click="bohui">驳回</span>
        <i style="background: none;" class="icon" @click="addShow = true">add</i>
      </div>
      <bubble v-if="addShow" @close="addShow=false" style="left: auto;right: -16px;">
        <ul class="f-14 c-5 add-select" style="padding: 4px 0;width: 60px;text-align: center">
          <li class="a flex-v-center">
            <span class="flex-item" @click="remove">撤回</span>
          </li>
        </ul>
      </bubble>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listReply',
  props: [ 'value' ],
  data () {
    return {
      addShow: false,
      addShow_r: false,
      inputshow: false,
      inputshow_r: false,
      data: {},
      text: '回复',
      text_r: '回复',
      reply: '',
      reply_r: '',
      checked: false,
      checked_r: false
    }
  },
  mounted () {
    this.data = this.value
  },
  methods: {
    bohui () {
      this.$http.post('/cri-cms-platform/live/comment/audit/reject.monitor', {
        liveCommentId: this.data.id
      }).then(res => {
        this.data.auditStatus = '0'
        this.data.audit = '3'
      })
    },
    pass () {
      this.$http.post('/cri-cms-platform/live/comment/audit/pass.monitor', {
        liveCommentId: this.data.id
      }).then(res => {
        this.data.auditStatus = '1'
        this.data.audit = '3'
      })
    },
    addReply (reply) {
      if (reply == 'reply') {
        var data = {
          liveId: this.data.liveId,
          content: this.reply_r,
          replyId: this.data.replyComment.id,
          type: this.checked_r ? '2' : '1'
        }
      } else {
        var data = {
          liveId: this.data.liveId,
          content: this.reply,
          replyId: this.data.id,
          type: this.checked ? '2' : '1'
        }
      }
      this.$http.post('/cri-cms-platform/live/comment/reply.monitor', data).then(res => {
        this.$emit('reset')
        this.reply = ''
        this.reply_r = ''
      })
    },
    remove (reply) {
      if (reply == 'reply') {
        var id = this.data.replyComment.id
      } else {
        var id = this.data.id
      }
      this.$http.post('/cri-cms-platform/live/comment/withdrawn.monitor', {
        liveCommentId: id
      }).then(res => {
        this.data.withdrawn = '01'
      })
    }
  }
}
</script>

<style scoped>
  .fsbtn1{
    margin-right: 10px;
  }
  .xiala{
    position: absolute;
    right: 20px;
    top: 20px;
  }
  .xialas{
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .inputbox{
    overflow: hidden;
    transition: 0.4s;
    height: 0;
  }
  input{
    margin-top: 10px;
    width: calc(100% - 80px);
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
    background: rgba(0,0,0,0.05);
    border-radius: 6px;
  }
  .huifubtn{
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: pointer;
  }
  .huifubtnon{
    bottom: 8px;
  }
  .huifubtn:hover{
    color: #002d70;
  }
  /*.fsbtn1:hover{*/
    /*color: #002d70;*/
  /*}*/
  .fsbtn{
    cursor: pointer;
  }
  .fsbtn:hover{
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
  .liston{
    background: rgba(27, 192, 255, 0.1);
    border-color: rgba(27, 192, 255, 0.5);
  }
  .listoff{
    background: rgba(255, 205, 72, 0.1);
    border-color: rgba(255, 205, 72, 0.5);
  }
  .listdele{
    background: #eee;
    border-color: #ddd;
  }
  .textbox{
    width: calc(100% - 80px);
    position: relative;
  }
  .stextbox{
    width: calc(100% - 80px);
    position: relative;
    background: rgba(0,0,0,0.05);
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    margin-top: 10px;
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
  .imgbox>img{
    width:100%;
  }
  .inputboxon{
    height: 67px;
  }
</style>
