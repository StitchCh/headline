<template>
  <div :class="divStyle">

    <div class="toolbar">
      <div v-tooltip:top="'自动排版'" @click="fclean" class="bar_item">
        <i class="icon">line_style</i>
      </div>

      <div v-if="$route.path != '/mobilePush'" v-tooltip:top="'全屏'" @click="toBig" class="bar_item">
        <i class="icon">crop_free</i>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'撤销'" @click="cx" class="bar_item">
        <i class="icon">undo</i>
      </div>

      <div v-tooltip:top="'后退'" @click="ht" class="bar_item">
        <i class="icon">redo</i>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'全角转半角'" @click="xq('toDBC2SB')" class="bar_item">
        <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M832.528 139.84A483.152 483.152 0 0 0 668.368 32c70.752 176.528 35.04 385.664-107.84 528.544-142.864 142.864-352 178.576-528.528 107.84a493.488 493.488 0 0 0 107.84 164.16c191.28 191.28 501.408 191.28 692.688 0 191.296-191.648 191.296-501.424 0-692.704z"></path></svg>
      </div>

      <div v-tooltip:top="'半角转全角'" @click="xq('toDBC')" class="bar_item">
        <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M512 512m-480 0a480 480 0 1 0 960 0 480 480 0 1 0-960 0Z"></path></svg>
      </div>

      <div v-tooltip:top="'分割线'" @click="setHR" class="bar_item">
        <i class="icon">remove</i>
      </div>

      <div class="bar_line"></div>

      <div v-if="$route.path != '/mobilePush'" v-tooltip:top="'添加音频'" @click="ui.audioSelectorShow = true" class="bar_item">
        <i class="icon">audiotrack</i>
      </div>

      <div v-tooltip:top="'添加图片'" @click="ui.imageSelectorShow = true" class="bar_item">
        <i class="icon">image</i>
      </div>

      <div v-if="$route.path != '/mobilePush'" v-tooltip:top="'添加视频'" @click="ui.videoSelectorShow = true" class="bar_item">
        <i class="icon">theaters</i>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'粗体'" @click="setFormatB('bold')" class="bar_item" :class="{bar_item_on: toolbarConfig.bold}">
        <i class="icon">format_bold</i>
      </div>

      <div v-tooltip:top="'斜体'" @click="setFormatB('italic')" class="bar_item" :class="{bar_item_on: toolbarConfig.italic}">
        <i class="icon">format_italic</i>
      </div>

      <div v-tooltip:top="'下划线'" @click="setFormatB('underline')" class="bar_item" :class="{bar_item_on: toolbarConfig.underline}">
        <i class="icon">format_underline</i>
      </div>

      <!--<div v-tooltip:top="'删除线'" @click="setFormatB('strike')" class="bar_item" :class="{bar_item_on: toolbarConfig.strike}">-->
      <!--<i class="icon">format_strikethrough</i>-->
      <!--</div>-->

      <div class="bar_line"></div>

      <!--<div v-tooltip:top="'引用'" @click="setFormatC('blockquote')" class="bar_item">-->
      <!--<i class="icon">format_quote</i>-->
      <!--</div>-->

      <!--<div v-tooltip:top="'代码块'" @click="setFormatC('code-block')" class="bar_item">-->
      <!--<i class="icon">code</i>-->
      <!--</div>-->

      <div class="bar_line"></div>

      <!--<div v-tooltip:top="'标题'" class="bar_item">-->
      <!--&lt;!&ndash;<span>标题</span>&ndash;&gt;-->
      <!--<select v-model="toolbarData.header">-->
      <!--<option value="1">标题1</option>-->
      <!--<option value="2">标题2</option>-->
      <!--<option value="3">标题3</option>-->
      <!--<option value="4">标题4</option>-->
      <!--<option value="5">标题5</option>-->
      <!--<option value="6">标题6</option>-->
      <!--<option value="false">文本</option>-->
      <!--</select>-->
      <!--</div>-->

      <div v-tooltip:top="'有序列表'" @click="setFormat('list', 'ordered')" class="bar_item" :class="{bar_item_on: toolbarConfig.list == 'ordered'}">
        <i class="icon">format_list_numbered</i>
      </div>

      <div v-tooltip:top="'无序列表'" @click="setFormat('list', 'bullet')" class="bar_item" :class="{bar_item_on: toolbarConfig.list == 'bullet'}">
        <i class="icon">format_list_bulleted</i>
      </div>

      <div v-tooltip:top="'下标'" @click="setFormat('script', 'sub')" class="bar_item" :class="{bar_item_on: toolbarConfig.script == 'sub'}">
        <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" fill-opacity="0" p-id="7858"></path><path d="M794.496 527.232c25.536 0 47.232 4.032 65.28 12.032 11.648 5.312 21.888 12.672 30.72 22.016 8.832 9.28 15.744 20.096 20.608 32.32a106.688 106.688 0 0 1-8 94.528c-10.24 16.896-20.672 30.144-31.36 39.744l-25.344 21.76-28.288 23.36a476.032 476.032 0 0 0-47.104 42.624l-4.48 5.12c-2.688 3.008-5.376 6.4-8.128 10.24l-4.16 6.016h130.56c12.928 0 22.848 2.688 29.696 8 6.848 5.312 10.24 12.608 10.24 21.76a28.928 28.928 0 0 1-8.128 20.736 28.992 28.992 0 0 1-18.368 8.192l-6.272 0.32h-183.936c-12.544 0-22.272-3.456-29.312-10.368a33.152 33.152 0 0 1-10.496-24.384 62.08 62.08 0 0 1 6.784-23.872c4.48-9.92 9.408-17.728 14.72-23.36l25.6-26.048c12.224-12.16 23.68-23.232 34.432-33.088l20.096-17.984c3.84-3.328 7.296-6.208 10.304-8.576l7.872-5.76c13.632-9.728 24.96-19.456 34.112-29.184 9.088-9.728 16-19.776 20.736-30.016 4.736-10.24 7.104-20.288 7.104-30.08a52.864 52.864 0 0 0-28.352-48.256 59.904 59.904 0 0 0-28.608-7.04c-21.888 0-39.04 9.6-51.52 28.8l-2.56 5.056a255.936 255.936 0 0 0-5.76 15.36c-3.968 11.2-8.384 19.84-13.312 25.792-4.928 6.016-12.16 8.96-21.632 8.96a28.16 28.16 0 0 1-20.736-8.192 30.4 30.4 0 0 1-8.256-22.528c0-11.52 2.56-23.488 7.744-35.968 5.12-12.544 12.864-23.872 23.104-33.984 10.24-10.24 23.296-18.432 39.04-24.64 15.744-6.272 34.176-9.408 55.36-9.408zM611.648 217.856a44.8 44.8 0 0 1 5.504 63.104L423.232 512l193.92 231.04a44.8 44.8 0 0 1-68.608 57.6L364.736 581.696 181.12 800.64a44.8 44.8 0 0 1-68.608-57.6L306.368 512l-193.92-231.04a44.8 44.8 0 0 1 68.608-57.6L364.8 442.24l183.808-218.88a44.8 44.8 0 0 1 63.104-5.504z"></path></svg>
      </div>

      <div v-tooltip:top="'上标'" @click="setFormat('script', 'super')" class="bar_item" :class="{bar_item_on: toolbarConfig.script == 'super'}">
        <svg viewBox="0 0 1024 1024" width="16" height="16"><path d="M463.92888888 506.19733333l210.4888889-250.76622222c15.47377778-18.432 13.08444445-46.08-5.34755556-61.55377778-18.432-15.47377778-46.08-13.08444445-61.55377778 5.34755556L406.92622222 438.272 206.336 199.22488889c-15.47377778-18.432-43.12177778-20.93511111-61.55377778-5.34755556-18.432 15.47377778-20.93511111 43.12177778-5.34755556 61.55377778l210.48888889 250.76622222-210.48888889 250.88c-15.47377778 18.432-13.08444445 46.08 5.34755556 61.55377778s46.08 13.08444445 61.55377778-5.34755556l200.59022222-239.0471111 200.59022222 239.0471111c15.47377778 18.54577778 43.12177778 20.93511111 61.55377778 5.34755556 18.432-15.47377778 20.93511111-43.12177778 5.34755556-61.55377778L463.92888888 506.19733333z m264.87466667-67.35644444c8.98844445-21.27644445 30.03733333-43.80444445 63.37422223-67.584 28.89955555-20.70755555 47.55911111-35.49866667 56.09244444-44.48711111C861.35466666 312.88888889 867.84 297.52888889 867.84 281.03111111c0-13.53955555-3.75466667-24.68977778-11.264-33.67822222-7.50933333-8.98844445-18.20444445-13.42577778-32.08533334-13.42577778-19.11466667 0-32.08533333 7.168-38.912 21.39022222-3.98222222 8.192-6.25777778 21.27644445-7.05422222 39.13955556h-60.98488889c1.024-27.07911111 5.91644445-49.03822222 14.79111111-65.76355556 16.72533333-31.85777778 46.42133333-47.78666667 89.088-47.78666666 33.67822222 0 60.52977778 9.32977778 80.55466667 28.10311111 19.91111111 18.65955555 29.92355555 43.46311111 29.92355555 74.29688889 0 23.66577778-7.05422222 44.60088889-21.16266666 62.91911111-9.216 12.17422222-24.46222222 25.71377778-45.51111111 40.73244444l-25.03111111 17.86311111c-15.70133333 11.15022222-26.39644445 19.22844445-32.19911112 24.23466667-5.80266667 5.00622222-10.69511111 10.80888889-14.67733333 17.408h139.264v55.18222222h-218.45333333c0.45511111-22.98311111 5.46133333-43.91822222 14.67733333-62.80533333z"></path></svg>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'减小缩进'" @click="setFormat('indent', '-1')" class="bar_item">
        <i class="icon">format_indent_decrease</i>
      </div>

      <div v-tooltip:top="'增加缩进'" @click="setFormat('indent', '+1')" class="bar_item">
        <i class="icon">format_indent_increase</i>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'行高'" class="bar_item">
        <select v-model="toolbarData.lineHeight">
          <option value="05">0.5</option>
          <option value="075">0.75</option>
          <option value="1">1</option>
          <option value="15">1.5</option>
          <option value="175">1.75</option>
          <option value="2">2</option>
        </select>
      </div>

      <div v-tooltip:top="'字体大小'" class="bar_item">
        <select v-model="toolbarData.size">
          <option value="10px">10号</option>
          <option value="12px">12号</option>
          <option value="14px">14号</option>
          <option value="16px">16号</option>
          <option value="18px">18号</option>
          <option value="20px">20号</option>
          <option value="22px">22号</option>
          <option value="24px">24号</option>
          <option value="26px">26号</option>
          <option value="28px">28号</option>
          <option value="30px">30号</option>
          <option value="32px">32号</option>
        </select>
      </div>

      <div v-tooltip:top="'字体'" class="bar_item">
        <select v-model="toolbarData.font">
          <option value="Arial">Arial</option>
          <option value="Times-New-Roman">Times-New-Roman</option>
          <option value="sans-serif">sans-serif</option>
          <option value="SimSun">宋体</option>
          <option value="SimHei">黑体</option>
          <option value="Microsoft-YaHei">微软雅黑</option>
          <option value="KaiTi">楷体</option>
          <option value="FangSong">仿宋</option>
        </select>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'左对齐'" @click="setFormat('align', false); toolbarData.align = 'left'" class="bar_item" :class="{bar_item_on: toolbarData.align == 'left'}">
        <i class="icon">format_align_left</i>
      </div>

      <div v-tooltip:top="'右对齐'" @click="setFormat('align', 'right'); toolbarData.align = 'right'" class="bar_item" :class="{bar_item_on: toolbarData.align == 'right'}">
        <i class="icon">format_align_right</i>
      </div>

      <div v-tooltip:top="'居中对齐'" @click="setFormat('align', 'center'); toolbarData.align = 'center'" class="bar_item" :class="{bar_item_on: toolbarData.align == 'center'}">
        <i class="icon">format_align_center</i>
      </div>

      <div v-tooltip:top="'两端对齐'" @click="setFormat('align', 'justify'); toolbarData.align = 'justify'" class="bar_item" :class="{bar_item_on: toolbarData.align == 'justify'}">
        <i class="icon">format_align_justify</i>
      </div>

      <div class="bar_line"></div>

      <!--<div v-tooltip:top="'清除字体样式'" @click="removeFormat" class="bar_item">-->
      <!--<i class="icon">format_clear</i>-->
      <!--</div>-->

      <div v-tooltip:top="'链接'" @click="link" class="bar_item">
        <i class="icon">link</i>
      </div>

      <div v-tooltip:top="'字体颜色'" @click="colorShow = !colorShow" class="bar_item">
        <i class="icon">format_color_text</i>
        <div v-if="colorShow" class="bar_block">
          <div @click="setFormat('color', false);colorShow = !colorShow" style="width: 100%;font-size: 12px;border: 1px solid #ddd;margin-bottom: 5px;cursor: pointer;">无颜色</div>
          <div class="color_block" v-for="item in color" @click="setFormat('color', item);colorShow = !colorShow;toolbarData.color = item" :style="{ background: item }"></div>
        </div>
      </div>

      <div v-tooltip:top="'背景颜色'" @click="backgroundShow = !backgroundShow" class="bar_item">
        <i class="icon">format_color_fill</i>
        <div v-if="backgroundShow" class="bar_block">
          <div @click="setFormat('background', false);backgroundShow = !backgroundShow" style="width: 100%;font-size: 12px;border: 1px solid #ddd;margin-bottom: 5px;cursor: pointer;">无颜色</div>
          <div class="color_block" v-for="item in color" @click="setFormat('background', item);backgroundShow = !backgroundShow;toolbarData.background = item" :style="{ background: item }"></div>
        </div>
      </div>

      <div class="bar_line"></div>

      <div v-tooltip:top="'粘贴是否自动排版'" class="bar_item"
           :class="{bar_item_on: pasteClear}"
           @click="pasteClear = !pasteClear"
      >
        <span>开</span>
        <svg :class="{bar_item_on1: pasteClear}" viewBox="0 0 2037 1024" width="30" height="16"><path d="M1526.182629 0.659565h-1014.715355C230.213546 0.659565 0 230.822375 0 512.101472c0 281.304464 230.213546 511.467274 511.492642 511.467274h1014.715355c281.279096 0 511.441907-230.16281 511.441906-511.467274C2037.624536 230.822375 1807.461725 0.659565 1526.182629 0.659565zM1938.106327 512.431254c0 233.688946-191.197741 424.886687-424.886687 424.886687H513.395234c-233.688946 0-424.886687-191.197741-424.886687-424.886687 0-233.714314 191.197741-424.912055 424.886687-424.912055h999.824406c233.688946-0.025368 424.886687 191.197741 424.886687 424.912055z" p-id="2296"></path><path d="M1520.880741 514.942675m-308.219789 0a308.219789 308.219789 0 1 0 616.439578 0 308.219789 308.219789 0 1 0-616.439578 0Z" p-id="2297"></path></svg>
        <span style="margin-left: 4px;">关</span>
      </div>

    </div>


    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>


    <layer v-if="ui.imageSelectorShow" title="选择图片"  width="800px" class="tc_box">
      <div class="layer-text relative" style="height: 800px;">
        <media-photos select-mode ref="mediaPhotos" @preview="onPreview"></media-photos>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.imageSelectorShow = false">取消</btn>
        <btn flat color="#008eff" @click="insertImage">选择</btn>
      </div>
    </layer>

    <layer v-if="ui.videoSelectorShow" title="选择视频"  width="800px" class="tc_box">
      <div class="layer-text relative" style="height: 800px;">
        <media-videos select-mode ref="mediaVideos"></media-videos>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.videoSelectorShow = false">取消</btn>
        <btn flat color="#008eff" @click="insertVideo">选择</btn>
      </div>
    </layer>

    <layer v-if="ui.audioSelectorShow" title="选择音频"  width="800px" class="tc_box">
      <div class="layer-text relative" style="height: 800px;">
        <media-audios select-mode ref="mediaAudios"></media-audios>
      </div>
      <div class="layer-btns">
        <btn flat @click="ui.audioSelectorShow = false">取消</btn>
        <btn flat color="#008eff" @click="insertAudio">选择</btn>
      </div>
    </layer>

    <media-preview
      v-if="preview.show"
      :list="preview.list"
      :index="preview.index"
      :type="$route.meta.type"
      @close="preview.show=false"
      @refresh="refresh"
      @delected="onDelected"/>
  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
  import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
  // import 'quill/dist/quill.core.css'
  // import 'quill/dist/quill.bubble.css'
  import * as Quill from 'quill'


  import Video from './video.js'; // 插入h5 video视频
  Quill.register(Video, true);  // 注册video

  import Image from './image.js'; // 插入h5 video视频
  Quill.register(Image, true);  // 注册video

  //quill编辑器的字体
  var fonts = ['Arial','Times-New-Roman','sans-serif','SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong'];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单
  Quill.register(Font, true);

  //quill编辑器的字号
  var sizes = ['16px', '10px', '12px', '14px', '18px', '20px', '24px', '26px', '28px', '30px', '32px'];
  var size = Quill.import('formats/size');
  size.whitelist = sizes; //将字号加入到白名单
  Quill.register(size, true);

  import audio from './audio.js'; // 插入 audio
  Quill.register(audio, true);  // audio

  import HR from './setHR.js'; // 插入 HR
  Quill.register(HR, true);  // HR

  import imageResize from 'quill-image-resize-module' //调节图片大小
  Quill.register('modules/imageResize', imageResize)
  // import {container, ImageExtend} from 'quill-image-extend-module'
  // Quill.register('modules/ImageExtend', ImageExtend)

  // 设置行高
  import lineHeightStyle from './lineHeight'
  Quill.register({ "formats/lineHeight": lineHeightStyle }, true);
  var lineList = ['05','075','1','15','175','2']
  var lineHeight = Quill.import('formats/lineHeight');
  lineHeight.whitelist = lineList;

  import MediaPhotos from '../../apps/medialibrary/pages/photos'
  import MediaVideos from '../../apps/medialibrary/pages/videos'
  import MediaAudios from '../../apps/medialibrary/pages/audios'
  import MediaPreview from '../../apps/medialibrary/components/mediaPreview'


  var lastStr = ''
  const keyDownWith = [ 37, 38, 39, 40, 16, 8, 13, 20, 9, 17, 18, 91, 93 ]

  export default {
    name: 'v-quill',
    components: {
      quillEditor, MediaPhotos, MediaVideos, MediaAudios, MediaPreview
    },
    props: [ 'value' ],
    data () {
      return {
        pasteClear: true,
        ui: {
          imageSelectorShow: false,
          videoSelectorShow: false,
          audioSelectorShow: false,
          index: 0
        },
        divStyle: 'sdiv',
        select: sessionStorage.getItem('siteId'),
        editor: null,   // 富文本编辑器对象
        content: '', // 富文本编辑器默认内容
        toolbarConfig: {
          bold: false,
          italic: false,
          underline: false,
          strike: false,
          list: false,
          script: false,
          clean: false,
          link: false
        },
        colorShow: false,
        backgroundShow: false,
        color: ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"],
        toolbarData: {
          header: 'false',
          size: '16px',
          font: 'Arial',
          align: 'left',
          color: false,
          background: false,
          lineHeight: '2'
        },
        editorOption: { //  富文本编辑器配置
          modules: {
            history: {
              delay: 2000,
              maxStack: 500,
              userOnly: false
            },
            // imageResize: {
            //     displayStyles: {
            //         backgroundColor: 'black',
            //         border: 'none',
            //         color: 'white'
            //     },
            //     modules: ['Resize', 'DisplaySize']
            // },
            // ImageExtend: {
            //   loading: true,
            //   name: 'file',
            //   action: 'https://testmanage.sinorusfocus.com/cri-cms-platform/media/uploadIAU.monitor',
            //   response: (res) => {
            //     console.log(res)
            //     return res
            //   }
            // },
            toolbar:[
              // ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
              // ['blockquote', 'code-block'],     //引用，代码块
              // [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
              // [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
              // [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
              // [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
              // [{ 'direction': 'rtl' }],             // 文本方向
              // [{ 'size': sizes }], // 字体大小
              // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
              [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
              // [{ 'font': fonts }],     //字体
              // [{ 'align': [] }],    //对齐方式
              // ['clean'],    //清除字体样式
              // ['image1'],[ 'video1'],[ 'audio1'],    //上传图片、上传视频
              [ 'link']
            ]
          },
          theme: 'snow',
          placeholder: ''
        },
        preview: {
          show: false,
          list: [],
          index: 0
        }
      }
    },
    mounted () {
      setTimeout(() => {
        if (!this.editor) {
          return
        }
        // this.editor.blur()

        if (this.select == '1001') {
          this.editor.format('size', '18px');
          this.editor.format('lineHeight', '2');
          this.editor.format('font', 'Arial');
          this.editor.format('align', 'justify');
          this.toolbarData = {
            header: 'false',
            size: '18px',
            font: 'Arial',
            align: 'justify',
            color: false,
            background: false,
            lineHeight: '2'
          }
        } else {
          this.editor.format('size', '16px');
          this.editor.format('lineHeight', '175');
          this.editor.format('font', 'Arial');
          this.editor.format('align', 'left');
          this.toolbarData = {
            header: 'false',
            size: '16px',
            font: 'Arial',
            align: 'left',
            color: false,
            background: false,
            lineHeight: '175'
          }
        }

        let sdelta = this.editor.getContents();
        sdelta.ops = this.removeBlankNode(sdelta.ops)
        this.editor.setContents(sdelta)

        var that = this
        setTimeout(() => {
          if (that.editor.getContents(0, 1).ops[0].insert == '\n') {
            that.editor.deleteText(0, 1)
          }
        }, 300)

        this.$emit('setGB')
      }, 500)

      this.editor = this.$refs.myQuillEditor.quill;

      window.fclean = this.fclean

      // this.editor.root.addEventListener('paste', () => {
      //   setTimeout(() => {
      //     console.log('paste')
      //   }, 200)
      // }, false)

      var ebox = document.getElementsByClassName('ql-editor')[0]
      ebox.onmouseup = this.onEditorMouseup
      ebox.ontouchend = this.onEditorMouseup
      // ebox.onkeydown = this.onKeydown

      window.pasteClear = true

    },
    beforeDestroy () {
      this.editor = null;
      delete this.editor;
    },
    methods: {
      resetcontent () {
        this.content = ""
      },
      onKeydown (e) {
        if (e.keyCode == 8) {
          let range = this.editor.getSelection(true);
          let format = this.editor.getContents(range.index, 1)
          if (format.ops[0].insert != '\n') {
            this.editor.format('size', this.toolbarData.size);
            this.editor.format('lineHeight', this.toolbarData.lineHeight);
            this.editor.format('font', this.toolbarData.font);
          }
        }
      },
      getContentTxt () {
        return this.editor.getText()
      },
      link () {
        window.linkScrollTop = document.getElementsByClassName('ql-container')[0].scrollTop
        document.getElementsByClassName('ql-link')[0].click()
      },
      removeFormat () {
        var range = this.editor.getSelection(true)
        this.editor.removeFormat(range.index, range.length);
      },
      setFormatB (load) {
        this.toolbarConfig[load] = !this.toolbarConfig[load]
        this.editor.format(load, this.toolbarConfig[load]);
      },
      setFormat (load, value) {
        let box = document.getElementsByClassName('ql-container')[0]
        let linkScrollTop = box.scrollTop
        if (load == 'indent' || load == 'align') {
          this.editor.format(load, value);
        } else {
          this.toolbarConfig[load] = this.toolbarConfig[load] == value ? false : value
          this.editor.format(load, this.toolbarConfig[load]);
        }
        this.backgroundShow = false
        this.colorShow = false
        if (load == 'color') {
          this.toolbarData.color = value
        }
        if (load == 'background') {
          this.toolbarData.background = value
        }

        box.scrollTop = linkScrollTop
      },
      setFormatC (load, value) {
        const range = this.editor.getSelection(true);
        this.editor.insertEmbed(range.index, load, value || '');
      },
      toBig () {
        this.divStyle = this.divStyle == 'bdiv' ? 'sdiv' : 'bdiv'
      },
      toDBC2SB (str) {
        var result = ''
        for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i); //获取当前字符的unicode编码
          if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
          {
            result += String.fromCharCode(str.charCodeAt(i) - 65248); //把全角字符的unicode编码转换为对应半角字符的unicode码
          } else if (code == 12288)//空格

          {
            result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
          } else {
            result += str.charAt(i);
          }
        }
        return result
      },
      toDBC (txtstring) {
        var tmp = ''
        for (var i = 0; i < txtstring.length; i++) {
          let code = txtstring.charCodeAt(i)
          if (txtstring[i] != '\n' ) {
            if (code == 32) {
              tmp = tmp + String.fromCharCode(12288);
            }
            else if (code < 127) {
              tmp = tmp + String.fromCharCode(code + 65248);
            }
            else {
              tmp += txtstring.charAt(i);
            }
          } else {
            tmp += String.fromCharCode(code);
          }
        }
        return tmp
      },
      xq (type) {
        let box = document.getElementsByClassName('ql-container')[0]
        let boxScrollTop = box.scrollTop
        var range = this.editor.getSelection(true)
        var delta = this.editor.getContents(range.index, range.length);
        let number = 0

        delta.forEach((item, index) => {
          if (item.insert && typeof(item.insert) == 'string' && item.insert != '\n') {

            number = number == 0 ? index + range.index : number
            this.editor.deleteText(number, item.insert.length)

            item.insert = this[type](item.insert)

            this.editor.insertText(number, item.insert, item.attributes)
          }

          if (typeof(item.insert) == 'string') {
            number += item.insert.length
          } else {
            number += 1
          }

        })

        box.scrollTop = boxScrollTop

        // this.editor.setSelection(range.index, number)

        // setContents
      },
      cx () {
        this.editor.history.undo();
      },
      ht () {
        this.editor.history.redo();
      },
      fclean () {
        lastStr = ''
        let delta = this.editor.getContents();
        let arr = []

        delta.forEach(item => {
          let islist = item.attributes && item.attributes.list ? true : false

          if (item.insert && typeof(item.insert) == 'string' && !islist && item.insert != '\n') {
            let listarr = item.insert.split(/[\r\n]+/)
            if (listarr.length > 1) {
              listarr.forEach(listitem => {
                arr.push({
                  insert: listitem,
                  attributes: {}
                })
                arr.push({
                  insert: '\n',
                })
              })
            } else {
              arr.push(item)
            }
          } else {
            arr.push(item)
          }
        })

        if (arr[0].insert == '\n' && arr.length > 0) {
          arr.splice(0, 1)
        }

        arr.forEach(item => {

          let islist = item.attributes && item.attributes.list ? true : false

          if (item.insert && typeof(item.insert) == 'string' && !islist) {
            item.attributes = {}
            // 判断属性
            if (item.attributes) {
              if (this.select == '1001') {
                item.attributes.size = '18px'
                item.attributes.lineHeight = '2'
                item.attributes.font = 'Arial'
                item.attributes.align = 'justify'
              } else {
                item.attributes.size = '16px'
                item.attributes.lineHeight = '175'
                item.attributes.font = 'Arial'
                item.attributes.align = 'left'
              }
            }

            //合并空行  合并空格
            item.insert = item.insert.replace(/\n\n+/g, '\n')
            item.insert = item.insert.replace(/\s\s+/g, ' ')

            //全角半角转换
            // if (this.select == '1001') {
            //     item.insert = ToDBC(item.insert)
            // } else {
            //     item.insert = DBC2SB(item.insert)
            // }

            item.insert = switchAngle(item.insert)
          }

        })
        delta.ops = arr
        this.editor.setContents(delta)

        //对整理完格式的文本去除段首空格
        let sdelta = this.editor.getContents();
        let indent = true

        sdelta.forEach((item, index) => {
          if (item.insert && typeof(item.insert)=='string') {
            //段结束
            if (item.insert == '\n') {
              indent = true
            } else {
              if (indent) {
                //去除段首空格
                item.insert = item.insert.replace(/(^\s+)/g, "")
                indent = false
              }
            }
          }
        })

        sdelta.ops = this.removeBlankNode(sdelta.ops)

        sdelta.forEach((item, index) => {

          if (item.insert && typeof(item.insert)=='string') {
            //段结束
            if (item.insert == '\n') {
              indent = true
            } else {
              if (indent) {
                //去除段首空格
                item.insert = item.insert.replace(/(^\s+)/g, "")
                indent = false
              }
            }
          }
        })

        this.editor.setContents(sdelta)

        this.toolbarConfig = {
          bold: false,
          italic: false,
          underline: false,
          strike: false,
          list: false,
          script: false,
          clean: false,
          link: false
        }
        if (this.select == '1001') {
          this.toolbarData = {
            header: 'false',
            size: '18px',
            font: 'Arial',
            align: 'justify',
            color: false,
            background: false,
            lineHeight: '2'
          }
        } else {
          this.toolbarData = {
            header: 'false',
            size: '16px',
            font: 'Arial',
            align: 'left',
            color: false,
            background: false,
            lineHeight: '175'
          }
        }
      },
      insertImage () {
        if (this.$refs.mediaPhotos.selected.length <= 0) {
          this.$toast('未选择图片')
          return
        }
        let box = document.getElementsByClassName('ql-container')[0]
        let boxScrollTop = box.scrollTop
        let selected = this.$refs.mediaPhotos.selected.map(v => {
          return {
            src: this.$refs.mediaPhotos.imgOrigin + v.filePath + v.fileName
          }
        })
        if (selected.length) {
          var rangeN = this.editor.getSelection(true);
          selected.forEach(item => {
            const range = this.editor.getSelection(true);
            this.editor.insertEmbed(range.index, 'image', item.src);
            this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
          })

          setTimeout(() => {
            var delta = this.editor.getContents(rangeN.index, selected.length + 2);

            if (delta.ops[0].insert == '\n') {
              this.editor.deleteText(rangeN.index, 1)
            }
            if (delta.ops[delta.ops.length - 1].insert == '\n') {
              this.editor.deleteText(rangeN.index + delta.ops.length - 1, 1)
            }

            box.scrollTop = boxScrollTop
            this.editor.format('size', this.toolbarData.size);
            this.editor.format('lineHeight', this.toolbarData.lineHeight);
            let delta1 = this.editor.getContents().ops;

            if (!delta1[delta1.length - 1].attributes) {
              delta1.push({
                attributes: {
                  size: '18px',
                  lineHeight: '2',
                  font: 'Arial',
                  align: 'justify'
                },
                insert: '\n'
              })

              this.editor.setContents({ops: delta1})
            }
            this.editor.blur()
          }, 200)
        }
        this.ui.imageSelectorShow = false
      },
      insertVideo () {
        if (this.$refs.mediaVideos.selected.length <= 0) {
          this.$toast('未选择视频')
          return
        }
        let box = document.getElementsByClassName('ql-container')[0]
        let boxScrollTop = box.scrollTop
        let origin = this.$refs.mediaVideos.origin
        let selected = this.$refs.mediaVideos.selected.map(v => {
          return {
            url: origin + v.video,
            thumb: origin + v.thumb
          }
        })
        if (selected.length) {
          var rangeN = this.editor.getSelection(true);
          // if (this.editor.getContents(rangeN.index, 1).ops[0].insert == '\n') {
          //   this.editor.deleteText(rangeN.index, 1)
          // }

          selected.forEach(item => {
            const range = this.editor.getSelection(true);
            this.editor.insertEmbed(range.index, 'video', item.url + ',' + item.thumb);
            this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
          })
          setTimeout(() => {
            var delta = this.editor.getContents(rangeN.index, selected.length + 2);

            if (delta.ops[0].insert == '\n') {
              this.editor.deleteText(rangeN.index, 1)
            }
            if (delta.ops[delta.ops.length - 1].insert == '\n') {
              this.editor.deleteText(rangeN.index + delta.ops.length - 1, 1)
            }

            box.scrollTop = boxScrollTop
            this.editor.format('size', this.toolbarData.size);
            this.editor.format('lineHeight', this.toolbarData.lineHeight);
            let delta1 = this.editor.getContents().ops;

            if (!delta1[delta1.length - 1].attributes) {
              delta1.push({
                attributes: {
                  size: '18px',
                  lineHeight: '2',
                  font: 'Arial',
                  align: 'justify'
                },
                insert: '\n'
              })

              this.editor.setContents({ops: delta1})
            }
            this.editor.blur()
          }, 200)
        }
        this.ui.videoSelectorShow = false
      },
      insertAudio () {
        if (this.$refs.mediaAudios.selected.length <= 0) {
          this.$toast('未选择音频')
          return
        }
        let box = document.getElementsByClassName('ql-container')[0]
        let boxScrollTop = box.scrollTop
        let origin = window.w_api
        let selected = this.$refs.mediaAudios.selected.map(v => {
          return {
            url: origin + v.audio
          }
        })

        if (selected.length) {
          var rangeN = this.editor.getSelection(true);
          // if (this.editor.getContents(rangeN.index, 1).ops[0].insert == '\n') {
          //   this.editor.deleteText(rangeN.index, 1)
          // }

          selected.forEach(item => {
            const range = this.editor.getSelection(true);
            this.editor.insertEmbed(range.index, 'audio', item.url);
            this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
          })
          setTimeout(() => {

            var delta = this.editor.getContents(rangeN.index, selected.length + 2);

            if (delta.ops[0].insert == '\n') {
              this.editor.deleteText(rangeN.index, 1)
            }
            if (delta.ops[delta.ops.length - 1].insert == '\n') {
              this.editor.deleteText(rangeN.index + delta.ops.length - 1, 1)
            }

            box.scrollTop = boxScrollTop
            this.editor.format('size', this.toolbarData.size);
            this.editor.format('lineHeight', this.toolbarData.lineHeight);
            let delta1 = this.editor.getContents().ops;

            if (!delta1[delta1.length - 1].attributes) {
              delta1.push({
                attributes: {
                  size: '18px',
                  lineHeight: '2',
                  font: 'Arial',
                  align: 'justify'
                },
                insert: '\n'
              })

              this.editor.setContents({ops: delta1})
            }
            this.editor.blur()
          }, 200)
        }
        this.ui.audioSelectorShow = false
      },
      setHR () {
        const range = this.editor.getSelection(true);
        this.editor.insertEmbed(range.index, 'hr', '');
        this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
      },
      removeBlankNode (list) { //清除空行
        let arr = []
        let Pobj = false
        list.forEach(item => {

          let islist = item.attributes && item.attributes.list ? true : false

          if (item.insert !== '' && item.insert !== ' ' && item.insert !== '') {

            if (item.insert && typeof(item.insert) == 'string' && !islist) {
              //合并空行  合并空格
              item.insert = item.insert.replace(/\n\n+/g, '\n')
              item.insert = item.insert.replace(/\s\s+/g, ' ')
            }

            if (item.insert !=='\n' || !Pobj) {
              arr.push(item)
              Pobj = false
            }
          }

          if (typeof(item.insert) == 'object') {
            Pobj = true
          }
        })
        return arr
      },
      onPreview (e) {
        this.preview.list = e.list || []
        this.preview.index = e.index || 0
        this.preview.show = true
      },
      refresh (item) {
        this.$refs.mediaPhotos.getList('', item)
        this.preview.show = false
      },
      onDelected (e) {
        this.$refs.mediaPhotos.getList()
      },
      onEditorReady () {

      },
      onEditorBlur () {

      },
      onEditorFocus () {

      },
      onEditorMouseup () {
        var range = this.editor.getSelection(true);
        var format = this.editor.getFormat(range.index, range.length)
        var insert = this.editor.getContents(range.index - 1, 1).ops[0]

        if (insert && insert.insert == '\n' || insert.insert.image) {
          this.editor.format('size', this.toolbarData.size);
          this.editor.format('lineHeight', this.toolbarData.lineHeight);
          this.editor.format('font', this.toolbarData.font);
        }


        //toolbarConfig
        for (let k in this.toolbarData) {
          if (format[k]) {
            this.toolbarData[k] = format[k]
          }
        }
        for (let k in this.toolbarConfig) {
          this.toolbarConfig[k] = format[k] ? true : false
        }

        window.linkScrollTop = document.getElementsByClassName('ql-container')[0].scrollTop

      },
      onEditorChange () {

      },
    },
    watch: {
      'content' (val) {
        this.$emit('input', val)
        if (val === '<p class="ql-align-justify"><br></p>') {
          this.editor.format('size', this.toolbarData.size);
          this.editor.format('lineHeight', this.toolbarData.lineHeight);
        }
      },
      'toolbarData.header' (val) {
        this.editor.format('header', val == 'false' ? false : val);
      },
      'toolbarData.size' (val) {
        this.editor.format('size', val);
      },
      'toolbarData.font' (val) {
        this.editor.format('font', val);
      },
      'toolbarData.lineHeight' (val) {
        this.editor.format('lineHeight', val);
      },
      'pasteClear' () {
        window.pasteClear = this.pasteClear
      }
    }
  }


  function testSection (number) { //全角字符
      //大写英文
      if (number > 64 + 65248 && number < 90 + 65248) {
        return true
      }
      //小写英文
      if (number > 96 + 65248 && number < 123 + 65248) {
        return true
      }
      //数字和.（46）
      if (number > 46 + 65248 && number < 58 + 65248) {
        return true
      }
      //俄文
      if (number > 1023 + 65248 && number < 1328 + 65248) {
        return true
      }
      //罗马字符
      if (number >= 8544 && number <= 8553) {
        return true
      }
      return false
  }

  function testSectionB (number) { //全角字符
    //大写英文
    if (number > 64 && number < 90 ) {
      return true
    }
    //小写英文
    if (number > 96 && number < 123 ) {
      return true
    }
    //数字和.（46）
    if (number > 46 && number < 58) {
      return true
    }
    //俄文
    if (number > 1023 && number < 1328) {
      return true
    }
    //罗马字符
    if (number >= 8544 && number <= 8553) {
      return true
    }
    return false
  }

  function fBDStr (number) {
    let arr = [
      8211,
      171,
      187,
    ]
    return arr.indexOf(number) < 0 ? false : true
  }

  function bdStr (number) { //中文标点白名单（无对应半角）
    let arr = [
      12304,
      12305,
      12300,
      12301,
      12290,
      12289,
      8220,
      65292,
      8221,
      65292,
      8216,
      65292,
      8217,
      65292,
      12308,
      65292,
      12309,
      65292,
      9472,
      65292,
      183,
      65292,
      12298,
      65292,
      12299,
      65292,
      12296,
      65292,
      12297,
      65292,
      183,
      65292,
      8212,
      65292,
      215,
      65292,
      9633,
      65292,
      9650,
      65292,
      9679,
      65292,
      8230,
      32,
      65292,
      8594
    ]
    return arr.indexOf(number) < 0 ? false : true
  }

  var bdConfig = {

    yinHao: false,
    shuangYinHao: false,
    kuoHao: false

  }


  function switchAngle (txtstring) {
    var tmp = "";
    var aPcode = null

    for (var i = 0; i < txtstring.length; i++) {
      var reg = new RegExp("[\\u4E00-\\u9FFF]+","g") //中文验证
      var areg = new RegExp("[\\u4E00-\\u9FFF]+","g") //中文验证
      var Qreg = new RegExp("[\\uff00-\\uffff]","g") //全角验证
      let code = txtstring.charCodeAt(i)
      let Pcode = aPcode || txtstring[i - 1] || lastStr || ''
      let ptest = reg.test(Pcode)  //前一个字符中文验证

      if (Pcode != '' && (bdStr(Pcode.charCodeAt(0)) || Pcode == '）')) {
        ptest = true
      }

      if (Pcode.charCodeAt(0) == 32) {
        ptest = false
      } else if (Pcode.charCodeAt(0) == 12288) {
        ptest = true
      }

      if (txtstring[i] != '\n' && !testSectionB(code) && code != 10) {

        if ((code == 12288 || code == 160) && !ptest) { //空格全转半

          tmp += String.fromCharCode(32);

        } else if ((code == 32 || code == 160) && ptest) { //空格半转全

          tmp += String.fromCharCode(12288);

        } else if (areg.test(txtstring[i])) { //中文验证

          tmp += txtstring[i]

        } else if (testSection(code)) { //全角英文 俄文 数字判断

          if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
          {
            tmp += String.fromCharCode(code - 65248); //把全角字符的unicode编码转换为对应半角字符的unicode码
          } else {
            tmp += txtstring[i]
          }

        } else {  //标点

          let jiao = code >= 65248  //自身全角验证
          if (code == 12288 || code == 32) { //空格过滤

            if (ptest) {
              tmp += String.fromCharCode(12288)
            } else {
              tmp += String.fromCharCode(32)
            }

          } else if (!ptest && jiao && !fBDStr(code)) { //全转半

            if ((code == 65289 && bdConfig.kuoHao) || (code == 65287 && bdConfig.yinHao) || (code == 65282 && bdConfig.shuangYinHao)) {
              tmp += txtstring[i]
            } else {
              tmp += String.fromCharCode(code - 65248);
            }

          } else if (ptest && !jiao && !bdStr(code) && !fBDStr(code)) { //半转全


            if (code == 39) {
              bdConfig.yinHao = true
            } else if (code == 34) {
              bdConfig.shuangYinHao = true
            } else if (code == 40) {
              bdConfig.kuoHao = true
            }
            tmp += String.fromCharCode(code + 65248);

          } else if ((bdConfig.yinHao && code == 39) || (bdConfig.shuangYinHao && code == 34) || (bdConfig.kuoHao && code == 41)) {


            if (code == 39) {
              bdConfig.yinHao = false
              tmp += String.fromCharCode(code + 65248);
            } else if (code == 34) {
              bdConfig.shuangYinHao = false
              tmp += String.fromCharCode(code + 65248);
            } else if (code == 41) {
              bdConfig.kuoHao = false
              tmp += String.fromCharCode(code + 65248);
            } else if (code == 65288) {
              bdConfig.kuoHao = false
              tmp += String.fromCharCode(40);
            } else {
              tmp += String.fromCharCode(code + 65248);
            }

          } else {

            if (code == 39 + 65248) {
              bdConfig.yinHao = true
            } else if (code == 34 + 65248) {
              bdConfig.shuangYinHao = true
            } else if (code == 65288) {
              bdConfig.kuoHao = true
            }

            tmp += txtstring[i]

          }

        }

      } else {
        tmp += txtstring[i];
      }

      lastStr = txtstring[i]
      aPcode = tmp[tmp.length - 1]

    }

    return tmp;
  }
