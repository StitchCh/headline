import Avatar from './Avatar.vue'
import AvatarGroup from './AvatarGroup.vue'

Avatar.install = function (Vue) {
  Vue.component(Avatar.name, Avatar)
  Vue.component(AvatarGroup.name, AvatarGroup)
}

export default Avatar
