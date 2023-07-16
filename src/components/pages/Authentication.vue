<template>
  <div class="authpage">
    <img src="../../assets/images/logo.svg" class="logo"/>
    <div class="authtitle">Войти в аккаунт</div>

    <div v-if="this.inputphone">
      <div class="m-auto">
        <div class="input__tel d-fl mt24">
          +7(<input type="text" minlength="3" maxlength="3" size="3" placeholder="999" class="nums" inputmode="numeric" @keyup="updatekeys($event)">)
          <input type="text" minlength="3" maxlength="3" size="3" placeholder="999" class="nums" inputmode="numeric" @keyup="updatekeys($event)">-
          <input type="text" minlength="2" maxlength="2" size="2" placeholder="99" class="nums" inputmode="numeric" @keyup="updatekeys($event)">-
          <input type="text" minlength="2" maxlength="2" size="2" placeholder="99" class="nums" inputmode="numeric" @keyup="updatekeys($event)">
        </div>
      </div>
      <div class="d-fl">
        <input type="text" class="input_card w100 mt24 pl40" minlength="6" maxlength="6" size="6" inputmode="numeric" placeholder="Номер карты" v-model="this.cardnum">
      </div>
      <div class="d-fl">
        <input
            type="button"
            class="w100 myButton mt24"
            value="Войти"
            @click="sendrequest();"
        >
      </div>
        <!--<swipper :actions="sendrequest"/>-->

    </div>

    <div v-if="!this.inputphone">
      <div class="m-auto w66 textmsg outtextmsg" style="text-align: center;"> На указанный Вами номер телефона отправлено смс сообщение с кодом подтверждения авторизации! <br> Введите его. </div>
      <div style="display: flex; margin: auto;padding-top: 10px; width: 75%;height: 128px;flex-direction: column;">
        <input type="text" class="bordered w66" minlength="6" maxlength="6" size="6" inputmode="numeric" style="margin-top: 8px;" placeholder="Код из смс">
        <input
            type="button"
            class="bordered w66 greenbutton outbutton"
            style="margin-top: 32px;height: 42px; border-radius: 21px;"
            value="Войти"
            @click="sendrequest();"
        >
      </div>

    </div>

    <!--<bottom-navigation></bottom-navigation>
    <input
        type="button"
        class="bordered w66 greenbutton"
        style="margin-top: 32px;height: 42px; border-radius: 21px;"
        value="Войти"
        @click="sendrequest();"
    >-->
  </div>
</template>

<script>
//import LogoBig from "@/components/logoBig.vue";
import engine from "@/assets/engine";
import Swipper from "@/components/swipper.vue";

export default {
  name: "AuthPage",
  props:{
      param:{
          type: Object,
          requred:true
        },
    activate:{
      type: Boolean,
      requred: true
    }},
  components: {
    Swipper
  },
  data(){
    return{
      inputphone: true,
      cardnum: '',
      iphnnum: ''
    }
  },
  methods:{
    updatekeys(e){
      let nums = document.querySelectorAll(".nums");
      let len = e.target.maxLength;
      if(e.target.value.length == 0) {
        if (e.keyCode == 8) {
          for (let i in nums) {
            if (e.target == nums[i]) {
              let a = Number(i) - 1;
              if (nums[a] != undefined) {
                nums[a].focus();
                return 0;
              }
            }
          }
        }
      }
      if(len == e.target.value.length){
        for(let i in nums){
          if(e.target == nums[i]){
            let a = Number(i) + 1;
            //console.log(i+" :: " +a);
            if(nums[a]!=undefined){
              nums[a].focus();
            }
          }
        }
      }
    },
    getnumber(){
      let nums = document.querySelectorAll(".nums");
      let number = "";
      nums.forEach(e=>{
        number += e.value;
      })
      return number;
    },
    updateactivate() {
      this.$emit('update:activate', true);
    },
    updateparam() {
      let target = this.param.activ;
      let source = {}
      Object.assign(target, source);
      source.activ = 'qrcode';
      this.$emit('update:param', source);
    },
    sendrequest(){
      //alert('request');
      let url = 'mobile/login';

      let param = {
        phone: this.getnumber(),
        card: this.cardnum
      }
      if(param.phone == '' || param.phone.length < 10){ return false; }
      if(param.card == '' || param.card.length < 6){ return false; }

      localStorage.setItem("phone", param.phone);
      localStorage.setItem("card", param.card);

      engine.ajax(url, param, (json)=>{
        console.log(json);
        if(json.status == 'ok'){
          if(json.data == 'SEND PINCODE'){
            this.inputphone = false;
          }else{
            engine.savetoken(json.data);
            document.location.reload();
            /*this.updateactivate();
            this.updateparam();
            this.inputphone = false;*/
            //this.activate = true;
            //this.param.activ = 'qrcode';
          }
        }else{

        }
      })
    }
  }
}
</script>

<style scoped>
</style>