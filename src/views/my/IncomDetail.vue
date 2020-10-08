<template>
    <div class="page">
        <Header title="收益明细" @handleLeft="handleLeft()"></Header>
        <div class="wrap">
               <div class="tabBarView">
                   <div class="tabBarItem" :class="{tabBarItemAct:tabBarIndex==0}" @click="changeTabBarAction(0)">
                         <!-- FIL算力 -->
                         矿池收益
                         <div class="line" v-show="tabBarIndex==0"></div>
                   </div>
                   <div class="tabBarItem" :class="{tabBarItemAct:tabBarIndex==1}" @click="changeTabBarAction(1)">
                        奖励池收益
                        <div class="line" v-show="tabBarIndex==1"></div>
                   </div>
               </div>
               <!-- 列表 -->
               <div class="listBox">
                     <!-- FIL算力 -->
                     <div class="filCalculateListBox" v-show="tabBarIndex==0">
                           <div class="filItem" v-for="(obj,index) in filList" :key="index">
                                 <div class="filItemLeft">
                                      <div class="text1">矿池收益</div>
                                      <div class="text2">{{getTimeFormater(obj.create_time)}}</div>
                                 </div>
                                 <div class="filItemRight">{{obj.get_coin}} FIL</div>
                           </div>
                     </div>
                     <!-- 奖励池收益 -->
                     <div class="poolIncomeListBox" v-show="tabBarIndex==1">
                           <div class="filItem" v-for="(obj,m) in incomeList" :key="m">
                                 <div class="filItemLeft">
                                      <div class="text1">V{{obj.level}}奖励池收益</div>
                                      <div class="text2">{{getTimeFormater(obj.create_time)}}</div>
                                 </div>
                                 <div class="filItemRight">{{obj.get_coin}} FIL</div>
                           </div>
                     </div>
                     <div class="loadingMoreBtn" v-show="tabBarIndex==0&&isLoadingMore1" @click="getFilListMoreAPI()">加载更多</div>
                     <div class="loadingMoreBtn" v-show="tabBarIndex==1&&isLoadingMore2" @click="getIncomeMoreListAPI()">加载更多</div>
               </div>
        </div> 
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
import { formateDate } from "../../utils/time";
export default {
    name: "incomeDetail",
    components: {
        Header
    },
    data(){
        return{
            filList:[],//列表
            incomeList:[],//收益列表
            tabBarIndex:0,
            isLoadingMore1:false,
            isLoadingMore2:false,
            pageIndex1:1,
            pageIndex2:1,
        }
    },
    mounted(){
        this.getFilListAPI();
        this.getIncomeListAPI();
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         changeTabBarAction(index){
             this.tabBarIndex = index;
         },
         getTimeFormater(time){
             if(time){
                 let timeStr = formateDate(time, "yyyy-MM-dd hh:mm");
                 return timeStr;
             }
             return '';
         },
         getFilListAPI(){
            let that = this;
            this.pageIndex1 = 1;
            request.get(`/record/pool_list?index=1`).then((res=>{
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
        getFilListMoreAPI(){
            let that = this;
            this.pageIndex1 = this.pageIndex1+1;
            request.get(`/record/pool_list?index=`+this.pageIndex1).then((res=>{
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
        getIncomeListAPI(){
            let that = this;
             this.pageIndex2 = 1;
            request.get(`/record/reward_list?index=1`).then((res=>{
                console.log('res',res);
                
                    if (res.data.Code == 0) {
                      
                        var list =  res.data.Data;
                        this.incomeList = list;
                        if(list.length>=20){
                            this.isLoadingMore2 = true;
                        }else{
                            this.isLoadingMore2 = false;
                        }
                    }
            }));
        },
        getIncomeMoreListAPI(){
            let that = this;
            this.pageIndex2 = this.pageIndex2+1;
            request.get(`/record/pool_list?index=`+this.pageIndex2).then((res=>{
                console.log('res',res);
                
                    if (res.data.Code == 0) {
                        
                        var list =  res.data.Data;
                        for(var i=0;i<list.length;i++){
                            var obj = list[i];
                           this.incomeList.push(obj);
                        }
                        if(list.length>=20){
                            this.isLoadingMore2 = true;
                        }else{
                            this.isLoadingMore2 = false;
                        }
                        
                    }
            }));
        },
    }
}
</script>

<style lang="less" scoped>
.page{
   background: rgba(239, 240, 249, 1);
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
    top: 1.04rem;
    bottom: 0;
    width: 100%;
    overflow: auto;
}
.tabBarView{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 0.93rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E6E6E6;
    .tabBarItem{
        flex: 1;
        height: 100%;
        height: 0.93rem;
        font-size: 0.3rem;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 0.93rem;
        color:#999999;
        text-align: center;
        position: relative;
        .line{
            position: absolute;
            left: 0;
            bottom: 0;
            width:100%;
            height:0.05rem;
            background: #608AFF;
        }
    }
    .tabBarItemAct{
        color: #333333;
    }
}
.listBox{
    position: absolute;
    left: 0;
    top:0.93rem;
    width: 100%;
    bottom: 0;
    overflow: auto;
    .filCalculateListBox{
         width: 100%;
         overflow: hidden;
         .filItem{
             margin-left: 0.3rem;
             margin-right: 0.3rem;
             height: 1.16rem;
             border-bottom:1px solid #E6E6E6;
             .filItemLeft{
                 float: left;
                 height: 100%;
                 text-align: left;
                 .text1{
                     margin-top: 0.24rem;
                     height: 0.3rem;
                     font-size: 0.28rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #0B0C12;
                     line-height:0.3rem;
                 }
                  .text2{
                     margin-top: 0.1rem;
                     height: 0.3rem;
                     font-size: 0.24rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #5A6375;
                     line-height:0.3rem;
                 }
             }
             .filItemRight{
                 float: right;
                 height: 100%;
                 margin-right: 0.1rem;
                 font-size:0.28rem;
                 font-family: Source Han Sans CN;
                 font-weight: bold;
                 color: #0B0C12;
                 line-height:1.16rem;

             }
         }
    }

    .poolIncomeListBox{
          width: 100%;
          overflow: hidden;
         .filItem{
             margin-left: 0.3rem;
             margin-right: 0.3rem;
             height: 1.16rem;
             border-bottom:1px solid #E6E6E6;
             .filItemLeft{
                 float: left;
                 height: 100%;
                 text-align: left;
                 .text1{
                     margin-top: 0.24rem;
                     height: 0.3rem;
                     font-size: 0.28rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #0B0C12;
                     line-height:0.3rem;
                 }
                  .text2{
                     margin-top: 0.1rem;
                     height: 0.3rem;
                     font-size: 0.24rem;
                     font-family: Source Han Sans CN;
                     font-weight: 400;
                     color: #5A6375;
                     line-height:0.3rem;
                 }
             }
             .filItemRight{
                 float: right;
                 height: 100%;
                 margin-right: 0.1rem;
                 font-size:0.28rem;
                 font-family: Source Han Sans CN;
                 font-weight: bold;
                 color: #0B0C12;
                 line-height:1.16rem;

             }
         }
    }

    .loadingMoreBtn{
        margin: 0 auto;
        margin-top: 0.2rem;
        width: 6rem;
        height: 0.8rem;
        border: 2px solid #F5F5F5;
        border-radius:0.1rem;
        line-height: 0.8rem;
        font-size: 0.28rem;
        color: #B6B6B9;
    }
}


</style>