<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.Num>0" @click.stop.prevent="decreaseCart($event)">

    </div>
    <div class="cart-count" v-show="food.Num>0">{{food.Num}}</div>
    <div class="cart-add " @click.stop.prevent="addCart($event)"></div>
    <!--<transition name="fade">
          <div class="pop" v-if="show">{{poptext}}</div>
        </transition>-->

      </div>
</template>
<script>
import Vue from 'vue'
import context from '../../main.js'
import { Toast } from 'mint-ui';
import bus from '../../assets/js/eventbus.js'
const ERR_OK = 1
const ERR_NO = 0
var userid = localStorage.getItem('UserId')
export default {
  props: {
    food: {
      type: Object
    },
    checkfoods: {
      type: Array
    },
    foodlist: {
      type: Array
    },
    totalFoods:{
      type:Array
    }

  },
  data() {
    return {
      poptext: '修改购物车成功',
      show: false,

    }
  },
  created() {
    // console.log(userid)
  },
  methods: {
    addCart(event) {
      let url = context + 'ChangeFoodNum'
      let userid = localStorage.getItem('UserId')
      let _this = this
      _this.show = true
      this.$emit('add', this.food.Num)
      let data = {
        UserId: userid,
        MachineId: localStorage.getItem('MachineId'),
        Type: 1,
        BuyType: 2,
        FoodId: this.food.FoodId,
        ChangeNum: 1,
        Zhou: this.food.Days
      }
      this.$http.post(url, data).then((response) => {
        response = response.body
        let errnum = response.Code
        let msg = response.Msg
        if (errnum == ERR_OK) {
          Toast({
            message: msg,
            position: 'middle',
            duration: 500
          });
          // this.poptext = msg
          this.food.Num++
          // _this.show = false
        } else {
          Toast({
            message: msg,
            position: 'middle',
            duration: 500
          });
          // this.poptext = msg
          // _this.show = false
        }

      })
    },
    decreaseCart(event) {
      let url = context + 'ChangeFoodNum'
      let _this = this
      _this.show = true
      let userid = localStorage.getItem('UserId')
      this.$emit('dec', this.food.Num);
      let data = {
        UserId: userid,
        MachineId: localStorage.getItem('MachineId'),
        Type: 1,
        BuyType: 2,
        FoodId: this.food.FoodId,
        ChangeNum: -1,
        Zhou: this.food.Days
      }
      this.$http.post(url, data).then((response) => {
        response = response.body
        let errnum = response.Code
        let msg = response.Msg
        if (errnum == ERR_OK) {
          // this.poptext = msg
          this.food.Num--
          // _this.show = false
          Toast({
            message: msg,
            position: 'middle',
            duration: 500
          });
          if (this.food.Num == 0) {
            _this.removeByValue(_this.checkfoods, _this.food.CartId)
            _this.removeByValue(_this.totalFoods, _this.food.CartId)
            _this.removeByValue(_this.foodlist, _this.food)
            _this.getCartInfo()
          }
        } else {

          // this.poptext = msg
          // _this.show = false
          Toast({
            message: msg,
            position: 'middle',
            duration: 500
          });

        }
      })
    },
     getCartInfo: function() {
      let userid = localStorage.getItem('UserId');
      let machineid = localStorage.getItem('MachineId');
      let data = {
        UserId: userid,
        MachineId: machineid,
        Type:1,
        BuyType:2
      };
      let url = context + 'CarListNum';
      this.$http.post(url, data).then((res) => {
        res = res.body;
       if(res.Data.carCount==0){
         bus.$emit('deYdCart', false)
       }
      })
    },
    removeByValue: function(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break
        }
      }
    }

  },

}
</script>
<style lang="stylus">
.cartcontrol
  width:2.4rem
  height:.5rem
  div
    float:left
  .cart-decrease
    width:.5rem
    height:.5rem
    background:url(minus.png) 0 0 no-repeat
    background-size:100% 100%
  .cart-count
    width:1.4rem
    height:.5rem
    line-height:.5rem
    font-size:.36rem
    text-align:center
  .cart-add
    width:.5rem
    height:.5rem
    background:url(plus.png) 0 0 no-repeat
    background-size:100% 100%  
  .pop
    position:fixed
    top:0
    left:0
    bottom:0
    right:0
    margin:auto
    color:#fff
    width:5.5rem
    height:.8rem
    line-height :.8rem
    font-size :.3rem
    border-radius :.12rem
    background:rgba(0,0,0,.4)
    opacity :0
    text-align:center
    &.fade-enter-active,&.fade-leave-active
      transition: all .8s
    &.fade-enter,&.fade-leave
      opacity :1 


</style>
