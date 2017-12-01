<template>
  <div class="mycoupon">
    <div class="list" v-for="item in coulist">
      <label class="lists">
        <div class="fmm_list  list_right">
          <div class="fmm_card">
            <p>{{item.Name}}</p>
            <p class="if_use">可以使用</p>
          </div>
          <div class="fmm_mon">￥
            <span>{{item.Price}}</span>
          </div>
          <div class="fmm_info">
            <p>有效期至
              <span>{{item.EndTime}}</span>
            </p>
            <p>一个订单仅限使用一张优惠券，优惠券一经使用不能返还</p>
          </div>
        </div>
      </label>
    </div>
    <div class="kong" v-if="coulist.length==0">
      <img src="./nocoupons.png" alt="">
    </div>
  </div>
</template>
<script>
import context from '../../main.js'
import { Indicator } from 'mint-ui';
var userid = localStorage.getItem('UserId')
export default {

  data() {
    return {
      coulist: [],
    }
  },
  methods: {
    getCouponLists: function() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let userid=localStorage.getItem('UserId');
      let url = context + 'CouponsList';
      let data = {
        UserId: userid,
        UseStatus: 1
      }
      this.$http.post(url, data).then((res) => {
        res = res.body;
        this.coulist = res.Data;
        Indicator.close()
      })
    }
  },
  created() {
    this.getCouponLists()
  },
}
</script>
<style>
.mycoupon{
  padding-bottom:1.2rem;
}
.mycoupon .list {
  width: 7.5rem;
  height: 3.45rem;
  margin-top: .25rem;
  margin-bottom: .16rem;
  position: relative;
}

.mycoupon .lists {
  width: 7.5rem;
  height: 3.45rem;
  position: relative;
  overflow: hidden;
}

.mycoupon .list_right {
  position: absolute;
  width: 6.25rem;
  height: 3.45rem;
  top: 0;
  left: .625rem;
  background: url(./coupon_valid.png) 0 0 no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}

.mycoupon .fmm_card {
  width: 4rem;
  height: .8rem;
  float: left;
  margin-top: .45rem;
  margin-left: .35rem;
}

.mycoupon .fmm_card p:nth-child(1) {
  font-size: .32rem;
  color: #fff;
  height: .5rem;
  width: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mycoupon .fmm_card p:nth-child(2) {
  font-size: .24rem;
  color: #fff;
}

.mycoupon .fmm_mon {
  /* width: 1.1rem; */
  height: .5rem;
  font-size: .6rem;
  color: #fff;
  float: right;
  margin-top: .5rem;
  margin-right: .35rem;
}

.mycoupon .fmm_info {
  width: 5rem;
  margin-top: 2.1rem;
  margin-left: .25rem;
}

.mycoupon .fmm_info p:nth-child(1) {
  font-size: .24rem;
  color: #666;
  margin-bottom: .18rem;
}

.mycoupon .fmm_info p:nth-child(2) {
  font-size: .2rem;
  color: #666;
}

.mycoupon .kong {
  width: 1.79rem;
  height: 1.86rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.mycoupon .kong img {
  width: 100%;
  height: 100%;
}
</style>
