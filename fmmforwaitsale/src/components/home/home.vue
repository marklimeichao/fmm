<template>
  <div class="home">
    <div class="header">
      <div class="left clear-fix">
        <span class="city">
          <router-link to="/city">{{getcity}}</router-link>
        </span>
        <span>|</span>
        <router-link to="/search">
          <span class="add over-ell"> {{fbb}} </span>
        </router-link>
      </div>
      <div class="right">
        <router-link to="/myinfo">
          <img src="./my_photo.png" alt="">
        </router-link>
      </div>
    </div>
    <div ref="wrapper" class="home-wrapper">
      <ul class="content">
        <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:item.MachineId,forsale:item.ForSale}}" tag="li" class="food-item" v-for="(item,index) in foodlists">
          <img class="food-img" v-lazy="item.ListImg" alt="">
          <div class="content-bottom">
            <div class="new_left">
              <p class="new_name ell">{{item.Name}}</p>
              <p>
                <span class="new_price">￥{{item.Price}}</span>
                <span class="new_oldprice" v-if="parseFloat(item.price)!=parseFloat(item.OriginalPrice)">￥{{item.OriginalPrice}}</span>
              </p>
            </div>
            <div class="new_right">
              <addcart :food='item'></addcart>

            </div>
          </div>
        </router-link>
        <scrollkong></scrollkong>
      </ul>
      
     
    </div>
    <!--<newValidCou></newValidCou>-->
  </div>
</template>
<script>
import bmap from '../bmap/bmap.vue'
import login from '../login/login.vue'
import context from '../../main.js'
import bus from '../../assets/js/eventbus.js'
import Velocity from 'velocity-animate'
import addcart from '../addcart/addcart.vue'
import scrollkong from '../scrollkong/kong.vue'
import { Indicator } from 'mint-ui'
import router from '../../router'
import BScroll from 'better-scroll'
// import newValidCou from '../newcouponvalid/newcouponvalid'
const ERR_OK = 1
// console.log(context)
export default {

  data() {
    return {
      city: String,
      add: [],
      errno: Number,
      foodlists: [],
      fbb: localStorage.getItem('KeyWord'),
      machineId: localStorage.getItem('MachineId'),
      ballShow: false,
      show: false
    }

  },
  computed: {
    getcity: function() {
      this.city = localStorage.getItem('city');
      return this.city
    },

  },
  transitions: {

  },
  mounted() {

  },
  created() {
    this.getfoods()
  },

  methods: {

    getfoods: function() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let _this = this;
      let url = context + 'AppShowFoodList';
      // console.log(url)
      this.$http.post(url, { MachineId: this.machineId, isNew: 1 }).then((response) => {
        response = response.body;
        // console.log(response)
        let errnum = response.Code
        if (errnum == ERR_OK) {
          let foodList = response.Data.IndexList;
          let validList = [];
          let invalidList = [];
          if (response.Data.IndexList) {
            foodList.forEach((item) => {
              if (item.ForSale == 1) {
                this.foodlists.push(item)
              } else {
                if (item.Store == 0) {
                  invalidList.push(item)
                } else {
                  validList.push(item)
                }
              }
            });
            if (validList.length > 0 || invalidList.length > 0) {
              this.foodlists = validList.concat(invalidList)
            }
          }
          // this.foodlists = response.Data.IndexList;
          this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {})
        })
          Indicator.close();
        } else if (errnum == 0) {
          Indicator.close();
          router.push('search')
        }
      }, response => {
        alert('请刷新页面')
      })
    },
    getnewfbb: function() {
      let _this = this
      // let machine={};
      bus.$on('getKeyWord', function(keyword, machineid) {
        _this.fbb = keyword;
        _this.fmm = machineid
        _this.getfoods()
      });


    },
    addCart: function(index) {
      this.ballShow = !this.ballShow
      let getBall = this.$refs.ball[index];
      let rect = getBall.getBoundingClientRect();
      let x = Math.round(rect.left)
      let y = Math.round(rect.bottom)
      // console.log(rect)

      // console.log(getBall)
      // getBall.forEach(function(value){
      //   let rect=value.getBoundingClientRect();
      //   console.log(rect)
      // })

    },
    beforeEnter: function(el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function(el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    iflogshow: function(data) {
      // console.log(data)
      this.show = data
    }
    // leave: function(el, done) {
    //   Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
    //   Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
    //   Velocity(el, {
    //     rotateZ: '45deg',
    //     translateY: '30px',
    //     translateX: '30px',
    //     opacity: 0
    //   }, { complete: done })
    // }

  },
  components: {
    bmap: bmap,
    addcart: addcart,
    login: login,
    scrollkong:scrollkong
    // newValidCou:newValidCou
  }
}
</script>
<style>
.home .home-wrapper{
   /*margin-top:1.38rem;
    margin-bottom: 1.2rem;*/
    width:100%;
    height:100%;
    overflow:hidden;
}
</style>

<style lang="stylus">
@import '../../common/stylus/base.styl'
body,html
  width:7.5rem
  height:100%
  background:#f8f8f8
  .home
    // padding-bottom:1rem
    .header
      width:7.5rem
      height:1.38rem
      position:fixed
      top:0
      left:0
      z-index:10
      background:#fff
      .left 
        width:5.49rem
        height:.71rem
        background:#00abeb
        border-radius:0 .69rem .69rem 0
        margin-top:.36rem
        margin-bottom:.34rem
        box-sizing:border-box
        font-size:.3rem
        color:#fff
        line-height:.71rem
        float:left
        span 
          display:block
          float:left
        .city
          padding-left:.32rem
          padding-right:.52rem
          a
            color:#fff
        .add
          width:3rem
          padding-left:.4rem
          color:#fff
      .right
        width:.78rem
        height:.78rem
        border-radius:50%
        margin-top:.3rem
        margin-right:.34rem
        float:right
        img 
          display:block
          width:100%
          height:100%    
    .content
      width:100%
      margin-top:1.38rem
      // padding-bottom:1.38rem
      color:#000
      background:#f8f8f8
      margin-bottom: 1.2rem;
      .food-item
        width: 6.92rem
        height: 4.61rem
        margin: 0 auto .4rem
        position: relative
        .food-img
          width:100%
          height:100%
        .content-bottom
          width: 100%
          height: 1.42rem
          position: absolute;
          left: 0
          bottom: 0
          background: rgba(255,255,255,.7);
          overflow: hidden
          .new_left
            margin-top: .3rem
            margin-left: .52rem
            float: left
            width: 3.6rem
            .new_name 
              font-size: .36rem
              margin-bottom: .15rem
              font-size: .28rem
              font-weight: 600
              padding-right: .18rem  
            .new_oldprice 
              font-size: .24rem
              color: #999
              text-decoration: line-through
          .new_right 
            width: 2.14rem
            height: .84rem
            margin-top: .28rem
            margin-left: .24rem
            float: left;

</style>
