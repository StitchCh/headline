import { Quill } from 'vue-quill-editor'

// 源码中是import直接倒入，这里要用Quill.import引入
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')

const ATTRIBUTES = ['height', 'width']

var poster = ''

class Image extends BlockEmbed {
  static create (value) {
    console.log('b', value)
    const node = super.create(value)
    const srcArr = this.sanitize(value)
    // 添加video标签所需的属性
    node.setAttribute('style', 'display:block;margin:20px auto;')
    node.setAttribute('src', srcArr)
    return node
  }

  static formats (domNode) {
    poster = domNode.getAttribute('poster')
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
    const { Image } = this.value()
    return `<a href="${Image}">${Image}</a>`
  }
}

Image.className = 'ql-img'
Image.blotName = 'image';
Image.tagName = 'IMG';

export default Image
