<template>
  <div class="reserve" id="reserve">
    <div class="navbar" ref="navwrapper">
      <ul>
        <li class="item" v-for="(item,index) in getDays" @click="selectMenu(index,$event)" :class="{'current':currentIndex==index}">{{item}} </li>
      </ul>
    </div>
    <div class="content" ref="conwrapper">
      <ul class="alllists">
        <li class="list list-hook" ref="listwrapper">
          <ul>
            <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[0]}}" tag="li" class="food-item" v-for="(item,index) in foodLists1">

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
        </li>
        <li class="list list-hook">
          <ul>
            <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[1]}}" tag="li" class="food-item" v-for="(item,index) in foodLists2">

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
        </li>
        <li class="list list-hook">
          <ul>
            <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[2]}}" tag="li" class="food-item" v-for="(item,index) in foodLists3">

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
        </li>
        <li class="list list-hook">
          <ul>
            <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[3]}}" tag="li" class="food-item" v-for="(item,index) in foodLists4">

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
        </li>
        <li class="list list-hook">
          <ul>
            <router-link :to="{path:'fooddetail',query:{foodid:item.FoodId,machineid:machineid,zhou:getDaysNum[4]}}" tag="li" class="food-item" v-for="(item,index) in foodLists5">

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
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import context from '../../main.js'
import addydcart from '../addydcart/addydcart.vue'
const ERR_OK = 1
const ERR_NO = 0
export default {
  data() {
    return {
      days: ['星期一', '星期二', '星期三', '星期四', '星期五'],
      daysNum: [1, 2, 3, 4, 5],
      scrollX: 0,
      listWidth: [],
      foodLists1: [],
      foodLists2: [],
      foodLists3: [],
      foodLists4: [],
      foodLists5: [],
      machineid: localStorage.getItem('MachineId')

    }
  },
  created() {
    let _self = this
    this.getYdFoods1(_self.getDaysNum[0]);
    this.getYdFoods2(_self.getDaysNum[1]);
    this.getYdFoods3(_self.getDaysNum[2]);
    this.getYdFoods4(_self.getDaysNum[3]);
    this.getYdFoods5(_self.getDaysNum[4]);
    let _this = this;

    // _this._initScroll()
    // _this._calculateWidth()
    // console.log(document.querySelectorAll('.list-hook'))
    // this.$nextTick(() => {
    //   this._initScroll()
    //   this._calculateWidth()
    // })

  },
  mounted() {
    let _this = this;
    setTimeout(function() {
      _this.$nextTick(() => {
        _this._initScroll()
        _this._calculateWidth()
      })
    }, 2000)

    // this.$nextTick(() => {
    //   this._initScroll()
    //   this._calculateWidth()
    // })
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listWidth.length; i++) {
        let width1 = this.listWidth[i]
        let width2 = this.listWidth[i + 1]
        if (!width2 || (this.scrollX >= width1 && this.scrollX < width2)) {
          return i
        }
      }
      return 0;
    },
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
    _initScroll() {
      this.navScroll = new BScroll(this.$refs.navwrapper, {
        scrollX: true,
        // freeScroll:true,
        click: true
      });
      this.conScroll = new BScroll(this.$refs.conwrapper, {
        scrollX: true,
        scrollY: true,
        click: true,
        preventDefault: false,
        probeType: 3
      });
      let startX = 0;
      let endX = 0;
      // let nowX=0;
      this.conScroll.on('scroll', (pos) => {
        this.scrollX = Math.abs(Math.round(pos.x));
        // console.log(nowX)
      });
      let _this = this;
      let listhooks = document.querySelectorAll('.list-hook')
      let listwidth = document.querySelector('.list-hook').clientWidth
      let alllist = document.querySelector('.alllists')
      // let listwidth = this.$refs.listwrapper.clientWidth;
      // let reserves=document
      alllist.addEventListener('touchstart', function(event) {
        let touch = event.targetTouches[0];
        startX = touch.pageX;
        // console.log(startX)
      })
      alllist.addEventListener('touchend', function(event) {
        // _this.conScroll.on('scrollEnd', (pos) => {
        //   endX = Math.abs(Math.round(pos.x));
        //   console.log(endX)
        //   let index = Math.ceil(endX / listwidth);
        //  console.log(endX,index,listwidth)
        // console.log(_this.currentIndex)
        // _this.conScroll.scrollToElement(listhooks[_this.currentIndex], 400)
        // });

        let touch = event.changedTouches[0];
        endX = touch.pageX;
        // console.log(endX)
        // let index = Math.ceil(endX / listwidth);
        //  console.log(endX,index,listwidth)
        // _this.conScroll.scrollToElement(listhooks[index], 500)
      })

    },
    _calculateWidth() {
      let conWidth = this.$refs.conwrapper.getElementsByClassName('list-hook');
      let width = 0;
      this.listWidth.push(width);
      for (let i = 0; i < conWidth.length; i++) {
        let item = conWidth[i];
        width += item.offsetWidth;
        this.listWidth.push(width)
      }
      return this.listWidth
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return
      }
      let conlist = this.$refs.conwrapper.getElementsByClassName('list-hook');
      let el = conlist[index];
      this.conScroll.scrollToElement(el, 500)
    },
    getYdFoods1(zhou) {
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
        this.foodLists1 = response.Data;
        // this.$nextTick(() => {
        //   this._initScroll()
        //   this._calculateWidth()
        // })

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
        // this.$nextTick(() => {
        //   this._initScroll()
        //   this._calculateWidth()
        // })
      });
      // let list = this.$
      // let listHeight = 0;
      // let foodList=list.getElementsByClassName('food-item');
      // for(let i=0;i++;i<foodList.length){
      //   listHeight+=foodList[i].clientHeight
      // };
      // console.log(list, listHeight)
      //  this.$refs.conwrapper.clientHeight=listHeight
    },
    getYdFoods3(zhou) {
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
        this.foodLists3 = response.Data;
        // this.$nextTick(() => {
        //   this._initScroll()
        //   this._calculateWidth()
        // })
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
      // console.log(data)
      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists4 = response.Data;
        // this.$nextTick(() => {
        //   this._initScroll()
        //   this._calculateWidth()
        // })
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
      // console.log(data)
      this.$http.post(url, data).then((response) => {
        response = response.body;
        this.foodLists5 = response.Data;
        // this.$nextTick(() => {
        //   this._initScroll()
        //   this._calculateWidth()
        // })
      })
    },
  },
  components: {
    addydcart: addydcart
  }

}
</script>
// <style lang="stylus">
// @import '../../common/stylus/base.styl'
// .reserve
//   width:100%
//   overflow:hidden
//   .navbar
//     width:100%
//     height:.88rem
//     line-height:.88rem
//     position:absolute
//     top:0
//     left:0
//     background:#fff
//     z-index:10   
//     ul 
//       display:flex
//       .item
//         flex:1
//         color:#333
//         text-align:center
//         box-sizing :border-box
//         &.current
//           color:#00abeb
//           border-bottom:.01rem solid #00abeb
//   .content
//     width:100% 
//     overflow:hidden
//     // margin-top:.88rem
//     height:82%
//     position:absolute
//     top:.88rem
//     left:0
//     .alllists
//       width:500%
//       display:flex
//       height:9.92rem
//       .list
//         flex:1
//         // height:9.92rem
//         overflow:auto
//         -webkit-overflow-scrolling :touch
//         ul
//           width:100% 
//           .food-item
//             width: 6.92rem
//             height: 4.61rem
//             margin: 0 auto .4rem
//             position: relative
//             .food-img
//               width:100%
//               height:100%
//             .content-bottom
//               width: 100%
//               height: 1.42rem
//               position: absolute;
//               left: 0
//               bottom: 0
//               background: rgba(255,255,255,.7);
//               overflow: hidden
//               .new_left
//                 margin-top: .3rem
//                 margin-left: .52rem
//                 float: left
//                 width: 3.6rem
//                 .new_name 
//                   font-size: .36rem
//                   margin-bottom: .15rem
//                   font-size: .28rem
//                   font-weight: 600
//                   padding-right: .18rem  
//                 .new_oldprice 
//                   font-size: .24rem
//                   color: #999
//                   text-decoration: line-through
//               .new_right 
//                 width: 2.14rem
//                 height: .84rem
//                 margin-top: .28rem
//                 margin-left: .24rem
//                 float: left;
//               // img 
//               //   position:fixed
//               //   width:.5rem
//               //   height:.5rem
//               //   border-radius:50%
//               //   // position:absolute
//               //   bottom:.5rem
//               //   left:.75rem
//               //   z-index:100 
         
// </style>
