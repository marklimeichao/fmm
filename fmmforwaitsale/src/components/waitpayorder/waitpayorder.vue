<template>
  <div id="wait_order" ref="waitwrapper">
    <div v-if="waitPayOrder.length>0" class="ifWait">
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
            <button class="po_cancel" @click="deleteOrder(item,$event)">取消订单</button>
          </div>

          <!--</div>-->
        </div>

      </transition>
    </div>
    <div class="no_list" v-if="waitPayOrder.length==0||pendshow">
      <img src="./kong.png" alt="">
    </div>
    <transition name="toTop">
      <div class="payway" v-if="payShow">
        <div class="header">
          支付方式
          <span @click="toClose">
            <img src="./delete.png" alt="">
          </span>
        </div>
        <ul>
          <li class="pay_list" @click="toPay">
            <span class="pay_list_icon">
              <img src="./wx.png" alt="">
            </span>
            <span>微信支付</span>
            <span class="pay_list_next">
              <img src="./order_next.png" alt="">
            </span>
          </li>
          <li class="pay_list" @click="toPayEbank">
            <span class="pay_list_icon">
              <img src="./guangda.png" alt="">
            </span>
            <span>光大银行</span>
            <span class="pay_list_next">
              <img src="./order_next.png" alt="">
            </span>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="payfade">
      <div id="pay_mask" v-if="payShow"></div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue'
import context from '../../main.js'
import countdown from '../countdown/countdown.vue'
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      waitPayOrder: [],
      payShow: false,
      item: {},
      pendshow: false
    }
  },
  created() {

    bus.$on('ifpsyshouw', data => {
      this.payShow = data;
      bus.$emit('footChooseShow', true);
    })
    let userid = localStorage.getItem('UserId')
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.getWaitPayOrder();
  },
  methods: {
    getWaitPayOrder: function() {
      let userid = localStorage.getItem('UserId')
      let url = context + 'LookOrder';
      let _this = this;
      let data = { UserId: userid, Type: 1 }
      this.$http.post(url, data).then((response) => {
        response = response.body;

        Indicator.close();
        let orderWaitLists = response.Data;
        let orderForWait = [];
        if (orderWaitLists.length > 0) {
          orderWaitLists.forEach((item) => {
            _this.waitPayOrder.push(item);
            orderForWait.push(item)
          });
        }
        orderForWait.forEach((list) => {
          Vue.set(list, 'LastTime', 1)
        });
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.waitwrapper, {
            click: false
          })
        })
      })
    },
    deleteOrder: function(item, event) {

      if (!event._constructed) {
        return;
      }
      //  console.log('good')
      // this.scroll.refresh();

      let _this = this;
      // MessageBox({
      //   title: '提示',
      //   message: '确定执行此操作?',
      //   showCancelButton: true
      // });
      let userid = localStorage.getItem('UserId')
      let url = context + 'CancelOrder';
      let data = {
        UserId: userid,
        Type: item.OrderType,
        OrderId: item.OrderId
      };
      //  _this.$http.post(url, data).then((res) => {
      //   res = res.body;
      //   if (res.Code == 1) {
      //     item.showstatus = 0;
      //     _this.removeByValue(_this.waitPayOrder, item);
      //     // console.log(_this.waitPayOrder)

      //   };
      //   if (_this.waitPayOrder.length == 0) {
      //     _this.pendshow = true;
      //   }
      // })
      // MessageBox.confirm(message, title);
      // MessageBox.confirm('确定删除此订单?', '').then(action => {
        Indicator.open({
          text: '删除中...',
          spinnerType: 'fading-circle'
        });
      _this.$http.post(url, data).then((res) => {
        Indicator.close()
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
      // });

    },
    toPay: function(item) {
      this.item=item
      // let item = this.item;
      let userid = localStorage.getItem('UserId');
      let orderid = item.OrderId;
      let paytype = 1;
      let ordersource = item.OrderType;
      let url = context + 'ChangePayType';
      let _this = this
      let data = {
        UserId: userid,
        OrderId: orderid,
        PayType: paytype,
        OrderSource: ordersource
      };
      bus.$emit('footChooseShow', true);
      // this.$http.post(url, data).then((res) => {
      //   res = res.body;
      //   if (res.Code == 1) {
      //     _this.payShow = false;
      //     window.location.href = context + '/weixin/wxpay!toPay.do?orderNum=' + item.OrderNo;
      //   }
      //   // console.log(res)
      // })
      if (item.PayType == 1) {
        window.location.href = context + '/weixin/wxpay!toPay.do?orderNum=' + item.OrderNo;
      } else if (item.PayType == 5) {
        // console.log('ebank')
        window.location.href = context + "cebbank/login.html?orderNum=" + item.OrderNo + "&type=" + item.OrderType;
      }
    },
    toPayEbank: function() {
      let item = this.item
      let userid = localStorage.getItem('UserId');
      let orderid = item.OrderId;
      let paytype = 5;
      let ordersource = item.OrderType;
      let url = context + 'ChangePayType';
      let data = {
        UserId: userid,
        OrderId: orderid,
        PayType: paytype,
        OrderSource: ordersource
      };
      let _this = this;
      bus.$emit('footChooseShow', true);
      this.$http.post(url, data).then((res) => {
        res = res.body;
        if (res.Code == 1) {
          _this.payShow = false;
          window.location.href = context + "cebbank/login.html?orderNo=" + item.OrderNo + "&type=" + item.OrderType;
        }
        // console.log(res)
      })
      // if (item.PayType == 1) {
      //   window.location.href = context + '/weixin/wxpay!toPay.do?orderNum=' + item.OrderNo;
      // } else if (item.PayType == 5) {
      //   // console.log('ebank')
      //   window.location.href = context + "cebbank/login.html?orderNum=" + item.OrderNo + "&&type=" + item.OrderType;
      // }
    },
    removeByValue: function(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break
        }
      }
    },
    toChoosePay: function(item) {
      // this.payShow = true;
      this.item = item
      bus.$emit('footShow', false);
      // console.log(item)
    },
    toClose: function() {
      this.payShow = false;
      bus.$emit('footShow', true);
    }
  },
  components: {
    countdown: countdown
  }
}
</script>
<style>
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

