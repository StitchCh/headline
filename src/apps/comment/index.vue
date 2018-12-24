<template>
  <div class="abs bg-f flex app-comments">
    <af-left color="#555" vibrant-color="#008cff" bg-color="#fafafa" title="评论" :defaultActive="defaultActive">
      <navigator-item icon="folder" @click="$router.replace('/comment/list')" index="CommentList">全部
      </navigator-item>
      <navigator-item icon="hourglass_full" @click="$router.replace('/comment/list?audit=2')" index="CommentListWaiting">待审
      </navigator-item>
      <navigator-item icon="check_circle" @click="$router.replace('/comment/list?audit=3')" index="CommentListAudited">已审
      </navigator-item>
      <navigator-item icon="delete" @click="$router.replace('/comment/list?delete=0')" index="CommentListDelete">已删除
      </navigator-item>
    </af-left>
    <div class="flex-item relative">
      <account/>
      <router-view class="abs flex-col c-6 comment-content"></router-view>
    </div>
  </div>
</template>

<script>
import Account from '@/components/account'
import AfLeft from '@/components/app-frame/afLeft'

export default {
  name: 'app-comments',
  components: {Account, AfLeft},
  computed: {
    defaultActive () {
      let { query } = this.$route
      if (query.audit === '2') return 'CommentListWaiting'
      if (query.audit === '3') return 'CommentListAudited'
      if (query.delete === '0') return 'CommentListDelete'
      return 'CommentList'
    }
  }
}
</script>

<style lang="less">
  .app-comments {
    .account {position: absolute;right: 15px;top: 8px;z-index: 30;}
    .navigator-item.active {background: #008cff;color: #fff;}
    .navigator-item .icon {transition: none;}
    .comment-content {
      .setting-card {max-width: 900px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;
        .comment-item-info {padding: 5px 0;}
        .state-icon {margin-right: 5px;}
      }
    }
  }
</style>
