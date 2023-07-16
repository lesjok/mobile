<template>
  <div class="page">
    <h1>Акции</h1>
    <!-- Отображаем список акций -->
    <ul class="list">
      <li v-for="promotion in actionss" :key="promotion.id" class="promotion d-fl">
        
        <img class="promotion__img" :src="img" :alt="promotion.name">
        <div class="d-fl fl-c pl20">
          <span class="item__title">{{ promotion.name }}</span>
          <!-- <p class="text-limit">{{ promotion.cond }}</p> -->
          <button class="myButton mt-auto" style="width:90px" @click="showPopup(promotion)">Подробнее</button>
        </div>
      </li>
    </ul>
    <!-- Модальное окно с полной информацией об акции -->
    <div v-if="selectedPromotion" class="modal">
      <h2 class="ta_c">{{ selectedPromotion.name }}</h2>
      <img style="border-radius: 20px;" :src="img" :alt="selectedPromotion.name">
      <p class="ta_c">{{ selectedPromotion.cond }}</p>
      <button class="myButton w30" @click="selectedPromotion = null">Закрыть</button>
    </div>
    <!-- Добавляем BottomNavigation
    <bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
//import { mapGetters, mapActions } from 'vuex';
import BottomNavigation from '@/components/BottomNavigation.vue';
import engine from "@/assets/engine";

export default {
  components: {
    BottomNavigation,
  },
  computed: {
    //...mapGetters(['promotions']),
    //...mapGetters(['actions']),
  },
  created() {
    let mydata = engine.mycontents();
    this.actionss = mydata['actions'];
  },
  data() {
    return {
      selectedPromotion: null,
      img: require('../../aimg/good.jpg'),
      actionss:[
        {id: 1, image: 'none', name: 'Тест 1', cond: 'Тестовая акция! Проводим тестовую акцию на тестовый товар, смотрим, как работает этот компонент.'},
        {id: 2, image: 'none', name: 'Тест 2', cond: 'Тестовая акция! Проводим тестовую акцию на тестовый товар, смотрим, как работает этот компонент.'},
        {id: 3, image: 'none', name: 'Тест 3', cond: 'Тестовая акция! Проводим тестовую акцию на тестовый товар, смотрим, как работает этот компонент.'},
        {id: 4, image: 'none', name: 'Тест 4', cond: 'Тестовая акция! Проводим тестовую акцию на тестовый товар, смотрим, как работает этот компонент.'},
        {id: 5, image: 'none', name: 'Тест 5', cond: 'Тестовая акция! Проводим тестовую акцию на тестовый товар, смотрим, как работает этот компонент.'},
        {id: 6, image: 'none', name: 'Тест 6', cond: 'Тестовая акция! Проводим тестовую акцию на тестовый товар, смотрим, как работает этот компонент.'},
      ]
    };
  },
  methods: {
    //...mapActions(['getActions']),
    showPopup(promotion) {
      this.selectedPromotion = promotion;
    },
  },
  mounted() {
    //this.getActions();
  },
};

</script>

<style scoped>
</style>
