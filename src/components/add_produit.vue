<template>
<div>
    <dialog-layout :title="title" @close="$emit('close')">
        <div class="wrap">
            <div class="content">
                <div class="form-group">
                    <label for="">Nom Produit</label>
                    <input v-model="nom_produit" type="text">
                </div>
                <div class="form-group">
                    <label for="">Quantite</label>
                    <input v-model="quantite" type="text">
                </div>
                <div class="form-group">
                    <label for="">Prix Unitaire</label>
                    <input v-model="prix_unitaire" type="text">
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
    props:['edit'],
    data(){
        return{ 
            title: 'Ajouter un produit',
            nom_produit:"" ,
            quantite: "",
            prix_unitaire: "",
            btn:"Soumettre"
                
        }
    },
    methods:{
        soumettre() {
            let data = new FormData();
            data.append("nom_produit", this.nom_produit);
            data.append("quantite", this.quantite);
            data.append("prix_unitaire", this.prix_unitaire);
            
            if(this.nom_produit == ""||this.quantite == ""||this.prix_unitaire == ""||this.date_fabrication=="" || this.date_expiration==""){
                this.$store.state.notification = {
                        type: "danger",
                        message: "Veuillez completer tous les champs"
                    }
            }
            else if (!this.edit){
                axios.post(this.url + "/produit/",data,this.headers)
                .then(()=>{
                    this.$emit('update')
                    this.$emit('close',{'type':'success','message':'Informations soumises avec succes!'})
                    this.nom_produit = ""
                    this.quantite = ""
                    this.prix_unitaire = ""
                })
                .catch(error => {
                    if(error.response.status == 401 || error.response.status == 403){
                        this.refreshToken(this.soumettre)
                    }else
                        console.log(error)
                    })
               
                }
            else{
                axios.patch(this.url + "/produit/" + this.$store.state.produit_courant.id + '/',data,this.headers)
                .then(()=>{
                    this.$store.state.notification = {
                        type: "success",
                        message: "Produit modifie avec succes!"
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
            
            }
        },
        mounted(){
            if (this.edit) {
                this.nom_produit = this.$store.state.produit_courant.nom_produit
                this.quantite = this.$store.state.produit_courant.quantite
                this.prix_unitaire = this.$store.state.produit_courant.prix_unitaire
                this.title = "Modifier le produit"
                this.btn = "Modifier"
            }
        }  
};
</script>

<style scoped>

</style>