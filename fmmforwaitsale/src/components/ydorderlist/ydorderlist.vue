<template>
  <div class="yd_taken" ref="ydwrapper">
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
  </div>
</template>
<script>
import context from '../../main.js'
import { Indicator } from 'mint-ui';
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      NewNotTakeYdOrder: []
    }
  },
  created() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    this.getNotTakeYdOrder()
  },
  methods: {
    getNotTakeYdOrder: function() {
      let userid = localStorage.getItem('UserId');
      let url = context + 'NotTakeYdOrder';
      let data = { UserId: userid }
      this.$http.post(url, data).then((response) => {
        Indicator.close();
        response = response.body
        this.NewNotTakeYdOrder = response.Data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ydwrapper, {
            click:true
          })
        })
        // console.log(response)
      })
    }
  }
}
</script>
<style lang="stylus">

</style>
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
</style>
