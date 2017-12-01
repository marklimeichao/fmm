<template>
  <div id="app" ref="appwrapper">
    <div class="appwrapper">
      <transition :name="transitionName">
        <router-view class="view"></router-view>
      </transition>

      <div class="foot" v-if="show">
        <footerbar></footerbar>
      </div>
    </div>
  </div>
</template>

<script>
import footerbar from './components/footerbar/footbar';
import city from './components/city/city';
import context from './main.js';
import bus from './assets/js/eventbus.js'
import BScroll from 'better-scroll'
const ERR_OK = 1;
const ERR_NO = 0;

export default {
  name: 'app',
  data() {
    return {
      show: true
    }
  },

  components: {
    footerbar: footerbar,
    city: city
  },
  created() {

    let _this = this
    bus.$on('footShow', function(data) {

      _this.show = data
      //  console.log(data,_this.show)
    });
    bus.$on('footChooseShow', function(data) {
      _this.show = data
      //  console.log(data,_this.show)
    });
    bus.$on('returnShow', function(data) {
      _this.show = data;
      // console.log(data,_this.show)
    });
    // this.stopDrop();
  },
  mounted() {
    if (/Android/gi.test(navigator.userAgent)) {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.appwrapper, {
          click: true,
          preventDefault: false
        })
      })
    } else {
      this.scroll = new BScroll(this.$refs.appwrapper, {
        click: true,
        //  preventDefault:false
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.show = true;
      if (to.path == '/') {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
    }
  },
  methods: {
    stopDrop: function() {
      document.body.ontouchmove = function(e) {
        e.preventDefault();
      };

      // 然后取得触摸点的坐标
      var startX = 0, startY = 0;
      //touchstart事件
      function touchSatrtFunc(evt) {
        try {
          //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
          var touch = evt.touches[0]; //获取第一个触点
          var x = Number(touch.pageX); //页面触点X坐标
          var y = Number(touch.pageY); //页面触点Y坐标
          //记录触点初始位置
          startX = x;
          startY = y;

        } catch (e) {
          alert('touchSatrtFunc：' + e.message);
        }
      }
      document.addEventListener('touchstart', touchSatrtFunc, false);

      // 然后对允许滚动的条件进行判断，这里讲滚动的元素指向body
      var _ss = document.body;
      _ss.ontouchmove = function(ev) {
        var _point = ev.touches[0],
          _top = _ss.scrollTop;
        // 什么时候到底部
        var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
        // 到达顶端
        if (_top === 0) {
          // 阻止向下滑动
          if (_point.clientY > startY) {
            ev.preventDefault();
          } else {
            // 阻止冒泡
            // 正常执行
            ev.stopPropagation();
          }
        } else if (_top === _bottomFaVal) {
          // 到达底部 如果想禁止页面滚动和上拉加载，讲这段注释放开，也就是在滚动到页面底部的制售阻止默认事件
          // 阻止向上滑动
          // if (_point.clientY < startY) {
          //     ev.preventDefault();
          // } else {
          //     // 阻止冒泡
          //     // 正常执行
          //     ev.stopPropagation();
          // }
        } else if (_top > 0 && _top < _bottomFaVal) {
          ev.stopPropagation();
        } else {
          ev.preventDefault();
        }
      };
    }
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.appwrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

<style lang="stylus">
.view 
  position: absolute
  left: 0
  top: 0
  width: 100%
  // min-height:100%
  bottom:1.2rem
  overflow:hidden
  overflow-y:auto
  -webkit-overflow-scrolling :touch
  // padding-bottom:1rem
  transition: all .5s cubic-bezier(.55, 0, .1, 1)
  &.slide-left-enter,&.slide-right-leave-active 
    opacity: 0
    -webkit-transform: translate(7.5rem, 0)
    transform: translate(7,5rem, 0)
  &.slide-left-leave-active,&.slide-right-enter 
    opacity: 0
    -webkit-transform: translate(-7.5rem, 0)
    transform: translate(-7.5rem, 0)
.foot
  position:absolute
  left:0
  bottom:0
  width:100%
  height:1.2rem
  margin:0 auto
  z-index :50
  background:#f8f8f8

</style>

