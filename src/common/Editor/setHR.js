import { Quill } from 'vue-quill-editor'

// 源码中是import直接倒入，这里要用Quill.import引入
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

class HR extends BlockEmbed {
    static create (value) {
        const node = super.create(value)
        // 添加hr标签所需的属性
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
        const { hr } = this.value()
        return `<a href="${hr}">${hr}</a>`
    }
}
HR.blotName = 'hr' // 这里不用改，楼主不用iframe，直接替换掉原来，如果需要也可以保留原来的，这里用个新的blot
HR.className = 'ql-hr'
HR.tagName = 'div' // 用hr标签替换iframe

export default HR
