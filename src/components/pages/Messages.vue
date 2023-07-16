<template>
  <div class="page">
    <h1>Сообщения</h1>
    <!-- Отображаем список сообщений -->
    <ul>
      <li v-for="message in messages" :key="message.id" :class="{ 'selected': selectedMessage === message }" @click="selectMessage(message)">
        {{ message.sender }}: {{ message.text }}
      </li>
    </ul>
    <!-- Отображаем выбранное сообщение -->
    <div v-if="selectedMessage" class="selected-message">
      <h2>{{ selectedMessage.sender }}</h2>
      <p>{{ selectedMessage.text }}</p>
      <button @click="selectedMessage = null">Close</button>
    </div>
    <!-- Добавляем BottomNavigation
    <bottom-navigation></bottom-navigation>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BottomNavigation from '@/components/BottomNavigation.vue';
import engine from "@/assets/engine";

export default {
  components: {
    BottomNavigation,
  },
  computed: {
    //...mapGetters(['messages']),
  },
  mounted() {
    //console.log(engine.gettoken());
  },
  data() {
    return {
      selectedMessage: null,
      messages: [],
    };
  },
  methods: {
    selectMessage(message) {
      this.selectedMessage = message;
    },
  },
};
</script>

<style scoped>
.page {
  padding: 20px;
}

.selected {
  background-color: lightgray;
}

.selected-message {
  margin-top: 20px;
}
</style>
