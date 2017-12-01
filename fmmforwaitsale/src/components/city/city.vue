<template>
  <div class="city">
    <p class="loccity">定位城市</p>
    <ul>
      <router-link to="/search" class="listcity">
        <li v-for="city in citys" class="cityxz" @click="getCity(city.City)" v-text="city.City"></li>
      </router-link>
    </ul>
    <p class="loccity">即将开通城市</p>
    <ul style="margin-left:.25rem">
      <!--<router-link to="/search" class="listcity">-->
        <li v-for="city in comingcities" class="cityxz comcity"  v-text="city.CityNext"></li>
      <!--</router-link>-->
    </ul>
    <!--<reserve></reserve>-->
    <!--<login></login>-->
  </div>
</template>
<script>
import context from '../../main.js'
// import reserve from '../reserve/reserve.vue'
// import login from '../login/login.vue'

export default {
  data() {
    return {
      citys: [],
      comingcities:[]
    }
  },
  created() {
    zhuge.track('进入城市选择页')
    // localStorage.setItem('city','北京');

    // location.reload();
    this.allCity();
    this.allCityNexts();

  },
  methods: {
    getCity: function(city) {
      localStorage.setItem('city', city);
      zhuge.track('城市选择', {
        '城市': city
      })
    },
    allCity: function() {

      let url = context + 'GetCitys';
      this.$http.get(url).then((response) => {
        response = response.body;
        // console.log(response)
        this.citys = response.Data
      })
    },
    allCityNexts: function() {

      let url = context + 'GetCityNexts';
      this.$http.get(url).then((response) => {
        response = response.body;
        // console.log(response)
        this.comingcities = response.Data
      })
    }
  },
}
</script>
<style lang="stylus">
.city
  .loccity
    margin: .5rem 0 .3rem .25rem
    font-size: .28rem
    color: #666
  .listcity
    display:block
    // width:2.08rem
    // height:.82rem 
    margin-left: .25rem 
    float:left
  ul
    .cityxz
      width: 2.08rem
      height: .82rem
      line-height:.82rem
      box-sizing: border-box
      border: .02rem solid #d7d7d7
      border-radius: .14rem
      background: transparent
      font-size: .28rem
      color: #333
      text-align:center
      float:left
      margin-right:.2rem
      margin-bottom:.2rem
      width:2rem
      height:.82rem
    .comcity  
      width: 2.08rem
      height: .82rem
      line-height:.82rem
      box-sizing: border-box
      border: .02rem solid #999
      border-radius: .14rem
      background: transparent
      font-size: .28rem
      color: #999
      text-align:center
      float:left
      margin-right:.2rem
      margin-bottom:.2rem
      width:2rem
      height:.82rem
</style>
