<template lang="">
	<div class='body'>
        <div class="main">  	
			<div class="signup">
				<div>
					<label for="chk" aria-hidden="true">Login</label>
					<input v-model="username" type="text" name="txt" placeholder="User name">
					<div class="ijisho">	
						<input v-model="password" type="password" name="pswd" placeholder="Password">
					</div>
                    <button @click ="enregistrer">Se Connecter</button>
				</div>
			</div>
        <notification/>
		</div>
    </div>
</template>
<script>
import notification from '../components/notification.vue'
import axios from 'axios'
export default {
    data(){
        return{
            username : "",
            password : "",
            user : []
        }
    },
    components:{
        notification
        },
    methods:{
    enregistrer(){
        let data = new FormData();
        data.append("username", this.username);
        data.append("password",this. password);
        if(this.username =="" || this.password==""){
           this.$store.state.notification = {
                type: "danger",
                message: "Veuillez completer tous les champs"
            }
        }else{
            axios.post(this.url+"/login/",data)
                .then((response)=>{
                    this.$store.state.user = response.data
                    this.$store.state.notification = {
                                type: "success",
                                message: response.data.status
                            }
                })
                .catch(()=>{
                    this.$store.state.notification = {
                                type: "danger",
                                message: "Mot de passe or nom d'utilisateur incorrecte"
                            }
                })
            }
        }
    },   
};
</script>
<style scoped>
.body{
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	font-family: 'Jost', sans-serif;
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.ijisho{
	display:flex;
	margin-bottom:10px;
	padding-right:18px;
}
.main{
	width: 350px;
	height: 500px;
	background: red;
	overflow: hidden;
	background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/ cover;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;
}
.signup{
	position: relative;
	width:100%;
	height: 100%;
}
label{
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .5s ease-in-out;
}
input{
	width: 60%;
	height: 40px;
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px auto;
	padding: 10px;
	border: none;
	outline: none;
	border-radius: 5px;
}
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #573b8a;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #6d44b8;
}

</style>
