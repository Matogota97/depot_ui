<template>
<div id="app">
	<div v-if="this.$store.state.user">
			<app-header></app-header>
				<div class="row">
					<div class="sidemenu">
						<app-Menu></app-Menu>
					</div>
					<div class="principal">
						<router-view/>
					</div>
				</div>
		</div>
		<div v-else>
			<login></login>
		</div>
	</div>
</template>

<script>
import appHeader from './components/Header.vue'
import appMenu from './components/menu.vue'
import login from './components/login.vue'

export default {
	data(){
		return{
		}
	},
	components: {
			appHeader,
			appMenu,
			login
	},
	methods:{

	},
	mounted() {
		var user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			this.$store.state.user = user
		}
	},
		watch: {
		'$store.state.user': {
			deep: true,
			handler(new_val){
				if (new_val) {
					localStorage.setItem('user', JSON.stringify(new_val))
				} else {
					localStorage.removeItem('user')
				}
								
			}
		}
	},
};
</script>

<style src="./styles.css">

</style>
