<template>
  <div id="app">
    <!--<Header />

    <router-view />-->
    <authentication v-if="!activate" :param.sync="param" :activate.sync="activate"/>
    <q-r-code v-if="activate && param.activ == 'qrcode'" />
    <promotions v-if="activate && param.activ == 'promos'" />
    <profileand-history v-if="activate && param.activ == 'profile'" :user="user" :history="history" />
    <addresses v-if="activate && param.activ == 'adrs'" :store-locations="store" />
    <messages v-if="activate && param.activ == 'messages'" />

    <!--<Footer />-->
    <bottom-navigation v-if="activate" :param="param" />

    <message-box :message="msgbox"/>

    <pre-loader v-if="preload"/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Authentication from "@/components/pages/Authentication.vue";
import QRCode from "@/components/pages/QRCode.vue";
import Promotions from "@/components/pages/Promotions.vue";
import ProfileandHistory from "@/components/pages/ProfileandHistory.vue";
import Addresses from "@/components/pages/Addresses.vue";
import Messages from "@/components/pages/Messages.vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import engine from "@/assets/engine";
import MessageBox from "@/components/MessageBox.vue";
import PreLoader from "@/components/preLoader.vue";

export default {
  components: {
    PreLoader,
    MessageBox,
    BottomNavigation,
    Messages,
    Addresses,
    ProfileandHistory,
    Promotions,
    QRCode,
    Authentication,
    Header,
    Footer,
  },
  created() {
    this.getallparams();
    if(this.activate) {
      this.param.activ = engine.getInterface();
    }
    //console.log(param)
  },
  mounted() {
    if(this.activate && this.param.activ == ''){
      this.param.activ == 'qrcode';
    }else{
      this.param.activ = engine.getInterface();
    }
    if(engine.gettoken() != null && engine.gettoken() != ''){
      this.activate = true;
    }else{
      this.activate = false;
    }
    engine.checktoken();
  },
  data(){
    return{
      activate: false,
      preload: false,
      param: {activ: 'qrcode'},
      msgbox: {class: 'success', message: 'Тестовое сообщение!'},
      user: {},
      history: [],
      store:[],
    }
  },
  methods:{
    getallparams(){

      let param = engine.mycontents();
      if(param != null) {
        this.user = param.user;
        this.history = param.history;
        this.store = param.markets;
        this.preload = false;
      }else{
        let tkn = engine.gettoken();
        if(tkn == null || tkn == ''){
          this.preload = false;
        }else {
          this.preload = true;
        }
        setTimeout(()=> {
          this.getallparams();
        },2000);
      }
    }
  }
};
</script>

<style>
</style>

