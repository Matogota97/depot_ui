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
                <div class="form-group">
                    <label for="">Date Fabrication</label>
                    <input v-model="date_fabrication" type="date">
                </div>
                <div class="form-group">
                    <label for="">Date Expiration</label>
                    <input v-model="date_expiration" type="date">
                </div>
                <div class="btn-wrap">
                    <button class="btn btn-save" @click="soumettre"></button>
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
    data(){
        return{ 
            title: 'Ajouter un produit',
            nom_produit:"" ,
            quantite: "",
            prix_unitaire: "",
            date_fabrication:"",
            date_expiration:"",
                
        }
    },
    methods:{
        soumettre() {
            let data = new FormData();
            data.append("nom_produit", this.nom_produit);
            data.append("quantite", this.quantite);
            data.append("prix_unitaire", this.prix_unitaire);
            data.append("date_fabrication", this.date_fabrication);
            data.append("date_expiration", this.date_expiration);
            
            axios.post(this.url + "/produit/",data,this.headers)
            .then(()=>{
            this.$store.state.notification = {
                type: "success",
                message: "produit ajouter avec succes!"
                }
            })
            .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.soumettre)
                }else
                    console.log(error)
                })
            
            }
        },  
};
</script>

<style scoped>

</style>