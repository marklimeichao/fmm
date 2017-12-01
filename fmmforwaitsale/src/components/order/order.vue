<template>
  <div class="order">
    <div class="ord-wrapper">
      <div class="order-header">
        <!--@click="toSearch"-->
        <div class="location">
          <img src="./location.png" alt="">
        </div>
        <div class="address" v-if="chooseShow">
          <p class="loc over-ell">{{orderObj.KeyWord}}</p>
          <p class="loc_de over-ell">{{orderObj.Location}}</p>
        </div>
        <div class="address" v-if="!chooseShow">
          <p class="loc over-ell">{{chooseLocObj.KeyWord}}</p>
          <p class="loc_de over-ell">{{chooseLocObj.Location}}</p>
        </div>
        <!--<div class="add_next">
                     <img src="./order_next.png" alt="">
                            </div>-->
      </div>
      <!--<div v-if="chooseShow" style="height:100%">-->
      <div class="content clear-fix" v-if="chooseShow" ref="ydorderwrapper1" style="width:100%;height:50%;overflow:hidden">
        <!--<div class="mf_list">美饭列表</div>-->
        <ul class="food_list">
          <li v-for="list in foodList">
            <div class="food_lists_order">
              <div class="left">
                <img :src="list.FoodUrl" alt="">
                <div class="chooseShort" v-if="list.IsZero==1">库存不足</div>
              </div>
              <div class="right">
                <p class="order_name">{{list.FoodName}}</p>
                <span class="order_tot">￥ {{list.Price}} x{{list.Num}}</span>
                <!--<span class="order_num"></span>-->
              </div>
            </div>
            <div class="kong"></div>

          </li>
        </ul>

      </div>
      <div class="totals" v-if="chooseShow">
        <span class="tots">合计</span>
        <span class="tot_mons">{{totalMoney.toFixed(2)}}</span>
      </div>
      <div class="order_cou clear" @click="getCoupon" v-if="chooseShow">
        <span v-if="couponList.length>0" class="cou">可用优惠券</span>
        <span v-if="couponList.length==0" class="cou">无可用优惠券</span>

        <span class="order_next" v-if="couponList.length>0">
          <img src="./order_next.png" alt="">
        </span>
        <span class="cou_num" v-if="couponList.length>0">{{couponList.length}}张优惠券</span>
        <span class="act_cou" v-if="_getCouPrice>0">-{{_getCouPrice}}元</span>
      </div>
      <div class="order_bottom" v-if="chooseShow">
        <div class="total_bottom">
          <span class="tot">实付:</span>
          <span class="tot_mon" v-if="!_getCouPrice">{{totalMoney.toFixed(2)}}</span>
          <span class="tot_mon" v-if="_getCouPrice">{{(totalMoney-_getCouPrice).toFixed(2)}}</span>
        </div>
        <button class="order_place" @click="toOrder" :disabled="btnClick">立即下单</button>
      </div>
      <!--</div>-->
      <!--<div v-if="!chooseShow" style="height:100%">-->
      <div class="content clear-fix" v-if="!chooseShow" ref="ydorderwrapper2" style="width:100%;height:50%;overflow:hidden">
        <!--<div class="mf_list">美饭列表</div>-->
        <ul class="food_list">
          <li v-for="list in chooseFoodList">
            <div class="food_lists_order">
              <div class="left">
                <img :src="list.FoodUrl" alt="">
                <div class="chooseShort" v-if="list.IsZero==1">库存不足</div>
              </div>
              <div class="right">
                <p class="order_name">{{list.FoodName}}</p>
                <span class="order_tot">￥ {{list.Price}} x{{list.Num}}</span>
                <!--<span class="order_num"></span>-->
              </div>
            </div>
            <div class="kong"></div>

          </li>
        </ul>

      </div>
      <div class="totals" v-if="!chooseShow">
        <span class="tots">合计</span>
        <span class="tot_mons">{{chooseTotal.toFixed(2)}}</span>
      </div>
      <div class="order_cou clear" @click="getCoupon" v-if="!chooseShow">
        <span v-if="couponList.length>0" class="cou">可用优惠券</span>
        <span v-if="couponList.length==0" class="cou">无可用优惠券</span>

        <span class="order_next" v-if="couponList.length>0">
          <img src="./order_next.png" alt="">
        </span>
        <span class="cou_num" v-if="couponList.length>0">{{couponList.length}}张优惠券</span>
        <span class="act_cou" v-if="_getCouPrice>0">-{{_getCouPrice}}元</span>
      </div>
      <div class="order_bottom" v-if="!chooseShow">
        <div class="total_bottom">
          <span class="tot">实付:</span>
          <span class="tot_mon" v-if="!_getCouPrice">{{chooseTotal.toFixed(2)}}</span>
          <span class="tot_mon" v-if="_getCouPrice">{{(chooseTotal-_getCouPrice).toFixed(2)}}</span>
        </div>
        <button class="order_place" @click="toOrder" :disabled="btnClick">立即下单</button>
        <!--</div>-->
      </div>
    </div>
    <!--<transition name="inRight">
                      <couponsvalid @getCouMes='getCouInfo' :coupons="couponList" v-if="show"></couponsvalid>
                    </transition>-->
    <transition name="inRight">
      <newcouponvalid class="newcouponvalid" @getCouMes='getCouInfo' :total="getTotal" :coupons="couponList" v-if="show"></newcouponvalid>
    </transition>
    <transition name="inRight">
      <div class="search-wrapper" v-if="searchShow">
        <searchloc @getLocMes='getLocInfo'></searchloc>
      </div>
    </transition>
    <transition name="toTop">
      <div class="payway" v-if="payShow">
        <div class="header">
          支付方式
          <span @click="toClose">
            <img src="./delete.png" alt="">
          </span>
        </div>
        <ul>
          <li class="pay_list" @click="toPay" :disabled="btnClick">
            <span class="pay_list_icon">
              <img src="./wx.png" alt="">
            </span>
            <span>微信支付</span>
            <span class="pay_list_next">
              <img src="./order_next.png" alt="">
            </span>
          </li>
          <li class="pay_list" style="display:none" @click="toPayEbank" :disabled="btnClick">
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
      <div class="pay_mask" v-if="payShow"></div>
    </transition>

  </div>
