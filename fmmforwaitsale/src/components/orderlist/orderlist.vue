<template>
  <div class="order_list">
    <div class="nav_bar">
      <router-link to="/mealtaken/taken"> 待取餐</router-link>
      <router-link to="/mealtaken/ydorder"> 预定</router-link>
      <router-link to="/mealtaken/topay"> 待支付</router-link>
      <router-link to="/mealtaken/completeorder"> 已完成</router-link>
      <router-link to="/mealtaken/invalidorder"> 已失效</router-link>
    </div>
    <transition :name="transitionName">
      <router-view class="view_order"></router-view>
    </transition>

  </div>
</template>
<script>
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
export default {
  watch: {
    '$route'(to, from) {

      const toDepth = to.path.split('/').length

      const fromDepth = from.path.split('/').length

      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

    }
  },
  created() {
    let userid = localStorage.getItem('UserId');
    if (!userid) {
      bus.$emit('getOrderInfo', false)
      // router.push('login')
      return
    };
  }
}
</script>
<style lang="stylus">
.order_list
  width:100%
  overflow:hidden
  .nav_bar
    width:100%
    height:1rem
    line-height:1rem
    display:flex
    position:absolute
    top:0
    left:0
    z-index:10
    background:#f8f8f8
    a
     flex:1
     color:#333
     box-sizing :border-box
     text-align:center
     &.active
      color:#00abeb
      border-bottom:1px solid #00abeb
  .view_order
    width:100%
    height:90%
    overflow:hidden
    // overflow-y:auto
    -webkit-overflow-scrolling :touch
    margin-top:1rem
    // transition:all .4s
    transition: all .5s cubic-bezier(.55, 0, .1, 1)
    &.slide-left-enter,&.slide-right-leave-active 
      opacity: 0
      -webkit-transform: translate(7.5rem, 0)
      transform: translate(7.5rem, 0)
    &.slide-left-leave-active,&.slide-right-enter 
      opacity: 0
      -webkit-transform: translate(-7.5rem, 0)
      transform: translate(-7.5rem, 0)
</style>

