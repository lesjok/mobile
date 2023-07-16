import {
    createRouter,
    createWebHistory
} from "vue-router/dist/vue-router";

import startPage from "@/components/pages/Authentication.vue";
import authPage from "@/components/pages/Authentication.vue";
import qrCode from "@/components/pages/QRCode.vue";
import promotions from "@/components/pages/Promotions.vue";
import addresses from "@/components/pages/Addresses.vue";
import PaH from "@/components/pages/ProfileandHistory.vue";
import messages from "@/components/pages/Messages.vue";

const routes = [
    {
        path: "/",
        component: startPage
    },
    //index.html
    {
        path: "/index.html",
        component: startPage
    },
    {
        path: "/qr-code",
        component: qrCode
    },
    {
        path: "/promotions",
        component: promotions
    },
    {
        path: "/addresses",
        component: addresses
    },
    {
        path: "/profile-and-history",
        component: PaH
    },
    {
        path: "/messages",
        component: messages
    },
    {
        path: "/authentication",
        component: authPage
    },
]

const router = createRouter(
    {
    history: createWebHistory(),
    routes: routes,
    mode: 'history'
})
export default router;