#pay_mask {
  position: fixed;
  width: 100%;
  height: 100%;
  /*z-index: 10;*/
  background: rgba(0, 0, 0, 0);
  top: -1rem;
  left: 0;
  z-index: 150;
}

#pay_mask.payfade-enter,
#pay_mask.payfade-leave-to {
  opacity: .4
}

#pay_mask.payfade-enter-active,
#pay_mask.payfade-leave-active {
  transition: all .3s
}
</style>
<style lang="stylus">
#wait_order
  margin-top:1rem
  position:relative
  overflow:hidden
  // padding-bottom:1.2rem
  .ifWait
    // margin-top:1rem
    // height:83%
    // overflow:hidden
    // overflow-y:auto
    -webkit-overflow-scrolling :touch
  .payway
    position:fixed
    width:100%
    height:3rem
    background:#fff
    color:#000
    bottom:0
    z-index:200
    left:0
    &.toTop-enter
      // transform:scale(0)
      // height:0
      transform:translate3d(0,100%,0)
    &.toTop-enter-to
      // height:3rem
      transform:translate3d(0,0,0)  
    &.toTop-leave
      // height:3rem
      transform:translate3d(0,0,0)  
    &.toTop-leave-to
      // height:0
      transform:translate3d(0,100%,0)
    &.toTop-enter-active,&.toTop-leave-active
      transition :all .3s  linear   
    .header
      width:100%
      height:1rem
      box-sizing:border-box
      position:relative
      line-height:1rem
      text-align:center
      font-size:.3rem
      span
        display:block
        position:absolute
        width:.6rem
        height:.6rem
        right:.35rem
        top:.15rem
        img
          width:100%
          height:100%
          display:block
    .pay_list
      width:100%
      height:1rem
      line-height:1rem
      box-sizing:border-box
      border-top:1px solid #bbb
      font-size:.26rem 
      span 
        display:block
        float:left
      .pay_list_icon
        display:block
        width:.64rem
        height:.64rem
        margin-left:.5rem
        margin-top:.18rem
        img
          width:100%
          height:100%
          display:block
      .pay_list_next
        float:right
        width:.14rem
        height:.24rem
        margin-right:.5rem
        margin-top:.38rem
        img
          width:100%
          height:100%
          display:block
  
    
</style>


