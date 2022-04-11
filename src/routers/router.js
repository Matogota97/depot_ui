import Vue from "vue";
import VueRouter from "vue-router";
//import home from '../views/Home.vue'
import Clients from '../views/Client.vue'
import Vendeurs from '../views/Vendeur.vue'
import Produits from '../views/Produit.vue'
import Stocks from '../views/Stock.vue'
import Ventes from '../views/Vente.vue'
Vue.use(VueRouter)

const routes = [
	//{path:'/', name:"home",component:Membre},
	{path:'/client', name:"client",component:Clients},
	{path:'/vendeur', name:"vendeur",component:Vendeurs},
	{path:'/produit', name:"produit",component:Produits},
	{path:'/stock', name:"stock",component:Stocks},
	{path:'/vente', name:"vente",component:Ventes},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router;
