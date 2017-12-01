import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
// import mealtaken from '@/components/mealtaken/mealtaken'
import mealtaken from '@/components/orderlist/orderlist'
import mealtotaken from '@/components/mealtotaken/mealtotaken'
import waitpayorder from '@/components/waitpayorder/waitpayorder'
import ydorderlist from '@/components/ydorderlist/ydorderlist'
import invalidorder from '@/components/invalidorder/invalidorder'
import completeorder from '@/components/completeorder/completeorder'


import cart from '@/components/cart/cart'
import reserve from '@/components/reserve/reserve'
import city from '@/components/city/city'
import search from '@/components/search/search'
import todaycart from '@/components/todaycart/todaycart'
import ydcart from '@/components/ydcart/ydcart'
import login from '@/components/login/login'
import fooddetail from '@/components/fooddetail/fooddetail'
import order from '@/components/order/order'
import ydorder from '@/components/ydorder/ydorder'
import myinfo from '@/components/myinfo/myinfo'
// import mycoupon from '@/components/mycoupon/mycoupon'
import mycoupon from '@/components/newmycoupon/newmycoupon'
import validcou from '@/components/validcou/validcou'
import invalidcou from '@/components/invalidcou/invalidcou'
import connect from '@/components/connect/connect'
import retroaction from '@/components/retroaction/retroaction'
import mybook from '@/components/mybook/mybook'
// import myinfo from '@/components/myinfo/myinfo'
// import VueResource from 'vue-resource'

Vue.use(Router)
// Vue.use(VueResource)

const router = new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home'

    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '今日购'
      }
    },
    {
      path: '/mealtaken',
      name: 'mealtaken',
      component: mealtaken,
      // meta: {
      //   title: '订单'
      // },
      children: [
        {
          path: '',
          redirect: 'taken'
        },
        {
          path: 'taken',
          component: mealtotaken,
          meta: {
            title: '待取餐订单'
          }
        },
        {
          path: 'ydorder',
          component: ydorderlist,
          meta: {
            title: '预定订单'
          }
        },
        {
          path: 'topay',
          component: waitpayorder,
          meta: {
            title: '待支付订单'
          }
        },
        {
          path: 'completeorder',
          component:completeorder,
          meta:{
            title:'已完成订单'
          }

        },
        {
          path:'invalidorder',
          component:invalidorder,
          meta:{
            title:'已失效订单'
          }
        }
      ],
       linkActiveClass:'active'
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart,
      // meta: {
      //   title: '购物车'
      // },
      children: [
        {
          path: '',
          redirect: 'today'
        },
        {
          path: 'today',
          component: todaycart,
          meta: {
            title: '购物车'
          },
        },
        {
          path: 'yd',
          component: ydcart,
          meta: {
            title: '购物车'
          },
        },

      ],
      linkActiveClass: 'active',
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: mybook,
      meta: {
        title: '预定'
      },
    },
    {
      path: '/city',
      name: 'city',
      component: city,
      meta: {
        title: '城市选择'
      },
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        title: '饭饱宝选择'
      },
    },
    {
      path: '/fooddetail',
      name: 'fooddetail',
      component: fooddetail,
      meta: {
        title: '商品详情页'
      },
    },
    {
      path: '/login',
      component: login,
      meta: {
        title: '登录'
      }
      // beforeEnter: ({meta,path}, from, next)=>{
      //   var usrid=localStorage.getItem('UserId');
      //   if(!userid=='lmc'){
      //     return next({path:'/login'})
      //   }
      //    next()
      // }

    },
    {
      path: '/order',
      component: order,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/ydorder',
      component: ydorder,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/myinfo',
      component: myinfo,
      meta: {
        title: '我的信息'
      }
    },
    {
      path: '/mycoupon',
      component: mycoupon,
      meta: {
        title: '我的优惠券'
      },
      children: [
        {
          path: '',
          redirect: 'validcou'
        },
        {
          path: 'validcou',
          component: validcou
        },
        {
          path: 'invalidcou',
          component: invalidcou
        }
      ]
    },
    {
      path: '/connect',
      component: connect,
      meta: {
        title: '我的信息'
      }
    },
    {
      path: '/retroaction',
      component: retroaction,
      meta: {
        title: '我的信息'
      }
    }

  ],
  linkActiveClass: 'active',
  // scrollBehavior (to, from, savedPosition) {
  // return { x: 0, y: 0 }
  // }
})

// var usrid=localStorage.getItem('UserId')

router.beforeEach(({ meta, path }, from, next) => {
  var ct = localStorage.getItem('city');
  var mac = localStorage.getItem('MacineId')
  const { auth = true } = meta      // meta代表的是to中的meta对象，path代表的是to中的path对象

  var isLogin = Boolean(ct);
  var isMac = Boolean(mac);

  if (auth && !isLogin && !isMac && path !== '/city') {   // auth 代表需要通过用户身份验证，默认为true，代表需要被验证， false为不用检验
    return next({ path: '/city' })   //  跳转到login页面
  }
  if (meta.title) {
    document.title = meta.title
  }


  next()   // 进行下一个钩子函数

})
export default router