<template>
      <div class="page">
           <Header title="公告中心" @handleLeft="handleLeft()"></Header>
            <div class="wrap">
                 <div class="newsTitle">{{newsTitle}}</div>
                 <div class="newsTime">2020/10/11 14:27</div>
                 <div class="textBox">
                         
                                服务器售价：86686 USDT /160TB/台（可扩展到576T）； <br><br>

1台起购，以1台为单位递增( 86686USDT / 台)<br><br>

托管运营费<br>
收取挖矿产出Filecoin数量的30%作为托管运营费。托管运营费包括：矿场维护、矿机部署、矿机维修、技术服务、人力资源支出、社群奖励等费用。<br><br>

服务器合约费用说明<br>
用户购买矿池的Filecoin服务器合约费用已包含第一年服务期限内的分布式存储服务器租赁费、IP地址费、电费、带宽费、网络安全、矿池挖矿系统使用费等费用。<br><br>

服务器有效挖币期为三年，第二年及第三年需按照每5元/T/月收取机房托管服务费，托管服务费须于第二年托管服务开始前7天内缴纳，否则算力合约失效。<br><br>

收益结算<br>
根据矿池的每日实际挖矿收益及用户购买Filecoin服务器合约的存储容量占矿池总存储容量的比例计算用户每日挖矿收益，扣除矿池收取的托管运营费后即为用户实际获得的挖矿收益。<br>

用户每天的挖矿收益=用户持有的算力T数（存储空间容量）÷矿池存储空间总容量×矿池每日产币量×（1-托管运营费30%）<br>

Filecoin服务器合约挖矿收益以Filecoin结算，挖矿产出收益T+1进入用户账户。<br>

所有的规则及收益都是公开透明的，矿池节点的地址也是公开透明且不可篡改的。矿池也将按照Filecoin官方既定规则给予算力持有用户分配收益。<br><br>

合约期限及终止<br>
1、Filecoin服务器合约有效期自Filecoin主网上线后产生收益之日起开始计算。Filecoin服务器有效期为三年，即每台服务器包含365天的算力空间租赁费用，第二年开始需按照每5元/T/月收取机房托管费，须于第二年托管服务开始前7天内缴纳，否则服务器合约失效。<br><br>

2、如发生不可抗力事件，矿池有权终止合约而不视为违约。不可抗力包括但不限于地震、台风、水灾、火灾等自然原因和战争、动乱、政府禁令等社会原因。<br><br>

风险提示<br>
1 、Filecoin通证有可能发生价格剧烈波动的情况，且挖矿难度会不定期调整。币价波动或挖矿难度调整都可能导致Filecoin服务器合约的收益变动。无论从数字货币还是法币角度，本合约不作退款承诺。用户须仔细评估自己的风险承受能力，在可接受的风控范围内投资数字货币挖矿。<br>
2 、本合约不涉及数字资产交易，若用户自行参与第三方的数字资产交易，应当自行承担责任和风险。<br>
3 、用户了解并接受，如因相关国家法律、法规和规范性文件的制定或者修改等客观情况发生变化，导致Filecoin挖矿行为被叫停或者禁止的，本协议自动终止，双方不得相互追究责任，由此造成的损失须自行承担。<br>
<br>

合约发行方对本合约条款保留所有解释。
                            
                    </div>
                <!-- end -->

           </div> 
      </div>

      
</template>


<script>
import Header from '../my/common/NavView';
import request from "../../api/request";
import { formateDate } from "../../utils/time";
export default {
    name: "ididentifty",
    components: {
        Header
    },
    data(){
        return{
            isLoadingMore1:false,
            pageIndex1:1,
            filList:[],
            newsTitle:'',
        }
    },
    mounted(){
        // this.getWithDrawListAPI();
         if (this.$route.query.title) {
           this.newsTitle = this.$route.query.title;
        }
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         getTimeFormater(time){
             if(time){
                 let timeStr = formateDate(time, "yyyy-MM-dd hh:mm");
                 return timeStr;
             }
             return '';
         },
         getWithDrawListAPI(){
            let that = this;
            this.pageIndex1 = 1;
            request.get(`/deposit/list?index=1`).then((res=>{
                console.log('res',res);
                
                    if (res.data.Code == 0) {
                        var list =  res.data.Data;
                        this.filList = list;
                        if(list.length>=20){
                            this.isLoadingMore1 = true;
                        }else{
                            this.isLoadingMore1 = false;
                        }
                    }
            }));
        },
        getWithDrawListMoreAPI(){
            let that = this;
            this.pageIndex1 = this.pageIndex1+1;
            request.get(`/deposit/list?index=`+this.pageIndex1).then((res=>{
                console.log('res',res);
                
                    if (res.data.Code == 0) {
                        
                        var list =  res.data.Data;
                        for(var i=0;i<list.length;i++){
                            var obj = list[i];
                           this.filList.push(obj);
                        }
                        if(list.length>=20){
                            this.isLoadingMore1 = true;
                        }else{
                            this.isLoadingMore1 = false;
                        }
                        
                    }
            }));
        },
        
    }
}
</script>

<style lang="less" scoped>
.page{
   background: #fff;
}

.header{
    position: fixed;
    width: 100%;
    height: 1.28rem;
    left: 0;
    top: 0;
    line-height: 1.28rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 500;
    color: #fff;
    z-index: 100;
}
.wrap{
    position: absolute;
    left: 0;
    top: 1.2rem;
    bottom: 0;
    width: 100%;
    overflow: auto;
    padding-bottom: 0.5rem;
    .newsTitle{
        margin-top: 0.2rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        font-size: 0.36rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #2C3A5C;
        text-align: left;
        line-height: 0.5rem;
    }
    .newsTime{
        margin-top: 0.6rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        font-size: 0.26rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #5A6476;
        text-align: left;
        line-height: 0.3rem;
    }
     .textBox{
         margin-top: 0.27rem;
         margin-left: 0.2rem;
         margin-right: 0.2rem;
        //  height: 7.8rem;
         text-align: left;
         color: #2D3A5C;
         font-size:0.26rem;
         line-height: 0.32rem;
     }
    
}

</style>