<template>
    <div class="info">
        <div class="top">
            <div class="portrait">
                <router-link to="/home">
                    <img :src="myInfo.Photo" alt="">
                </router-link>
            </div>
            <p class="info_name">{{decodeName}}</p>
        </div>
        <div class="content">
            <ul>
                <li class="list clear">
                    <span class="list_left"></span>
                    <router-link class="clear" to="/mycoupon" tag="div">
                        <span class="list_middle"> 我的优惠券 </span>
                        <span class="list_right"></span>
                    </router-link>
                </li>
                <li class="list clear">
                    <span class="list_left list_order"></span>
                    <router-link class="clear" to="/mealtaken"  tag="div">
                        <span class="list_middle"> 我的订单 </span>
                        <span class="list_right"></span>
                    </router-link>
                </li>
                <li class="list clear">
                    <span class="list_left list_invoice"></span>
                    <div class="clear" @click="showDown">
                        <span class="list_middle"> 申请发票 </span>
                        <span class="list_right"></span>
                    </div>
                </li>
                <li class="list clear">
                    <span class="list_left list_contact"></span>
                    <router-link to="/connect" class="clear"  tag="div">
                        <span class="list_middle"> 联系我们 </span>
                        <span class="list_right"></span>
                    </router-link>
                </li>

            </ul>

            </div>
            <div>
                <button class="list_logout" @click="logout">退出登录</button>
            </div>

            </div>
</template>
<script>
import Vue from 'vue'
import context from '../../main.js'
import router from '../../router'
import { Base64 } from 'js-base64';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            myInfo: {},
            nickName: ''

        }
    },
    created() {
        let userid = localStorage.getItem('UserId');
        if (!userid) {
            router.push('login')
        }
        this.getSelfInfo()
    },
    computed: {
        decodeName() {

            if (this.nickName.length != 11) {
                this.nickName = Base64.decode(this.nickName);
            }
            return this.nickName
        }
    },
    methods: {
        getSelfInfo() {
            let url = context + 'UserInfo';
            let userid = localStorage.getItem('UserId');
            this.$http.post(url, { UserId: userid }).then((res) => {
                res = res.body;
                this.myInfo = res.Data
                this.nickName = res.Data.Nickname
            })
        },
        showDown() {
            // MessageBox({
            //     title: '需要下载APP',
            //     message: '确定跳转到下载页?',
            //     showCancelButton: true
            // });
            let title='需要下载APP';
            let message='确定跳转到下载页?';
            let showCancelButton=true;
            MessageBox.confirm(message,title).then(action => {
                window.location.href="http://www.fmeimei.com/fanmeimei/apkdown.html"
            });
        },
        logout(){
            zhuge.track('退出登录')
            localStorage.clear();
            router.push('home')
        }
    }

}
</script>
<style>
.info{
    background:#fff;
}
.info .top {
    width: 100%;
    height: 3.12rem;
    text-align: center;
    background: #fff;
    overflow: hidden;
}

.info .portrait {
    width: 1.8rem;
    height: 1.8rem;
    margin: .3rem auto .25rem;
    border-radius: 50%;
    overflow: hidden;
}

.info .portrait img {
    width: 1.8rem;
    height: 1.8rem;
    border: 0;
    border-style: none;
    display: block;
}

.info .info_name {
    font-size: .36rem;
    color: #333;
    margin: 0 auto .15rem;
}

.info .content {
    width: 100%;
    /*height: 4.24rem;*/
    background: #fff;
    overflow: hidden;
}

.info .list {
    width: 100%;
    height: 1.06rem;
    box-sizing: border-box;
    position: relative;
}

.info .list span {
    display: block;
    float: left;
}

.info .list div {
    float: left;
    width: 6.3rem;
    height: 1.06rem;
    box-sizing: border-box;
    border-bottom: 1px solid #f8f8f8;
}

.info .list_left {
    width: .4rem;
    height: .36rem;
    background: url(./coupon_my.png) 0 0 no-repeat;
    background-size: 100% 100%;
    margin: .33rem .2rem .33rem .3rem;
}

.info .list_middle {
    font-size: .36rem;
    color: #333;
    float: left;
    margin-top: .25rem;
}

.info .list .list_right {
    width: .23rem;
    height: .27rem;
    background: url(./next_my.png) 0 0 no-repeat;
    background-size: 100% 100%;
    float: right;
    margin-top: .32rem;
}

.info .list_order {
    background-image: url(./order_my.png);
}

.info .list_invoice {
    background-image: url(./invoice_my.png)
}

.info .list_contact {
    background-image: url(./contact_my.png)
}

.info .list_logout {
    width: 7rem;
    display: block;
    height: .9rem;
    /* position: fixed; */
    margin-left: .25rem;
    /* bottom: 2rem; */
    margin-top: 1.5rem;
    background: #00abeb;
    color: #fff;
    font-size: .3rem;
    border-radius: .14rem;
}
</style>