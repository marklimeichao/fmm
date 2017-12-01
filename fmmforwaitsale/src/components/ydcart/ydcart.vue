<template>
  <div class="ydcart">
    <!--{{checkfoods}}-->
    <div class="today" ref="ydwrapper">
      <div>
        <ul class="">
          <transition name="fade" v-for="(food,index) in foodlists">
            <li class="list" v-if="food.Num>0" v-on:add="getNum" v-on:dec="getNum">
              <div class="left" :class="{checked:(checkfoods.indexOf(food.CartId)!=-1)}">
                <input ref="" class="fmm-hook" type="checkbox" :value="food.CartId" name="fmm" v-model="checkfoods">
              </div>
              <div class="right">
                <img :src="food.FoodUrl" alt="">
              </div>
              <div class="detail">
                <p class="foodname over-ell">{{food.FoodName}}</p>
                <p class="price">￥{{food.Price}}</p>
              </div>
              <ydcartcontrol :foodlist="foodlists" :food="food" :checkfoods="checkfoods" :totalFoods="totalFoods"></ydcartcontrol>
            </li>
          </transition>
        </ul>
        <transition name="fade">
          <div class="invalid-order" v-if="invalidfoodlists.length>0">
            <div class="invalid-head">
              <span>失效商品</span>
              <span @click="cleanAllFood">清空失效商品</span>
            </div>
            <ul>
              <transition name="fade" v-for="(food,index) in invalidfoodlists">

                <li class="list" v-if="food.Num>0" v-on:add="getNum" v-on:dec="getNum">
                  <div class="left">
                    <!--<input ref="" class="fmm-hook" type="checkbox" :value="food.CartId" name="fmm" >-->
                  </div>
                  <div class="right">
                    <img :src="food.FoodUrl" alt="">
                  </div>
                  <div class="detail">
                    <p class="foodname over-ell">{{food.FoodName}}</p>
                    <p class="price">￥{{food.Price}}</p>
                  </div>
                  <ydcartcontrol :foodlist="foodlists" :food="food" :checkfoods="checkfoods"></ydcartcontrol>
                  <div class="list-mask"></div>
                </li>

              </transition>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="balance" v-if="foodlists.length>0">
      <span class=" ba_checked" :class="{checked:isCheck}" @click="allFood"></span>
      <span class="qx">全选</span>
      <span class="total_money">{{totalMoney}}</span>
      <span class="delete" @click.prevent.stop="deleteFood">删除</span>
      <span class="settle" @click.prevent.stop="toSureYdOrder">结算</span>
    </div>
    <transition name="fade">
      <div class="kong" v-if="foodlists.length==0&&invalidfoodlists.length==0">
        <img src="./cart_kong.png" alt="">
        <p>购物车空空如也，去逛逛吧</p>
      </div>
    </transition>

  </div>
</template>
<script>

