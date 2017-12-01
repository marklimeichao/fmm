<template>
  <div class="fooddetail" ref="detailwrapper">
    <div>
      <div class="head">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item><img :src="fooddetail.DetailImg" alt=""></mt-swipe-item>
          <mt-swipe-item> <img :src="fooddetail.DetailImg1" alt=""></mt-swipe-item>
          <mt-swipe-item> <img :src="fooddetail.DetailImg2" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="de_content">
        <p class="de-name name">{{fooddetail.Name}}</p>
        <p class="de-price">
          <span class="now-price price">￥{{fooddetail.Price}}</span>
          <span class="de-oldprice">￥{{fooddetail.OriginalPrice}}</span>
        </p>
        <div class="kong1"></div>
        <p class="canshu">参数</p>
        <div class="common-de">
          <p class="com-left">名称</p>
          <p class="com-right name">{{fooddetail.Name}}</p>
        </div>
        <div class="common-de-k">
          <p class="com-left">配菜</p>
          <p class="com-right de_garnish">{{fooddetail.NextFood}}</p>
        </div>
        <div class="common-de">
          <p class="com-left">配料</p>
          <p class="com-right de_flavor">{{fooddetail.GoodsNote}}</p>
        </div>
        <div class="common-de-k">
          <p class="com-left">净含量</p>
          <p class="com-right netwt">{{fooddetail.netWt}}</p>
        </div>
        <div class="common-de">
          <p class="com-left">适用人群</p>
          <p class="com-right mat_cli">{{fooddetail.PersonDesc}}</p>
        </div>
      </div>
      <div class="de_bottom">
        <button class="de_add" v-if="fooddetail.IsSell==0 && forsale!=1" @click="addFood">加入购物车</button>
        <button class="de_add done" v-if="fooddetail.IsSell!=0&& forsale!=1" :disabled="1">已售罄</button>
        <button class="de_add done" v-if="forsale==1" :disabled="1">待售</button>
      </div>
      <scrollkong id="scrollkong"></scrollkong>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import context from '../../main.js'
import router from '../../router'
import bus from '../../assets/js/eventbus.js'
import BScroll from 'better-scroll'
import scrollkong from '../scrollkong/kong.vue'
const ERR_OK = 1
const ERR_NO = 0

export default {

  components: {
    scrollkong:scrollkong
  },
  computed: {

  },
  data() {
    return {
      foodid: Number,
      machineid: Number,
      fooddetail: Object,
      zhou: Number,
      forsale: Number
    }
  },
  created() {
    this.foodid = this.$route.query.foodid;
    this.forsale = this.$route.query.forsale;
    // console.log(this.forsale)
    if (this.$route.query.machineid) {
      this.machineid = this.$route.query.machineid;
    } else {
      this.machineid = localStorage.getItem('MachineId')
    }


    if (this.$route.query.zhou) {
      this.zhou = this.$route.query.zhou;
      //  console.log(this.$route.query.zhou)
    }
    this.getDeatail()

  },
  methods: {
    getDeatail: function() {
      let _this = this
      let url = context + 'ShowFoodDetail';
      let data = {};
      let foodOrigin = ''
      if (this.zhou > 0) {
        foodOrigin = '预定'
        data = {
          FoodId: this.foodid,
          MachineId: this.machineid,
          Type: 1,
          Zhou: this.zhou
        }
      } else {
        foodOrigin = '今日购'
        data = {
          FoodId: this.foodid,
          MachineId: this.machineid
        };
      }
      this.$http.post(url, data).then((response) => {
        let foodState = '';
        response = response.body;
        this.fooddetail = response.Data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.detailwrapper, {
            click: false
          })
        })
        if (response.Data.IsSell == 0) {
          foodState = "可购买"
        } else {
          foodState = '已售罄'
        }
        // console.log(this.fooddetail)
        zhuge.track('进入商品详情页', {
          '商品图片': response.Data.DetailImg,
          '商品名称': response.Data.Name,
          '商品sku': response.Data.FoodId,
          '商品价格': response.Data.Price,
          '商品内容描述': {
            '配菜': response.Data.NextFood,
            '主菜': response.Data.MainFood,
            '配料': response.Data.GoodsNote,
            '适合人群': response.Data.PersonDesc
          },
          '触发来源': foodOrigin,
          '商品状态': foodState
        })
      })
    },
    addFood: function() {
      let userid = localStorage.getItem('UserId');
      // let machineid = localStorage.getItem('MachineId')
      if (!userid || userid == null) {
        this.logshow = true;
        router.push('login')
        return
      }
      let _this = this

      let url = context + 'FoodIntoCart';
      let data = '';
      if (this.zhou > 0) {
        zhuge.track('预定详情-加入购物车')
        data = {
          UserId: userid,
          MachineId: this.machineid,
          FoodId: this.foodid,
          Type: 1,
          BuyType: 2,
          Num: 1,
          Zhou: this.zhou
        }
      } else {
        zhuge.track('今日购详情-加入购物车')
        data = {
          UserId: userid,
          MachineId: this.machineid,
          FoodId: this.foodid,
          Type: 1,
          Num: 1
        }
      }

      this.$http.post(url, data).then((response) => {
        response = response.body;
        let errnum = response.Code
        if (errnum == ERR_OK) {
          this.foodState = '加入购物车成功'
          bus.$emit('deAddCart', this.zhou)
          Toast({
            message: '加入购物车成功',
            position: 'middle',
            duration: 600
          });
        } else if (errnum == ERR_NO) {

          Toast({
            message: '库存不足，加入购物车成功失败',
            position: 'middle',
            duration: 600
          });
        }
      })

    }
  }
}
</script>
<style lang="stylus">
.fooddetail
  // position:fixed
  // top:0
  // left:0
  // z-index:60
  // width:100%
  // height:100%
  // position: fixed;
  // height: 100%;
  // z-index: 60;
  overflow-x :hidden
  background:#fff
  overflow:hidden
  .head
    height:5rem
    img
      width:100%
      height:100%
  .de_content
    width:100%
    // padding-bottom:1rem
    .de_name
      width: 7rem
      height: .7rem
      margin-bottom: .34rem
      line-height: .7rem

