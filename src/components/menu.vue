<template>
 <div class="sidebar">
		<ul>
			<li><a href=""><i class="mdi mdi-account"></i> Vendeur</a></li>
			<li><a href=""><i class="mdi mdi-account"></i> Produit</a></li>
			<li><a href=""><i class="mdi mdi-account"></i> Stock</a></li>
			<li><a href=""><i class="mdi mdi-map-marker"></i> Emplacement</a></li>
			<li><a href=""><i class="mdi mdi-account"></i> Client</a></li>
			<li><a href=""><i class="mdi mdi-cart"></i> Vente</a></li>
			<li @click="logout"><a href=""><i class="mdi mdi-logout"></i> Logout</a></li>
		</ul>
	</div>
</template>
<script> 
    export default{
        components:{

        },
        methods:{
            
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
