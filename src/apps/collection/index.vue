<template>
  <div class="abs bg-f c-6 flex-col app-collection">
    <div class="af-topbar flex-v-center">
      <dock title="采集" color="#2088ff"/>
      <div class="flex-item"></div>
      <account/>
    </div>
    <div class="flex-item scroll-y bg-e relative collection-content">
      <transition name="fade">
        <div v-if="loading" class="abs bg-e" style="z-index: 99;">
          <loading style="left: 50%;top: 50%;transform: translate(-50%, -50%)"></loading>
        </div>
      </transition>

      <div class="setting-card f-14">
        <table>
          <thead>
            <th style="width: 100px;">关键词</th>
            <th style="width: 100px;">来源</th>
            <th>标题</th>
            <th>连接</th>
            <th style="width: 100px;">采集日期</th>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list" :key="index"  @click="openUrl(item.url)">
              <td>{{item.keyWord}}</td>
              <td>{{item.source}}</td>
              <td>{{item.title}}</td>
              <td>{{item.url}}</td>
              <td>{{item.createDate}}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex-center">
          <pagination :page="page" :size="20" :total="total" @change="p => { page = p;getList(); }"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "@/components/account";
import Dock from "@/components/dock";
export default {
  name: "app-collection",
  components: { Account, Dock },
  data() {
    return {
      loading: false,
      list: [],
      page: 1,
      total: 1
    };
  },
  methods: {
    getList() {
      this.loading = true;
      this.$http
        .post(
          "/cri-cms-platform/collectionNew/queryListCollectionNew.monitor",
          {
            page: this.page
          }
        )
        .then(res => {
          this.list = res.pages;
          this.total = res.totalCounts;
          console.log(res);
        })
        .catch(res => {
          this.$toast(res.msg);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    openUrl(url){
        window.open(url);
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style  lang="less">
.app-collection {
  .collection-content {
    .setting-card {
      max-width: 1440px;
      margin: 20px auto;
      border-radius: 10px;
      padding: 20px;
      background: #fff;
      th,
      td {
        padding: 5px 10px;
        overflow: hidden;
        white-space: nowrap;
      }
      tr {
        border-top: 1px solid #e1e1e1;
        cursor: pointer;
      }
      tr:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
  .account {
    position: absolute;
    right: 15px;
    top: 8px;
    z-index: 30;
  }
  .navigator-item.active {
    background: #66bb6a;
    color: #fff;
  }
  .navigator-item .icon {
    transition: none;
  }
  .collection-content {
    //background: #fafafa;
    .setting-card {
      max-width: 1440px;
      margin: 20px auto;
      border-radius: 10px;
      padding: 20px;
      background: #fff;
      th,
      td {
        padding: 5px 10px;
      }
      tr {
        border-top: 1px solid #e1e1e1;
        cursor: pointer;
      }
      tr:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }
    .add-btn {
      color: #008cff;
      padding: 14px 30px;
      cursor: pointer;
      transition: background 0.2s;
      &:active {
        background: #e1e1e1;
      }
    }
    .layer-text {
      th,
      td {
        padding: 5px 15px;
      }
      th {
        width: 130px;
      }
    }
  }
}
</style>
