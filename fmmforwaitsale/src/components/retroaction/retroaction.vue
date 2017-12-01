<template>
  <div class="retroaction">
    <textarea name="feedback" id="feedback" placeholder="请输入您的宝贵意见" v-model.trim="text"></textarea>
    <div>
      <input type="number" id="phone" v-model.number.trim="phone">
    </div>
    <div>
      <button id="submit" @click.prevent.stop="retroaction" :disabled="show">提交反馈</button>
    </div>
  </div>
</template>
<script>
import context from '../../main.js'
import router from '../../router'
import { Toast } from 'mint-ui';
export default {
  data() {

    return {
      phone: localStorage.getItem('Mobile'),
      text: '',
      show: false
    }
  },
  methods: {
    retroaction: function() {
      let url = context + 'FeedBackSubmit';
      let userid = localStorage.getItem('UserId');
      let data = {
        UserId: userid,
        Content: this.text,
        Phone: this.phone
      };

      if (this.text.length > 0) {
        this.$http.post(url, data).then((res) => {
          res = res.body;
          this.show = true

          if (res.Code == 1) {
            router.push('myinfo')
          }
        })
      } else {
        Toast({
          message: '请输入您的宝贵意见',
          position: 'middle',
          duration: 500
        });
      }

    }
  }
}
</script>
<style>
.retroaction #feedback {
  width: 7rem;
  height: 4rem;
  margin: .25rem auto;
  display: block;
  border: 1px solid #d7d7d7;
  border-radius: .14rem;
  line-height: .36rem;
  text-indent: .3rem;
  letter-spacing: .03rem;
  font-size: .28rem;
  color: #333;
}

.retroaction #phone {
  width: 7rem;
  height: .88rem;
  border: 1px solid #d7d7d7;
  border-radius: .14rem;
  font-size: .28rem;
  letter-spacing: .03rem;
  color: #333;
  display: block;
  margin: 0 auto;
  text-indent: .3rem;
}

.retroaction #submit {
  display: block;
  width: 7rem;
  height: .84rem;
  border: none;
  outline: none;
  background: #00abeb;
  font-size: .3rem;
  color: #fff;
  margin: .9rem auto;
  border-radius: .14rem;
}
</style>
