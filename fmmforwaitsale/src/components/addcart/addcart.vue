<template>
  <div class="add-cart">
    <button v-if="food.IsZero==1&&food.ForSale!=1" class="btns done" :disabled="1">售罄</button>
    <button v-if="food.ForSale==1" class="btns done" :disabled="1">待售</button>
    <button class="btns" ref="ball" v-on:click.stop.prevent="addToCart(food.FoodId,food.MachineId)" v-if="food.Store>0&&food.ForSale!=1">加入购物车</button>
    <!--<transition name="fade">
                <div class="pop" v-show="show">{{foodState}}</div>
              </transition>-->

  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import context from '../../main.js'
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
const ERR_OK = 1
const ERR_NO = 0

export default {
  data() {
    return {
      foodState: '',
      show: false,
      logshow: false
    }
  },
  props: ['food',],
  methods: {

    addToCart(foodid, macineid) {
      let userid = localStorage.getItem('UserId');
      if (!userid || userid == null) {
        this.logshow = true;
        router.push('login')
        // this.$emit('loginshow',this.logshow)
        return
      }
      let _this = this
      this.show = true
      // console.log(this.food)
      let url = context + 'FoodIntoCart';

      let data = {
        UserId: userid,
        MachineId: macineid,
        FoodId: foodid,
        Type: 1,
        Num: 1
      }
      this.$http.post(url, data).then((response) => {
        let inCartTime = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
        response = response.body;
        let errnum = response.Code
        if (errnum == ERR_OK) {
          bus.$emit('addCartNum', true);   
          // this.foodState = '加入购物车成功'
          // _this.show = false
          // setTimeout(function() {
          //   _this.show = false
          // }, 600)
          zhuge.track('今日购-加入购物车', {
            '来源': '今日购',
            '商品名称': _this.food.Name,
            '商品sku': foodid,
            '日期': inCartTime
          })
          Toast({
            message: '加入购物车成功',
            position: 'middle',
            duration: 600
          });
        } else if (errnum == ERR_NO) {
          // this.foodState = '库存不足，加入购物车成功失败'
          // _this.show = false
          // setTimeout(function() {
          //   _this.show = false
          // }, 600)
          zhuge.track('点击加入购物车失败', {
            '来源': '今日购',
            '商品名称': _this.food.Name,
            '商品sku': foodid,
            '日期': inCartTime,
            '失败原因': response.Msg

          })
          Toast({
            message: '库存不足，加入购物车失败',
            position: 'middle',
            duration: 600
          });
        }
      })

    }
  },
  components: {

  }
}
</script>
<style lang="stylus">
.add-cart
  width:100%
  height:100%
  .btns
    display: block;
    width: 100%;
    height: 100%;
    background: #00abeb;
    color: #fff;
    font-size: .28rem;
    margin-top:0
    border-radius :0
    &.done
      background:rgb(153,153,153)
// .pop
//   position:fixed
//   left:0
//   right:0
//   top:0
//   bottom:0
//   color:#fff
//   margin:auto
//   width:5.5rem
//   height:.8rem
//   line-height :.8rem
//   font-size :.3rem
//   border-radius :.12rem
//   background:rgba(0,0,0,.4)
//   opacity :0
//   text-align:center
//   z-index:100
//   &.fade-enter-active,&.fade-leave-active
//     transition: all .8s
//   &.fade-enter,&.fade-leave
//     opacity :1 

</style>

