import { Quill } from 'vue-quill-editor'

// 源码中是import直接倒入，这里要用Quill.import引入
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class Video extends BlockEmbed {
    static create (value) {
        const node = super.create(value)
        const srcArr = this.sanitize(value).split(',')
        // 添加video标签所需的属性
        node.setAttribute('controls', 'controls')   // 控制播放器
        node.setAttribute('type', 'video/mp4')
        node.setAttribute('style', 'display:block;margin:20px auto;')
        node.setAttribute('preload', 'auto')    // auto - 当页面加载后载入整个视频  meta - 当页面加载后只载入元数据  none - 当页面加载后不载入视频
        node.setAttribute('webkit-playsinline', 'true') // 兼容ios 不全屏播放
        node.setAttribute('playsinline', 'true')
        node.setAttribute('x-webkit-airplay', 'allow')
        // node.setAttribute('x5-video-player-type', 'h5') // 启用H5播放器,是wechat安卓版特性
        node.setAttribute('x5-video-orientation', 'portraint') // 竖屏播放 声明了h5才能使用  播放器支付的方向，landscape横屏，portraint竖屏，默认值为竖屏
        node.setAttribute('x5-playsinline', 'true') // 兼容安卓 不全屏播放
        node.setAttribute('x5-video-player-fullscreen', 'true')    // 全屏设置，设置为 true 是防止横屏
        node.setAttribute('src', srcArr[0])
        node.setAttribute('poster', srcArr[1])
        return node
    }

    static formats (domNode) {
        return ATTRIBUTES.reduce((formats, attribute) => {
            if (domNode.hasAttribute(attribute)) {
                formats[attribute] = domNode.getAttribute(attribute)
            }
            return formats
        }, {})
    }

    static sanitize (url) {
        return Link.sanitize(url) // eslint-disable-line import/no-named-as-default-member
    }

    static value (domNode) {
        return domNode.getAttribute('src')
    }

    format (name, value) {
        if (ATTRIBUTES.indexOf(name) > -1) {
            if (value) {
                this.domNode.setAttribute(name, value)
            } else {
                this.domNode.removeAttribute(name)
            }
        } else {
            super.format(name, value)
        }
    }

    html () {
        const { video } = this.value()
        return `<a href="${video}">${video}</a>`
    }
}
Video.blotName = 'video' // 这里不用改，楼主不用iframe，直接替换掉原来，如果需要也可以保留原来的，这里用个新的blot
Video.className = 'ql-video'
Video.tagName = 'video' // 用video标签替换iframe

export default Video
