<template>
    <div>
        <title-bar :title='title'/>
   <div class="table">
        <table>
            <thead>
                <tr>
                    <th>Nom Produit</th>
                    <th>Entrees</th>
                    <th>Sorties</th>
                    <th>Quantite Restante</th>
                    <th>Date Entrees</th>
                    <th>Date Sorties</th>
                    <th class="action">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for=" stock in listStock" :key="stock.id">
                    <td class="nom">{{stock.produit.nom_produit}}</td>
                    <td class="nom">{{stock.entrees}}</td>
                    <td class="nom">{{stock.sorties}}</td>
                    <td class="nom">{{stock.quantite_restante}}</td>
                    <td class="nom">{{stock.date_entree}}</td>
                    <td class="nom">{{stock.date_sortie}}</td>
                    <td class="act">
                        <div class="btncl">
                        <button class="btn-table" @click="supprimerElement(stock)">Annuler</button>      
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
import axios from 'axios'
import titleBar from '../components/title.vue'
import notification from '../components/notification.vue'
export default {
    data() {
        return {
            title:'Stock',
            listStock:[]
        }
    },
    components:{
        titleBar,
        notification
    },
    methods: {
        getStocks(){
            axios.get(this.url +"/stock/",this.headers)
            .then((response)=>{
                this.listStock = response.data.results
                console.log(response.data.results)
            })
            .catch(error => {
                if(error.response.status == 401 || error.response.status == 403){
                    this.refreshToken(this.getStocks)
                }else
                    console.log(error)
                })
        },
    }, 
    mounted() {
        this.getStocks()
    },  
}
</script>
<style scoped>

</style>