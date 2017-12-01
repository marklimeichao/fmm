<template>
  <div class="cart">
    <div class="navbar">
      <router-link to="/cart/today">
        今日购
      </router-link>
      <router-link to="/cart/yd">
        预定
      </router-link>
    </div>
    <transition :name="transitionName">
      <router-view class="viewchild"></router-view>
    </transition>

  </div>

  </div>
</template>
<script>
import bus from '../../assets/js/eventbus.js'
import context from '../../main.js'
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
  created(){
    this.getCartInfo();
  },
  methods:{
     getCartInfo: function() {
      let userid = localStorage.getItem('UserId');
      let machineid = localStorage.getItem('MachineId');
      let data = {
        UserId: userid,
        MachineId: machineid,
        Type:1,
        BuyType:0
      };
      let url = context + 'CarListNum';
      this.$http.post(url, data).then((res) => {
        res = res.body;
       if(res.Data.carCount==0){
         bus.$emit('deCart', false);
         bus.$emit('deYdCart', false);
       }
      })
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/base.styl'
.cart
  width:100%
  .navbar
    height:.88rem
    box-sizing:border-box
    position:absolute
    top:0
    left:0
    display:flex
    background:#f8f8f8
    width:100%
    z-index:10
    a
      flex:1
      box-sizing :border-box
      height:.88rem
      line-height:.88rem
      text-align :center
      color:#000
      &.active
        color:#00abeb
        border-bottom:.01rem solid #00abeb
  .viewchild
    position: absolute;
    left: 0;
    top: .88rem;
    bottom: 1.2rem
    width:100%
    height:90%
    // height :10.32rem
    overflow-y:auto
    overflow-x:hidden
    -webkit-overflow-scrolling :touch
    // height: 100%
    // padding-bottom:2.6rem
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
