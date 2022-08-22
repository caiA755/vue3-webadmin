// import { createStore } from 'vuex'

const loginModule = {
    namespaced: true,
    state: () => {
        return {
            token: '',
            userInfo: {}
        }
    },
    mutations: {

    },
    getters: {},
    actions: {
        accountLoginAccount({ commit }, payload) {
            console.log("执行accountLoginAccount", payload);
        }
    }
}
export default loginModule