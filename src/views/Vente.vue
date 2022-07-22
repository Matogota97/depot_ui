<template>
	<div class="main-container">
		<div >
			<center>
				<input style="width:200px;" type="text" name="" placeholder="rechercher un produit">
			</center>
			<div class="dashboard-cards">
				<div class="card-blue" v-for= "product in listProducts" :key="product.id">
					<div class="card-title"></div>
					<div class="card-body">
						<div class="card-amount">{{product.produit.nom_produit}}</div>
						<div class="card-icon">
								+
						</div>
					</div>
					<div  class="card-footer kaki-2"  @click="addToCart(product)">
							Au panier
					</div>
				</div>
			</div>
		</div>
		<div class="main-div-cart">
				<div class="container">
						<div class="products">
							<button class="btn btn-primary sold" >Panier</button>

								<div v-for= "(product,i) in $store.state.cart.commande" :key="i" >
										<div class="details">
												
										</div>
										<div class="action">
											<div class="btn-group">
														<h4 class="name">{{product.produit.produit.nom_produit}}</h4>
												</div>
												<div class="btn-group">
														<i class="mdi mdi-minus" @click="diminuer(product.produit.produit.id)"></i>
														<span class="count">{{product.quantite}}</span>
														<i class="mdi mdi-plus" @click="augmenter(product.produit.produit.id)"></i>

												</div>
												<div class="btn-group">
														<span class="count"> {{product.produit.produit.prix_unitaire * product.quantite}}Fbu</span>
												</div>
												<div class="btn-group">
														<i class="mdi mdi-trash-can-outline" @click="remove(i,product.produit.produit.prix_unitaire * product.quantite)"></i>
												</div>
										</div>
								</div>
						</div>
						<div class="totals">
								<div class="details">
									<table>
											<tbody>
												<tr>
													<td class="lib" >Prix Total : </td>
													<td class="amount">{{$store.state.cart.prix_total}} Fbu</td>
												</tr>
												<tr class="line"></tr>
											</tbody>
									</table>
									<button  class="btn-sm sold" >Vendre</button>
								</div>
						</div>
				</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
export default {
	data(){
		return{
			listProducts:[]
		}
	},
	methods:{

		addToCart(produit){
			console.log(produit)
			if(this.$store.state.cart.commande.length==0){
				this.$store.state.cart.prix_total += produit.produit.prix_unitaire
				this.$store.state.cart.commande.push({"produit":produit,"quantite":1})

			}else{
				let index_produit = this.$store.state.cart.commande.findIndex(x=> x.produit.id==produit.id)
				if(index_produit>-1){
					this.$store.state.cart.commande[index_produit].quantite+=1
					this.$store.state.cart.prix_total += produit.produit.prix_unitaire
				}else{
					this.$store.state.cart.prix_total += produit.produit.prix_unitaire
					this.$store.state.cart.commande.push({"produit":produit,"quantite":1})
				}
			}
		},
		diminuer(id){
			let index_produit = this.$store.state.cart.commande.findIndex(x=> x.produit.produit.id==id)
			this.$store.state.cart.commande[index_produit].quantite-=1
			this.$store.state.cart.prix_total -= this.$store.state.cart.commande[index_produit].produit.produit.prix_unitaire

		},
		augmenter(id){
			let index_produit = this.$store.state.cart.commande.findIndex(x=> x.produit.produit.id==id)
			this.$store.state.cart.commande[index_produit].quantite+=1
			this.$store.state.cart.prix_total += this.$store.state.cart.commande[index_produit].produit.produit.prix_unitaire
		},
		remove(index, total){
			this.$store.state.cart.commande.splice(index,1)
			this.$store.state.cart.prix_total-=total
		},
		fetchProducts(){
			axios.get(this.url+"/stock/", this.headers)
			.then((response)=>{
					console.log(response.data.results)
					this.listProducts = response.data.results
			}).catch((error)=>{
					if(error.response && error.response.status === 403){
							this.refreshToken(this.fetchProducts)
					}else{
							console.log(error)
					}
			})
		},
		addVente(){
			if(this.$store.state.cart.commande.length==0){
				alert('Aucun element dans le panier')
			}
			else{
				axios.post(this.url + "/vente/",this.headers)
				.then((response)=>{
					console.log(response.data.results)
					})
				.catch((error)=>{
					if(error.response && error.response.status === 403){
							this.refreshToken(this.addVente)
					}else{
							console.log(error)
					}
			})
			}
			
		}

	},
	mounted(){
		this.fetchProducts()
	}
};
</script>
<style scoped>
.main-div-cart {
		background: whitesmoke;
		border:1px solid var(--primary);
		margin-right:10px;
		width:50%;
		height:50px;
}
.container {
		/* width: calc(100vw - 350px); */
		display: flex;
		flex-direction:column;
}
input{
	border-radius:none;
}
.products {
		background: white;
		overflow-y: auto;
		padding: 15px;
		width:100%;
}
.single-product {
		display: flex;
		padding-top:10px;
		padding-bottom:10px;
		border-bottom: 1px solid orange;
}
.single-product .name {
		font-size: 15px;
		margin-bottom: 5px;
		font-weight: 600;
}
.single-product td {
		font-size: 14px;
		font-weight: 500;
}
.single-product > div {
		flex-basis: 50%;
		width: 50%;
}

.totals {
		background: whitesmoke;
		border:1px solid var(--primary);
		padding: 10px;
		width:45%;

}
/* Details table */
.totals .details table td {
		font-size: 15px;
		border-bottom: none;
		white-space: nowrap;
}
.details tbody tr {
		border-bottom: none;
}
.details tbody tr:nth-child(even) {
		background: var(--white);
}
table hr {
		border: none;
		width: 100%;
		height: 1px;
		background: black;
		margin: 7px 0;
}
.details .lib {
		font-weight: 600;
}
/* end */
.action {
		display: flex;
		align-items: center;
		justify-content:space-around;
		width:80%;
}
.line {
		border: 1px solid black;
		height: 10px;
		background: black;
}

.action .mdi {
		display: inline-block;
		padding: 3px;
		background-color: #ddd;
		border-radius: 50%;
		margin: 0px 5px;
		color: black;
}

.main-container{
	display:flex;
	flex-direction:row;
	justify-content:none;
}
.dashboard-cards{
	display: flex;
	padding:0;
}
.main-container>div:first-child{
	width:50%;
}
.amount{
	font-weight:600;
}
.sold{
	background-color:var(--primary)
}
.card-blue{
	padding-left: 50px;
	margin-top: 20px;
	margin-right: 10px;
	border: 1px solid black;
}
.card-icon{
	text-align: center;
}
</style>
