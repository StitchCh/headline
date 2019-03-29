<template>
  <span :class="[{'tag-small': small}, 'tag',type?'tag-'+type:'']">
    <slot></slot>
    <i class="icon close" v-if="close" @click="handleClose">close</i>
  </span>
</template>
<script>
export default {
  name: 'tag',
  props: {
    type: String,
    close: Boolean,
    small: Boolean
  },
  methods: {
    handleClose () {
      this.$emit('close', this.$el)
    }
  }
}
</script>

<style>
.tag{ 
  background-color: rgba(0,0,0,.06);
  color: #666; display: inline-block; padding: 0 15px; height: 30px; line-height: 28px; font-size: 12px;  border-radius: 15px; box-sizing: border-box;  white-space: nowrap;
  border: 1px solid transparent;  margin: 2px;margin-left: 0;margin-right: 4px;}

.tag-small{
  height: 24px;line-height: 22px;
  padding: 0 10px;
}
.tag-success{
  background-color: rgba(103,194,58,.1);
  border-color: rgba(103,194,58,.2);
  color: #67c23a;
}
.tag-info{
  background-color: hsla(220,8%,56%,.1);
  border-color: hsla(220,8%,56%,.2);
  color: #878d99;

  background-color: rgba(64,158,255,.1);
  border: 1px solid rgba(64,158,255,.2);
  color: #409eff;
}
.tag-warning{
  background-color: rgba(235,158,5,.1);
  border-color: rgba(235,158,5,.2);
  color: #eb9e05;
}
.tag-danger{
  background-color: rgba(250,85,85,.1);
  border-color: rgba(250,85,85,.2);
  color: #fa5555;
}
.tag .close{ font-size:16px;transform:translate(4px, -1px); border-radius:50%; cursor:pointer; }
.tag .close:hover{
  color:#f7443e
} 
.tag .avatar{
  width: 26px!important;
  height: 26px!important;
  margin-left: -14px;
  margin-top: 1px;
  margin-right: 10px;
}
.tag.tag-small .avatar{
  width: 22px!important;
  height: 22px!important;
  margin-left: -10px;
  margin-top: 0;
  margin-right: 5px;
}
</style>
