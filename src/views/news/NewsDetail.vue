<template>
      <div class="page">
           <Header title="公告中心" @handleLeft="handleLeft()"></Header>
            <div class="wrap">
                 <div class="newsTitle">{{newsTitle}}</div>
                 <div class="newsTime">2020/10/13 14:27</div>
                 <div class="textBox" v-if="id==0">
                     热烈庆祝合盈矿池上线成功，合盈矿池为合盈云算旗下矿池品牌，<br>
                     是一家集分布式存储服务器设计、研发、生产、销售、集群化管理、数据中心搭建与运维为一体的科技公司，<br>
                     其团队由国内行业尖端工程师打造而成，由原字节跳动、华为、浪潮等高科技企业的数据存储方面的科学家、资深技术专家为技术后盾，<br>
                     开展基于IPFS分布式存储的落地应用服务。<br>
                    合盈矿池整合了众多技术成果，形成包含矿池集约化管理、数据中心搭建与运维为一体的全站服务能力。
                    构建数据价值，助力新基建<br><br>
                     合盈云算团队<br>
                        2020年10月13日<br>
                 </div>
                 <div class="textBox" v-else-if="id==1">
                        限量 1000台，售完为止。<br>
                        服务期限：永久，服务器归属权为用户。<br>
                        交付期：根据官方区块奖励规则，主网上线后产生的收益将分为180天线性释放。<br><br>
                        收益计算公式：<br>
                        用户每天的算力挖矿收益=当天矿池收益 x 0.7 x（用户个人算力/矿池算力）<br>
                        达标用户每天的奖励池收益=当前奖励池总额度/当前达标总用户<br><br>
                        注：v1用户享受v1奖励池收益；v2用户享受v1、v2奖励池收益；v3用户享受v1、v2、v3奖励池收益<br><br>
                        合盈云算团队<br>
                        2020年10月13日<br>
                 </div>
                  <div class="textBox" v-else-if="id==2">
                        Filecoin官方：148888区块高度近在咫尺，主网启动倒计时。<br>
                        北京时间9月28日，Filecoin官方发布博客称，将通过协议升级和状态转换的方式来逐步启动Filecoin主网。Filecoin主网将在epoch 148888正式开启，预计在10月15日左右达到这个epoch，然后将开始一段时间的监控和解决问题来保证过渡后网络的正常运行。太空竞赛测试网将持续运行。
                        
                        Filecoin官方还将在10月19日至10月23日开展为期一周的Filecoin主网启动庆祝活动。<br><br>
                         合盈云算团队<br>
                        2020年10月13日<br>
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
            id:0,
        }
    },
    mounted(){
        // this.getWithDrawListAPI();
         if (this.$route.query.title) {
           this.newsTitle = this.$route.query.title;
        }
         if (this.$route.query.id) {
           this.id = this.$route.query.id;
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