<template>
    <div class="swipper" id="swipper">
      <div class="draggable"></div>
    </div>
</template>

<script>
export default {
  name: 'swipper',
  props:['actions'],
  data() {
    return {
      isDone: false,
      scrollXX: 0,
    };
  },
  mounted() {
    //console.log(this.actions);
    //let swpr = document.querySelector('#swipper');
    let element = document.getElementById('swipper');
    let maxScroll = element.scrollWidth - element.clientWidth - 32;
    let s = this;
    element.addEventListener('scroll', function(event) {
      // Обработка события скролла
      let scrollPosition = element.scrollLeft;
      s.scrollXX = scrollPosition + " : "+maxScroll;
      if( scrollPosition >= maxScroll){
        if(!s.isDone) {
          s.isDone = true
          if(s.actions != undefined){
            if(s.actions() == false){
              alert('Ошибка авторизации!');
              element.scrollLeft = 0;
              s.isDone = false;
            }
          }
        }
      }
    });
  },
  methods: {

  },
};
</script>

<style>
</style>
