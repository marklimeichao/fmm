<template>
  <div class="newmycoupon">
    <div class="cou_nav">
      <router-link to="/mycoupon/validcou">未使用</router-link>
      <router-link to="/mycoupon/invalidcou">已失效</router-link>
    </div>
    <transition :name="transitionName">
      <router-view class="viewchild"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  watch: {
    '$route' (to, from) {
      if (to.path == '/') {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
    }
  },
}
</script>
<style lang="stylus">
.newmycoupon
  padding-bottom:1.2rem
  background:#f4f4f4
  .cou_nav
    position:fixed
    width:100%
    height:.9rem
    box-sizing:border-box
    background:#fff
    top:0
    left:0
    z-index:10
    a
      width:1rem
      height:100%
      box-sizing :border-box
      line-height:.9rem
      text-align:center
      font-size:.3rem
      color:#000
      display:block
      float:left
      margin-left:1.83rem
      &.active
        font-weight:bold
        border-bottom:.05rem solid #00abeb
  .viewchild
    position: absolute;
    left: 0;
    top: .9rem;
    // bottom: 1.2rem
    width:100%
    margin-top:.2rem
    // height :10.32rem
    // overflow-y:auto
    // overflow-x:hidden
    overflow:hidden
    height:78%
    -webkit-overflow-scrolling :touch
    // height: 100%
    // padding-bottom:2.6rem
    transition: all .5s cubic-bezier(.55, 0, .1, 1)
    &.slide-left-enter,&.slide-right-leave-active 
      opacity: 0
      -webkit-transform: translate3d(7.5rem, 0,0)
      transform: translate3d(7.5rem, 0,0)
    &.slide-left-leave-active,&.slide-right-enter 
      opacity: 0
      -webkit-transform: translate3d(-7.5rem, 0,0)
      transform: translate3d(-7.5rem, 0,0)      
</style>

