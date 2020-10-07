<template>
  <div class="orders">
    
    <div class="bg-img">
      <div class="content">
        <!-- <div class="balance">
        <div class="balance-title">账户余额：</div>
        <div class="balance-desc">
          <div class="balance-item">
            <div class="num">{{ my_usdt }}</div>
            <div class="unit">USDT</div>
          </div>
          <div class="balance-item">
            <div class="num">{{ my_ehex }}</div>
            <div class="unit">USDT</div>
          </div>
        </div>
        <div class="recharge" @click="$router.push('/wallet')">
          立即充值 <i class="iconfont icon-z043"></i>
        </div>
      </div> -->
        <header class="mall-header">云算力</header>
        <div class="zk-contract">
          <div class="zk-contract-title">
            合盈云算Filecoin 160T/台 3年合约
            <i class="hot-icon">
              <img
                :src="require('../../assets/img/orders/HOT@2x.png')"
                alt=""
              />
            </i>
            <span @click="show = true" style="color: #608AFF;">合约详情</span>
          </div>
          <div class="zk-contract-subtitle">
            可扩展到576T，含1台机器加1年托管运维费用
          </div>
          <div class="line"></div>

          <div class="zk-contract-desc">
            <div class="zk-contract-desc-item">
              <div class="desc">Filecoin</div>
              <div class="text">挖矿币种</div>
            </div>
            <div class="zk-contract-desc-item">
              <div class="desc">T+1</div>
              <div class="text">结算周期</div>
            </div>
            <div class="zk-contract-desc-item">
              <div class="desc">365天</div>
              <div class="text">合约期限</div>
            </div>
            <div class="zk-contract-desc-item">
              <div class="desc">20.00%</div>
              <div class="text">技术服务费</div>
            </div>
          </div>
          <div class="progress">
            <van-progress
              color="#3094F8"
              :percentage="getPercentage || 30"
              stroke-width="0.24rem"
              :pivot-text="getPercentage || 30 + '%'"
            />
            <span class="count">总量：2000TB</span>
          </div>
          <!-- <div class="zk-need-money">
            <div class="title">请选择支付方式：</div>
            <van-radio-group v-model="buy_type">
              <van-radio name="1"
                >{{ (all_usdt * currentRate).toFixed(2) }} USDT
                <span>{{ all_usdt }} USDT</span></van-radio
              >
              <van-radio name="2"
                >{{ (usdt * currentRate).toFixed(2) }} USDT +
                {{ (ehex * currentRate).toFixed(2) }} EHEX
                <span>{{ usdt }} USDT + {{ ehex }} EHEX</span>
              </van-radio>
            </van-radio-group>
          </div> -->
          <div class="money-count">
            <span>金额：</span><strong>600.00 USDT</strong>
          </div>
          <div class="operation-group">
            <div class="operation">
              <div class="operation-item subtraction" @click.stop="reduceCount">
                -
              </div>

              <div class="operation-item num">{{ amount }}</div>
              <div class="operation-item addition" @click.stop="addCount">
                +
              </div>
            </div>
            <div class="units">TB</div>
          </div>
          <van-button color="#3094F8" @click="BuyPower">确定</van-button>
        </div>
      </div>
    </div>

    <van-dialog
      v-model="show"
      title="IPFS·Filecoin服务器"
      class="detail"
      :showConfirmButton="false"
    >
      <pre>
服务器售价：78339 USDT /160TB/台（可扩展到576T,扩展部分8T希捷硬盘/2000元）； 

1台起购，以1台为单位递增( 78339USDT / 台)

技术服务费
收取挖矿产出Filecoin数量的20%作为技术服务费。技术服务费包括：矿场维护、矿机部署、矿机维修、技术服务、人力资源支出、社群奖励等费用。

服务器合约费用说明
用户购买矿池的Filecoin服务器合约费用已包含第一年服务期限内的分布式存储服务器租赁费、IP地址费、电费、带宽费、网络安全、矿池挖矿系统使用费等费用。

服务器有效挖币期为三年，第二年及第三年需按照每5元/T/月收取机房托管服务费，托管服务费须于第二年托管服务开始前7天内缴纳，否则算力合约失效。

