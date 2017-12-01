<template>
  <div class="comp_order" ref="compwrapper">

    <div class="comOrder" v-if="comOrder.length>0" >
      <!--v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"-->
      <div class="payoff clear" v-for="item in comOrder">
        <div class="order_nums">订单编号:
          <span class="or_num">{{item.OrderNo}}</span>
        </div>
        <div class="po_outer clear" v-for="list in item.FoodList">
          <div class="po_img"> <img :src="list.ListImg"></div>
          <div class="po_info ">
            <p class="po_name">{{list.FoodName}}</p>
            <p class="po_mon">x
              <span class="po_num">{{list.Num}}</span>
            </p>
            <p class="po_tot">￥
              <span>{{list.Price}}</span>
            </p>
          </div>
        </div>
        <div class="total">
          <span>共{{item.TotalNum}}份</span>
          <span> 合计:￥{{item.TotalPrice}}</span>
          <span>(含优惠￥{{item.CouponsPrice}})</span>
        </div>
      </div>
    </div>
    <div class="no_list" v-else>
      <img src="./kong.png" alt="">
    </div>
  </div>
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import Vue from 'vue'
import context from '../../main.js'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import BScroll from 'better-scroll'
Vue.use(InfiniteScroll);
export default {
  data() {
    return {
      comOrder: [],
      n: 1,
      ifscroll: true
    }
  },
  // loadMore() {
  //   this.loading = true;
  //   let n = 1;
  //   this.getComOrder();

  // },
  methods: {
    getComOrders: function() {
      
      let userid = localStorage.getItem('UserId');
      let url = context + 'LookOrder';
      let Page = "{" + "PageNo:"+this.n+',' + "Size:10" + "}"
      //  n++
      let data = {
        UserId: userid,
        Type: 2,
        // Page: {
        //   "PageNo": 1,
        //   "Size": 3
        // }
        Page: Page
      };
      let _this=this;
      if (this.ifscroll) {
        Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
        // _this.loading = true;
        this.$http.post(url, data).then((res) => {
          Indicator.close();
          res = res.body;
          // this.invalidOrder = res.Data;
          if (res.Data.length > 0) {
            _this.n++;
            // console.log(_this.n)
            res.Data.forEach((item) => {
              _this.comOrder.push(item)
            })
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.compwrapper, {
                  click: true,
                  // preventDefault:false

                })
                this.scroll.on('touchEnd', (pos) => {
                  // 下拉动作
                  let invalidorder = document.querySelector('.comOrder').offsetHeight;
                  let inorder = document.querySelector('.comp_order').offsetHeight;
                  // console.log(invalidorder)
                  // console.log(pos.y)
                  if (Math.abs(pos.y) - invalidorder + inorder > 50) {

                    this.getComOrders()
                  }
                })
              } else {
                this.scroll.refresh()
              }
            })

            // _this.loading = false;
          } else {
            _this.ifscroll = false;
            Toast({
              message: '没有更多数据',
              position: 'middle',
              duration: 600
            });
            // _this.loading = true;
          }
          // this.$nextTick(() => {
          //   this.scroll = new BScroll(this.$refs.invalidwrapper, {
          //     click: true,
          //      preventDefault:false
          //   })
          // })
          // this.$nextTick(() => {
          //   // if (!this.scroll) {
          //   this.scroll = new BScroll(this.$refs.invalidwrapper, {})
          //   this.scroll.on('touchend', (pos) => {
          //     // 下拉动作
          //     if (pos.y > 50) {
          //       console.log(pos.y)
          //       this.loadMore()
          //     }
          //   })
          //   // } else {
          //   //   this.scroll.refresh()
          //   // }
          // })

        })
      }
      // this.$http.post(url, data).then((res) => {
      //   Indicator.close();
      //   res = res.body;
      //   this.comOrder = res.Data
      //   this.$nextTick(() => {
      //     this.scroll = new BScroll(this.$refs.compwrapper, {
      //       click: true
      //     })
      //   })
      // })
    },
    loadMore: function() {


      let _this = this;
      _this.loading = true;

      console.log(_this.n)
      function getComOrder() {
        _this.n++

        if (_this.scroll) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });

          let userid = localStorage.getItem('UserId');
          let url = context + 'LookOrder';
          let page = "{" + "PageNo:" + _this.n + "," + "Size:10" + "}";

          let data = {
            UserId: userid,
            Type: 2,
            Page: page
          };
          _this.$http.post(url, data).then((res) => {
            res = res.body;
            Indicator.close();
            if (res.Data.length > 0) {

              res.Data.forEach((item) => {
                _this.comOrder.push(item)
              })
              this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.compwrapper, {
                  click: true
                })
              })
              _this.loading = false;
            } else {
              _this.scroll = false;
              Toast({
                message: '没有更多数据',
                position: 'middle',
                duration: 600
              });
              _this.loading = true;
            }

          })
        }

      };
      // setTimeout(function() {
      getComOrder();
      //   console.log(_this.n)
      // }, 2500)

      // console.log(n)
    },

  },
  created() {
    this.getComOrders()
  }
}
</script>
<style>
.comOrder {
  width: 100%;
  /*height: 100%;
  overflow: hidden;
  overflow-y: auto;*/
  -webkit-overflow-scrolling: touch;
}

