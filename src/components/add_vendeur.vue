<template>
<div>
    <dialog-layout :title="title" @close="$emit('close')">
        <div class="wrap">
            <div class="content">
                <div class="form-group">
                    <label for="">Username</label>
                    <input v-model="username" type="text">
                </div>
                <div class="form-group">
                    <label for="">Nom</label>
                    <input v-model="first_name" type="text">
                </div>
                <div class="form-group">
                    <label for="">Prenom</label>
                    <input v-model="last_name" type="text">
                </div>
                <div class="form-group">
                    <label for="">E-mail</label>
                    <input v-model="nom" type="text">
                </div>
                <div class="form-group">
                    <label for="">Password</label>
                    <input v-model="password" type="text">
                </div>
                <div class="form-group">
                    <label for="">CNI</label>
                    <input v-model="cni" type="text">
                </div>
                <div class="form-group">
                    <label for="">Adresse</label>
                    <input v-model="adresse" type="text">
                </div>
                <div class="form-group">
                    <label for="">Telephone</label>
                    <input v-model="telephone" type="text">
                </div>
                <div class="btn-wrap">
                    <button class="bt-save" @click="soumettre">{{btn}}</button>
                </div>
            </div>
        </div>

    </dialog-layout>
    <notification />
</div>
</template>
<script>
import dialogLayout from './dialog-layout.vue'
import notification from './notification.vue'
import axios from 'axios'

export default {
    components: {
        notification,
        dialogLayout
    },
    props:["edit"],
    data(){
        return{ 
            title: 'Ajouter Vendeur',
            username:"",
            first_name:"",
            last_name:"",
            email :"",
            password:"",
            adresse:"",
            cni:"",
            telephone:"",
            btn:"soumettre"           
        }
    },
    methods:{
        soumettre() {
            let data = new FormData();
            data.append("user.username", this.last_name);
            data.append("user.first_name", this.first_name);
            data.append("user.last_name", this.last_name);
            data.append("user.email", this.email);
            data.append("user.password", this.password);
            data.append("adresse", this.adresse);
            data.append("telephone", this.telephone);
            data.append("cni", this.cni);
            if(!edit){
               axios.post(this.url + "/vendeur/",data,this.headers)
            .then(()=>{
            this.$store.state.notification = {
                type: "success",
                message: "vendeur ajouter avec succes!"
                }
            })
            .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.soumettre)
                }else
                    console.log(error)
                })
            
            } 
            }
            
        },  
};
</script>

<style scoped>

</style>