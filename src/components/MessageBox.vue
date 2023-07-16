<template>
  <div v-if="msgtick > 0" class="messagebox" :class="this.message.class">
    {{ getMessage() }}
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: ['message'],
  data(){
    return{
      myclass: 'success',
      mess: 'Ничего не написано!',
      msgtick: 3,
    }
  },
  mounted() {
    this.tick();
  },
  methods:{
    getMessage(){
      if(this.message.message == undefined){
        return this.message.message;
      }
      return this.mess;
    },
    tick(){
      //console.log(this.msgtick)
      if(this.msgtick > 0){
        this.msgtick --;
      }else{
        this.msgtick = 0;
      }
      setTimeout(()=>{ this.tick(); }, 1000);
    }
  }
}
</script>

<style scoped>



</style>