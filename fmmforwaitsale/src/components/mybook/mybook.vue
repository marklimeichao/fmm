<template>
  <div class="reserve">

    <div class="navbar" ref="navwrapper">
      <ul>
        <li class="item" v-for="(item,index) in getDays" @click="selectMenu(index,$event)" :class="{'current':currentIndex==index}">{{item}} </li>
      </ul>
    </div>
    <div class="content">
      <ul class="alllists">
        <transition name="inRight">
          <li class="list list-hook"  ref="conwrapper" v-if="showList[0]">
            <ul>
              <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[0]}}" tag="li" class="food-item" v-for="(item,index) in foodLists">

                <img class="food-img" v-lazy="item.ListImg" alt="">

                <div class="content-bottom">
                  <div class="new_left">
                    <p class="new_name ell">{{item.Name}}</p>
                    <p>
                      <span class="new_price">￥{{item.Price}}</span>
                      <span class="new_oldprice">￥{{item.OriginalPrice}}</span>
                    </p>
                  </div>
                  <div class="new_right">
                    <addydcart :food="item" :zhou="getDaysNum[0]"></addydcart>

                  </div>
                </div>
              </router-link>

            </ul>
            <div class="kongfood" v-if="foodLists.length==0">
              <img src="./kong.png" alt="">
            </div>
          </li>

        </transition>
        <transition name="inRight">
          <li class="list list-hook"  ref="conwrapper" v-if="showList[1]">
            <ul>
              <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[1]}}" tag="li" class="food-item" v-for="(item,index) in foodLists">

                <img class="food-img" v-lazy="item.ListImg" alt="">

                <div class="content-bottom">
                  <div class="new_left">
                    <p class="new_name ell">{{item.Name}}</p>
                    <p>
                      <span class="new_price">￥{{item.Price}}</span>
                      <span class="new_oldprice">￥{{item.OriginalPrice}}</span>
                    </p>
                  </div>
                  <div class="new_right">
                    <addydcart :food="item" :zhou="getDaysNum[1]"></addydcart>

                  </div>
                </div>
              </router-link>

            </ul>
            <div class="kongfood" v-if="foodLists.length==0">
              <img src="./kong.png" alt="">
            </div>
          </li>
        </transition>
        <transition name="inRight">
          <li class="list list-hook"  ref="conwrapper" v-if="showList[2]">
            <ul>
              <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[2]}}" tag="li" class="food-item" v-for="(item,index) in foodLists">

                <img class="food-img" v-lazy="item.ListImg" alt="">

                <div class="content-bottom">
                  <div class="new_left">
                    <p class="new_name ell">{{item.Name}}</p>
                    <p>
                      <span class="new_price">￥{{item.Price}}</span>
                      <span class="new_oldprice">￥{{item.OriginalPrice}}</span>
                    </p>
                  </div>
                  <div class="new_right">
                    <addydcart :food="item" :zhou="getDaysNum[2]"></addydcart>

                  </div>
                </div>
              </router-link>

            </ul>
            <div class="kongfood" v-if="foodLists.length==0">
              <img src="./kong.png" alt="">
            </div>
          </li>
        </transition>
        <transition name="inRight">
          <li class="list list-hook"  ref="conwrapper" v-if="showList[3]">
            <ul>
              <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[3]}}" tag="li" class="food-item" v-for="(item,index) in foodLists">

                <img class="food-img" v-lazy="item.ListImg" alt="">

                <div class="content-bottom">
                  <div class="new_left">
                    <p class="new_name ell">{{item.Name}}</p>
                    <p>
                      <span class="new_price">￥{{item.Price}}</span>
                      <span class="new_oldprice">￥{{item.OriginalPrice}}</span>
                    </p>
                  </div>
                  <div class="new_right">
                    <addydcart :food="item" :zhou="getDaysNum[3]"></addydcart>

                  </div>
                </div>
              </router-link>

            </ul>
            <div class="kongfood" v-if="foodLists.length==0">
              <img src="./kong.png" alt="">
            </div>
          </li>
        </transition>
        <transition name="inRight">
          <li class="list list-hook"  ref="conwrapper" v-if="showList[4]">
            <ul>
              <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[4]}}" tag="li" class="food-item" v-for="(item,index) in foodLists">

                <img class="food-img" v-lazy="item.ListImg" alt="">

                <div class="content-bottom">
                  <div class="new_left">
                    <p class="new_name ell">{{item.Name}}</p>
                    <p>
                      <span class="new_price">￥{{item.Price}}</span>
                      <span class="new_oldprice">￥{{item.OriginalPrice}}</span>
                    </p>
                  </div>
                  <div class="new_right">
                    <addydcart :food="item" :zhou="getDaysNum[4]"></addydcart>

                  </div>
                </div>
              </router-link>

            </ul>
            <div class="kongfood" v-if="foodLists.length==0">
              <img src="./kong.png" alt="">
            </div>
          </li>
        </transition>
        <!--<transition name="inRgiht">
            <li class="list list-hook" v-if="showList[4]">
              <ul>
                <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[4]}}" tag="li" class="food-item" v-for="(item,index) in foodLists">

                  <img class="food-img" v-lazy="item.ListImg" alt="">

                  <div class="content-bottom">
                    <div class="new_left">
                      <p class="new_name ell">{{item.Name}}</p>
                      <p>
                        <span class="new_price">￥{{item.Price}}</span>
                        <span class="new_oldprice">￥{{item.OriginalPrice}}</span>
                      </p>
                    </div>
                    <div class="new_right">
                      <addydcart :food="item" :zhou="getDaysNum[4]"></addydcart>

                    </div>
                  </div>
                </router-link>
              </ul>
              <div class="kongfood" v-if="foodLists.length==0">
                <img src="./kong.png" alt="">
              </div>
            </li>
          </transition>-->
      </ul>
    </div>
  </div>
