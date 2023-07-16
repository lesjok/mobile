<template>
  <div class="page">
    <h1>Профиль</h1>
    <!-- Добавляем табы для отображения информации о профиле и истории -->
    <div class="d-fl">
      <button class="tab" :class="{tab__active: activeTab == 'profile'}" @click="activeTab = 'profile'">Профиль</button>
      <button class="tab" :class="{tab__active: activeTab == 'history'}" @click="activeTab = 'history'">История</button>
    </div>
    <div v-if="activeTab === 'profile'">
      <!-- Отображаем информацию о профиле пользователя -->
      <!-- <h2>Профиль</h2> -->
      <div class="d-fl fl-c">
      <table>
        <tr>
          <td><input type="text" class="w100 input_name pl40 mt24" placeholder="Имя" v-model="user.name"></td>
        </tr>
        <tr>
          <td><input type="text" class="w100 input_tel pl40 mt24" placeholder="Телефон" v-model="user.phone"></td>
        </tr>
        <tr>
          <td><input type="text" class="w100 input_card pl40 mt24" placeholder="Карта" v-model="user.card"></td>
        </tr>
        <tr>
          <td><input type="text" class="w100 input_email pl40 mt24" placeholder="Email" v-model="user.email"></td>
        </tr>
        <tr>
          <td><input type="text" class="w100 pl40 mt24" placeholder="Потрачено"></td>
        </tr>
        <tr>
          <td><input type="text" class="w100 pl40 mt24" placeholder="Остаток"></td>
        </tr>
      </table>
      <!--<p>Имя: {{ use.fullName }}</p>
      <p>Телефон: {{ use.phoneNumber }}</p>
      <p>Карта: {{ use.cardNumber }}</p>
      <p>Email: {{ use.email }}</p>
      <p>Потраченных: {{ use.spentAmount }}</p>
      <p>Остаток: {{ use.remainingAmount }}</p>-->
      </div>
    </div>
    <div v-else-if="activeTab === 'history'">
      <!-- Отображаем историю покупок и начислений баллов -->
      <!-- <h2>История</h2> -->
      <input class="input__search" type="text" v-model="searchQuery"/>
      <div class="list__container">
        <ul class="list">
          <li v-for="entry in filteredItems" :key="entry.id" class="item item__transaction d-fl">
            <!-- <div class="d-fl item"> -->
              <div class="mr-auto d-fl">
                <div class="item__img item__img_wallet"></div>
                <div class="d-fl fl-c pl20">
                  <span class="item__title">{{ entry.point == -1 ? '-' : entry.point }}</span>
                  <div class="mr-auto item__time">{{ entry.date.split('-').reverse().join('.') + " | " + entry.time }}</div>
                </div>
          
              </div>
              <div class="d-fl fl-c">
                <div class="ml-auto item__summ">{{ entry.summ }} бон.</div>
                <div class="mrl-auto item__type">{{ (entry.type == 1)?'картой':'наличными' }}</div>
              </div>
            <!-- </div> -->
          </li>
        </ul>
      </div>
    </div>
    <!-- Добавляем BottomNavigation
    <bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BottomNavigation from '@/components/BottomNavigation.vue';
import engine from "@/assets/engine";
import {useRoute} from "vue-router";

export default {
  components: {
    BottomNavigation,
  },
  props:{
    user:{
    type: Object,
    default:
      {
        name: "",
        phone:"",
        card:"",
        email:"",
        spentAmount:"",
        remainingAmount:""
      }
    },
    history:{
      type: Array,
      default:[
        {date: '01.05.2023 10:00', description: 'Чек: 100 руб. ', added: '5 бон.'},
        {date: '01.05.2023 10:00', description: 'Чек: 100 руб. ', added: '5 бон.'},
        {date: '02.05.2023 10:00', description: 'Чек: 100 руб. ', added: '5 бон.'},
        {date: '03.05.2023 10:00', description: 'Чек: 100 руб. ', added: '5 бон.'},
        {date: '03.05.2023 10:00', description: 'Чек: 100 руб. ', added: '5 бон.'},
        {date: '05.05.2023 10:00', description: 'Чек: 100 руб. ', added: '5 бон.'}
      ]
    }
  },
  computed: {
    //...mapGetters(['user', 'history']),
    filteredItems() {
      if (this.searchQuery == "") {
        
      return this.history;
    } else {
      return this.history.filter((item) =>
        item.point.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  },
  mounted() {
    //console.log(this.history);
  },
  data() {
    return {
      searchQuery: "",
      activeTab: 'profile',
    };
  },
  methods: {

  }
};
</script>

<style scoped>
</style>
