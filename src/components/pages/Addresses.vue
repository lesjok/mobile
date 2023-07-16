<template>
  <div class="page">
    <h1>Адреса</h1>
    <!-- Добавляем табы для отображения карты и списка адресов -->
    <div>
      <button class="tab" :class="{tab__active: activeTab == 'map'}" @click="activeTab = 'map'">Карта</button>
      <button class="tab" :class="{tab__active: activeTab == 'list'}" @click="activeTab = 'list'">Поиск</button>
    </div>
    <div v-if="activeTab === 'map'" class="mt24">
      <!-- Отображаем карту с магазинами -->
      <!-- <h2>Карта</h2> -->
      <map-component :markers="storeL"></map-component>
    </div>
    <div v-else-if="activeTab === 'list'">
      <!-- Отображаем список адресов -->
      <!-- <h2>Поиск</h2> -->
      <!-- <div class="list"> -->
        <input class="input__search" type="text" v-model="searchQuery"/>
        <ul class="list">
          <li v-for="store in filteredItems" :key="store.id" class="list__item d-fl item__address" @click="showOnMap(store)">
            <div class="item__img item__img_location"></div>
            <div class="item__title pl20">{{ store.name }} - {{ store.address }}</div>
          </li>
        </ul>
      <!-- </div> -->
    </div>
    <!-- Добавляем BottomNavigation
    <bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BottomNavigation from '@/components/BottomNavigation.vue';
import MapComponent from '@/components/MapComponent.vue';
import engine from "@/assets/engine";

export default {
  components: {
    BottomNavigation,
    MapComponent,
  },
  computed: {
    //...mapGetters(['storeLocations']),
    filteredItems() {
      if (this.searchQuery == "") {
      return this.storeL;
    } else {
      return this.storeL.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  },
  props:{
    storeLocations:{
      type: Array,
      default:[]
    },
  },
  data() {
    return {
      activeTab: 'map',
      storeL:[],
      searchQuery: ""
    };
  },
  methods: {
    //...mapActions(['fetchStoreLocations']),
    showOnMap(store) {
      this.activeTab = 'map';
      // Отображаем выбранный магазин на карте
      // TODO: Реализовать логику отображения на карте
    },
    setMarkets(){
      let mydata = engine.mycontents();
      //console.log(mydata)
      if(this.mydata != null) {
        this.storeL = mydata.markets;

      }else{
        this.setMarkets();
      }
    }
  },
  mounted() {
    //this.fetchStoreLocations();
    //console.log(engine.gettoken());
    //console.log(this.storeLocations)
    if(this.storeLocations != null) {
      this.storeL = this.storeLocations;
    }else{
      this.setMarkets();
    }

  },
};
</script>
