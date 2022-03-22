<template>
<nav class="header">
		<div class="main">
			<span class="logo">K_Squad</span>
			<div class="current">
				<img class="ifoto" src="../assets/krewz.jpg">
				<span class="current-user">{{$store.state.user.username}}</span>	
			</div>
		</div>
	</nav>
</template>
<script> 
export default{
		methods:{
			logout() {
			localStorage.removeItem('user')
			this.$store.state.user = null
		}
		}
	}
</script>
<style scoped="">
*{
	padding: 0;
	margin :0;
	box-sizing: border-box;
	font-family: 'Montserrat', sans-serif;	
}
nav{
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
	padding: 10px 40px 10px 70px;
	border: 1px solid whitesmoke;
}
nav .main{
	display: flex;
	list-style: none;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}
nav .main span.logo{
	flex:1;
	font-size: 30px;
	color:white;
	left:0;
}
nav .main .current{
	height: 30px;
	width: 180px;
	display: flex;
	background: white;
	border-radius: 20px;
}
.current{
	display: flex;
	justify-content: space-between;
}
.ifoto{
	border-radius: 50%;
}
.current-user{
	text-align: center;
	padding: 5px;
}
</style>