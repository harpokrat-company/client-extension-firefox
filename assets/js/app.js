import Vue from 'vue';
import App from './App.vue'

import { router } from './router';

new Vue({
    router,
    el: '#my-app',
    components: {
        App
    },
    render(h) {
        return h('app');
    }
});
