<template>
    <div class="page">
        <Header title="收益明细" @handleLeft="handleLeft()"></Header>
        <div class="wrap">
              
        </div> 
   
    </div>
</template>


<script>
import Header from './common/NavView';
import request from "../../api/request";
export default {
    name: "incomeDetail",
    components: {
        Header
    },
    data(){
        return{
            coinNum:'',
            coinAddress:'',//地址
            userPhone:'',//手机号码
            userCode:'',//验证码：
            isValidateing:false,//是否在验证中
            buttonName: "获取验证码",
            isDisabled: false, //验证码再次发送
            time: 60,
        }
    },
    mounted(){
        this.getHpDataAPI();
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         getMsgAPI(){
            if(this.isDisabled){
                return;
            }
            
            let that = this;
            request.post(`/account/send_code`, 
            { 
              account:this.userPhone 
            }).then((res=>{
                console.log('res',res);
                
                if (res.data.Code == 0) {
                        that.isValidateing = true;
                        that.isDisabled = true;
                        let interval = window.setInterval(function() {
                        that.buttonName = "重新发送(" + that.time + "s)";
                        --that.time;
                        if (that.time < 0) {
                            that.buttonName = "获取验证码";
                            that.time = 60;
                            that.isDisabled = false;
                            window.clearInterval(interval);
                            that.isValidateing = false;
                        }
                        }, 1000);
                        this.$toast({
                        message: "发送成功!"
                        });
                    }else{
                        this.$toast({
                        message: res.data.Msg
                        });
                    }
            }));
        },
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
    top: 1.04rem;
    bottom: 0;
    width: 100%;
    overflow: auto;
    padding-bottom: 0.5rem;
}


</style>