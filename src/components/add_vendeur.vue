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
                    <input v-model="password" type="password">
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
            if(!this.edit){
                axios.post(this.url + "/vendeur/",data,this.headers)
                .then(()=>{
                this.$store.state.notification = {
                    type : "success",
                    message : "Vendeur ajouter avec succes"
                }
                this.$emit('update')
                this.$emit('close')
            })
            .catch((error)=>{
                console.log(error)
            })
            }else {
                axios.patch(this.url + "/vendeur/" + this.$store.state.vendeur_courant.id + '/',data,this.headers)
                .then(()=>{
                    this.$store.state.notification = {
                        type: "success",
                        message: "Informations modifies avec succes!"
                    }
                    this.$emit('update')
                    this.$emit('close')
                })
                .catch((error)=>{
                    console.log(error)
                })
            }

        },
    },
    mounted(){
        if(this.edit){
            this.title = "Modifier Venduer"
            this.btn="Modifier"
            this.username = this.$store.state.vendeur_courant.user.username
            this.first_name = this.$store.state.vendeur_courant.user.first_name
            this.last_name = this.$store.state.vendeur_courant.user.last_name
            //this.password = this.$store.state.vendeur_courant.user.password
            this.adresse = this.$store.state.vendeur_courant.adresse
            this.telephone = this.$store.state.vendeur_courant.telephone
        }
    },     
};
</script>

<style scoped>

</style>