收益结算
根据矿池的每日实际挖矿收益及用户购买Filecoin服务器合约的存储容量占矿池总存储容量的比例计算用户每日挖矿收益，扣除矿池收取的技术服务费后即为用户实际获得的挖矿收益。

用户每天的挖矿收益=用户持有的算力T数（存储空间容量）÷矿池存储空间总容量×矿池每日产币量×（1-技术服务费20%）

Filecoin服务器合约挖矿收益以Filecoin结算，挖矿产出收益T+1进入用户账户。

所有的规则及收益都是公开透明的，矿池节点的地址也是公开透明且不可篡改的。矿池也将按照Filecoin官方既定规则给予算力持有用户分配收益。

合约期限及终止
1、Filecoin服务器合约有效期自Filecoin主网上线后产生收益之日起开始计算。Filecoin服务器有效期为三年，即每台服务器包含365天的算力空间租赁费用，第二年开始需按照每5元/T/月收取机房托管费，须于第二年托管服务开始前7天内缴纳，否则服务器合约失效。

2、如发生不可抗力事件，矿池有权终止合约而不视为违约。不可抗力包括但不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因。

风险提示
1 、Filecoin通证有可能发生价格剧烈波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致Filecoin服务器合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。
2 、本合约不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。
3 、用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致Filecoin挖矿行为被叫停或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失须自行承担。


合约发行方对本合约条款保留所有解释。
            </pre
      >
      <div class="close-btn" @click="show = false"></div>
    </van-dialog>

    <AppTabBar :tabIndex='1' @tabAction="tabAction"></AppTabBar>

  </div>
</template>

<script>
import { getOrder, getPrice } from "../../api/goods/goods";
import { getAssets } from "../../api/user/user";
import { Dialog } from "vant";
import AppTabBar from '../../component/TabBar/TabBar';
export default {
  name: "mall",
  components: {
    AppTabBar
  },
  data() {
    return {
      amount: 1,
      buy_type: "1",
      all_usdt: null,
      ehex: null,
      usdt: null,
      deposit_addr: null,
      my_usdt: 0, //我的资产
      my_ehex: 0, //我的资产
      show: false, //显示合约详情
      rate: null,
      currentRate: 1, //当前折扣
      exist_buy: null
    };
  },
  created() {
    // this.getPrices();
  },
  computed: {
    getLargeDiscount() {
      if (this.rate != null) {
        let r = this.rate[this.rate.length - 1].rate || 1;
        return r;
      }
    },
    getPercentage() {
      if (this.exist_buy != null) {
        let p = this.exist_buy / 20 || 0;
        return p;
      }
    }
  },
  methods: {
    tabAction(index){
          if(index==0){
              this.$router.push('/home');
          }else if(index==1){
            
          }else if(index==2){
              this.$router.push('/awardPool');  
          }else{
              this.$router.push('/my');
          }
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/home" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    addCount() {
      this.amount++;
      this.getCurrentRate(this.amount);
    },
    reduceCount() {
      if (this.amount > 0) {
        this.amount--;
      } else {
        this.$toast({
          message: "不能小于0"
        });
      }
      this.getCurrentRate(this.amount);
    },
    getCurrentRate(v) {
      let arr = this.rate.filter((item, index) => {
        return v >= item.power;
      });
      let len = arr.length - 1;
      this.currentRate = arr[len] ? arr[len].rate : 1;
    },
    getPrices() {
      //合约价格
      getPrice().then(res => {
        let data = res.data.Data;
        let arr = [];
        if (res.data.Code == 0) {
          this.all_usdt = data.all_usdt;
          this.ehex = data.ehex;
          this.usdt = data.usdt;
          //从大到小排序
          this.rate = data.rate.sort(this.compare("rate"));
          this.exist_buy = data.exist_buy;
        }
        this.rate.forEach((item, index) => {
          arr.push(item.rate);
        });
      });
      //个人资产
      getAssets().then(res => {
        let data = res.data.Data;
        if (res.data.Code == 0) {
          this.my_usdt = data.assets.usdt.toFixed(2);
          this.my_ehex = data.assets.ehex.toFixed(2);
        }
      });
    },
    BuyPower() {
      Dialog.confirm({
        title: "确认购买",
        message: "确认购买" + this.amount + "TB"
      })
        .then(() => {
          let buy_type = Number(this.buy_type);
          getOrder({
            amount: this.amount,
            buy_type: buy_type
          }).then(res => {
            if (res.data.Code == 0) {
              this.$toast("购买成功");
              this.$router.push("/home");
            }
          });
        })
        .catch(() => {
          this.$toast("取消购买");
        });
    },
    compare(cls) {
      return function(a, b) {
        return b[cls] - a[cls];
      };
    }
  }
};
</script>
<style lang="scss">
@import "assets/style/common";
@import "assets/style/icon";
.van-radio__label {
  line-height: 1;
  color: #3094f8 !important;
  span {
    color: #d62626 !important;
    font-size: 0.427rem;
    text-decoration: line-through;
  }
}

