<template>
  <div class="order_taken" ref="takenwrapper">
    <!--<div class="taken_kong"></div>-->
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
  </div>
</template>
<script>
import context from '../../main.js'
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
import { Indicator } from 'mint-ui';
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      notTakeOrder: []
    }
  },
  created() {
    let userid = localStorage.getItem('UserId');
    if (!userid) {
      bus.$emit('getOrderInfo', false)
      router.push('../login')
      return
    };
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.getTakenOrder();
  },
  methods: {
    getTakenOrder: function() {
      let userid = localStorage.getItem('UserId');
      let url = context + 'NewNotTakeOrder';
      let data = { UserId: userid };
      this.$http.post(url, data).then((response) => {
        Indicator.close();
        response = response.body;
        this.notTakeOrder = response.Data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.takenwrapper, {
            click: true
          })
        })

        if (response.Data.length == 0) {
          bus.$emit('getOrderInfo', false)
        }
      })

    }
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
</style>

