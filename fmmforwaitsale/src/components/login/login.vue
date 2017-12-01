<template>
  <div class="login">
    <!--<div class="forms">-->
    <div class="logo" :class="{andro:ifAndroid}"></div>
    <input type="text" @focus="android" @blur="blurand" id="mobile" placeholder="请输入手机号码" v-model.number.trim="phone">
    <button id="mobile_code" @click="getCode" :disabled="btnunable">{{text}} </button>
    <!--<input type="button" id="mobile_code" value="获取验证码" ref="getcode">-->
    <div class="code">
      <input type="text"  @focus="android" @blur="blurand" id="code_num" placeholder="请输入验证码" v-model.number.trim="code">
      <!--<transition name="fade">
                    <div class="pops" v-if="show">
                      {{showtext}}
                    </div>
                  </transition>-->

    </div>
    <div class="log">
      <button id="login" @click="login" :disabled="btnclick">登录</button>
    </div>

    <!--</div>-->
  </div>
</template>
<script>
import context from '../../main.js'
import router from '../../router'
import { Toast } from 'mint-ui';
const ERR_OK = 1
const ERR_NO = 0
export default {
  data() {
    return {
      phone: '',
      code: '',
      text: '获取验证码',
      btnunable: false,
      show: false,
      showtext: '',
      btnclick: false,
      islogin: true,
      ifAndroid:false
    }
  },
  methods: {
    getCode: function() {
      let mobile_reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
      let _this = this;
      let time = 60;
      // console.log(mobile_reg.test(_this.phone), this.phone)
      if (!mobile_reg.test(_this.phone)) {
        Toast({
          message: '请输入正确手机号码',
          position: 'middle',
          duration: 500
        });
        return
      }

      let url = context + 'FetchMsgCode';

      this.$http.post(url, { Phone: this.phone }).then((response) => {
        this.show = true;
        response = response.body;
        let errnum = response.Code;
        // console.log(errnum, ERR_OK)
        if (errnum == ERR_OK) {
          // this.showtext = '验证码获取成功';
          // setTimeout(function() {
          //   _this.show = false
          // }, 600)
          let timer = setInterval(function() {
            time--;
            _this.text = `${time}S后获取`;
            if (time == 0) {
              _this.btnunable = false;
              clearInterval(timer);
              _this.text = '重新获取'
            }

          }, 1000);
          this.btnunable = true;
          Toast({
            message: '验证码获取成功',
            position: 'middle',
            duration: 500
          });
          zhuge.identify(_this.phone)
          zhuge.track('获取验证码')
        } else {
          // this.showtext = '验证码获取失败';
          // setTimeout(function() {
          //   _this.show = false
          // }, 600)
          Toast({
            message: '验证码获取失败',
            position: 'middle',
            duration: 500
          });
          zhuge.track('获取验证码失败')
        }
      })

    },
    login: function() {
      let _this = this;
      let url = context + 'weixin/wxregact!phoneAndSmscodeLogin.do';
      let data = {
        phone: this.phone,
        smscode: this.code
      };
      this.$http.post(url, data).then((response) => {
        this.show = true
        response = response.body;
        let errnum = response.Code;
        if (errnum == ERR_OK || errnum == 2) {
          // console.log(response.Data)
          localStorage.setItem('UserId', response.Data)
          localStorage.setItem('Mobile', this.phone)
          // this.showtext = '登录成功';
          this.btnclick = true
          Toast({
            message: '登录成功',
            position: 'middle',
            duration: 500
          });
          zhuge.track('登陆成功', {
            '手机号': _this.phone
          })
          router.push('home')
          this.islogin = false
        } else {
          zhuge.track('登陆失败', {
            '手机号': _this.phone,
            '原因': response.Msg
          })
          Toast({
            message: response.Msg,
            position: 'middle',
            duration: 500
          });
        }
      })
    },
    android:function(){
       if (/Android/gi.test(navigator.userAgent)) {
         this.ifAndroid=true
      }
    },
    blurand:function(){
       if (/Android/gi.test(navigator.userAgent)) {
         this.ifAndroid=false
      }
    }
  },
  created() {
    zhuge.track('进入登陆页');
    
  }
}
</script>
<style lang="stylus">
  .login
    width:7rem
    position:fixed
    top:0
    right:0
    bottom:0
    left:0
    margin:auto
    height:100%
    z-index:40
    .logo
      width: 4.72rem
      height: 0.84rem
      margin: 1.6rem auto 1.15rem;
      background: url(./logo.png) 0 0 no-repeat
      background-size: 100% 100%
      &.andro
        margin:-1.6rem auto 1.15rem
    #mobile
      width: 4.62rem
      height: 0.98rem
      border: 1px solid #d7d7d7
      font-size: 0.3rem
      /* color: #d8d8d8; */
      text-indent: 0.38rem
      letter-spacing: 0.02rem
      -webkit-box-shadow: 0 0 0px 1000px white inset
    #mobile_code 
      width: 2.1rem
      height: 0.82rem
      font-size: 0.28rem
      color: #fff
      text-align: center
      background: #00abeb
      border-radius: 0.08rem
      outline: none
      border: none
      margin-left: 0.1rem
    .code
      width: 7rem
      margin: 0.28rem auto 0.92rem
      position: relative 
      #code_num 
        width: 6.98rem
        height: 0.98rem
        border: 1px solid #d7d7d7
        font-size: 0.3rem
        /* color: #d8d8d8; */
        text-indent: 0.38rem
        box-sizing: border-box
        letter-spacing: 0.02rem
        -webkit-box-shadow: 0 0 0px 1000px white inset
      .pops 
        position: absolute
        width: 5rem
        height: 0.8rem
        line-height:.8rem
        background:rgba(0,0,0,.4)
        /* margin: 0.14rem auto 0; */
        top:0
        left: 0
        right:0
        bottom:0
        margin:auto
        text-align: center
        font-size: 0.34rem
        color: #fff
        opacity :0
        border-radius:.5rem
        &.fade-enter-active,&.fade-leave-active
          transition: all 1.5s
        &.fade-enter,&.fade-leave
          opacity :1 
    .log
      width: 7rem
      margin: 0 auto 
      #login 
        width: 7rem
        height: 0.82rem
        font-size: 0.3rem
        color: #fff
        text-align: center
        background: #00abeb
        border-radius: 0.08rem
        outline: none
        border: none
        letter-spacing: 0.03rem  
    .mask
      position:fixed
      width:100%
      height:100%
      top:0
      left:0
      background:#f8f8f8 
      z-index:-1     
</style>
