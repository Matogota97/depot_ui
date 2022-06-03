<template>
    <div>
        <title-bar :title='title'/>
        <button @click="ajouter" class="button">Ajouter</button>
        <add-produits :edit="edit" v-if="dialog" @close="close"/>
   <div class="table">
        <table>
            <thead>
                <tr>
                    <th>Nom Produit</th>
                    <th>Quantite</th>
                    <th>Prix Unitaire</th>
                    <th class="action">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" produit in listproduits" :key="produit.id">
                    <td class="nom">{{produit.nom_produit}}</td>
                    <td class="nom">{{produit.quantite}}</td>
                    <td class="nom">{{produit.prix_unitaire}}</td>
                    <td class="act">
                        <div class="btncl">
                        <button class="btn-table" @click="supprimerElement(produit)">Supprimer</button>   
                        <button class="btn-table" @click="modifierElement(produit)">Modifier</button>   
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <notification />
    </div>
</template>
<script>
import addProduits from "../components/add_produit.vue"
import axios from 'axios'
import titleBar from '../components/title.vue'
import notification from '../components/notification.vue'
export default {
    components:{
        addProduits,
        titleBar,
        notification
    },
    data() {
        return {
            title: 'Produits',
            dialog: false,
            listproduits:[],
            edit:false,
        }
    },
    methods: {
        ajouter(){
            this.edit = false
            this.dialog = true
        },
        close(e) {
            this.dialog = false
            this.$store.state.notification = {
                type: e.type,
                message: e.message
            }
        },
        getProduit(){
            axios.get(this.url +"/produit/",this.headers)
            .then((response)=>{
                this.listproduits = response.data.results
            })
            .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.getProduit)
                }else
                    console.log(error)
                })
        },
        modifierElement(produit){
            this.dialog = true
            this.edit = true
            this.$store.state.produit_courant = produit

        },
        supprimerElement(indice){
            let confirme = confirm("Voulez-vous vraiment supprimer?")
            if(confirme){
                axios.delete(this.url+`/produit/${indice.id}/`,this.headers)
                .then(()=>{
                    this.$store.state.notification = {
                        type: "success",
                        message: "Produit supprime avec succes!"
                    }
                    this.getProduit()
                })
                .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.supprimerElement)
                }else
                    this.$store.state.notification = {
                        type: "danger",
                        message: "Produit ne peut pas etre supprimer!"
                    }
                        })
            }
        }
        },
    mounted(){
        this.getProduit()
} 
}  
</script>

<style scoped="">
    .bt{
        float:right;
    }
</style>