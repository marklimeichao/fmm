<template>
  <div class="searchss" ref="searchwrapper">
    <div>
      <div id="header">

        <input class="searchs" type="text" v-model.trim="content" placeholder="请输入商圈名">
        <img class="head-img" src="./search-ali.png" alt="">
        <button class="search-btn" @click="searchFbb" :disabled="ifAble">搜索</button>
      </div>
      <div class="search-kong">
      </div>
      <div class="search-loc">
        <!--<router-link to="/home">-->
        <img src="./location-ali.png" alt="">
        <span>{{firstloc}}</span>
        <!--</router-link>-->
      </div>
      <div class="search-kong2">
      </div>

      <ul class="near-content" v-if="oftenFbb.length>0">
        <div class="nearfbb">常用点位</div>
        <router-link to="/home">
          <li v-for="item in oftenFbb" class="list" @click="emitKeyWord(item.KeyWord,item.MachineId,item.Location,item)">
            <div class="fbb-sear-loc">
              <span class="keyword over-ell">{{item.KeyWord}}</span>
              <span class="distance over-ell">{{item.Distance}}千米</span>
            </div>
            <div class="list-detail">{{item.Location}}</div>
          </li>
          <li class="list" v-if="oftenFbb.length==0">您还没有常用点位</li>
        </router-link>
      </ul>

      <div class="search-kong2">
      </div>
      <transition name="fade">
        <ul class="content" v-if="show">
          <div class="nearfbb">附近饭饱宝</div>
          <router-link to="/home">
            <li v-for="item in fmm" class="list" @click="emitKeyWord(item.KeyWord,item.MachineId,item.Location,item)">
              <div class="fbb-sear-loc">
                <span class="keyword over-ell">{{item.KeyWord}}</span>
                <span class="distance over-ell">{{item.Distance}}千米</span>
              </div>
              <div class="list-detail">{{item.Location}}</div>
            </li>
          </router-link>
        </ul>
      </transition>
      <transition name="fade">
        <ul class="search-content" v-if="!show">
          <div class="nearfbb">搜索结果</div>
          <router-link to="/home">
            <li v-for="item in fmm" class="list" @click="emitKeyWord(item.MacName,item.MacId,item.MacAddress,item)">
              <div class="fbb-sear-loc">
                <span class="keyword over-ell">{{item.MacName}}</span>
              </div>
              <div class="list-detail">{{item.MacAddress}}</div>
              <!--<span class="distance over-ell">{{item.Distance}}千米</span>-->
            </li>
            <li class="list" v-if="fmm.length==0">此区域没有饭饱宝</li>
          </router-link>
        </ul>

      </transition>
      <bmap v-on:getAdd="getpos"></bmap>
      <div style="width:100%;height:1rem"></div>
    </div>
  </div>