</template>
<script>
// import BScroll from 'better-scroll'
// import { Navbar, TabItem } from 'mint-ui';
// import { TabContainer, TabContainerItem } from 'mint-ui';

// Vue.component(TabContainer.name, TabContainer);
// Vue.component(TabContainerItem.name, TabContainerItem);
import { Indicator } from 'mint-ui';

// Vue.component(Navbar.name, Navbar);
// Vue.component(TabItem.name, TabItem);
import context from '../../main.js'
import addydcart from '../addydcart/addydcart.vue'
import router from '../../router'
import BScroll from 'better-scroll'
const ERR_OK = 1
const ERR_NO = 0
export default {
  data() {
    return {
      days: ['星期一', '星期二', '星期三', '星期四', '星期五'],
      daysNum: [1, 2, 3, 4, 5],
      scrollX: 0,
      listWidth: [],
      foodLists: [],
      foodLists1: [],
      foodLists2: [],
      foodLists3: [],
      foodLists4: [],
      foodLists5: [],
      machineid: localStorage.getItem('MachineId'),
      showList: [true, false, false, false, false],
      currentIndex: 0

    }
  },
  created() {
    let machineid=localStorage.getItem('MachineId');
    if(!machineid){
      router.push('search')
    };
    let _self = this
    this.getYdFoods1(_self.getDaysNum[0]);
    // this.getYdFoods2(_self.getDaysNum[1]);
    // this.getYdFoods3(_self.getDaysNum[2]);
    // this.getYdFoods4(_self.getDaysNum[3]);
    // this.getYdFoods5(_self.getDaysNum[4]);


    // _this._initScroll()
    // _this._calculateWidth()
    // console.log(document.querySelectorAll('.list-hook'))
    // this.$nextTick(() => {
    //   this._initScroll()
    //   this._calculateWidth()
    // })

  },
  mounted() {


  },
  computed: {
    getDays() {
      let week = new Date().getDay();
      let _this = this
      let weekDays1 = ['星期一', '星期二', '星期三', '星期四', '星期五'];
      let weekDays2 = ['星期二', '星期三', '星期四', '星期五', '星期一'];
      let weekDays3 = ['星期三', '星期四', '星期五', '星期一', '星期二'];
      let weekDays4 = ['星期四', '星期五', '星期一', '星期二', '星期三'];
      let weekDays5 = ['星期五', '星期一', '星期二', '星期三', '星期四'];

      switch (week) {
        case 1:
          _this.days = weekDays2;

          break;
        case 2:
          _this.days = weekDays3;

          break;
        case 3:
          _this.days = weekDays4;

          break;
        case 4:
          _this.days = weekDays5;

          break;
        default:
          _this.days = weekDays1;

      }
      return _this.days;
    },
    getDaysNum() {
      let week = new Date().getDay();
      let _this = this
      let daysNum1 = [1, 2, 3, 4, 5];
      let daysNum2 = [2, 3, 4, 5, 1];
      let daysNum3 = [3, 4, 5, 1, 2];
      let daysNum4 = [4, 5, 1, 2, 3];
      let daysNum5 = [5, 1, 2, 3, 4];
      switch (week) {
        case 1:

          _this.daysNum = daysNum2;
          break;
        case 2:

          _this.daysNum = daysNum3;
          break;
        case 3:

          _this.daysNum = daysNum4;
          break;
        case 4:

          _this.daysNum = daysNum5;
          break;
        default:

          _this.daysNum = daysNum1;
      }
      return _this.daysNum;
    }

  },
  methods: {

    selectMenu(index, event) {
      this.foodLists = [];
      for (let i = 0; i < 5; i++) {
        this.showList[i] = false;

      }
      this.showList[index] = true
      // console.log(this.showList)
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.currentIndex = index
      let url = context + 'WantFoodList';
      let _this = this;
      let data = {
        MacId: localStorage.getItem('MachineId'),
        Type: 1,
        Zhou: _this.getDaysNum[index]
      }

      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists = response.Data;
         this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.conwrapper, {
            click:false
          });
          this.scroll.refresh();
        })
        Indicator.close()

      })
    },
    getYdFoods1(zhou) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let url = context + 'WantFoodList';
      let _this = this;
      let data = {
        MacId: localStorage.getItem('MachineId'),
        Type: 1,
        Zhou: zhou
      }

      this.$http.post(url, data).then((response) => {
        response = response.body;
        
        this.foodLists = response.Data;
         this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.conwrapper, {
            click:false
          });
          this.scroll.refresh();
        })
        Indicator.close()

      })
    },
    getYdFoods2(zhou) {
      let url = context + 'WantFoodList';
      let _this = this;
      let data = {
        MacId: localStorage.getItem('MachineId'),
        Type: 1,
        Zhou: zhou
      }
      // console.log(data)
      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists2 = response.Data;
         this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.conwrapper, {
            click:false
          });
          this.scroll.refresh();
        })

      });

    },
    getYdFoods3(zhou) {
      let url = context + 'WantFoodList';
      let _this = this;
      let data = {
        MacId: localStorage.getItem('MachineId'),
        Type: 1,
        Zhou: zhou
      }

      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists3 = response.Data;
         this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.conwrapper, {
            click:false
          });
          this.scroll.refresh();
        })

      })
    },
    getYdFoods4(zhou) {
      let url = context + 'WantFoodList';
      let _this = this;
      let data = {
        MacId: localStorage.getItem('MachineId'),
        Type: 1,
        Zhou: zhou
      }

      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists4 = response.Data;
         this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.conwrapper, {
            click:false
          });
          this.scroll.refresh();
        })

      })
    },
    getYdFoods5(zhou) {
      let url = context + 'WantFoodList';
      let _this = this;
      let data = {
        MacId: localStorage.getItem('MachineId'),
        Type: 1,
        Zhou: zhou
      }

      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists5 = response.Data;
         this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.conwrapper, {
            click:false
          });
          this.scroll.refresh();
        })

      })
    },
  },
  components: {
    addydcart: addydcart
  }

}
</script>
<style lang="stylus">
@import '../../common/stylus/base.styl'
.reserve
  width:100%
  overflow:hidden
  .navbar
    width:100%
    height:.88rem
    line-height:.88rem
    position:absolute
    top:0
    left:0
    background:#fff
    z-index:10   
    ul 
      display:flex
      .item
        flex:1
        color:#333
        text-align:center
        box-sizing :border-box
        &.current
          color:#00abeb
          border-bottom:.01rem solid #00abeb
  .content
    width:100% 
    overflow:hidden
    margin-top:.88rem
    height:90%
    // position:fixed
    // margin-top:1rem
    // left:0
    margin-bottom :1.2rem
    .alllists
      width:100%
      // display:flex
      height:100%
      overflow:hidden
      -webkit-overflow-scrolling :touch
      .list
        width:100%
        float:left
        // flex:1
        height:100%
        overflow:hidden
        -webkit-overflow-scrolling :touch
        &.inRight-enter
          opacity :0
          transform :translate3d(100%,0,0)
        &.inRight-leave-to
          opacity :0
          transform :translate3d(-100%,0,0) 
        &.inRight-enter-to,&.inRight-leave
          opacity :1
          transform :translate3d(0,0,0)  
        &.inRight-enter-active,&.inRight-leave-enter 
          transition:all .5s 
        ul
          width:100% 
          .food-item
            width: 6.92rem
            height: 4.61rem
            margin: 0 auto .4rem
            position: relative
            .food-img
              width:100%
              height:100%
            .content-bottom
              width: 100%
              height: 1.42rem
              position: absolute;
              left: 0
              bottom: 0
              background: rgba(255,255,255,.7);
              overflow: hidden
              .new_left
                margin-top: .3rem
                margin-left: .52rem
                float: left
                width: 3.6rem
                .new_name 
                  font-size: .36rem
                  margin-bottom: .15rem
                  font-size: .28rem
                  font-weight: 600
                  padding-right: .18rem  
                .new_oldprice 
                  font-size: .24rem
                  color: #999
                  text-decoration: line-through
              .new_right 
                width: 2.14rem
                height: .84rem
                margin-top: .28rem
                margin-left: .24rem
                float: left;
              // img 
              //   position:fixed
              //   width:.5rem
              //   height:.5rem
              //   border-radius:50%
              //   // position:absolute
              //   bottom:.5rem
              //   left:.75rem
              //   z-index:100 
         
</style>
<style>
.reserve .kongfood {
  width: 3.29rem;
  height: 3.03rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.reserve .kongfood img {
  width: 100%;
  height: 100%;
}
</style>
