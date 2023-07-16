<template>
  <div class="bottom-navigation">
    <!--<router-link to="/authentication" class="bottom-navigation__item" :class="{ 'active': isActive('/authentication') }">
      <i class="fas fa-lock"></i>
      <span>Authentication</span>
    </router-link>
    <router-link to="/qr-code" class="bottom-navigation__item" :class="{ 'active': isActive('/qr-code') }">
      <i class="fas fa-qrcode"></i>
      <span>QR Код</span>
    </router-link>
    <router-link to="/promotions" class="bottom-navigation__item" :class="{ 'active': isActive('/promotions') }">
      <i class="fas fa-gift"></i>
      <span>Акции</span>
    </router-link>
    <router-link to="/addresses" class="bottom-navigation__item" :class="{ 'active': isActive('/addresses') }">
      <i class="fas fa-map-marker-alt"></i>
      <span>Aдреса</span>
    </router-link>
    <router-link to="/profile-and-history" class="bottom-navigation__item" :class="{ 'active': isActive('/profile-and-history') }">
      <i class="fas fa-user"></i>
      <span>Профиль</span>
    </router-link>
    <router-link to="/messages" class="bottom-navigation__item" :class="{ 'active': isActive('/messages') }">
      <i class="fas fa-comments"></i>
      <span>Сообщения</span>
    </router-link>-->
    <div @click="active('qrcode')" class="bottom-navigation__item qrcode__item" :class="{ 'active': isActive('qrcode') }">
      <!-- <i class="fas fa-qrcode"></i> -->
      <div class="bottom-navigation__text">QR Код</div>
    </div>
    <div @click="active('promos')" class="bottom-navigation__item promos__item" :class="{ 'active': isActive('promos') }">
      <!-- <i class="fas fa-gift"></i> -->
      <div class="bottom-navigation__text">Акции</div>
    </div>
    <div @click="active('adrs')" class="bottom-navigation__item adrs__item" :class="{ 'active': isActive('adrs') }">
      <!-- <i class="fas fa-map-marker-alt"></i> -->
      <div class="bottom-navigation__text">Aдреса</div>
    </div>
    <div @click="active('profile')" class="bottom-navigation__item profile__item" :class="{ 'active': isActive('profile') }">
      <!-- <i class="fas fa-user"></i> -->
      <div class="bottom-navigation__text">Профиль</div>
    </div>
    <!--<div @click="active('messages')" class="bottom-navigation__item" :class="{ 'active': isActive('messages') }">
      <i class="fas fa-comments"></i>
      <span>Сообщения</span>
    </div>-->
  </div>
</template>

<script>
import engine from "@/assets/engine";
export default {
  props:['param'],
  mounted() {
    //console.log(engine.gettoken());
  },
  methods: {
    active(activities){
      engine.setInterface(activities);
      if(this.param != undefined && this.param.activ != undefined) {
        this.param.activ = activities;
      }
    },
    isActive(route) {
      //console.log('TOKEN: ');
      //console.log(engine.gettoken());
      //if(engine.gettoken() == null) {
      //  route = "/authentication";
      //}
      //console.log('ROUTE: '+route);
      return this.param.activ === route//this.$route.path === route;
    },
  },
};
</script>

<style>
</style>
