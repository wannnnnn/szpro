<template>
    <div class="page">
        <Header title="收益明细" @handleLeft="handleLeft()"></Header>
        <div class="wrap">
               
               <!-- 列表 -->
               <div class="listBox" v-show="filList.length>0">
                     <!-- FIL算力 -->
                     <div class="filCalculateListBox">
                           <div class="filItem" v-for="(obj,index) in filList" :key="index">
                                 <div class="ietmIcon">
                                      <img src="../../assets/img/my/income_unvip.png" v-show="obj.level==0">
                                      <img src="../../assets/img/my/income_vip.png" v-show="obj.level!=0">
                                 </div>
                                 <div class="filItemLeft">
                                      <div class="text1" v-show="obj.level==0">矿池收益</div>
                                      <div class="text1" v-show="obj.level!=0">V{{obj.level}}活动奖励</div>
                                      <div class="text2">{{getTimeFormater(obj.create_time)}}</div>
                                 </div>
                                 <div class="filItemRight">{{obj.get_coin}} FIL</div>
                           </div>
                     </div>
                     <div class="loadingMoreBtn" v-show="isLoadingMore1" @click="getFilListMoreAPI()">加载更多</div>
                    
               </div>
               <!-- 没有数据 -->
               <div class="noDataView" v-show="filList.length==0">
                      <div class="noDataImg">
                          <div class="txt">暂无收益明细</div>
                      </div>
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
            isLoadingMore1:false,
            pageIndex1:1,
        }
    },
    mounted(){
        this.getFilListAPI();
        // this.getIncomeListAPI();
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
         getFilListAPI(){
            let that = this;
            this.pageIndex1 = 1;
            request.get(`/record/pool_list?index=1`).then((res=>{
                
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
.noDataView{
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    bottom: 0;  
    .noDataImg{
        margin: 0 auto;
        margin-top: 30%;
        width: 5.56rem;
        height: 4.1rem;
        background: url(../../assets/img/empty_income.png) no-repeat center;
        background-size: 100% 100%;
        overflow: hidden;
        .txt{
            margin: 0 auto;
            margin-top: 3.28rem;
            width: 100%;
            font-size: 0.3rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            line-height:0.4rem;
            text-align: center;
        }
    }
}
.listBox{
    position: absolute;
    left: 0;
    top:0;
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
             .ietmIcon{
                 float: left;
                 width: 0.6rem;
                 height: 100%;
                //  border: 1px solid #000;
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 img{
                     width: 0.5rem;
                     height: 0.5rem;
                 }
             }
             .filItemLeft{
                 margin-left: 0.1rem;
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