.meal-list {
  width: 6.9rem;
  margin: 0 auto;
  font-size: .28rem;
  color: #333;
  margin-bottom: .5rem;
  /*padding-bottom: 1.1rem;*/
}

.meal-name {
  margin-top: .4rem;
  margin-bottom: .1rem;
  font-size: .4rem;
}

.list-top {
  width: 100%;
  height: 2rem;
  background: #fff;
  overflow: hidden;
}

.meal-list p {
  margin-left: .5rem;
  width: 6.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meal-list p {
  margin-left: .5rem;
  width: 6.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-top .meal-add {
  font-size: .24rem;
  color: #666;
}

.list-bottom {
  width: 100%;
  height: 6.96rem;
  background: #fff;
  margin-top: .04rem;
  overflow: hidden;
}

.list-bottom .meal-code {
  margin-top: .2rem;
}

.list-bottom p {
  margin-top: .05rem;
}

.list-bottom .meal-qr {
  font-size: .38rem;
  color: #e64f30;
}

.img-border {
  width: 3.5rem;
  height: 3.5rem;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  margin: .1rem auto .12rem;
  /*background: url(../images/no_qr2.png) 0 0 no-repeat;*/
  background-size: 100% 100%;
}

.qr-img {
  /* display: block; */
  position: absolute;
  width: 3.54rem;
  height: 3.54rem;
  /* margin: .1rem auto .12rem; */
  border: none;
  left: -.02rem;
  top: -.02rem;
}

.no_list {
  width: 3.23rem;
  height: 3.03rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.no_list img {
  width: 100%;
  height: 100%;
}































/*预订单样式*/

.meal-yd-list {
  height: 5rem;
}

.list-yd-bottom {
  height: 3rem;
}

.list-bottom .meal-code {
  margin-top: .2rem;
}

.list-bottom .yd-take-time {
  color: #e64f30;
  font-size: .38rem;
  text-align: left;
  margin-left: .5rem;
}




























/*待支付样式*/

.payoff {
  width: 7rem;
  height: auto;
  box-sizing: border-box;
  background: #fff;
  border-radius: .14rem;
  margin: 0 auto;
  margin-bottom: .2rem;
  overflow: hidden;
}

.order_nums {
  margin-top: .2rem;
  margin-bottom: .1rem;
  margin-left: .25rem;
}

.po_outer {
  width: 7rem;
  height: 2rem;
}

.po_img {
  position: relative;
}

.po_img {
  width: 1.7rem;
  height: 1.7rem;
  /* background: cyan; */
  float: left;
  margin: .25rem;
  margin-top: .2rem;
  margin-bottom: 0;
}

.po_img img {
  width: 1.7rem;
  height: 1.7rem;
}

.po_info {
  margin-top: 0rem;
  overflow: hidden;
  float: left;
}

.po_name {
  margin-top: .15rem;
  width: 4rem;
  overflow: hidden;
  height: .36rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.po_name {
  margin-top: .18rem;
  font-size: .28rem;
  color: #333;
}

.po_mon {
  font-size: .24rem;
  color: #333;
  margin-top: .25rem;
}

.po_tot {
  font-size: .24rem;
  color: #333;
  margin-top: .3rem;
}

.po_info {
  margin-top: 0rem;
  overflow: hidden;
  float: left;
}

.total {
  width: 7rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: .2rem;
  height: .4rem;
}

.po_bot {
  width: 7rem;
  margin-top: .1rem;
  margin-bottom: .1rem;
}

.po_bot p span {
  color: #ff4040;
}

.po_bot .po_cancel {
  background: #aaa;
  color: #fff;
}

.po_bot button {
  width: 1.5rem;
  display: block;
  float: right;
  height: .8rem;
  outline: none;
  border: none;
  margin-right: .3rem;
  background: #00abeb;
  border-radius: .12rem;
  color: #fff;
  font-size: .24rem;
}

.lasttime {
  float: left;
  margin-top: .4rem;
}

.fade-leave {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.fade-leave-active {
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.mint-msgbox-cancel {
  color: #000;
}

.meal_wait {}





















/*已完成订单样式*/

.order_nums {
  margin-top: .2rem;
  margin-bottom: .1rem;
  margin-left: .25rem;
}

.po_outer {
  width: 7rem;
  height: 2rem;
}

.po_img {
  position: relative;
}

.po_img {
  width: 1.7rem;
  height: 1.7rem;
  /* background: cyan; */
  float: left;
  margin: .25rem;
  margin-top: .2rem;
  margin-bottom: 0;
}

.po_img img {
  width: 1.7rem;
  height: 1.7rem;
}

.po_info {
  margin-top: 0rem;
  overflow: hidden;
  float: left;
}

.po_name {
  margin-top: .15rem;
  width: 4rem;
  overflow: hidden;
  height: .36rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.po_name {
  margin-top: .18rem;
  font-size: .28rem;
  color: #333;
}

.po_mon {
  font-size: .24rem;
  color: #333;
  margin-top: .25rem;
}

.po_tot {
  font-size: .24rem;
  color: #333;
  margin-top: .3rem;
}

.total {
  width: 7rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: .2rem;
  height: .4rem;
}
</style>