.van-radio__icon {
  width: 0.587rem !important;
  height: 0.587rem !important;
}

.van-icon {
  width: 0.587rem !important;
  height: 0.587rem !important;
  line-height: 0.587rem !important;
  font-size: 0.427rem !important;
}
.van-dialog {
  padding: 0.533rem;
  min-width: 15.333rem;
}
.van-dialog__header,
.van-button {
  font-weight: 700;
  font-size: 0.987rem;
}
.van-dialog__message {
  margin-top: 1.733rem;
  margin-bottom: 1.733rem;
  font-size: 0.727rem !important;
}
.detail.van-dialog {
  width: 18.58rem;
  height: 24.46rem;
  .van-dialog__header {
    font-size: 0.587rem;
    text-align: left;
    margin-top: 1.067rem;
    margin-left: 0.773rem;
    color: #0b0c12;
  }
  .van-dialog__content {
    margin-top: 0.747rem;
    font-size: 0.427rem;
    line-height: 0.64rem;
    margin-left: 0.773rem;
    color: #87888d;
  }
}

.progress {
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  .van-progress {
    width: 11.867rem;
    background: #eff5ff;
    .van-progress__pivot {
      width: 2.56rem;
      height: 1.44rem;
      background: url("../../assets/img/orders/rediu.png") !important;
      background-size: 100% 100% !important;
      top: -1.14rem;
      color: #fff;
      font-size: 0.533rem;
      margin-top: 0.427rem;
      background-color: transparent !important;
      line-height: 1.066667rem;
    }
  }
  .count {
    color: #b6b4b9;
    font-size: 0.533rem !important;
    margin-left: 0.773rem;
  }
  // .van-toast {
  //   height: 2.133333rem !important;
  //   font-size: 0.746667rem !important;
  // }
}
</style>
<style scoped lang="scss">
@import "~assets/style/common";