</style>
<style>
.de_content {
  width: 100%;
  /*margin: .7rem auto 0;*/
  /*background: cyan;*/
  /*padding-bottom: 1rem;*/
}
#scrollkong{
  height:.6rem;
}
.de_name {
  width: 7rem;
  height: .7rem;
  margin-bottom: .34rem;
  line-height: .7rem;
}

.de_name span {
  display: block;
}



.de_content .de_content_line {
  width: 110%;
  height: .02rem;
  background: rgba(0, 0, 0, .1);
  margin-bottom: .5rem;
}



.space {
  padding-right: .56rem;
}

.de_space {
  padding-right: .14rem;
}

.mat_cli,
.de_entree,
.de_garnish,
.de_flavor,
.de_calorie {
  width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.de_bottom {
  /*width: 7.5rem;
  height: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;*/
}

#de_add {
  width: 7.5rem;
  height: 1rem;
  background: #00abeb;
  font-size: .3rem;
  color: #fff;
}

.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .2);
  display: none;
}

.de-name {
  height: .44rem;
  line-height: .44rem;
  font-size: .44rem;
  color: #010101;
  margin: .25rem 0 .8rem .3rem;
}

.de-price {
  height: .3rem;
  line-height: .3rem;
  margin-left: .3rem;
  margin-bottom: .24rem;
}

.now-price {
  color: #ec5e4f;
  font-size: .26rem;
  /*display: block;
  float: left;
  height: .3rem;
  line-height: .3rem;*/
}

.de-oldprice {
  font-size: .18rem;
  text-decoration: line-through;
  color: #b6b6b6;
  /*display: block;
  float: left;
  height: .3rem;
  line-height: .3rem;*/
}

.kong1 {
  width: 100%;
  height: .18rem;
  background: #f8f8f8;
}

.canshu {
  height: .38rem;
  width: 100%;
  line-height: .38rem;
  margin: .55rem 0 .36rem .3rem;
  font-size: .38rem;
  color: #010101;
}

.common-de {
  width: 7.18rem;
  height: 1rem;
  background: #f8f8f8;
}

.com-left {
  float: left;
  font-size: .27rem;
  font-weight: 600;
  color: #010101;
  margin: .24rem 0 0 .3rem;
}

.com-right {
  float: right;
  font-size: .26rem;
  color: #010101;
  width: 4.75rem;
  margin-top: .24rem;
  margin-right: .22rem;
  text-align: right;
  line-height: 1;
  height: .3rem;
  line-height: .3rem;
}

.common-de-k {
  width: 7.18rem;
  height: 1rem;
  background: #fff;
}

.de_bottom {
  width: 100%;
  height: 1rem;
  /*margin-bottom: 1.2rem;*/
  /*position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;*/
}

.de_add {
  width: 7.5rem;
  height: 1rem;
  background: #00abeb;
  font-size: .3rem;
  color: #fff;
  margin-top: 0;
}

.done {
  background: rgb(153, 153, 153)
}
</style>

