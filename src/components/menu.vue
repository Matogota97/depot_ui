<template>
	<div class="sidebar">
		<ul>
			<li active-link="active">
				<router-link to="/vendeur">
					<i class="mdi mdi-account"></i>
					Vendeur
				</router-link>
			</li>

			<li active-link="active">
				<router-link to="/produit">	
					<i class="mdi mdi-account"></i> 
					Produit
				</router-link>
			</li>
			<li active-link="link">
				<router-link to="/stock">
					<i class="mdi mdi-account"></i>
					Stock
				</router-link>
			</li>
			<li active-link="active">
				<router-link to="/client">
					<i class="mdi mdi-account"></i>
					Client
				</router-link>
			</li>
			<li active-link="active">
				<router-link to="/vente">
					<i class="mdi mdi-cart"></i>
					Vente
				</router-link>
			</li>
			<li @click="logout"><a href=""><i class="mdi mdi-logout"></i> Logout</a></li>
		</ul>
	</div>
</template>
<script> 
	export default{
		components:{

		},
		methods:{
			client_link(){
				this.$router.push("/client")
			},
			vendeur_link(){
				this.$router.push("/vendeur")
			},
			produit_link(){
				this.$router.push("/produit")
			},
			stock_link(){
				this.$router.push("/stock")
			},
			vente_link(){
				this.$router.push("/vente")
			},
			logout() {
				localStorage.removeItem("user")
				this.$store.state.user = null
			}

		}
	};
</script>
<style scoped ="">
.sidebar{
	position: fixed;
	height: 100%;
	width: 195px;
	left:0;
	border-right: 1px solid white;
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.sidebar ul li{
	padding: 4px;
}
.sidebar ul li a{
	display: block;
	padding-left: 30px;
	color: white;
	line-height: 60px;
	text-decoration: none;
}
.sidebar ul li a:hover{
	border: 1px solid gray;
	background: #161737;
}
</style>
