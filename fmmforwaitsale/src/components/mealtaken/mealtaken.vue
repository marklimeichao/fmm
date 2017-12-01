<template>
  <div class="mealtaken" id="mealtaken">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <div v-if="notTakeOrder.length>0">
          <div v-for="item in notTakeOrder ">
            <div class="meal-list" v-for="list in item.FoodList">
              <div class="list-top clear">
                <p class="meal-name">美饭名称:
                  <span>{{list.FoodName}}</span>
                </p>
                <p class="meal-mac">取餐终端机地址:
                  <span>{{list.KeyWord}}</span>
                </p>
                <p class="meal-add">{{list.Location}}</p>
              </div>
              <div class="list-bottom">
                <p class="meal-code">订单编号:
                  <span>{{list.No}}</span>
                </p>
                <p class="meal-time">下单时间:
                  <span>{{list.OrderTime}}</span>
                </p>
                <p class="meal-num">美饭数量:
                  <span>{{list.Num}}</span>
                </p>
                <p class="meal-qr">取餐码:
                  <span>{{list.FoodCode}}</span>
                </p>
                <div class="img-border"> <img class="qr-img" :src="list.CodeUrl" alt="" style="display: block;"></div>
                <p class="qr-use">请用饭饱宝扫描二维码</p>
                <p class="take-time">取餐日期:
                  <span>{{list.TakeTime}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="no_list" v-else>
          <img src="./kong.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div v-if="NewNotTakeYdOrder.length>0">
          <div v-for="item in NewNotTakeYdOrder">
            <div class="meal-list meal-yd-list" v-for="list in item.FoodList">
              <div class="list-top clear">
                <p class="meal-name">美饭名称:
                  <span>{{list.FoodName}}</span>
                </p>
                <p class="meal-mac">取餐终端机地址:
                  <span>{{list.KeyWord}}</span>
                </p>
                <p class="meal-add">{{list.Location}}</p>
              </div>
              <div class="list-bottom list-yd-bottom">
                <p class="meal-code">订单编号:
                  <span>{{list.No}}</span>
                </p>
                <p class="meal-time">下单时间:
                  <span>{{list.OrderTime}}</span>
                </p>
                <p class="meal-num">美饭数量:
                  <span>{{list.Num}}</span>
                </p>
                <p class="take-time yd-take-time">取餐日期:
                  <span>{{list.TakeTime}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="no_list" v-else>
          <img src="./kong.png" alt="">
        </div>
        <!--<button @click.prevent.stop="clearrest">清除缓存</button>-->
      </swiper-slide>
      <swiper-slide>
        <!--<div class="pendpay">this is why</div>-->
        <div v-if="waitPayOrder.length>0">
          <transition name="fade" tag="div" v-for="item in waitPayOrder" class="meal_wait">

            <!--<div class="meal_wait">-->
            <div class="payoff clear" v-if="item.LastTime>0">
              <div class="order_nums">订单编号:
                <span class="or_num">{{item.OrderNo}}</span>
              </div>
              <div class="po_outer clear" v-for="list in item.FoodList">
                <div class="po_img"> <img :src="list.ListImg" alt=""></div>
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
              <div class="po_bot clear ">
                <p class="lasttime">剩余支付时间：
                  <span class="pay_deadline">
                    <countdown :createTime="item.CreateTime" :item="item" :waitOrder="waitPayOrder"></countdown>
                  </span>
                </p>

                <button class="po_pay" @click="toPay(item)">付款</button>
                <button class="po_cancel" @click="cancelOrder(item)">取消订单</button>
              </div>
              <!--</div>-->
            </div>
          </transition>
        </div>
        <div class="no_list" v-if="waitPayOrder.length==0||pendshow">
          <img src="./kong.png" alt="">
        </div>
      </swiper-slide>
      <swiper-slide>
        <div v-if="comOrder.length>0">
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
      </swiper-slide>
      <swiper-slide>
        <div v-if="invalidOrder.length>0">
          <div class="payoff clear" v-for="item in invalidOrder">
            <div class="order_nums">订单编号:
              <span class="or_num">{{item.OrderNo}}</span>
            </div>
            <div class="po_outer clear" v-for="list in item.FoodList">

              <div class="po_img">
                <div class="mask_invalid"></div>
                <img :src="list.ListImg"></div>
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
      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination">

      </div>
      <!--<div class="swiper-scrollbar" slot="scrollbar"></div>-->
    </swiper>

  </div>
</template>
<script>
// import BScroll from 'better-scroll'
import Vue from 'vue'
import context from '../../main.js'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import countdown from '../countdown/countdown.vue'
import { MessageBox } from 'mint-ui';
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
var userid = localStorage.getItem('UserId');
export default {
  data() {
    return {
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: false,

        // effect: "coverflow",
        grabCursor: true,
        setWrapperSize: true,

        pagination: '.swiper-pagination',
        paginationClickable: true,

        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        // onTransitionStart(swiper){
        //   console.log(swiper)
        // },
        // more Swiper configs and callbacks...
        // ...
      },
      notTakeOrder: [],
      NewNotTakeYdOrder: [],
      waitPayOrder: [],
      invalidOrder: [],
      comOrder: [],
      show: [],
      nocancel: true,
      pendshow: false
    }
  },
  components: {
    swiper,
    swiperSlide,
    countdown
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    waitPayOrders() {
      return this.waitPayOrder
    }

  },
  created() {
    let userid = localStorage.getItem('UserId');
    this.getNotTakeOrder();
    this.getNotTakeYdOrder();
    this.getWaitPayOrder();
    this.getComOrder();
    this.getInvalidOrder();

    if (!userid) {
      router.push('login');
      return
    }

  },
  updated() {
    let paginationBullet = document.querySelectorAll('.swiper-pagination-bullet');
    let bulletLists = ['待取餐', '预订单', '待支付', '已完成', '已失效'];
    for (let i = 0; i < paginationBullet.length; i++) {
      paginationBullet[i].textContent = bulletLists[i]
    };
  },
  mounted() {


    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)

    // console.log(paginationBullet.length)
  },
  methods: {
    getNotTakeOrder: function() {
      let url = context + 'NewNotTakeOrder';
      let data = { UserId: userid };
      let _this = this;
      this.$http.post(url, data).then((response) => {
        response = response.body
        this.notTakeOrder = response.Data;
        if (response.Data.length == 0) {
          bus.$emit('getOrderInfo', false)
        }
        // console.log(this.notTakeOrder.length)
      })
    },
    getNotTakeYdOrder: function() {
      let url = context + 'NotTakeYdOrder';
      let data = { UserId: userid }
      this.$http.post(url, data).then((response) => {
        response = response.body
        this.NewNotTakeYdOrder = response.Data
        // console.log(response)
      })
    },
    getWaitPayOrder: function() {
      let url = context + 'LookOrder';
      let _this = this;
      let data = { UserId: userid, Type: 1 }
      this.$http.post(url, data).then((response) => {
        response = response.body
        // this.waitPayOrder = response.Data;
        let orderWaitLists = response.Data;
        let orderForWait = [];
        // console.log(orderWaitLists);
        if (orderWaitLists.length > 0) {
          orderWaitLists.forEach((item) => {
            // if(item.showstatus==1){
            _this.waitPayOrder.push(item);
            orderForWait.push(item)
            // }
          });
        }
        // Vue.set(this.waitPayOrder, 'showstatus', 1);
        // console.log(this.waitPayOrder)
        // let ifShow=[];
        orderForWait.forEach((list) => {
          Vue.set(list, 'LastTime', 1)
          // Vue.set(list, 'showstatus', 1)
          // console.log('more')
        })

        // this.show=ifShow;
        //  console.log(this.show)
        // console.log(this.waitPayOrder)
      })
    },
    getComOrder: function() {
      let url = context + 'LookOrder';
      let data = {
        UserId: userid,
        Type: 2
      };
      this.$http.post(url, data).then((res) => {
        res = res.body;
        this.comOrder = res.Data
      })
    },
    getInvalidOrder: function() {
      let url = context + 'LookOrder';
      let data = {
        UserId: userid,
        Type: 3
      };
      this.$http.post(url, data).then((res) => {
        res = res.body;
        this.invalidOrder = res.Data
        // console.log( this.invalidOrder.length)
      })
    },
    cancelOrder: function(item) {
      let _this = this;
      MessageBox({
        title: '提示',
        message: '确定执行此操作?',
        showCancelButton: true
      });
      let url = context + 'CancelOrder';
      let data = {
        UserId: userid,
        Type: item.OrderType,
        OrderId: item.OrderId
      };
      // MessageBox.confirm(message, title);
      MessageBox.confirm('确定删除此订单?', '').then(action => {
        _this.$http.post(url, data).then((res) => {
          res = res.body;
          if (res.Code == 1) {
            item.showstatus = 0;
            _this.removeByValue(_this.waitPayOrder, item);
            // console.log(_this.waitPayOrder)

          };
          if (_this.waitPayOrder.length == 0) {
            _this.pendshow = true;
          }
        })
      });

    },
    toPay: function(item) {
      if (item.PayType == 1) {
        window.location.href = context + '/weixin/wxpay!toPay.do?orderNum=' + item.OrderNo;
      } else if (item.PayType == 5) {
        console.log('ebank')
        window.location.href = context + "cebbank/login.html?orderNum=" + item.OrderNo + "&&type=" + item.OrderType;
      }
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
.mealtaken
  .swiper-container
    width:100%
    height:100%
    overflow:hidden
    // margin-bottom:1.2rem
    .swiper-slide
      width:100%
      height:100%

</style>
<style>
#mealtaken {
  background: #f8f8f8;
}

#mealtaken .swiper-pagination {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  overflow: hidden;
  z-index: 60;
  background: #f8f8f8;
}

#mealtaken .swiper-pagination-bullet {
  flex: 1;
  color: #000;
  text-align: center;
  height: 1rem;

  border-radius: 0;
  margin: 0;
}

#mealtaken .swiper-pagination-bullet {
  background: #f8f8f8;
  opacity: .6;
  box-sizing: border-box;
}

#mealtaken .swiper-pagination-bullet-active {
  opacity: 1;
  background: #f8f8f8;
  color: #00abeb;
  border-bottom: 1px solid #00abeb;
}

#mealtaken .swiper-slide {
  /*top: 1rem;*/
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

#mealtaken .swiper-wrapper {
  position: relative;
  width: 100%;
  height: 83%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  top: 1rem;
}



















/*待取餐样式*/

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





/*已失效订单样式*/

.mask_invalid {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.7rem;
  height: 1.7rem;
  background: rgba(0, 0, 0, .4);
}
</style>
