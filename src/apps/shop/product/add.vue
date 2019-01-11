<template>
  <div class="abs bg-f flex c-6 f-14 app-article-add">
    <template>
      <div class="flex-item flex-col">
        <div class="top-bar flex-v-center" style="height: 55px;padding: 0 20px;">
          <div class="a flex-v-center" @click="$router.back()">
            <icon-btn style="margin-right:10px;">arrow_back</icon-btn>
            <span class="f-18">返回</span>
          </div>
          <div class="flex-item"></div>
          <div class="flex-v-center">
            <btn big style="margin-right: 20px;">保存</btn>
          </div>
        </div>

        <div class="flex-item scroll-y">
          <div style="width: 900px;margin: 0 auto;padding: 0 10px;">
            <div class="pro_add_title">
              <input type="text" placeholder="请输入产品名称">
            </div>
            <p style="font-size: 20px;">产品介绍</p>
          </div>

          <article-editor ref="editor" @getKeyGenerate="getKeyGenerate"></article-editor>
        </div>
      </div>

      <div class="art-options c-4 scroll-y" style="width: 320px;">
        <div style="width: 280px;margin: 0 20px;">

          <div>
            <div class="add_top_addimg" @click="photoSelectorShow = true">
              <i class="icon f-32 c-a">add_photo_alternate</i>
              <p style="margin: 0;color: #f00;font-size: 12px;">请选择 16:9 的图片</p>
            </div>
            <ul class="img_listbox">
              <li v-for="(item, index) in selected" class="img_list relative">
                <img :src="item.url" alt="">
                <div class="removeimg" @click="removeimg(index)">+</div>
              </li>
            </ul>
          </div>

          <div class="option-item">
            <input type="number" placeholder="单品积分" />
          </div>

          <div class="option-item">
            <input type="number" placeholder="库存" />
          </div>

          <div class="option-item relative">
            <div class="a" @click="addShow=true">
              123
            </div>
            <bubble v-if="addShow" @close="addShow = false">
              <ul class="f-14 c-5 add-select" style="padding: 4px 10px;width: 280px;left: 0;box-sizing: border-box;">
                <li class="a flex-v-center" style="line-height: 36px;">
                  1
                </li>
                <li class="a flex-v-center" style="line-height: 36px;">
                  2
                </li>
                <li class="a flex-v-center" style="line-height: 36px;">
                  3
                </li>
              </ul>
            </bubble>
          </div>

        </div>
      </div>

      <div class="gallery-editor">
        <layer v-if="photoSelectorShow" title="选择图片"  width="800px">
          <div class="layer-text relative" style="height: 800px;">
            <media-photos select-mode single-select ref="mediaPhotos"/>
          </div>
          <div class="layer-btns">
            <btn flat @click="photoSelectorShow = false">取消</btn>
            <btn flat color="#008eff" @click="selectPhoto">选择</btn>
          </div>
        </layer>
      </div>
    </template>
  </div>

</template>

<script>
import ArticleEditor from '../editor'
import MediaPhotos from '../../medialibrary/pages/photos'

export default {
  name: 'add',
  components: { ArticleEditor, MediaPhotos },
  data () {
    return {
      photoSelectorShow: false,
      selected: [],
      addShow: false
    }
  },
  methods: {
    removeimg (index) {
      this.selected.splice(index, 1)
    },
    selectPhoto () {
      let imgOrigin = this.$refs.mediaPhotos.imgOrigin
      if (this.selected.length >= 5) {
        this.$toast('最多选择五张图片')
        return
      }
      if (this.$refs.mediaPhotos.selected[0].scale != '16:9') {
        this.$toast('请选择16:9的图片')
        return
      }
      this.selected = this.selected.concat(this.$refs.mediaPhotos.selected.map(v => {
        v.description = ''
        v.url = imgOrigin + v.filePath + v.fileName
        return v
      }))
      this.photoSelectorShow = false
    },
    getKeyGenerate () {
      if (this.from || this.id) return
      let doc = this.$refs.editor.getText()
      if (!doc.trim()) return
      this.$http.post('/cri-cms-platform/article/getKeyGenerate.monitor', { doc }).then(
        res => {
          this.form.abstarcts = res.gerenate
          this.form.keywords = res.key.join(',')
        }
      )
    }
  }
}
</script>

<style scoped>
  .img_listbox{
    display: flex;
    align-items: center;
    padding: 10px 0;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .option-item{border-bottom: 1px solid rgba(0, 0, 0, .1);padding: 12px 0;}
  p{
    margin: 0;
  }
  .add_top_addimg{
    text-align: center;
    background: #e5e5e5;
    padding: 20px 0;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.4s;
  }
  .add_top_addimg:hover{
    background: #ececec;
  }
  .img_list{
    width: 48%;
    overflow: hidden;
    margin-right: 1%;
    margin-bottom: 4px;
  }
  .img_list img{
    width: 100%;
  }
  .removeimg{
    position: absolute;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 16px;
    background: #fff;
    border-radius: 50%;
    right: 2px;
    top: 2px;
    z-index: 10;
    background: #fff;
    transform: rotate(45deg);
    cursor: pointer;
    font-size: 20px;
    transition: 0.4s;
    opacity: 0;
  }
  .img_list:hover .removeimg{
    opacity: 1;
  }
  .pro_add_title{
    padding-top: 10px;
  }
  .pro_add_title input{
    width: 100%;
    height: 50px;
    font-size: 20px;
    border: 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
  }
</style>

<style lang="less">
  .art-options{width: 320px;padding: 20px 0;background: #f8f8f8;transition: width .3s;
    textarea, input{border: none;width: 100%;outline: none;font-size: 14px;color: #444;resize: none;background: transparent;
      &::-webkit-input-placeholder{color: #999;}
    }
  }
  .gallery-editor {max-width: 900px;margin: 0 auto;padding: 10px;
    .layer-ctn {max-width: 1000px;
      .af-left{width: 280px;background: #fff;border-right: 1px solid #e1e1e1;}
      .nav-item{height: 40px;border-bottom: 1px solid #eee;line-height: 1em;padding: 0 5px 0 15px;
        &.nav-item-folder{padding-left: 30px;}
        &:hover{background: rgba(0, 0, 0, .05);}
        &.on{background: #318fff;border-color: #fff;color: #fff;
          .icon-btn{color: #fff;}
        }
        input{border: none;height: 36px;background: transparent;
          &::-webkit-input-placeholder{color: #aaa;}
        }
        .nav-item-icon{margin-right: 15px;}
      }
      .search-bar input{width:150px;height: 100%;border:none;margin-left: 10px;}
      .media-group{padding: 13px 30px;
        ul{flex-wrap: wrap;}
        li{margin: 0 6px 6px 0}
      }
      .media-group-title{padding: 15px 0;}
      .media-group-title{padding: 15px 0;}
      .bubble-item{padding: 4px 15px;white-space: nowrap;cursor: pointer;}
      .bubble-item:hover{background: rgba(0, 0, 0, .1)}
      .datepicker{
        &:before{content: none;}
        input{background: transparent;border: none;padding: 0 10px;}
      }
      .datepicker-range{min-width: 200px;
        .datepicker-popup{right: 0;width: 420px;}
      }
    }
  }
</style>
