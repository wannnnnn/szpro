<template>
      <div class="page">
           <Header title="我的订单" @handleLeft="handleLeft()"></Header>
                
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
        this.getHpDataAPI();
    },
    methods:{
         handleLeft(){
             this.$router.go(-1);
         },
         getHpDataAPI(){
                let that = this;
                request.get(`/net_data/net_info`).then((res=>{
                        console.log('res',res);
                        let data = res.data.Data;
                        if (res.data.Code == 0) {
                          

                            
                        }else{
                          
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

</style>