.line {
  margin-top: 0.666667rem;
  height: 0.026667rem;
  width: 100%;
  background: #e6e6e6;
}
.bg-img {
  height: 10.32rem;
  background-image: url("../../assets/img/orders/0d5e5bb0.bg@3x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.content {
  padding: 0 $basePadding;
  position: absolute;
  top: 0;
  .mall-header {
    margin-top: 1.573333rem;
    text-align: center;
    color: #fff;
  }
  .money-count {
    text-align: center;
    margin-top: 1.413333rem;
    strong {
      font-size: 0.933333rem;
      font-weight: bold;
      color: #2f94f8;
      line-height: 32px;
    }
    span {
      font-size: 0.64rem;
    }
  }
  .balance {
    width: 18.133rem;
    height: 6.56rem;
    padding-top: $basePadding;
    border-radius: $orderBr;
    color: #fff;
    font-weight: 700;
    @include imgRetina("orders/topBanner", png, 100%, 100%, no-repeat, center);

    .balance-title {
      margin-left: 0.933rem;
      font-size: 0.693rem;
    }

    .balance-desc {
      display: flex;
      margin-top: 0.933rem;

      .balance-item {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;

        .num {
          font-size: 1.013rem;
        }

        .unit {
          margin-top: 0.56rem;
          font-size: 0.587rem;
        }
      }
    }
    .recharge {
      color: #8d8d93;
      font-size: 0.587rem;
      text-align: right;
      margin-top: 0.8rem;
      margin-right: 0.933rem;

      i {
        font-size: 0.4rem;
        line-height: 0.587rem;
      }
    }
  }
}

.zk-contract {
  margin-top: 0.933rem;
  height: 19.52rem;
  width: 18.08rem;
  box-shadow: 0px 10px 40px 0px rgba(130, 149, 180, 0.17);
  background-color: #fff;
  border-radius: $orderBr;
  //   @include imgRetina(
  //     "orders/xiadan_juxing",
  //     png,
  //     100%,
  //     100%,
  //     no-repeat,
  //     center
  //   );
}

.zk-contract {
  //   width: 18.08rem;
  //   height: 17.867rem;
  padding: 1.067rem 0.88rem;
  .notice {
    color: #b5b4b9;
    margin-top: 0.96rem;
    font-size: 0.587rem;
    text-align: center;
  }
  .zk-contract-title {
    color: #0b0c12;
    font-size: 0.746667rem;
    font-weight: bold;
    span {
      color: #d62727;
      font-size: 0.64rem;
      //   text-decoration: underline;
      margin: 0.32rem 0 0.32rem 0.733rem;
      padding-bottom: 0.32rem;
      font-weight: 400;
      border-bottom: 0.026667rem solid;
    }
    .hot-icon {
      img {
        width: 0.826667rem;
        height: 0.986667rem;
        vertical-align: middle;
      }
    }
    .zk-contract-detail {
      margin-left: 0.533rem;
      text-decoration: underline;
      color: #b5b4b9;
      font-weight: 400;
    }
  }

  .zk-contract-subtitle {
    margin-top: 0.587rem;
    font-size: 0.587rem;

    color: #5e6878;
  }

  .zk-contract-desc {
    display: flex;
    margin-top: 0.826667rem;
    font-size: 0.693rem;

    .zk-contract-desc-item {
      flex: 1;
      text-align: center;

      .text {
        color: #656f96;
        font-size: 0.586667rem;
        margin-top: 0.32rem;
      }

      .desc {
        font-size: 0.693333rem;
        font-weight: bold;
        // margin-top: 0.5rem;
        color: #0b0c12;
      }
    }
  }

  .operation-group {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b5b4b9;
    font-size: 0.533rem;
    margin-top: 1.027rem;
  }

  .operation {
    margin-right: 0.56rem;
    width: 6.4rem;
    height: 1.946667rem;
    border-radius: 0.133rem;
    border: 1px solid #b5b4b9;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .operation-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 0.933rem;
      flex: 1;
      color: #b5b4b9;
    }
    .num {
      flex: 2;
      border-right: 1px solid #b5b4b9;
      border-left: 1px solid #b5b4b9;
      color: #000;
      font-size: 0.96rem;
      font-weight: bold;
    }
  }

  .zk-need-money {
    margin-top: 1.107rem;
    font-size: 0.587rem;
    .title {
      color: #0b0c12;
      font-size: 0.533rem;
      font-weight: 700;
    }

    .van-radio-group {
      color: #3094f8;
      font-size: 0.8rem;

      .van-radio {
        height: 0.9rem;
        margin-top: 0.967rem;
        font-size: 0.8rem;
      }
    }
  }
}

.van-button {
  display: block;
  margin: 0 auto;
  margin-top: 1.6rem;
  width: 10.746667rem;
  height: 2.133333rem;
  border-radius: 1.173rem;
  font-size: 0.96rem;
  font-weight: 400;
  background: linear-gradient(0deg, #2f79f4, #83c3ff) !important;
}
/deep/ .van-overlay {
  background: rgba(0, 0, 0, 0.8) !important;
}
.detail {
  height: 25.813333rem;
  overflow: visible !important;
  /deep/ .van-dialog__content {
    margin: 0;
    margin-top: 0.986667rem;
    height: 21.866667rem;
    overflow: hidden;
    overflow-y: scroll;
  }
  /deep/ .van-dialog__header {
    text-align: center;
    font-size: 0.8rem;
  }
  pre {
    overflow: hidden;
    margin: 0 1.12rem;
    font-size: 0.693333rem;
    line-height: 0.906667rem;
  }
  .close-btn {
    width: 1.333333rem;
    height: 1.333333rem;
    position: absolute;
    bottom: -2.76rem;
    left: 50%;
    transform: translateX(-50%);
    background: url("../../assets/img/orders/close@2x.png");
    background-size: 100% 100%;
  }
}
</style>
