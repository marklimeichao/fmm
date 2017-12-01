<template>
  <div class="newcouponvalid">
    <div class="no_cou" @click="sendNoCouInfo()">
      不使用优惠券
    </div>
    <div class="validcous" ref="validcou" style="width:100%;height:90%;overflow:hidden">
    <ul>
      <li class="cou_valid" v-for="(item,index) in coupons" @click="sendCouInfo(item)">
        <div class="header_cou_valid">
          <div class="left">
            <span>￥</span>
            <span>{{item.Price}}</span>
          </div>
          <div class="right">
            <span>{{item.Name}}</span>
            <span>{{item.EndTime}}到期</span>
          </div>
        </div>
        <div class="bottom_cou_valid" :class="{text_more:clickShow[index]}">
          <div class="cou_text_header" :class="{text_more_head:clickShow[index]}">{{item.StartTime}}-{{item.EndTime}} {{item.Content}}</div>
          <img src="./trigle_cou.png" alt="" class="trigle_img" :class="{trigle_more:clickShow[index]}" @click.stop.prevent="getMoreCou(index)">
        </div>
        <div class="cou_ball cou_ball_left"></div>
        <div class="cou_ball cou_ball_right"></div>
      </li>
      <div style="width:100%;height:.6rem;"></div>
    </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import BScroll from 'better-scroll'
export default {
  props: ['coupons', 'total'],
  data() {
    return {
      getMore: false,
      clickShow: []

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.validcou, {
        click: true
      })
    })
  },
  methods: {
    getMoreCou: function(index) {
      this.coupons.forEach((item, itindex) => {
        this.clickShow.push(false);
        if (index == itindex) {
          this.clickShow[index] = !this.clickShow[index]
        }
      })

    },
    sendCouInfo: function(item) {
      let _this = this;
      let price = parseFloat(item.Price);
      let total = parseFloat(_this.total)
      // console.log(total,price)
      if (price < total) {
        setTimeout(function() {
          _this.$emit('getCouMes', item)
        }, 600)
      } else {
        Toast({
          message: '所选优惠券金额必须小于商品总价',
          position: 'middle',
          duration: 500
        });
      }
    },
    sendNoCouInfo: function() {
      let _this = this;
      setTimeout(function() {
        _this.$emit('getCouMes', '')
      }, 600)
    }
  },
  created() {

    // console.log(this.coupons,this.clickShow)
  }
}
</script>
<style lang="stylus">
.newcouponvalid
  width:7.5rem
  height:100%
  position:fixed
  top:0
  left:0
  background:#f4f4f4
  overflow:hidden
  overflow-y:auto
  -webkit-overflow-scrolling :touch
  z-index:100
  .no_cou
    width:6.95rem
    height:.92rem
    background:#fff
    line-height:.92rem
    font-size:.3rem
    color:#000
    box-shadow :0px 0px 5px #ddd
    border-radius:.1rem
    margin: .2rem auto
    text-indent :.55rem
  .cou_valid
    width:6.95rem
    min-height:2.38rem
    margin:0 auto .2rem
    background:#fff
    border-radius :.12rem
    box-shadow:0 0 5px #ddd
    position:relative
    .header_cou_valid
      width:100%
      height:1.5rem
      border-bottom:1px dotted #ddd
      box-sizing :border-box
      .left
        width:50%
        float:left
        height:100%
        line-height :1.5rem
        color:#dd4343
        font-size:.34rem
        font-weight:bolder
        text-indent :.55rem
        span:nth-of-type(2)
          font-size:.6rem
      .right
        width:45%
        float:right
        height:100%
        text-align:right
        margin-right:.3rem
        span 
          display:block
          &:nth-of-type(1)
            margin-top:.5rem
            font-size:.3rem
            color:#00abeb
            font-weight:bolder
          &:nth-of-type(2)
            font-size:.2rem
            color:#000  
    .bottom_cou_valid
      width:100%
      position:relative
      font-size:.19rem 
      color:#000
      // text-indent:.55rem
      // height:.85rem
      overflow:hidden
      transition:all .4s linear
      &.text_more
        // height:1.5rem
        // overflow:hidden
        transition:all .4s linear
      .cou_text_header
        margin-top:.3rem
        width:4.9rem
        overflow:hidden
        white-space:nowrap
        text-overflow :ellipsis
        // height:.4rem
        margin-left:.55rem
        // background:#00abeb
        transition:all .4s 
       
        &.text_more_head
          // height:1.2rem
          white-space:normal
          // background:cyan
          // text-overflow :e
          // overflow:hidden
          transition:all .4s linear
      .trigle_img
        display:block
        width:.24rem
        height:.24rem
        position:absolute
        top:.3rem
        right:.35rem
        transition:all .4s linear
        &.trigle_more
          transform:rotate(180deg)
          transition:all .4s linear
    .cou_ball
      position:absolute     
      width:.36rem
      height:.36rem
      border-radius :50%
      background:#f4f4f4
      top:1.32rem
      &.cou_ball_left
        left:-.18rem  
      &.cou_ball_right
        right:-.18rem   
</style>