</template>
<script>
const ERR_OK = 1
import bmap from '../bmap/bmap.vue'
import context from '../../main.js'
import bus from '../../assets/js/eventbus.js'
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      add: [],
      fmm: [],
      ifAble: false,
      show: true,
      firstloc: '',
      oftenFbb: []
    }

  },
  created() {
    zhuge.track('进入饭饱宝选择页');
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.search, {
    //     click: true,
    //     // preventDefault:false
    //   });
    //   this.scroll.refresh()
    // })
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.search, {
    //     click: true,
    //     // preventDefault:false
    //   });
    //   this.scroll.refresh()
    // })
  },
  methods: {
    getpos: function(...data) {
      this.add = data;
      let adds = data;
      let ct = localStorage.getItem('city')
      let url = context + 'MachineList'
      this.$http.post(url, {
        Lon: adds[0],
        Lat: adds[1],
        Type: 2,
        KeyWord: ct
      }).then((response) => {
        response = response.body;

        this.errno = response.Code;
        if (this.errno = ERR_OK) {
          this.fmm = response.Data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.searchwrapper, {
              click: true,
              // preventDefault:false
            });
            // console.log('test0')
            // this.scroll.refresh()
          })
          // this.oftenFbb = response.Data;
          if (localStorage.getItem('KeyWord')) {
            this.firstloc = localStorage.getItem('KeyWord')
          } else {
            this.firstloc = response.Data[0].KeyWord
          }
          // console.log(this.fmm)

        }

      });
      this.$http.post(url, {
        Lon: adds[0],
        Lat: adds[1],
        Type: 1,
        KeyWord: ct
      }).then((response) => {
        response = response.body;
        this.errno = response.Code;
        if (this.errno = ERR_OK) {
          // this.fmm = response.Data;
          this.oftenFbb = response.Data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.searchwrapper, {
              click: true,
              // preventDefault:false
            });
            // console.log('test1')
            // this.scroll.refresh()
          })
          // if (localStorage.getItem('KeyWord')) {
          //   this.firstloc = localStorage.getItem('KeyWord')
          // } else {
          //   this.firstloc = response.Data[0].KeyWord
          // }
          // console.log(this.fmm)

        }

      })
    },
    // 获取常用点位
    getOftenFbb: function() {

    },
    emitKeyWord: function(keyword, machineid, location, item) {
      localStorage.setItem('MachineId', machineid);
      localStorage.setItem('KeyWord', keyword);
      localStorage.setItem('Location', location);
      if (item.City) {
        localStorage.setItem('city', item.City)
      };
      zhuge.track('饭饱宝选择', {
        '设备名称': keyword
      });
      let machineInfo = {
        KeyWord: keyword,
        Location: location,
        MachineId: machineid
      };
      setTimeout(function() {
        bus.$emit('getKeyWord', machineInfo)
      }, 600)

    },
    searchFbb: function() {
      this.show = false
      let _this = this;
      let data = { Content: _this.content };
      let url = context + 'SearchList';
      this.$http.post(url, data).then((response) => {
        response = response.body;
        _this.fmm = response.Data.Machine;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.searchwrapper, {
            click: true,
            // preventDefault:false
          });
          // console.log('test1')
          // this.scroll.refresh()
        })
        // console.log(data, response)
      })
    }
  },
  components: {
    bmap: bmap
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/base.styl'
.searchss
  width:7.5rem
  padding-bottom:1.2rem
  background:#fff
  height:90%
  overflow:hidden
  // min-height:90%
  #header
    width:7rem
    margin:0 auto 
    height:.9rem
    overflow:hidden
    position:relative
    .head-img
      display:block
      width:.25rem
      height:.25rem
      position:absolute
      top:.32rem
      left:.28rem
    .searchs
      display:block
      width:5.5rem
      height:.62rem
      border-radius:.31rem
      border:none
      float:left
      text-indent:.6rem
      box-sizing :border-box
      background:#fff
      color:#333
      font-size:.26rem
      line-height:.62rem
      background:#f8f8f8
      margin-top:.14rem
    .search-btn 
      display:block
      width:1.5rem
      height:.62rem
      border:none
      background:rgba(0,0,0,0)
      box-sizing :border-box
      color:#fff
      border-radius:0
      margin-top:0.14rem
      color:#00abeb
  .content,.search-content,.near-content
    // margin-top:.8rem 
    margin-bottom:.1rem
    overflow:hidden
    -webkit-overflow-scrolling :touch
    .nearfbb
      width:7rem
      margin:0 auto
      color:#b5b5b5
      margin-top:.3rem
      margin-bottom:.3rem
    .list
      box-sizing: border-box;
      width: 7rem;
      height: 1.1rem;
      margin: 0 auto .3rem;
      border-bottom: .01rem solid #f8f8f8;
      font-size: .30rem;
      color: #333;
      .keyword
        font-size: .3rem;
        color: #333;
        width: 5rem;
        display:block
        float:left
      .distance
        display: block
        float:right
        font-size: .3rem
        height: .5rem
        line-height: .5rem  

  .content
    &.fade-leave-active
      transition:all .5s
    &.fade-leave-to    
      opacity :0
  .search-content
    // opacity :0
    &.fade-enter-active
      transition:all .5s
    &.fade-enter  
      opacity :0  
    &.fade-enter-to
      opacity :1    
</style>
<style>
.searchss .search-kong {
  width: 100%;
  height: .2rem;
  background: #f8f8f8;
}

.searchss .search-loc {
  width: 100%;
  height: .9rem;
  line-height: .9rem;
  vertical-align: middle;
  overflow: hidden;
}

.search-loc img {
  display: block;
  font-size: .28rem;
  float: left;
  margin-left: .25rem;
  width: .32rem;
  height: .32rem;
  margin-top: .29rem;
  margin-right: .25rem;
}

.search-loc span {
  display: block;
  font-size: .28rem;
  color: #000;
  float: left;
}

.searchss .search-kong2 {
  width: 100%;
  height: .1rem;
  background: #f8f8f8
}

.list .list-detail {
  font-size: .26rem;
  color: #7e7e7e;
}

.fbb-sear-loc {
  width: 100%;
  height: .5rem;
}
</style>

