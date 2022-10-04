<template>
	<div>
		<dialog-detail :title="title" @close="$emit('close')" class="titre">
		<div class="details">
		<span class="items">Nom : {{$store.state.client_courant.nom}}</span><br>
		<span class="items">Prenom : {{$store.state.client_courant.prenom}}</span><br>
		<span class="items">Adresse : {{$store.state.client_courant.adresse}}</span><br>
		<span class="items">Telephone : {{$store.state.client_courant.telephone}}</span><br>  
		</div>
	</dialog-detail>
	</div>
</template>
<script>
import axios from 'axios'
	export default{
		data(){
			return{
				actif:false,
				nom:"",
				prenom:"",
				adresse:"" ,
				telephone: "",
				title:'Details client', 
			}
		},
		methods:{
			showForm(){
				this.actif = !this.actif
			},
			details(){
				let pk = this.$route.params.pk
				this.$store.state.client_courant = pk
				axios.get(this.$store.state.url+"/client/"+pk+"/")
				.then((response)=>{
					console.log(response.data)
					this.$store.state.client_courant = response.data
					console.log(this.$store.state.client_courant)
				}).catch((error)=>{
					console.log(error)
				})
			}
		},
		mounted(){
			this.details();
		}
	}
</script>
<style scoped="">
.titre{
	text-align:center;
}
.items{
	font-family: 'Open Sans', sans-serif;
	line-height:30px;
}
.details{
	width:70%;
	border:1px solid black;
	margin-left:120px;
	margin-bottom:20px;
	padding:40px;
	background:linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
	color:white;
}	
</style>