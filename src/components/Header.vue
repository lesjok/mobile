<template>
  <header class="header">
    <div class="header__logo">
      <!-- Логотип компании
      <img :src="logo" />-->
    </div>
    <div v-if="loyaltyPoints > 0" class="loyalty-points">
      <!-- Количество накопленных бонусов -->
      <span class="loyalty-points__label">Бонусы:</span>
      <span class="loyalty-points__count">{{ loyaltyPoints }}</span>
    </div>
  </header>
</template>

<script>
import myLogo from "@/assets/logo.png"
export default {
  data(){
    return{
      logo: myLogo,
    }
  },
  computed: {
    loyaltyPoints() {
      // Получение количества накопленных бонусов из хранилища
      return this.$store.state.loyaltyPoints;
    },
  },
};
</script>

<style scoped>
</style>
