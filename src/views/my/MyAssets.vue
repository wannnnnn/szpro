<template>
    <div class="page">
        <Header title="我的资产" @handleLeft="handleLeft()"></Header>
        <div class="wrap">
            <!-- 内容部分 -->
            <div class="wrapTxt">
                <div class="mallBox">
                    <div class="mallTitleBox">
                        <div class="mallTitleLeft">
                            <div class="titleBox">
                                <div class="icon"><img src="../../assets/img/asset/USDT@2x.png" alt=""></div>
                                <div class="title">USDT</div>
                            </div>
                        </div>
                    </div>

                    <div class="tipBox">
                        <div class="tipItem">
                            <div class="tipTitle">总资产</div>
                            <div class="tipDes">0</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">可用</div>
                                <div class="tipDes">0</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">冻结余额</div>
                                <div class="tipDes">0</div>
                        </div>
                    </div>
                    <div class="mBtnWap">
                        <div class="mBtn" @click="pushAction(1,0)">
                            <div class="btn">充币</div>
                        </div>

                        <div class="mBtn" @click="pushAction(2,0)">
                            <div class="btn">提币</div>
                        </div>
                    </div>
                </div>

                <div class="mallBox">
                    <div class="mallTitleBox">
                        <div class="mallTitleLeft">
                            <div class="titleBox">
                                <div class="icon"><img src="../../assets/img/asset/FIL@2x.png" alt=""></div>
                                <div class="title">FIL</div>
                            </div>
                        </div>
                    </div>

                    <div class="tipBox">
                        <div class="tipItem">
                            <div class="tipTitle">总资产</div>
                            <div class="tipDes">0</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">可用</div>
                                <div class="tipDes">0</div>
                        </div>
                        <div class="tipItem">
                                <div class="tipTitle">冻结余额</div>
                                <div class="tipDes">0</div>
                        </div>
                    </div>
                    <div class="mBtnWap">
                        <div class="mBtn" @click="pushAction(1,1)">
                            <div class="btn">充币</div>
                        </div>

                        <div class="mBtn" @click="pushAction(2,1)">
                            <div class="btn">提币</div>
                        </div>
                    </div>
                </div>
            
            </div> 
        </div> 
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
export default {
    name: "home",
    components: {
        Header
    },
    data(){
        return{
            index:0,
        }
    },
    mounted(){
        this.getMyAssetsAPI();
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         getMyAssetsAPI(){
                let that = this;
                request.get(`/user/assets`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                            
                        }else{
                          
                        }
                }));
        },
        pushAction(index,val){
            //充值
            if(index==1){
                this.$router.push('/recharge');
            }
            //提现
            else{
                this.$router.push('/withdrawal');
            }
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
    top: 1.02rem;
    bottom:0;
    width: 100%;
    overflow: auto;
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
        padding-right: 0.23rem;
        padding-left: 0.23rem;
        height: 5.15rem;
        background: #FFFFFF;
        box-shadow: 0px 10px 40px 0px rgba(130, 149, 180, 0.17);
        border-radius: 0.24rem;
        .mallTitleBox{
            margin-left: 0.18rem;
            margin-right: 0.18rem;
            height: 1.41rem;
            .mallTitleLeft{
               float: left;
               .titleBox{
                   display: flex;
                   align-items: center;
                  .title{
                      max-width: 4.6rem;
                      font-size: 0.34rem;
                      font-family: Source Han Sans CN;
                      font-weight: bold;
                      color: #121029;
                      line-height: 0.7rem;
                      overflow: hidden;
                  }
                  .icon{
                       margin-right: 0.26rem;
                       width: 0.48rem;
                       height: 0.48rem;
                       img{
                         width: 100%;
                         height: 100%;
                       }
                  }
               }
            }
        }
        .tipBox{
             display: flex;
             .tipItem{
                flex: 1;
                height: 100%;
                overflow: hidden;
                .tipTitle{
                     width:100%;
                     font-size:0.26rem;
                     font-family: PingFang SC;
                     color: #B5B4B9;
                     line-height: 0.32rem;
                     text-align: center;
                }
                .tipDes{
                     margin-top: 0.31rem;
                     width:100%;
                     text-align: center;
                     font-size: 0.34rem;
                     font-family: PingFang SC;
                     font-weight: bold;
                     color: #121029;
                     line-height: 0.7rem;
                }
             }
        }
        .mBtnWap{
            display: flex;
            margin-top: 0.69rem;
            .mBtn{
              flex: 1;
              overflow: hidden;
              margin: 0.2rem;
              width: 3rem;
              padding-top:0.2rem;
              padding-bottom:0.2rem;
              background: linear-gradient(0deg, #2F79F4);
              border-radius: 0.32rem;
              .btn{
                width: 100%;
                text-align: center;
                font-size: 0.28rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
              }
        }
        }
        
    }
}

</style>