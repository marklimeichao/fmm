<template>
  <div class="footbar">
    <router-link to="/home" class="buytoday">
      <div>
        <span>今日购</span>
      </div>
    </router-link>
    <router-link to="/mealtaken" class="mealtaken">
      <div>
        <span>订单</span>
        <span class="redkong" v-show="orderShow"></span>
      </div>
    </router-link>
    <router-link to="/cart" class="cart">
      <div>
        <span>购物车</span>
        <span class="redkong" v-show="cartShow"></span>
      </div>
    </router-link>
    <router-link to="/reserve" class="reserve">
      <div>
        <span>预定</span>
      </div>
    </router-link>
  </div>
</template>
<script>
import context from '../../main.js'
import bus from '../../assets/js/eventbus.js'
let userid = localStorage.getItem('UserId')
let machineid = localStorage.getItem('MachineId')
export default {
  data() {
    return {
      orderShow: false,
      cartShow: false,
      cartT: true,
      cartY: true
    }
  },
  methods: {
    getCart: function() {
      let url = context + 'CartList'
      let data = {
        UserId: userid,
        MachineId: machineid,
        Type: 1,
        BuyType: 1
      }
      let yddata = {
        UserId: userid,
        MachineId: machineid,
        Type: 1,
        BuyType: 2
      }
      this.$http.post(url, data).then((res) => {
        res = res.body;
        let foods = res.Data.FoodList
        if (foods.length > 0) {
          this.cartShow = true
        } else {
          this.cartT = false
        }
      })
      this.$http.post(url, data).then((res) => {
        res = res.body;
        let foods = res.Data.FoodList
        if (foods.length > 0) {
          this.cartShow = true
        } else {
          this.cartY = false
        }
      })
    },
    getMeal: function() {
      let url = context + 'NewNotTakeOrder';
      let data = { UserId: userid };
      this.$http.post(url, data).then((res) => {
        res = res.body;
        let lists = res.Data.length;
        // console.log(lists)
        if (lists > 0) {
          this.orderShow = true
        }
      })
    }
  },
  computed: {

  },
  created() {

    this.getCart();
    this.getMeal();
    bus.$on('addCartNum', data => {
      this.cartShow = true
      this.cartT = true
    });
    bus.$on('addYdCartNum', data => {
      this.cartShow = true
      this.cartY = true
    });
    bus.$on('deAddCart', data => {
      this.cartShow = true
      if (data > 0) {
        this.cartY = true
      } else {
        this.cartT = true
      }
    });
    bus.$on('toadyCart', data => {
      this.cartT = false;
      if (this.cartT == false && this.cartY == false) {
        this.cartShow = false
      }
    });
    bus.$on('ydCart', data => {
      this.cartY = false;
      if (this.cartT == false && this.cartY == false) {
        this.cartShow = false
      }
    });
    bus.$on('deCart', data => {

      this.cartT = false

      if (this.cartT == false && this.cartY == false) {
        this.cartShow = false
      }

    })
    bus.$on('deYdCart', data => {

      this.cartY = false

      if (this.cartT == false && this.cartY == false) {
        this.cartShow = false
      };

    })
    // bus.$on('getOrderInfo',data=>{
    //   this.orderShow = data
    // })


  },

}
</script>
<style>
.footbar .redkong {
  position: absolute;
  display: block;
  width: .14rem;
  height: .14rem;
  border-radius: 50%;
  right: 30%;
  top: 0;
  background: red;
  margin: 0;
}
</style>

<style lang="stylus">
.footbar
  position:absolute
  bottom:0
  // left:.75rem
  width:100%
  display:flex
  height:.98rem
  background:#f8f8f8
  &>a
    flex:1
    text-align:center
    background-position :center .04rem
    background-repeat:no-repeat
    background-size:.54rem .48rem
    &>div
      height:100%
      overflow:hidden
      position:relative
      &>span
        display:block
        margin-top:.56rem
    &.active
      color:#00abeb
    &.buytoday
      background-image :url(food_invalid.png)
      &.active
        background-image:url(food_valid.png)
        -webkit-animation :bounce .2s linear
    &.mealtaken
      background-image :url(meal_invalid.png)
      &.active
        background-image:url(meal_valid.png)
        -webkit-animation :bounce .2s linear
    &.cart
      background-image :url(cart_invalid.png)
      &.active
        background-image :url(cart_valid.png)
        -webkit-animation :bounce .2s linear
    &.reserve
      background-image :url(reserve_invalid.png)
      &.active
        background-image:url(reserve_valid.png)
        -webkit-animation :bounce .2s linear
</style>
<style>
@keyframes bounce {
  from {
    transform: scale(0.8)
  }
  to {
    transform: scale(1)
  }
}
</style>
