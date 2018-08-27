<template>
  <div class="flex-v-center" style="margin-top: 10px;">
    <i class="icon f-20 c-8" style="margin-right: 10px;">comment</i>
    <span class="flex-item">已添加 {{form.comments.length}} 条评论</span>
    <span class="blue a" @click="show = true">查看</span>
    <layer v-if="show" title="添加评论" width="600px" mask-click @close="show = false">
      <div class="layer-text add-comment bg-e">
        <div class="add-comment-setting">
          <div class="title">设置</div>
          <ul class="content">
            <li class="flex">
              <div>终端显示频率（分钟/条）</div>
              <div class="flex-item"></div>
              <input type="number" v-model="form.displayMinutes" placeholder="请输入">
            </li>
          </ul>
        </div>
        <div>
          <div class="title">评论人</div>
          <ul class="content">
            <li v-for="(name, index) in form.names" :key="index">
              <div class="flex">
                {{name}}
                <span class="flex-item"></span>
                <span class="delete" @click="form.names.splice(index, 1)">删除</span>
              </div>
            </li>
            <li class="add-comment-btn">
              <div v-if="!name.show" @click="name.show = true;$nextTick(() => {$refs.addCommentName.focus()})">添加...</div>
              <input ref="addCommentName" v-else type="text" v-model="name.value" placeholder="请输入" @blur="addCommentName" @keyup.enter="$refs.addCommentName.blur()">
            </li>
          </ul>
        </div>
        <div>
          <div class="title">评论内容</div>
          <ul class="content">
            <li v-for="(item, index) in form.comments" :key="index">
              <div class="flex">
                {{item}}
                <span class="flex-item"></span>
                <span class="delete" @click="form.comments.splice(index, 1)">删除</span>
              </div>
            </li>
            <li class="add-comment-btn">
              <div v-if="!content.show" @click="content.show = true;$nextTick(() => {$refs.addCommentContent.focus()})">添加...</div>
              <input ref="addCommentContent" v-else type="text" v-model="content.value" placeholder="请输入" @blur="addCommentContent" @keyup.enter="$refs.addCommentContent.blur()">
            </li>
          </ul>
        </div>
      </div>
    </layer>
  </div>
</template>

<script>
export default {
  name: 'app-article-add-comment',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      form: {
        names: [],
        comments: [],
        displayMinutes: '30'
      },
      name: {
        show: false,
        value: ''
      },
      content: {
        show: false,
        value: ''
      }
    }
  },
  methods: {
    addCommentName () {
      let text = this.name.value.replace(/\s/g, '')
      if (text) {
        this.form.names.push(this.name.value)
      }
      this.name.value = ''
      this.name.show = false
    },
    addCommentContent () {
      let text = this.content.value.replace(/\s/g, '')
      if (text) {
        this.form.comments.push(this.content.value)
      }
      this.content.value = ''
      this.content.show = false
    }
  },
  created () {
    if (this.value === '') return
    this.form = JSON.parse(this.value)
  },
  watch: {
    'form.names' () {
      this.$emit('input', JSON.stringify(this.form))
    },
    'form.comments' () {
      this.$emit('input', JSON.stringify(this.form))
    },
    'form.displayMinutes' () {
      this.$emit('input', JSON.stringify(this.form))
    }
  }
}
</script>

<style lang="less">
  .add-comment {
    .title {margin: 10px 0;font-size: 12px;}
    .content{background: #fff;border-radius: 10px;overflow: hidden;margin-bottom: 10px;
      li {padding-left: 20px;
        div {border-bottom: 1px solid #e1e1e1;padding: 10px 0;}
        &.add-comment-btn{color: #008cff;cursor: pointer;transition: background .2s;
          div{border-bottom: 0;}
          &:active {background: #e1e1e1;}
        }
        .delete {color: #008cff;cursor: pointer;margin-right: 20px;}
      }
    }
    .add-comment-setting {
      .content li div{border-bottom: 0;}
      input {width:60px;text-align: right;padding-right: 20px;}
    }
    input {border: none;outline: none;font-size: 14px;color: #444;background: transparent;height: 34px;width: 100%;
      &::-webkit-input-placeholder{color: #999;}
    }
  }
</style>
