import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from'./routers/router'
import '@mdi/font/css/materialdesignicons.min.css'
import axios from 'axios'
import excel from 'vue-excel-export'
 
Vue.use(excel)
Vue.config.productionTip = false
Vue.mixin({
    methods:{
        user_is(name){
          return this.$store.state.user.groups.includes(name)
        },
        loadGroups(){
            axios.get(this.url+`/groups/`, this.headers)
            .then((res)=>{
              this.$store.state.groups = res.data
              console.log(this.$store.state.groups)
            }).catch((error)=>{
              console.log(error)
            })
        },
        money(x) {
          x = parseFloat(x).toFixed(0)
          if(!x) return "-";
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
        refreshToken(callback){
          let refresh = this.$store.state.user.refresh
          if(!refresh){
            this.$store.state.user = null;
          }
          axios.post(this.url+"/refresh/",{"refresh":refresh})
          .then((response) =>  {
            this.$store.state.user.access = response.data.access
            callback()
          })
          .catch((error)=>{
            if(error.response && error.response.status == 401){
              this.$store.state.user = null;
              this.$store.state.notification = {
                type: "danger",
                message: "Session termine"
            }
            } else {
              console.log(error)
            }
          })
    },
    },
    computed: {
        url() {
            return this.$store.state.url
        },
        headers(){
            return {
                headers:{
                    "Authorization":"Bearer "+this.$store.state.user.access
        }
    }
    }
}})
new Vue({
  render: h => h(App),
  router, store
}).$mount('#app')
