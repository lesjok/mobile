<template>
  <div class="map-container">
    <div id="map" style=""></div>
  </div>
</template>

<script>

export default {
  name:"MapComponent",
  data(){
    return{
      map:{},
      placemarks: [
        {
          coords: [54.8, 39.8],
          properties: {}, // define properties here
          options: {}, // define options here
          clusterName: "1",
          callbacks: { click: function() {} }
        }
      ],
      settings:{
        apiKey: 'ecb116f9-4a07-4dd6-a46a-9620f91070bc',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      },
      center: [52.608826, 39.599229],
      zoom: 13
    }
  },
  created() {
    let sYandexMap = document.createElement('script');
    sYandexMap.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?apikey=ecb116f9-4a07-4dd6-a46a-9620f91070bc&lang=ru_RU');
    document.head.appendChild(sYandexMap);
    sYandexMap.addEventListener("load", this.initializeYandexMap);
  },
  mounted() {

  },
  methods:{
    initializeYandexMap() {
      ymaps.ready(() => {
        this.map = new ymaps.Map("map", {
          center: this.center,
          zoom: this.zoom,
          controls: ['fullscreenControl'],
          searchControlProvider: 'yandex#search'
        });
        //this.map.behaviors.disable('scrollZoom');
        this.setMarkers();
        //this.coordinates.then(() => this.setMarkers());
      });
    },
    setMarkers() {
      let points = [{coords:[52.608826, 39.599229], title: 'Я тащусь', content: 'Ну давай уже тащи'}];

      /*
      // Метка по адресу. Строка с адресом, который необходимо геокодировать
      let address = 'Москва, ул. Льва Толстого, 16';
      let geocoder = ymaps.geocode(address);

      // После того, как поиск вернул результат, вызывается callback-функция
      geocoder.then(
          function (res) {
          // координаты объекта
            var coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            var placemark = new ymaps.Placemark(
                coordinates, {
                  'hintContent': address,
                  'balloonContent': 'Время работы: Пн-Пт, с 9 до 20'
                }, {
                  'preset': 'islands#redDotIcon'
                }
            );
            myMap.geoObjects.add(placemark);
          }
      );
      */
      if(points.length > 0) {
        points.forEach(m => {
          let myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
              type: "Point",
              coordinates: m.coords
            },
            // Свойства.
            properties: {
              iconContent: m.title,
              hintContent: m.content
            }
          }, {
            preset: 'islands#blackStretchyIcon',
            draggable: true
          })

          this.map.geoObjects.add(myGeoObject);
        });
      }
    }
  },
  props: {
    markers: {
      type: Array,
      default: []
    },
  },
};
</script>

<style scoped>
</style>
