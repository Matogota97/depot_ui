import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
            user: null,
            url : "http://127.0.0.1:8000/api",
            notification:{type:"", message:""},
            groups: null,
            client_courant:{},
            vendeur_courant:{},
            produit_courant:{},
            carts:{}
        }
})