import context from '../../main.js'
import ydcartcontrol from '../ydcartcontrol/ydcartcontrol.vue'
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import BScroll from 'better-scroll'
const ERR_OK = 1
const ERR_NO = 0
var usrid = localStorage.getItem('UserId');
export default {
  data() {
    return {
      foodlists: [],
      checkfoods: [],
      isChecked: true,
      totalFoods: [],
      invalidfoodlists: [],
      invalidCartIds: []

    }
  },
  computed: {
    selectedFoods: function() {
      let _this = this;
      let foods = [];
      let totalPrice = 0;
      this.foodlists.forEach((food) => {
        _this.checkfoods.forEach((checkfood) => {
          if (food.CartId == checkfood) {
            foods.push(food)
          }
        })
      });
      return foods
      // foods.forEach((food) => {
      //   totalPrice += food.Num * food.Price
      // })
      // return totalPrice.toFixed(2);
    },
    totalMoney: function() {
      let totalPrice = 0;
      this.selectedFoods.forEach((food) => {
        totalPrice += food.Num * food.Price
      })
      return totalPrice.toFixed(2);
    },
    isCheck: function() {
      if (this.checkfoods.length != this.totalFoods.length) {
        this.isChecked = false
      } else {
        this.isChecked = true
      }
      return this.isChecked
    }
  },
  methods: {
    getToday: function() {
      let _this = this
      let userid = localStorage.getItem('UserId');
      let machineid = localStorage.getItem('MachineId');
      let url = context + 'CartList'
      let data = {
        UserId: userid,
        MachineId: machineid,
        Type: 1,
        BuyType: 2
      }
      this.$http.post(url, data).then((response) => {
        response = response.body
        let errnum = response.Code
        if (errnum == ERR_OK) {
          zhuge.track('进入购物车', {
            '购物车类型': '预定'
          })
          let foods = response.Data.FoodList
          if (foods.length == 0) {
            bus.$emit('ydCart', false)

          }
          let validFoods = [];
          let invalidFoods = [];
          foods.forEach((food) => {
            if (food.IsZero == 0) {
              validFoods.push(food)
              // invalidFoods.push(food)
            }
            else {
              invalidFoods.push(food)
            }
          })
          let foodsArr = [];
          foods.forEach(function(food) {
            _this.totalFoods.push(food.CartId);
            _this.checkfoods.push(food.CartId);
          })
          this.foodlists = validFoods;
          this.invalidfoodlists = invalidFoods;
          invalidFoods.forEach((food) => {
            this.invalidCartIds.push(food.CartId)
          })
          // this.foodlists = response.Data.FoodList
        }
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ydwrapper, {
            click: false
          })
        })
      })
    },
    allFood: function() {
      this.isChecked = !this.isChecked;

      if (this.isChecked == true) {
        this.checkfoods = this.totalFoods

      } else {
        this.checkfoods = [];

      }
    },
    deleteFood: function() {
      let url = context + 'clearCart';

      if (this.checkfoods.length == 0) {
        return
      }
      let title = '';
      let message = '要删除所选商品?';
      let confirmButtonText = '删除';
      let cartIds = this.checkfoods.join(',')
      let data = {
        UserId: localStorage.getItem('UserId'),
        MachineId: localStorage.getItem('MachineId'),
        Type: 1,
        CartIds: cartIds,
        BuyType: 2
      };
      MessageBox.confirm(message, title).then(action => {
        this.$http.post(url, data).then((response) => {
          response = response.body;
          // console.log(response)
          this.selectedFoods.forEach((food) => {
            food.Num = 0;
            this.removeByValue(this.checkfoods, food.CartId);
            this.removeByValue(this.totalFoods, food.CartId);
            this.removeByValue(this.foodlists, food);

          })
          // console.log(this.foodlists)
          if (this.foodlists.length == 0) {
            bus.$emit('deYdCart', false)
          }
          // console.log(this.checkfoods)
        })
      })




    },
    toSureYdOrder: function() {
      let url = context + 'weixin/wxorder!toSureOrder.do';

      if (this.checkfoods.length == 0) {
        Toast({
          message: '请您选择美饭',
          position: 'middle',
          duration: 500
        });
        return
      };
      setTimeout(function() {
        bus.$emit('getCartInfo', _this.selectedFoods)
      }, 600);
      // let _this=this;
      let cartIds = this.checkfoods.join(',');
      let title = '';
      let message = '';
      let _this = this;
      localStorage.setItem('CartIds', cartIds);
      localStorage.setItem('cartInfo', JSON.stringify(_this.selectedFoods));
      // let data = {
      //   UserId: localStorage.getItem('UserId'),
      //   MachineId: localStorage.getItem('MachineId'),
      //   Type: 1,
      //   CartIds: cartIds,
      //   BuyType: 2
      // };

      if (this.invalidfoodlists.length > 0) {
        message = '购物车有失效商品，是否继续下单';
        MessageBox.confirm(message, title).then(action => {

          // _this.$http.post(url, data).then((response) => {
          //   zhuge.track('购物车页面-去结算', {
          //     '购物车类型': '预定'
          //   })
          //   response = response.body;
          // console.log(response)
          router.push('/ydorder')
          // console.log(this.checkfoods)
          // })
        })
      }

      // _this.$http.post(url, data).then((response) => {
      //   zhuge.track('购物车页面-去结算', {
      //     '购物车类型': '预定'
      //   })
      //   response = response.body;
      // console.log(response)
      router.push('/ydorder')
      // console.log(this.checkfoods)
      // })
    },
    removeByValue: function(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break
        }
      }
    },
    cleanAllFood: function() {
      let title = '';
      let message = '确认清空失效商品?';

      let url = context + 'clearCart';

      let cartIds = this.invalidCartIds.join(',');
      // console.log(cartIds)
      let data = {
        UserId: localStorage.getItem('UserId'),
        MachineId: localStorage.getItem('MachineId'),
        Type: 1,
        CartIds: cartIds,
        BuyType: 2
      };
      MessageBox.confirm(message, title).then(action => {
        this.$http.post(url, data).then((response) => {
          response = response.body;
          // console.log(response)
          this.invalidfoodlists = [];

          // console.log(this.checkfoods)
        })
      })


    }
  },
  created() {
    // console.log(router)
    this.getToday()
    // console.log(this.checkfoods)
  },
  mounted() {
    // console.log(this.checkfoods)
  },

  components: {
    ydcartcontrol: ydcartcontrol
  }
}
</script>
<style lang="stylus">
 .ydcart
    width:100%
    background: #f8f8f8
    .today
      // height:8.4rem
      overflow:auto
      -webkit-overflow-scrolling :touch
      height:90%
      // padding-bottom:1rem
      .list
        width: 100%
        height: 2.5rem
        background: #fff
        margin-bottom: .15rem
        position: relative
        overflow:hidden
        .list-mask
          width:100%
          height:100%
          position:absolute
          top:0
          left:0
          z-index:10
          background:rgba(0,0,0,0)
        &.fade-enter-active,&.fade-leave-active
          transition: all .4s
        &.fade-enter,&.fade-leave-to
          opacity :0  
          transform :translate3d(-100%,0,0)
        .left
          width: .5rem
          height: .5rem
          margin: 1rem auto
          margin-left: .2rem
          margin-right: .2rem
          background: url(unchecked.png) 0 0 no-repeat;
          background-size: 100% 100%;
          float:left
          &.checked
            background: url(checked.png) 0 0 no-repeat;
            background-size: 100% 100%;
          input 
            position: absolute
            width: 4.5rem
            height: .4rem
            height: 2.5rem
            opacity: 0
            z-index: 10
            top: 0
            left: 0
        .right
          width: 2rem
          height: 2.5rem
          box-sizing: border-box
          float:left
          img 
            display:block
            width: 1.8rem
            height: 1.8rem
            margin: .3rem auto
        .detail
          width: 4.2rem
          height: 2rem
          margin: .25rem 0
          margin-left: .3rem  
          float:left
          .foodname
            font-size: .36rem
            color: #333333
            margin-top: .4rem
            height: .45rem
            width: 90%
            margin-bottom:.2rem
          .price
            width: 1.6rem
            font-size: .36rem
            color: #00abeb 
            margin-top:.6rem
        .cartcontrol
          position:absolute
          bottom:.3rem
          right:.3rem    
    .balance
      width: 100%
      height: 1.16rem
      background: #f8f8f8
      position: absolute
      left: 0;
      bottom: 0;
      border: .01rem solid rgba(255, 255, 255, .2)
      // box-sizing: border-box
      overflow: hidden
      z-index: 60;
      line-height:100%
      span
        display: block
        float: left
      .ba_checked
        width: .5rem
        height: .5rem
        background:url(unchecked.png) 0 0 no-repeat
        background-size: 100% 100%;
        margin: .38rem .2rem .38rem .2rem
        &.checked
          background:url(checked.png) 0 0 no-repeat
          background-size: 100% 100%
      .qx
        font-size: .32rem
        color: #333
        margin: .45rem .2rem .44rem 0
      .total_money
        font-size: .36rem
        color:#00abeb
        width: 2.5rem
        margin-top: .45rem
      .delete
        font-size: .3rem
        margin-top: .18rem
        height: .8rem
        line-height: .8rem
        width: 1.3rem
        text-align: center
        background: #aaa
        color: #fff
        border-radius: .1rem
      .settle
        width: 1.3rem
        height: .8rem
        line-height: .8rem
        text-align: center
        font-size: .3rem
        color: #fff
        margin-left: .2rem
        background: #00abeb
        margin-top: .18rem
        border-radius: .1rem
    .kong
      position:absolute
      width:4.2rem
      height:3.5rem
      top:0
      left:0
      right:0
      bottom:0
      margin:auto
      &.fade-enter-active
        transition:opacity .5s 1s
      &.fade-enter 
        opacity :0
      img 
        width:100%
        height:100%
      p
        text-align:center  
</style>
<style>
.invalid-order {
  margin-top: .4rem;
}

.invalid-head {
  width: 100%;
  height: .9rem;
  line-height: .9rem;
  background: #fff;
  border-bottom: .01rem solid #f8f8f8;
}

.invalid-head span {
  display: block;
  font-size: .3rem;
}

.invalid-head span:nth-child(1) {
  float: left;
  margin-left: .17rem;
  color: #000;
}

.invalid-head span:nth-child(2) {
  float: right;
  margin-right: .4rem;
  color: #00abeb;
}

.todaycart .today .invalid-order .list .left {
  width: .5rem;
  height: .5rem;
  margin: 1rem auto;
  margin-left: .2rem;
  margin-right: .2rem;
  background: url(choose-ali.png) 0 0 no-repeat;
  background-size: 100% 100%;
  float: left;
}
</style>

