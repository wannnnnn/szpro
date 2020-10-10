<template>
      <div class="page">
           <Header title="提币记录" @handleLeft="handleLeft()"></Header>
            <div class="wrap">
                <div class="boxItem" v-for="(obj,index) in filList" :key="index">
                      <div class="typeItem">
                           <div class="typeItemLeft">{{obj.coin_name}}</div>
                           <div class="typeItemRight">{{obj.amount.toFixed(2)}}</div>
                      </div>
                      <div class="typeTimeItem">{{getTimeFormater(obj.create_time)}}</div>
                      <div class="addressBox">
                           <div class="addressBoxLeft">
                               提币来源：{{obj.to_address}}
                           </div>
                           <div class="addressBoxRight" style="color:gray;" v-show="obj.status==1">提现中</div>
                           <div class="addressBoxRight" v-show="obj.status==2">提现成功</div>
                           <div class="addressBoxRight" style="color:red;" v-show="obj.status==3">提现失败</div>
                      </div>
                </div>  
                <!-- end -->

           </div> 
      </div>

      
</template>


<script>
import Header from './common/NavView';
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
        }
    },
    mounted(){
        this.getWithDrawListAPI();
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
            request.get(`/withdraw/list?index=1`).then((res=>{
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
            request.get(`/withdraw/list?index=`+this.pageIndex1).then((res=>{
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
    .boxItem{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        height: 1.89rem;
        // border: 1px solid #000;
        border-bottom:1px solid rgba(230, 230, 230, 0.3);
        .typeItem{
            margin-top: 0.2rem;
            width: 100%;
            height: 0.3rem;
            .typeItemLeft{
                float: left;
                font-size:0.28rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #0C0D13;
                line-height: 0.3rem;
            }
            .typeItemRight{
                  float: right;
                  font-size: 0.28rem;
                  font-family: Source Han Sans CN;
                  font-weight: bold;
                  color: #0C0D13;
                  line-height: 0.3rem;
            }
        }
        .typeTimeItem{
            margin-top: 0.2rem;
            width: 100%;
            height: 0.3rem;
            font-size: 0.24rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #5A6476;
            line-height: 0.3rem;
            text-align: left;
        }
        .addressBox{
             margin-top: 0.2rem;
             width: 100%;
             height: 0.6rem;
             position: relative;
             .addressBoxRight{
                 position: absolute;
                 right: 0;
                 top: 0;
                 width: 1rem;
                 height: 0.6rem;
                 text-align: right;
                 color: #92CC5A;
                 font-size: 0.24rem;
                 line-height: 0.6rem;
             }
             .addressBoxLeft{
                 position: absolute;
                 left: 0;
                 top: 0;
                 right: 1.6rem;
                 height: 100%;
                 font-size: 0.24rem;
                 font-weight: 400;
                 color: #5A6476;
                 text-overflow: ellipsis;
                word-wrap:break-word;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-align: left;
             }
        }
    }
    
}

</style>