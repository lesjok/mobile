/* eslint-disable */
const backend_url = "https://zakroma.bot-cloud.ru/app/";
export default class engine {

    static ls = localStorage;
    static myList = [];
    static answer = [];
    constructor(){
        setTimeout(()=> {
            //this.getProperties();
            //checktoken();
        },5000);

    }

    static savetoken( token ){
        this.ls.setItem('token', token);
    }

    static gettoken(){
        return this.ls.getItem('token');
    }

    static getInterface() {
        return this.ls.getItem('interface');
    }

    static setInterface(name){
        this.ls.setItem('interface', name);
    }

    static myContent(){
        return this.ls.getItem('mycontent');
    }

    static mycontents(){
        let mc = this.ls.getItem('mycontent');
        if(mc != null && mc != '' && mc.length != 0) {
            mc = JSON.parse(mc)
        }else{
            mc = null;
        }
        return mc;
    }

    static getparam(name){
        return this.ls.getItem(name);
    }

    static ajax(url, params = null, func = null) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", backend_url + url, true);
        //xhr.withCredentials = true;
        //let token = this.gettoken();
        //xhr.setRequestHeader('Cookie', `token=${token}`);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    if (func !== null) {
                        //console.log(xhr.response)
                        try {
                            let json = JSON.parse(xhr.response);

                            if (json.code == 102) {
                                //Functions.deleteAllCookies();
                                //window.location.href = './auth';
                            }
                            //console.log(json)
                            func(json);/**/
                        }catch (e){
                            console.log(xhr.response);
                            console.log(e.message);
                        }
                    }
                }
            }
        };
        let fd = new FormData();
        if (params !== null) {
            Object.entries(params).forEach((element) => {
                fd.append(element[0], element[1]);
            });
        }

        fd.append("token", this.gettoken());

        xhr.send(fd);
    }

    static getLocalCookie(cookieName) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
                return cookie.substring(cookieName.length + 1);
            }
        }
        return '';
    }

    static getProperties(){
        this.ajax('app/getstyles',  null, this.makeProperties);
    }

    static checktoken(){
        let param = {token: this.gettoken(), phone: this.ls.getItem('phone')}
        this.ajax('mobile/checktoken', param, (json)=> {
            //console.log(json);
            if (json.status != 'ok' || json.data != 'granted') {
                if(this.gettoken() != null && this.gettoken() != '') {
                    this.savetoken('');
                    this.ls.setItem('phone', '');
                    this.ls.setItem('mycontent', '');
                    document.location.reload();
                }
            }else {
                setTimeout(() => {
                    let mc = this.myContent()
                    if(mc == null || mc == ''){
                        this.ajax('mobile/getAllContent', param, (json)=> {
                            this.ls.setItem('mycontent', JSON.stringify(json));
                        });
                        //getAllContent
                    }
                    this.checktoken();
                }, 5000);
            }
        });
    }

    static makeProperties(classes){
        console.log("CLSS: ");
        console.log(classes);
        // Создаем элемент <style>
        const styleElement = document.createElement('style');
        // Устанавливаем атрибут type
        styleElement.setAttribute('type', 'text/css');
        // Создаем правило стиля
        const styleRule = document.createTextNode(classes.data);
        // Добавляем правило стиля в элемент <style>
        styleElement.appendChild(styleRule);
        // Добавляем элемент <style> в головную часть документа
        document.head.appendChild(styleElement);
    }
}

/*let en = new engine();
en.getProperties();
en.checktoken();*/