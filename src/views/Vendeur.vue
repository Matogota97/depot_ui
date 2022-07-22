<template>
    <div>
        <title-bar :title='title'/>
        <button @click="ajouter" class="button">Ajouter</button>
        <add-vendeurs :edit="edit" v-if="dialog" @close="close"/>
   <div class="table">
        <table>
            <thead>
                <tr>
                    <th>Code</th>
                    <th>UserName</th>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Adresse</th>
                    <th>Telephone</th>
                    <th>CNI</th>
                    <th class="action">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" vendeur in listVendeurs" :key="vendeur.id">
                    <td class="nom">{{vendeur.code}}</td>
                    <td class="nom">{{vendeur.user.username}}</td>
                    <td class="nom">{{vendeur.user.first_name}}</td>
                    <td class="nom">{{vendeur.user.last_name}}</td>
                    <td class="nom">{{vendeur.adresse}}</td>
                    <td class="nom">{{vendeur.telephone}}</td>
                    <td class="nom">{{vendeur.cni}}</td>
                    <td class="act">
                        <div class="btncl">
                        <button class="btn-table" @click="supprimerElement(vendeur)">Supprimer</button>   
                        <button class="btn-table" @click="modifier(vendeur)">Modifier</button>   
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
import addVendeurs from "../components/add_vendeur.vue"
import axios from 'axios'
import titleBar from '../components/title.vue'
import notification from '../components/notification.vue'
export default {
    components:{
        addVendeurs,
        titleBar,
        notification
    },
    data() {
        return {
            title: 'Vendeurs',
            dialog: false,
            listVendeurs:[],
            edit:false,
        }
    },
    methods: {
        getVendeur(){
            axios.get(this.url +"/vendeur/",this.headers)
            .then((response)=>{
                this.listVendeurs = response.data.results
            })
            .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.getVendeur)
                }else
                    console.log(error)
                })
        },

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
        modifier(vendeur){
            this.dialog=true
            this.edit=true
            this.$store.state.vendeur_courant = vendeur
        },
        supprimerElement(indice){
            let confirme = confirm("Voulez-vous vraiment supprimer?")
            if(confirme){
                axios.delete(this.url+`/vendeur/${indice.id}/`,this.headers)
                .then(()=>{
                    this.$store.state.notification = {
                        type: "success",
                        message: "Vendeur supprime avec succes!"
                    }
                    this.getVendeur()
                })
                .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.supprimerElement)
                }else
                    this.$store.state.notification = {
                        type: "danger",
                        message: "Vendeur ne peut pas etre supprimer!"
                    }
                        })
            }
        }
        },
    mounted(){
        this.getVendeur()
    }, 
}  
</script>

<style scoped="">
    .bt{
        float:right;
    }
</style>