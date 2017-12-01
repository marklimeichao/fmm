<template>
  <div class="addydcart">
    <button v-if="food.LastNums==0" class="done" :disabled="1">售罄</button>
    <button ref="ball" v-on:click.stop.prevent="addToCart(food.FoodId,food.MachineId)" v-if="food.LastNums>0">加入购物车</button>
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

    }
  },
  props: ['food', 'zhou'],
  created() {
    //  console.log(this.food,this.zhou)
  },
  methods: {

    addToCart(foodid, macineid) {
      let userid = localStorage.getItem('UserId');
      let machineid = localStorage.getItem('MachineId')
      let inCartTime = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
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
        MachineId: machineid,
        FoodId: foodid,
        Type: 1,
        BuyType: 2,
        Num: 1,
        Zhou: this.zhou
      }
      this.$http.post(url, data).then((response) => {
        response = response.body;
        let errnum = response.Code
        if (errnum == ERR_OK) {
          // this.foodState = '加入购物车成功'
          // _this.show = false
          // setTimeout(function() {
          //   _this.show = false
          // }, 600)
          bus.$emit('addYdCartNum',true)
          zhuge.track('预定商品列表-加入购物车', {
            '来源': '预定',
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
            '来源': '预定',
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
button
  width: 2rem
  height: .8rem
  background: #00abeb
  margin-top: .25rem
  // border-radius: .10rem
  font-size: .28rem
  color: #fff
  font-weight: 400
  &.done
    background:rgb(153,153,153)
// .pop
//   position:absolute
//   left:-4.5rem
//   right:0
//   top:-1.5rem
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
//     transition: all 1.5s
//   &.fade-enter,&.fade-leave
//     opacity :1 

</style>

