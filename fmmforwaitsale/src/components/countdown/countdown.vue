<template>
  <span class="countdown">
    {{content}}
  </span>
</template>
<script>
import Vue from 'vue'
import bus from '../../assets/js/eventbus.js'
import context from '../../main.js'
export default {
  props: ['createTime', 'item', 'waitOrder'],
  data() {
    return {
      content: '',
      endText: '支付超时',
      lastTime: Number
    }
  },
  methods: {
    _date: function(str) {
      if (str) {
        var date = new Date();
        date.setTime(Date.parse(str.replace(/-/g, "/")));
        return date;
      } else {
        return 0;
      }
    },
    removeByValue: function(arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break
        }
      }
    },
    countdown: function() {
      let self = this;
      let endTime = this._date(this.createTime)
      let timer = setInterval(function() {
        let startTime = new Date();

        let t = endTime.getTime() + 180000 - startTime.getTime();
        self.item.LastTime = t;
        // Vue.set(self.item,'LastTime',t)

        if (t > 0) {
          let day = Math.floor(t / 86400000);
          let hour = Math.floor((t / 3600000) % 24);
          let min = Math.floor((t / 60000) % 60);
          let sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
          if (day > 0) {
            format = `${day}天${hour}小时${min}分${sec}秒`;
          }
          if (day <= 0 && hour > 0) {
            format = `${hour}小时${min}分${sec}秒`;
          }
          if (day <= 0 && hour <= 0) {
            format = `${min}分${sec}秒`;
          }
          self.content = format;
        } else {
          Vue.set(self.item, 'showstatus', 0);
          let userid = localStorage.getItem('UserId');
          let url = context + 'CancelOrder';
          let data = {
            UserId: userid,
            Type: self.item.OrderType,
            OrderId: self.item.OrderId
          };
          bus.$emit('ifpsyshouw',false)
          self.$http.post(url, data).then((res) => {
            res = res.body;
            if (res.Code == 1) {
             
              self.removeByValue(self.waitOrder, self.item);
              // console.log(_this.waitPayOrder)

            };
            
          })

          clearInterval(timer);
          self.content = self.endText;
          let showTime = false
          self.$emit('notime', showTime);
          // self.removeByValue(self.waitOrder, self.item);
          // console.log(self.waitOrder)
          // self._callback();
        }
      }, 1000);
    },
    // _callback() {
    //   if (this.callback && this.callback instanceof Function) {
    //     this.callback(...this);
    //   }
    // }
  },
  created() {
    // console.log(this.createTime)
    this.countdown()
  }
}
</script>
<style>

</style>

