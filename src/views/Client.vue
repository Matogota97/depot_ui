<template>
    <div>
        <title-bar :title='title'/>
        <button @click="ajouter" class="button">Ajouter</button>
        <add-clients :edit="edit" @ update="getClient" v-if="dialog" @close="close"></add-clients>
        <detail-client  v-if="dialog_client" @close="close"></detail-client>
   <div class="table">
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Adresse</th>
                    <th>Telephone</th>
                    <th class="action">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" cl in listclients" :key="cl.id">
                    <td class="nom">{{cl.nom}}</td>
                    <td class="nom">{{cl.prenom}}</td>
                    <td class="nom">{{cl.adresse}}</td>
                    <td class="nom">{{cl.telephone}}</td>
                    <td class="act">
                        <div class="btncl">
                        <button class="btn-table" @click="supprimerElement(cl)">Supprimer</button>   
                        <button class="btn-table" @click="modifier(cl)">Modifier</button> 
                        <button class="btn-table" @click="details(cl)">Details</button>   
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
import addClients from "../components/add_client.vue"
import axios from 'axios'
import titleBar from '../components/title.vue'
import notification from '../components/notification.vue'
import detailClient from '../components/client_details.vue'
export default {
    components:{
        addClients,
        titleBar,
        notification,
        detailClient
    },
    data() {
        return {
            title: 'Clients',
            dialog: false,
            listclients:[],
            edit:false,
            dialog_client:false
        }
    },
    methods: {
        getClient(){
            axios.get(this.url + "/client/",this.headers)
            .then((response)=>{
                this.listclients = response.data.results
                console.log(response.data.results)
            })
            .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.getClient)
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
        modifier(client){
            this.dialog = true
            this.edit = true
            this.$store.state.client_courant = client
        },
        details(client){
            this.dialog = false
            this.edit = false
            this.dialog_client = true
            this.$store.state.client_courant=client
        },
        supprimerElement(indice){
            let confirme = confirm("Voulez-vous vraiment supprimer?")
            if(confirme){
                axios.delete(this.url+`/client/${indice.id}/`,this.headers)
                .then(()=>{
                    this.$store.state.notification = {
                        type: "success",
                        message: "Client supprime avec succes!"
                    }
                    this.getClient()
                })
                .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.supprimerElement)
                }else
                    this.$store.state.notification = {
                        type: "danger",
                        message: "Client ne peut pas etre supprimer!"
                    }
                        })
            }
        }
    },
    mounted(){
        this.getClient()
        console.log("getClient")
}
}  
</script>

<style scoped="">
    
</style>