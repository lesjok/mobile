<template>
  <div class="page">
    <h1 class="ta_c">QR Код</h1>
    <!-- Отображаем QR-код пользователя -->
    <div id="QRcoder" class="qrcode myClass">
      <!--<img :src="userQRCode" alt="QR Code">-->
    </div>
    <div class="qrcode__title">
      Покажите данный код на кассе.
      Для списания или начисления бонусных баллов.
    </div>
    <!-- Добавляем BottomNavigation
    <bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BottomNavigation from '@/components/BottomNavigation.vue';
import QRCode from  '@/qr';
import engine from "@/assets/engine";

export default {
  components: {
    BottomNavigation,
  },
  computed: {
    //...mapGetters(['userQRCode']),
  },
  created() {
    this.phone = engine.getparam('phone');
  },
  mounted() {
    this.makeqrcode(this.phone);
  },
  data(){
    return{
      phone:'',
      testClass:{
        borderRadius: '16px'
      }
    }
  },
  methods:{
    makeclass(aclass, element){
      //let myclass =
    },
    makeqrcode(text){
      let qrCodeOutput = document.querySelector('#QRcoder');
      let options = {ecclevel: 'L', modulesize: 8};
      qrCodeOutput.append(QRCode.generateHTML(text, options))
    }
  }
};
</script>

<style scoped>
</style>
