import { createStore } from 'vuex'
import loginModule from './login/login'

const store = createStore({
    state: () => {
        return {
            name: "cai"
        }
    },
    mutations: {

    },
    getters: {},
    actions: {},
    modules: {
        loginModule
    }
})