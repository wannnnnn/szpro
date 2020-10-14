<template>
      <div class="page">
           <Header title="公告中心" @handleLeft="handleLeft()"></Header>
            <div class="wrap">
                
                <div class="newsItem" v-for="(obj,index) in newsList" :key="index" @click="pushNewsDetail(obj)">

                    <div class="newsItemLeft">{{obj.title}}</div>
                    <div class="newsItemRight">{{obj.time}}</div>
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
            newsList:[
                {title:'关于用户挖矿收益的规则：',time:'2020/10/14',id:0},
                {title:'矿池上线成功',time:'2020/10/13',id:1},
                {title:'关于河图超算服务器——第1批上线公告',time:'2020/10/13',id:2},
                {title:'Filecoin官方：148888区块高度近在咫尺，主网启动倒计时。',time:'2020/10/13',id:3},
            ]
        }
    },
    mounted(){
        // this.getWithDrawListAPI();
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
         pushNewsDetail(obj){
            // this.$router.push('/newsDetail');
            this.$router.push({ path: '/newsDetail', query: { title:obj.title,id:obj.id}});
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
    .newsItem{
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        height: 1rem;
        // border: 1px solid #000;
        border-bottom:1px solid rgba(230, 230, 230, 0.3);
        .newsItemLeft{
            float: left;
            width: 4.89rem;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.28rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #343434;
            text-align: left;
            overflow: hidden;
        }
        .newsItemRight{
            float: right;
            width:1.5rem;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: #5A6476;
            text-align: right;
        }
    }
    
}

</style>