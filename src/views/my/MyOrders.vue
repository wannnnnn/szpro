<template>
      <div class="page">
           <Header title="订单管理" @handleLeft="handleLeft()"></Header>
            <div class="wrap">
            <!-- 内容部分 -->
            <div class="wrapTxt">
                <div class="mallBox" v-for="(obj,index) in list" :key="index">
                    <div class="mallTitleBox">
                        <div class="mallTitleLeft">
                            <div class="titleBox">
                                <div class="title">合盈云算 Filecoin(第一期)</div>
                            </div>
                        </div>
                        <div class="mallTitleRight">
                            <div class="titleBox">
                                <div class="title">完成</div>
                            </div>
                        </div>
                    </div>

                    <div class="tipBox">
                        <div class="tipItem">
                            <div class="tipTitle">订单时间：</div>
                            <div class="tipDes">{{getTimeFormater(obj.create_time)}}</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">单价：</div>
                                <div class="tipDes">{{obj.price}} USDT/TB</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">数量：</div>
                                <div class="tipDes">{{obj.miner_num}}</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">支付金额：</div>
                                <div class="tipDes">{{obj.usdt_amount}} USDT</div>
                        </div>
                    </div>
                </div>

                <div class="loadingMoreBtn" v-show="isLoadingMore1" @click="getListMoreAPI()">加载更多</div>
            
            </div> 
        </div> 
      </div>

      
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
import { formateDate } from "../../utils/time";
export default {
    name: "myOrders",
    components: {
        Header
    },
    data(){
        return{
            list:[],//列表
            isLoadingMore1:false,
            pageIndex1:1,
        }
    },
    mounted(){
        this.getListAPI();
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
         getListAPI(){
                let that = this;
                this.pageIndex1 = 1;
                request.get(`/power/list?index=1`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                            var list =  res.data.Data;
                            this.list = list;
                            if(list.length>=20){
                                this.isLoadingMore1 = true;
                            }else{
                                this.isLoadingMore1 = false;
                            }
                             
                        }
                }));
        },
        getListMoreAPI(){
                let that = this;
                this.pageIndex1 = this.pageIndex1+1;
                request.get(`/power/list?index=`+this.pageIndex1).then((res=>{
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                            var list =  res.data.Data;
                            for(var i=0;i<list.length;i++){
                                var obj = list[i];
                                this.list.push(obj);
                            }
                            if(list.length>=20){
                                this.isLoadingMore1 = true;
                            }else{
                                this.isLoadingMore1 = false;
                            }
                             
                        }
                }));
        }
    }
}
</script>

<style lang="less" scoped>
.page{
   background: rgba(239, 240, 249, 1);
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
}
.wrapBg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .warpBgImg{
        width: 100%;
        height: 3.87rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.wrapTxt{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .mallBox{
        margin-left: 0.32rem;
        margin-right: 0.32rem;
        margin-top: 0.3rem;
        padding-top: 0.46rem;
        padding-bottom: 0.46rem;
        padding-left: 0.23rem;
        background: #FFFFFF;
        
        box-shadow: 0px 10px 40px 0px rgba(130, 149, 180, 0.17);
        border-radius: 0.15rem;
        .mallTitleBox{
            margin-left: 0.18rem;
            height: 1rem;
            border-bottom:1px solid #E6E6E6;
            .mallTitleLeft{
                float: left;
                .titleBox{
                    display: flex;
                    align-items: center;
                    .title{
                        margin-right: 0.23rem;
                        overflow: hidden;
                        font-size: 0.3rem;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #0B0C12;
                        line-height: 0.32rem;
                    }
                    .icon{
                        margin-right: 0.2rem;
                        width: 1.45rem;
                        height: 0.61rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
            .mallTitleRight{
                float: right;
                .titleBox{
                    width: 1.45rem;
                    height: 0.61rem;
                    padding-right: -0.3rem;
                    background: url('../../assets/img/orders/finish.png') no-repeat center 0px;
                    background-position: center 0px;
                    background-size: cover;
                    // text-indent: -999px;
                    align-items: center;
                    .title{
                        width: 100%;
                        overflow: hidden;
                        font-size: 0.24rem;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #FFFFFF;
                        line-height: 0.51rem;
                        text-align: center;
                        padding-left: 0.2rem;
                    }
                }
            }
        }
        .tipBox{
            margin-top: 0.19rem;
            margin-left: 0.18rem;
            margin-right: 0.18rem;
            padding-right: 0.23rem;
            .tipItem{
                display: flex;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
                .tipTitle{
                    font-size: 0.26rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #5A6375;
                    line-height: 0.70rem;
                }
                .tipDes{
                    font-size: 0.26rem;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #5A6375;
                    line-height: 0.70rem;
                }
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
        background: #fff;
    }
}

</style>