import {createApp} from 'vue';
import Vuex from 'vuex';

//createApp.use(Vuex);
export default new Vuex.Store({
    state: {
        user: null,
        actions: [],
        photos: [],
        mapPoints: [],
        chat: [],
        qrCodeImage: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setActions(state, actions) {
            state.actions = actions;
        },
        setPhotos(state, photos) {
            state.photos = photos;
        },
        setMapPoints(state, mapPoints) {
            state.mapPoints = mapPoints;
        },
        setChat(state, chat) {
            state.chat = chat;
        },
        setQRCodeImage(state, qrCodeImage) {
            state.qrCodeImage = qrCodeImage;
        },
    },
    actions: {
        /*
        Вы можете использовать эту функцию checkInternetConnection перед выполнением запросов к серверу, чтобы проверить наличие интернета. Например:
        async loadData({ dispatch }) {
          try {
            const hasInternet = await checkInternetConnection();

            if (hasInternet) {
              // Если есть интернет, выполнить запрос к серверу
              await dispatch('getDataFromServer');
            } else {
              // Если нет интернета, загрузить данные из хранилища
              await dispatch('loadDataFromLocalStorage');
            }
          } catch (error) {
            console.error(error);
          }
        },
        * */
        async login({ commit }, { phoneNumber, cardNumber }) {
            try {
                localStorage.setItem("phone", phoneNumber);
                localStorage.setItem("card", cardNumber);
                // Отправить запрос на сервер для аутентификации
                const response = await sendAjaxRequest({
                    url: '/api/login',
                    method: 'POST',
                    data: {
                        phoneNumber,
                        cardNumber,
                    },
                });
                if(response.data.token != undefined){
                    localStorage.setItem("token", response.data.token);
                }
                const { user } = response.data;

                // Сохранить пользователя в хранилище
                commit('setUser', user);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
        },
        async getActions({ commit }) {
            try {
                // Отправить запрос на сервер для получения акций
                const response = await sendAjaxRequest({
                    url: '/api/actions',
                    method: 'GET',
                });
                const { actions } = response.data;

                // Сохранить акции в хранилище
                commit('setActions', actions);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
        },
        async getPhotos({ commit }) {
            try {
                // Отправить запрос на сервер для получения фотографий
                const response = await sendAjaxRequest({
                    url: '/api/photos',
                    method: 'GET',
                });
                const { photos } = response.data;

                // Сохранить фотографии в хранилище
                commit('setPhotos', photos);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
        },
        async getMapPoints({ commit }) {
            try {
                // Отправить запрос на сервер для получения точек на карте
                const response = await sendAjaxRequest({
                    url: '/api/mapPoints',
                    method: 'GET',
                });
                const { mapPoints } = response.data;

                // Сохранить точки на карте в хранилище
                commit('setMapPoints', mapPoints);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
        },
        async getChat({ commit }) {
            try {
                // Отправить запрос на сервер для получения чата
                const response = await sendAjaxRequest({
                    url: '/api/chat',
                    method: 'GET',
                });
                const { chat } = response.data;

                // Сохранить чат в хранилище
                commit('setChat', chat);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
        },
        async getQRCodeImage({ commit }) {
            try {
                // Отправить запрос на сервер для получения изображения QR-кода
                const response = await sendAjaxRequest({
                    url: '/api/qrCodeImage',
                    method: 'GET',
                });
                const { qrCodeImage } = response.data;

                // Сохранить изображение QR-кода в хранилище
                commit('setQRCodeImage', qrCodeImage);
            } catch (error) {
                // Обработка ошибок
                console.error(error);
            }
        },
    },
});


function sendAjaxRequest(url, method, data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.withCredentials = true;

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                resolve(responseData);
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        };

        xhr.onerror = function () {
            reject(new Error('Request failed'));
        };

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

function checkInternetConnection() {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = 'https://www.example.com/image.jpg'; // Замените URL на реальный ресурс
    });
}