</template>
<script>
import context from '../../main.js'
import couponsvalid from '../couponsvalid/couponsvalid.vue'
import searchloc from '../searchloc/searchloc.vue'
import newcouponvalid from '../newcouponvalid/newcouponvalid'
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      orderObj: {},
      foodList: [],
      couponList: [],
      foodIds: [],
      show: false,
      couInfo: {},
      btnClick: true,
      searchShow: false,
      chooseShow: true,
      chooseLocObj: {},
      chooseTotal: 0,
      chooseFoodList: [],
      chooseInvalidFood: [],
      chooseValidFood: [],
      totalMoney: 0,
      foodsLists: '',
      payShow: false
    }
  },
  created() {
    this.getList();
    bus.$emit('footShow', false);
    window.addEventListener("popstate", function(e) {
      bus.$emit('returnShow', true)
    })
    this.getUserCou();
    // console.log(this.foodList+'created')
  },
  updated() {
    this.$nextTick(() => {
      if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ydorderwrapper1, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
    })
  },
  computed: {
    _getCouPrice: function() {
      let price = this.couInfo.Price;
      if (price > 0) {
        return price
      } else {
        return false
      }

    },
    getTotal: function() {
      if (this.totalMoney > 0) {
        return this.totalMoney.toFixed(2)
      } else if (this.chooseTotal > 0) {
        return this.chooseTotal.toFixed(2)
      }
    }
  },
  methods: {
    getList: function() {
      let _this = this;
      // bus.$on('getCartInfo', (data) => {
      //   // console.log(data);
      //   this.foodList = data;
      //   this.chooseValidFood = data;
      //   this.btnClick = false;
      //   data.forEach((item) => {
      //     this.totalMoney += item.Price * item.Num;
      //   })
      // });
      let cartInfo = JSON.parse(localStorage.getItem('cartInfo'));

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ydorderwrapper1, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
      if (!cartInfo || cartInfo.lenth == 0) {
        router.push('home')
      } else {
        cartInfo.forEach((item) => {
          if (item.IsZero == 0) {
            // this.foodList.push(item);
            this.chooseValidFood.push(item);
          } else {
            this.chooseInvalidFood.push(item)
          }
        });
        this.foodList = cartInfo;
        // this.chooseValidFood = cartInfo;
        this.btnClick = false;
        this.chooseValidFood.forEach((item) => {
          this.totalMoney += item.Price * item.Num;
        });
      };
      this.foodsLists += '['
      this.foodList.forEach((item, index) => {
        if (index < (this.foodList.length - 1)) {

          if (this.foodList.length == 1) {
            // foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':" + item.Days + "}";
            // chooseZhou += "{'zhou':" + item.Zhou + "}";
            _this.foodsLists += "{'FoodId':'" + item.FoodId + "','Num':'" + item.Num + "'}"

          } else {
            // foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':" + item.Days + "},";
            // chooseZhou += "{'zhou':" + item.Zhou + "},";
            _this.foodsLists += "{'FoodId':'" + item.FoodId + "','Num':'" + item.Num + "'},"

          }
        };
        if (index == (this.foodList.length - 1)) {
          // foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':" + item.Days + "}";
          // chooseZhou += "{'zhou':" + item.Zhou + "}";
          _this.foodsLists += "{'FoodId':'" + item.FoodId + "','Num':'" + item.Num + "'}"

        }
      });
      this.foodsLists += ']';
      this.orderObj = {
        KeyWord: localStorage.getItem('KeyWord'),
        MachineId: localStorage.getItem('MachineId'),
        Location: localStorage.getItem('Location')
      };


      // console.log(this.foodList)

      // let url = context + 'weixin/wxorder!toSureOrder.do';
      // let data = {
      //   UserId: localStorage.getItem('UserId'),
      //   MachineId: localStorage.getItem('MachineId'),
      //   Type: 1,
      //   CartIds: localStorage.getItem('CartIds'),
      //   BuyType: 1
      // };
      // this.$http.post(url, data).then((res) => {
      //   res = res.body;
      //   if (res.Code == 0) {
      //     router.push('home')
      //   };
      //   this.btnClick = false;
      //   this.orderObj = res.Data;
      //   this.foodList = res.Data.FoodList;
      //   this.chooseValidFood = res.Data.FoodList;
      //   let foodslist = [];
      //   let lists = '';
      //   res.Data.FoodList.forEach((v) => {
      //     foodslist.push(v.FoodName)
      //   })
      //   lists = foodslist.join(',')
      //   zhuge.track('进入确认订单页面', {
      //     '设备地址': res.Data.MacName,
      //     '美饭列表': lists,
      //     '订单金额': res.Data.TotalPrice
      //   })
      //   res.Data.FoodList.forEach((foodid) => {
      //     this.foodIds.push(foodid.FoodId)
      //   });
      //   this.couponList = res.Data.Coupons;
      //   // console.log(this.foodIds)
      // })

    },
    getCoupon: function() {
      if (this.couponList.length > 0) {
        this.show = true
      }

    },
    getUserCou: function() {
      let userid = localStorage.getItem('UserId');
      let machineid = localStorage.getItem('MachineId');
      let url = context + 'UsableCoupons';
      let foodids = [];
      this.foodList.forEach((item) => {
        foodids.push(item.FoodId)
      });
      let foodidscou = foodids.join(',');
      // console.log(foodidscou);
      let data = {
        UserId: userid,
        MachineId: machineid,
        Type: 1,
        buyType: 1,
        FoodId: foodidscou
      };
      this.couponList = [];
      this.couInfo = {};

      let _this = this;
      this.$http.post(url, data).then((res) => {
        res = res.body;
        // this.couponList=res.Data;
        let chooseCouList = res.Data;
        // this.couponList=res.Data;
        if (chooseCouList.length > 0) {
          // _this.couponList = chooseCouList
          chooseCouList.forEach((item) => {

            if (_this.chooseShow) {
              if (item.Price < _this.totalMoney) {
                _this.couponList.push(item);
              }

            } else {
              if (item.Price < _this.chooseTotal) {
                _this.couponList.push(item);
              }

            }
            // if (item.Price < _this.chooseTotal || item.Price < _this.totalMoney) {
            //   _this.couponList.push(item);

            // }
          });
        };

      });
      // console.log(this.couponList);
    },
    getCouInfo: function(data) {
      let _this = this;
      // console.log(data);
      this.couInfo = data;
      // setTimeout(function(){
      _this.show = false;
      // },500)
      // console.log(this.couInfo)

    },
    getLocInfo: function(data) {
      let _this = this;
      this.searchShow = false;
      this.chooseShow = false;
      this.chooseLocObj = data;
      this.foodIds = [];
      // this.foodList=[];
      // this.foodIds=[];
      let foodListStr = '';
      this.foodsLists = '';
      this.foodsLists += '['
      foodListStr += '['
      this.foodList.forEach((item, index) => {
        // if (index < (this.foodList.length - 1)) {

        //   if (this.foodList.length == 1) {
        //     foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':''" + "}"
        //   } else {
        //     foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':''" + "},"
        //   }
        // };
        // if (index == (this.foodList.length - 1)) {
        //   foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':''" + "}"
        // }
        if (index < (this.foodList.length - 1)) {

          if (this.foodList.length == 1) {
            foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':''" + "}";
            // chooseZhou += "{'zhou':" + item.Zhou + "}";
            _this.foodsLists += "{'FoodId':'" + item.FoodId + "','Num':'" + item.Num + "'}"

          } else {
            foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':''" + "},";
            // chooseZhou += "{'zhou':" + item.Zhou + "},";
            _this.foodsLists += "{'FoodId':'" + item.FoodId + "','Num':'" + item.Num + "'},"

          }
        };
        if (index == (this.foodList.length - 1)) {
          foodListStr += "{'FoodId':" + item.FoodId + ",'Num':" + item.Num + ",'Zhou':''" + "}";
          // chooseZhou += "{'zhou':" + item.Zhou + "}";
          _this.foodsLists += "{'FoodId':'" + item.FoodId + "','Num':'" + item.Num + "'}"

        }
      })
      foodListStr += ']';
      _this.foodsLists += ']';
      // console.log(data, foodListStr);
      let userid = localStorage.getItem('UserId');
      let _data = {
        UserId: userid,
        MachineId: data.MachineId,
        FoodList: foodListStr,
        Type: 1,
        BuyType: 1
      };
      let url = context + 'getCarByMid';
      this.$http.post(url, _data).then((res) => {
        res = res.body;
        let resData = res.Data;
        this.chooseFoodList = resData;
        localStorage.setItem('cartInfo', JSON.stringify(resData));
        this.chooseTotal = 0;
        this.chooseInvalidFood = [];
        this.chooseValidFood = [];
        if (res.Code == 1) {
          resData.forEach((item) => {
            if (item.IsZero == 0) {
              this.chooseTotal += Number(item.Price * item.Num);
              this.foodIds.push(item.FoodId);
              this.chooseValidFood.push(item);
            } else {
              this.chooseInvalidFood.push(item);
            };

          })
        } else {
          // alert('请刷新')
        };
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ydorderwrapper2, {
            click: true
          })
        })
        // console.log(this.chooseFoodList,this.chooseTotal)
      });
      this.getUserCou();
    },
    toPay: function() {
      // let UserId = localStorage.getItem('UserId');
      // let MachineId = localStorage.getItem('MachineId');
      // localStorage.setItem('ispay', "1");
      let _this = this;
      // console.log(this.foodIds);
      let foods = this.foodIds.join(',');
      bus.$emit('footChooseShow', true);
      let UserId = localStorage.getItem('UserId');
      let MachineId = localStorage.getItem('MachineId');
      // let foods = this.foodIds.join(',')

      var getdatas = {};
      var secretKey = "PDSL2017LSDP2017PSLD2017";
      let OrderSource = '1';
      let FoodList = this.foodsLists;
      var keyHex = CryptoJS.enc.Utf8.parse(secretKey);
      var newUserId = UserId;

      newUserId = CryptoJS.TripleDES.encrypt(newUserId, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(newUserId)


      MachineId = CryptoJS.TripleDES.encrypt(MachineId, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(MachineId)


      FoodList = CryptoJS.TripleDES.encrypt(FoodList, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(FoodList)

      OrderSource = CryptoJS.TripleDES.encrypt(OrderSource, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(OrderSource)

      let jse = new this.$jsEncrypt.JSEncrypt();
      jse.setPublicKey(`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIu5/iWt5z+igVZnq78tzDyVy+iGY/mDaOuoi0Gpt/FNOatzMQPlcdX21c0IEJH/CCPFbn3Ay32aKY8WMM18funFDSTPxe7B8Y0VCYhZ5x9iBjGBz4B9eqoNfgtr9cnuzmjXjkAXwTyWYNr6XcaUtRxU/IJTb8oiHMlFdUu6wpdQIDAQAB`)

      // 设置需要加密的字符串
      let encrypted = jse.encrypt(secretKey);
      if (this.couInfo.Price > 0) {
        zhuge.track('确认订单页-立即下单', {
          '是否用优惠券': '是'
        })
        getdatas = {
          UserId: newUserId,
          MachineId: MachineId,
          OrderSource: OrderSource,
          CouponsType: this.couInfo.Type,
          FoodList: FoodList,
          Coupons: this.couInfo.CouponsId,
          PayType: 1,
          secret: encrypted,
          // buyType:1
        };
      } else {
        zhuge.track('确认订单页-立即下单', {
          '是否用优惠券': '否'
        })
        getdatas = {
          UserId: newUserId,
          MachineId: MachineId,
          OrderSource: OrderSource,
          CouponsType: '',
          FoodList: FoodList,
          Coupons: '',
          PayType: 1,
          secret: encrypted,
          // buyType:1
        }
      };

      // console.log(foods, this.chooseInvalidFood, this.chooseFoodList);
      // if (this.chooseValidFood.length > 0) {
      //   if (this.chooseInvalidFood.length > 0) {
      //     let message = '您有商品库存不足，是否继续购买？';
      //     let title = '';
      //     MessageBox.confirm(message, title).then(action => {
      //       if (_this.couInfo.couprice > 0) {
      //         zhuge.track('确认订单页-立即下单', {
      //           '是否用优惠券': '是'
      //         })
      //         _this.btnClick = true
      //         //  window.location.href='http://www.fmeimei.com'
      //         window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&Coupons=" + _this.couInfo.couid + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //       } else {
      //         zhuge.track('确认订单页-立即下单', {
      //           '是否用优惠券': '否'
      //         })
      //         _this.btnClick = true
      //         //  window.location.href='http://www.fmeimei.com'
      //         window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //       }
      //     })
      //   } else {
      //     // console.log(_this.couInfo)
      //     if (this.couInfo.couprice > 0) {
      //       zhuge.track('确认订单页-立即下单', {
      //         '是否用优惠券': '是'
      //       })
      //       this.btnClick = true
      //       //  window.location.href='http://www.fmeimei.com'
      //       window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&Coupons=" + this.couInfo.couid + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //     } else {
      //       zhuge.track('确认订单页-立即下单', {
      //         '是否用优惠券': '否'
      //       })
      //       this.btnClick = true
      //       //  window.location.href='http://www.fmeimei.com'
      //       window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //     }
      //   };
      //   localStorage.removeItem('cartInfo');
      // } else {
      //   Toast({
      //     message: '您没有可购买商品，请重新选择点位',
      //     position: 'middle',
      //     duration: 1000
      //   });
      // }
      let createOrderUrl = context + 'CreateOrder';
      let message = '您有商品库存不足，是否继续购买';
      let title = '';
      _this.btnClick = true;
      if (this.chooseValidFood.length > 0) {
        if (this.chooseInvalidFood.length > 0) {
          MessageBox.confirm(message, title).then(action => {
            this.$http.post(createOrderUrl, getdatas).then((res) => {
              res = res.body;
              // console.log(res)
              if (res.Code == 1) {
                var datas = res.Data;
                var no = datas.OrderNo;
                _this.btnClick = true;
                localStorage.setItem('ispay', "1");
                localStorage.removeItem('cartInfo');
                window.location.href = context + "/weixin/wxpay!toPay.do?orderNum=" + no;
              } else {
                _this.btnClick = false;
                MessageBox.confirm('是否跳转到首页重新购买？', res.Msg).then(action => {
                  router.push('home')
                })
              }
            })
          });
        } else {
          this.$http.post(createOrderUrl, getdatas).then((res) => {
            res = res.body;
            if (res.Code == 1) {
              var datas = res.Data;
              var no = datas.OrderNo;
              _this.btnClick = true;
              localStorage.setItem('ispay', "1");
              localStorage.removeItem('cartInfo');
              window.location.href = context + "/weixin/wxpay!toPay.do?orderNum=" + no;
            } else {
              _this.btnClick = false;
              MessageBox.confirm('是否跳转到首页重新购买？', res.Msg).then(action => {
                router.push('home')
              })
            }
          })
        };
      } else {
        _this.btnClick = false
        Toast({
          message: '您没有可购买商品',
          position: 'middle',
          duration: 1000
        });
      }
    },
    toPayEbank: function() {
      // let UserId = localStorage.getItem('UserId');
      // let MachineId = localStorage.getItem('MachineId');
      // localStorage.setItem('ispay', "1");
      let _this = this;
      // console.log(this.foodIds);
      let foods = this.foodIds.join(',');
      bus.$emit('footChooseShow', true);
      let UserId = localStorage.getItem('UserId');
      let MachineId = localStorage.getItem('MachineId');
      // let foods = this.foodIds.join(',')

      var getdatas = {};
      var secretKey = "PDSL2017LSDP2017PSLD2017";
      let OrderSource = '1';
      let FoodList = this.foodsLists;
      var keyHex = CryptoJS.enc.Utf8.parse(secretKey);
      var newUserId = UserId;

      newUserId = CryptoJS.TripleDES.encrypt(newUserId, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(newUserId)


      MachineId = CryptoJS.TripleDES.encrypt(MachineId, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(MachineId)


      FoodList = CryptoJS.TripleDES.encrypt(FoodList, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(FoodList)

      OrderSource = CryptoJS.TripleDES.encrypt(OrderSource, keyHex, {
        iv: CryptoJS.enc.Utf8.parse('0123456789'),
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).ciphertext.toString(CryptoJS.enc.Base64);
      // console.log(OrderSource)

      let jse = new this.$jsEncrypt.JSEncrypt();
      jse.setPublicKey(`MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIu5/iWt5z+igVZnq78tzDyVy+iGY/mDaOuoi0Gpt/FNOatzMQPlcdX21c0IEJH/CCPFbn3Ay32aKY8WMM18funFDSTPxe7B8Y0VCYhZ5x9iBjGBz4B9eqoNfgtr9cnuzmjXjkAXwTyWYNr6XcaUtRxU/IJTb8oiHMlFdUu6wpdQIDAQAB`)

      // 设置需要加密的字符串
      let encrypted = jse.encrypt(secretKey);
      if (this.couInfo.Price > 0) {
        zhuge.track('确认订单页-立即下单', {
          '是否用优惠券': '是'
        })
        getdatas = {
          UserId: newUserId,
          MachineId: MachineId,
          OrderSource: OrderSource,
          CouponsType: this.couInfo.Type,
          FoodList: FoodList,
          Coupons: this.couInfo.CouponsId,
          PayType: 5,
          secret: encrypted,
          // buyType:1
        };
      } else {
        zhuge.track('确认订单页-立即下单', {
          '是否用优惠券': '否'
        })
        getdatas = {
          UserId: newUserId,
          MachineId: MachineId,
          OrderSource: OrderSource,
          CouponsType: '',
          FoodList: FoodList,
          Coupons: '',
          PayType: 5,
          secret: encrypted,
          // buyType:1
        }
      };

      // console.log(foods, this.chooseInvalidFood, this.chooseFoodList);
      // if (this.chooseValidFood.length > 0) {
      //   if (this.chooseInvalidFood.length > 0) {
      //     let message = '您有商品库存不足，是否继续购买？';
      //     let title = '';
      //     MessageBox.confirm(message, title).then(action => {
      //       if (_this.couInfo.couprice > 0) {
      //         zhuge.track('确认订单页-立即下单', {
      //           '是否用优惠券': '是'
      //         })
      //         _this.btnClick = true
      //         //  window.location.href='http://www.fmeimei.com'
      //         window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&Coupons=" + _this.couInfo.couid + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //       } else {
      //         zhuge.track('确认订单页-立即下单', {
      //           '是否用优惠券': '否'
      //         })
      //         _this.btnClick = true
      //         //  window.location.href='http://www.fmeimei.com'
      //         window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //       }
      //     })
      //   } else {
      //     // console.log(_this.couInfo)
      //     if (this.couInfo.couprice > 0) {
      //       zhuge.track('确认订单页-立即下单', {
      //         '是否用优惠券': '是'
      //       })
      //       this.btnClick = true
      //       //  window.location.href='http://www.fmeimei.com'
      //       window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&Coupons=" + this.couInfo.couid + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //     } else {
      //       zhuge.track('确认订单页-立即下单', {
      //         '是否用优惠券': '否'
      //       })
      //       this.btnClick = true
      //       //  window.location.href='http://www.fmeimei.com'
      //       window.location.href = context + "weixin/wxorder!createOrder.do?UserId=" + UserId + "&MachineId=" + MachineId + "&OrderSource=1" + "&PayType=1" + "&CouponsType=0&FoodList=" + foods + '';
      //     }
      //   };
      //   localStorage.removeItem('cartInfo');
      // } else {
      //   Toast({
      //     message: '您没有可购买商品，请重新选择点位',
      //     position: 'middle',
      //     duration: 1000
      //   });
      // }
      let createOrderUrl = context + 'CreateOrder';
      let message = '您有商品库存不足，是否继续购买';
      let title = '';
      _this.btnClick = true;
      if (this.chooseValidFood.length > 0) {
        if (this.chooseInvalidFood.length > 0) {
          MessageBox.confirm(message, title).then(action => {
            this.$http.post(createOrderUrl, getdatas).then((res) => {
              res = res.body;
              // console.log(res)
              if (res.Code == 1) {
                var datas = res.Data;
                var no = datas.OrderNo;
                _this.btnClick = true;
                // localStorage.setItem('ispay', "1");
                localStorage.removeItem('cartInfo');
                window.location.href = context + "cebbank/login.html?orderNo=" + no + "&type=1";
              } else {
                _this.btnClick = false;
                MessageBox.confirm('是否跳转到首页重新购买？', res.Msg).then(action => {
                  router.push('home')
                })
              }
            })
          });
        } else {
          this.$http.post(createOrderUrl, getdatas).then((res) => {
            res = res.body;
            if (res.Code == 1) {
              var datas = res.Data;
              var no = datas.OrderNo;
              _this.btnClick = true;
              // localStorage.setItem('ispay', "1");
              localStorage.removeItem('cartInfo');
              window.location.href = context + "cebbank/login.html?orderNo=" + no + "&type=1";
            } else {
              _this.btnClick = false;
              MessageBox.confirm('是否跳转到首页重新购买？', res.Msg).then(action => {
                router.push('home')
              })
            }
          })
        };
      } else {
        _this.btnClick = false
        Toast({
          message: '您没有可购买商品',
          position: 'middle',
          duration: 1000
        });
      }
    },
    toSearch: function() {
      if (!this.btnClick) {
        this.searchShow = true;
      }

      // router.push('search')
    },
    toOrder: function() {
      this.payShow = true
    },
    toClose: function() {
      this.payShow = false
    }
  },
  // beforeDestroy(){
  //   bus.$off('getAllFoods');
  // },
  components: {
    couponsvalid: couponsvalid,
    searchloc: searchloc,
    newcouponvalid: newcouponvalid
  }
}
</script>
<style lang="stylus">
.order
  position:absolute
  z-index :60
  background:#f8f8f8
  overflow-y:auto
  height:100%
  bottom:0
  .ord-wrapper
    height:100%
    overflow:auto
    overflow-x: hidden
    -webkit-overflow-scrolling :touch
    .order-header
      width:100%
      height: 1.8rem
      margin-top: .25rem
      background: url(./order_bg.png) 0 0 no-repeat
      background-size: 100% 100%
      overflow: hidden
      .location
        width: .36rem
        height: .46rem
        float: left
        margin: .6rem .28rem 0 .25rem
        img 
          width:100%
          height:100%
      .address
        height: .85rem
        float: left
        margin-top: .45rem
        width:5.8rem
        .loc 
          font-size: .34rem
          color: #333
          margin-bottom: .1rem
          width: 5.8rem 
        .loc_de
          font-size: .26rem
          color: #333
          width: 6.4rem 
      .add_next 
        float: right
        margin-right: .3rem;
        width: .14rem;
        height: .24rem;
        margin-top:.78rem 
        img 
          width:100%
          height:100%  
    .content 
      width: 100%;
      box-sizing: border-box
      background: #fff
      margin-top: .25rem
      // max-height:50%
      overflow-x:hidden
      overflow-y:auto
      -webkit-overflow-scrolling :touch
      .mf_list
        width: 7.2rem
        height: .86rem
        margin-left: .3rem
        font-size: .26rem
        color: #999
        line-height: .86rem
        background: #fff
        letter-spacing: .02rem
        border-bottom: .02rem solid #f8f8f8
     

      .food_list
        width: 100%
        margin-top:.15rem
        -webkit-overflow-scrolling :touch
        // margin-left: .3rem
        .food_lists_order 
          width: 100rem
          height: 1.68rem
          box-sizing: border-box
          // border-bottom: .02rem solid #f8f8f8
          overflow: hidden 
          background:#f8f8f8
          .left,.right
            float:left
          .left
            width:1.5rem
            height:1.5rem
            margin-left:.3rem
            margin-top:.09rem  
            position:relative
            .chooseShort
              width:100%
              height:.4rem
              line-height:.4rem
              color:#fff
              font-size:.26rem
              text-align:center
              position:absolute
              left:0
              bottom:0
              background:rgba(0,0,0,.6)
            img 
              width:100%
              height:100%
          .right
            p
              color:#000
              font-size:.3rem
              margin:.3rem 0 .3rem .3rem  
            span 
              color:#000
              font-size :.24rem
              padding-left:.3rem
        .kong
          width:100%
          height:.05rem
          background:#fff    
          // span 
          //   display: block
          //   height: .9rem
          //   line-height: .9rem
          //   box-sizing: border-box
          // .order_name
          //   float: left
          //   font-size: .34rem
          //   color: #333
          //   width: 4rem
          //   overflow: hidden
          //   text-overflow: ellipsis
          //   white-space: nowrap 
          // .order_tot
          //   float: right
          //   /* margin-right: .3rem; */
          //   font-size: .26rem
          //   color: #ff4040
          //   width: .8rem 
          // .order_num
          //   float: right
          //   margin-right: .5rem
          //   font-size: .26rem
          //   color: #666
     .totals
        width:100%
        height:.9rem
        line-height:.9rem
        box-sizing:border-box
        border-bottom:.01rem solid #c6c6c6
        background:#fff
        .tots
          margin-left:.3rem
          font-size:.34rem
          color:#00abeb
          display:block
          float:left
        .tot_mons
          float: right
          margin-right: .3rem
          font-size: .34rem
          color: #ff4040 
    .order_cou 
      width: 7.5rem
      height: .9rem
      line-height: .9rem
      box-sizing: border-box
      background: #fff
      margin-top: .1rem
      overflow: hidden
      border-top: .02rem solid #f8f8f8
      border-bottom: .02rem solid #f8f8f8
      span 
        display: block
        height: .9rem
      .cou 
        float: left
        margin-left: .3rem
        font-size: .34rem
        color: #333
      .order_next 
        float: right
        margin-right: .3rem
        width: .14rem
        height: .24rem
        img
          width: .14rem
          height: .24rem
      .cou_num 
        float: left
        margin-left: .2rem
        color: #fff
        background: #00abeb
        height: .6rem
        line-height: .6rem
        margin-top: .15rem
        padding: 0 .06rem
        font-size: .24rem
      .act_cou
        float: right
        margin-right: .2rem
        color: #00abeb
        /* background: #00abeb; */
        height: .6rem
        line-height: .6rem
        margin-top: .15rem
        padding: 0 .06rem
        font-size: .3rem
    .order_bottom
      width:100%
      height:1.18rem
      line-height:1.18rem
      background:#fff
      border-top:.01rem solid #c6c6c6
      position:absolute
      bottom:0
      left:0
      .total_bottom 
        // width: 7.5rem
        // height: .9rem
        // box-sizing: border-box
        // line-height: .9rem
        // background: #fff
        // border-bottom: .02rem solid #f8f8f8
        float:left
        span 
          display: block
          height: 1.18rem
          line-height: 1.18rem
        .tot 
          float: left
          margin-left: .3rem
          font-size: .34rem
          color: #00abeb
        .tot_mon 
          float: left
          // margin-right: .3rem
          font-size: .34rem
          color: #ff4040
          padding-left:.1rem
      .order_place 
        display: block
        width: 1.92rem
        height: .82rem
        margin: .2rem .24rem 0 0
        background: #00abeb
        font-size: .3rem
        color: #fff
        border-radius: .14rem  
        float:right
  .newcouponvalid
    &.inRight-enter,&.inRight-leave-to 
      transform:translate3d(200%,0,0) 
    &.inRight-enter-active,&.inRight-leave-active
      transition :all .6s  
  .search-wrapper
    position:absolute
    top:0
    left:0
    background:#fff
    min-height:100%
    &.inRight-enter,&.inRight-leave-to 
      transform:translate3d(200%,0,0) 
    &.inRight-enter-active,&.inRight-leave-active
      transition :all .6s  
  .pay_mask
    position:absolute
    width:100%
    height:100%
    z-index:10
    background:rgba(0,0,0,.4)
    top:0
    left:0
    &.payfade-enter,&.payfade-leave-to
      opacity:.4
    &.payfade-enter-active,&.payfade-leave-active
      transition :all .3s
  .payway
    position:absolute
    width:100%
    // height:3rem
    background:#fff
    color:#000
    bottom:0
    z-index:20
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