</script>

<style scoped>

  .sdiv{
    width: 100%;
    margin: 0 auto
  }
  .bdiv{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 30px 10px 10px;
    box-sizing: border-box;
  }
  .toolbar{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .bar_item{
    margin: 5px 8px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .bar_block{
    position: absolute;
    top: 20px;
    left: 0px;
    width: 126px;
    padding: 5px;
    background: #fff;
    border: 1px solid #aaa;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    z-index: 10;
  }
  .bar_item:hover i{
    color: #4b94ff;
  }
  .bar_item svg path{
    fill: #666;
  }
  .bar_item svg:hover path{
    fill: #4b94ff;
  }
  .bar_item svg{
    cursor: pointer;
  }
  .toolbar i{
    font-size: 20px;
    cursor: pointer;
  }
  .bar_line{
    width: 1px;
    background: #999;
    height: 20px;
    margin: 0 10px;
  }
  .toolbar{
    border: 1px solid #ccc;
  }
  .bar_item select{
    width: 100px;
  }
  .bar_item span{
    font-size: 14px;
    margin-right: 5px;
  }
  .bar_item_on{
    color: #4b94ff;
  }
  .bar_item_on svg path{
    fill: #4b94ff;
    color: #4b94ff;
  }
  .color_block{
    width: 14px;
    height: 14px;
    margin: 2px;
    cursor: pointer;
  }
  .bar_item_on1{
    transform: rotate(180deg);
  }
</style>
