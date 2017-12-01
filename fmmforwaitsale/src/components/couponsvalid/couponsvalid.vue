<template>
  <div class="couponsvalid">
    <div class="no_coupon">
      <div class="no_cou" @click="delieverCou" :class="{couchecked:(picked=='')}">
        <input type="radio" value="" name="fmm" v-model="picked">
      </div>
      <div class="nouse_c"> 不使用饭票</div>
    </div>
    <ul class="couwrappers">
      <li v-for="cou in coupons" class="coulist">
        <div class="couuncheck" @click="delieverCou" :class="{couforchecked:picked.couid==cou.CouponsId}">
          <input type="radio" :value="{couid:cou.CouponsId,couprice:cou.Price}" name="fmm" v-model="picked">
        </div>
        <div class="fmm_list  list_right">
          <div class="fmm_card">
            <p>{{cou.Name}}</p>
            <p>可使用</p>
          </div>
          <div class="fmm_mon">￥
            <span>{{cou.Price}}</span>
          </div>
          <div class="fmm_info">
            <p>有效期至
              <span>{{cou.EndTime}}</span>
            </p>
            <p>一个订单仅限使用一张优惠券，优惠券一经使用不能返还</p>
          </div>
        </div>
      </li>
    </ul>
    <!--{{picked}}-->
  </div>
</template>
<script>
export default {
  props: {
    coupons: {
      type: Array
    }
  },
  data() {
    return {
      picked: {}
    }
  },
  created() {

  },
  methods: {
    delieverCou: function() {
      let _this = this;
      setTimeout(function() {
        _this.$emit('getCouMes', _this.picked)
      }, 600)

    }
  }
}
</script>
<style lang="stylus">
.couponsvalid
  width:7.5rem
  height :100%
  position:fixed
  top:0
  left:0
  background:#f8f8f8
  overflow:hidden
  overflow-y:auto
  -webkit-overflow-scrolling:touch
  z-index:100
  & input 
    width:.5rem
    height:.5rem
  .no_coupon
    width: 7.5rem
    height: .9rem
    margin: .25rem auto
    font-size: .34rem
    color: #333
    position: relative
    .no_cou 
      position: absolute
      width: .5rem
      height: .5rem
      left: .25rem
      top: .2rem
      background: url(./unchecked.png)0 0 no-repeat
      background-size: 100% 100%;
      &.couchecked
        position: absolute
        width: .5rem
        height: .5rem
        left: .25rem
        top: .2rem
        background: url(./checked.png)0 0 no-repeat
        background-size: 100% 100%;
        color:#00abeb
    .nouse_c 
      width: 6.25rem
      height: .9rem
      position: absolute
      left: 1rem
      line-height: .9rem
      background: url(./no_coupon.png)0 0 no-repeat
      background-size: 100% 100%
      border-radius: .1rem
      text-indent: .35rem
  .couwrappers
    .coulist
      width: 7.5rem
      height: 3.45rem
      margin-top: .25rem
      margin-bottom: .16rem
      position: relative
      .couuncheck 
        -webkit-tap-highlight-color: rgba(0,0,0,0)
        position: absolute
        width: .5rem
        height: .5rem
        top: 1.4rem
        left: .25rem;
        background: url(./unchecked.png) 0 0 no-repeat
        background-size: 100% 100%
        z-index: 100
        &.couforchecked
          -webkit-tap-highlight-color: rgba(0,0,0,0)
          position: absolute
          width: .5rem
          height: .5rem
          top: 1.4rem
          left: .25rem;
          background: url(./checked.png) 0 0 no-repeat
          background-size: 100% 100%
          z-index: 100
      .list_right 
        position: absolute
        width: 6.25rem
        height: 3.45rem
        top: 0
        left: 1rem
        background: url(./coupon_valid.png) 0 0 no-repeat
        background-size: 100% 100%
        overflow: hidden
        .fmm_card 
          width: 4rem
          height: .8rem
          float: left
          margin-top: .45rem
          margin-left: .35rem
        .fmm_card p:nth-child(1) 
          font-size: .32rem
          color: #fff
          height: .5rem
          width: 4rem
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .fmm_card p:nth-child(2) 
          font-size: .24rem
          color: #fff
        .fmm_mon 
          /* width: 1.1rem; */
          height: .7rem
          font-size: .6rem
          color: #fff
          float: right
          margin-top: .5rem
          margin-right: .35rem
        .fmm_info 
          width: 5rem
          margin-top: 2.1rem
          margin-left: .25rem
        .fmm_info p:nth-child(1) 
          font-size: .24rem
          color: #666
          margin-bottom: .18rem
        .fmm_info p:nth-child(2) 
          font-size: .2rem
          color: #666

 

 

    

</style>
