<template>
<div>
    <dialog-layout :title="title" @close="$emit('close')">
        <div class="wrap">
            <div class="content">
                <div class="form-group">
                    <label for="">Nom</label>
                    <input v-model="nom" type="text">
                </div>
                <div class="form-group">
                    <label for="">Prenom</label>
                    <input v-model="prenom" type="text">
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
            title: 'Ajouter un client',
            nom:"" ,
            prenom: "",
            adresse: "",
            telephone:"",
            btn:'Soumettre'
                
        }
    },
    methods:{
        soumettre() {
            let data = new FormData();
            data.append("nom", this.nom);
            data.append("prenom", this.prenom);
            data.append("adresse", this.adresse);
            data.append("telephone", this.telephone);

            if(this.nom == ""||this.prenom == ""||this.adresse == ""||this.telephone==""){
                this.$store.state.notification = {
                        type: "danger",
                        message: "Veuillez completer tous les champs"
                    }
            }
            else if (!this.edit){
                axios.post(this.url + "/client/",data,this.headers)
                .then(()=>{
                    this.$emit('update')
                    this.$emit('close',{'type':'success','message':'Informations soumises avec succes!'})
                    this.nom = ""
                    this.prenom = ""
                    this.adresse = ""
                    this.telephone = ""
                })
                .catch(error => {
                    if(error.response.status == 401 || error.response.status == 403){
                        this.refreshToken(this.soumettre)
                    }else
                        console.log(error)
                    })
               
                }
            else{
                axios.patch(this.url + "/client/" + this.$store.state.client_courant.id + '/',data,this.headers)
                .then(()=>{
                    this.$store.state.notification = {
                        type: "success",
                        message: "Information modifie avec succes!"
                    }
                    this.$emit('update')
                    this.$emit('close')
                })
                .catch(error => {
                    if(error.response.status == 401 || error.response.status == 403){
                        this.refreshToken(this.soumettre)
                    }else
                         console.log(error)
                        })
            }
            
            },
            details(id){
                axios.get(this.$store.state.url+"/client/"+id+"/detail/",this.headers)
                .then((response)=>{
                    console.log(response.data)
                    this.client_courant = response.data
                    console.log(this.client_courant)
                }).catch((error)=>{
                    console.log(error)
                })
            },

        },
        mounted(){
            if(this.edit){
                this.nom = this.$store.state.client_courant.nom
                this.prenom = this.$store.state.client_courant.prenom
                this.adresse = this.$store.state.client_courant.adresse
                this.telephone = this.$store.state.client_courant.telephone
                this.title = "Modifier Client"
                this.btn = "Modifier" 
            }
        }  
};
</script>

<style scoped>

</style>