import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import "@/assets/css/style.css";
import store from './store';
//import YmapPlugin from 'vue-yandex-maps'

const app = createApp(App);
//app.mount("#app");

/*const app = createApp({
    store//,
    //render: h => h(App),
});*/

/*const settings = {
    apiKey: 'ecb116f9-4a07-4dd6-a46a-9620f91070bc',
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
}*/
//const YmapPlugin =  require('vue-yandex-maps');
//app.use()

app.use(store);
app.use(router);
//app.use(YmapPlugin, settings)

app.mount('#app');

/*app.use(router);
app.directive("click-outside", {
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
            if (!(el === event.target || (el.contains(event.target)))) {
                binding.value(event, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
})*/

