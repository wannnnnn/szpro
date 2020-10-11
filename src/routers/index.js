/**
 * @description: 路由
 */

import Vue from 'vue';
import Router from 'vue-router';


const Home = () => import('@/views/home/Home');
const Mall = () => import('@/views/mall/Mall');
const AwardPool = () => import('@/views/awardPool/AwardPool');
const My = () => import('@/views/my/My');
const Agreement = () => import('@/views/my/Agreement');
const MyAssets = () => import('@/views/my/MyAssets');
const MyOrders = () => import('@/views/my/MyOrders');
const Recharge = () => import('@/views/my/Recharge');
const RechargeRecord = () => import('@/views/my/ChargeRecord');
const Withdrawal = () => import('@/views/my/Withdrawal');
const WithdrawalRecord = () => import('@/views/my/WithWorthRecord');
const IncomeDetail = () => import('@/views/my/IncomDetail');
const InvateFriends = () => import('@/views/my/InvateFriends');
const Share = () => import('@/views/share/Share');
const Download = () => import('@/views/share/AppDownLoad');
const IDIdentity = () => import('@/views/my/IDIdentity');
const Login = () => import('@/views/login/Login');
const Register = () => import('@/views/login/Register');
const Error = () => import('@/views/error');
const TestPool = () => import('@/views/awardPool/testpool');
Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
      requireAuth: true
    }
  },  
  {
    path: '/mall',
    name: 'mall',
    component: Mall,
    meta: {
      title: '云算力',
      requireAuth: true
    }
  },  
  {
    path: '/awardPool',
    name: 'awardPool',
    component: AwardPool,
    meta: {
      title: '奖励池',
      requireAuth: true
    }
  },{
    path: '/testPool',
    name: 'testPool',
    component: TestPool,
    meta: {
      title: '奖励池',
      requireAuth: true
    }
  },{
    path: '/my',
    name: 'my',
    component: My,
    meta: {
      title: '个人中心',
      requireAuth: true
    }
  },{
    path: '/share',
    name: 'share',
    component: Share,
    meta: {
      title: '注册',
      requireAuth: true
    }
  }, 
  {
    path: '/appDownload',
    name: 'appDownload',
    component:Download,
    meta: {
      title: '下载APP',
      requireAuth: true
    }
  }, 
  {
    path: '/myAssets',
    name: 'myAssets',
    component: MyAssets,
    meta: {
      title: '我的资产',
      requireAuth: true
    }
  }, 
  {
    path: '/invateFriends',
    name: 'invateFriends',
    component: InvateFriends,
    meta: {
      title: '我的资产',
      requireAuth: true
    }
  }, 
  {
    path: '/idIdentity',
    name: 'idIdentity',
    component: IDIdentity,
    meta: {
      title: '实名认证',
      requireAuth: true
    }
  }, 
  {
    path: '/withdrawalRecord',
    name: 'withdrawalRecord',
    component: WithdrawalRecord,
    meta: {
      title: '提币记录',
      requireAuth: true
    }
  }, 
  {
    path: '/rechargeRecord',
    name: 'rechargeRecord',
    component: RechargeRecord,
    meta: {
      title: '充值记录',
      requireAuth: true
    }
  }, 
  {
    path: '/myOrders',
    name: 'myOrders',
    component: MyOrders,
    meta: {
      title: '订单管理',
      requireAuth: true
    }
  },   
  {
    path: '/recharge',
    name: 'recharge',
    component:Recharge,
    meta: {
      title: '充币',
      requireAuth: true
    }
  },  
  {
    path: '/withdrawal',
    name: 'withdrawal',
    component: Withdrawal,
    meta: {
      title: '提币',
      requireAuth: true
    }
  },  
  {
    path: '/incomeDetail',
    name: 'incomeDetail',
    component: IncomeDetail,
    meta: {
      title: '收益明细',
      requireAuth: true
    }
  },  
  {
    path: '/agreement',
    name: 'agreement',
    component: Agreement,
    meta: {
      title: '云算力租赁协议',
      requireAuth: true
    }
  },    
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册', // 标题
      requireAuth: false, // 登录权限
      keepAlive: false,
    }
  },
  {
    path: '/error',
    name: 'error',
    component: Error,
    meta: {
      title: '404页'
    }
  },
  {
    path: '*',
    redirect: 'error',
  },
];

const router = new Router({
  //mode: 'history',
  mode: 'hash',
  routes
})

export default router;
