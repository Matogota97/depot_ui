<template>
	    <div id="bill" class="dialog">
		<div class="invoice-main">
		<div class="invoice-compagny">
			<div class="compagny-logo">
				<div>MATOGOTA</div>
				<div class="img-div">
					<img src="../images/krewz.jpg" alt="NOW-T">
				</div>
				<div>DEPOT</div>
			</div>
			<div class="compagny-info">
				<div class="left" >
					<p>Matogota</p>
					<p>kamenge,BUJUMBURA</p>
					<p>14 Avenue</p>
				</div>
				<div class="right" >
					<p>Tél. : +257 22 25 43 17</p>
					<p>Assujeti à la TVA : Non</p>
					<p>C. Fiscal : </p>
				</div>
			</div>
		</div>
		<div class="client-info" >
			<div class="right" >
				<p>FACTURE N° : </p>
			</div>
			<div class="left" >
				<p>Le : </p>
			</div>
		</div>
		<div>
			<table>
				<thead>
					<th>Produit</th>
					<th>Quantite</th>
					<th>Prix Unitaire</th>
					<th>Prix Total</th>
				</thead>
				<tbody>
					<tr v-for="">
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</tbody>
				<br>
				<tfoot>
					<tr >
						<td></td>
						<td></td>
						<td style="font-weight:bold;"></td>
						<td style="font-weight:bold;"></td>
					</tr>
					<tr >
						<td></td>
						<td></td>
						<td style="font-weight:bold;"></td>
						<td style="font-weight:bold;"></td>
					</tr>
					<tr >
						<td></td>
						<td></td>
						<td style="font-weight:bold;"></td>
						<td style="font-weight:bold;"></td>
					</tr>
				</tfoot>
			</table>
		</div>

		<center>
			<p>Ch, P.L RWAGASORE;BUILDING BELLA-VISTA Tél:75 560 536/75 645 845</p>
		</center>
		<div class="non-printable" >
			<button class="btn" style="margin-bottom:5px">Imprimer</button>
		</div>
	</div>
	</div>
</template>
<script>
	export default{
		props:{venteBarProp:Object},
		methods:{
			printInvoice(){
				if(this.venteBarProp){
					setTimeout(function(){
						print();
					}, 50)
				}
			}
		}
	};
</script>
<style scoped>

.dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .6);
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
*{
	font-weight: lighter;
	font-family: Geneva,sans-serif;
}
.invoice-main{
	border: 1px solid black !important;
	margin: 10px;
	padding: 10px;
	width: 600px;
	min-height: 350px;
	background-color: white;
}
.compagny-logo{
	margin-bottom: 10px;
	min-height: 20px;
	display: flex;
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
	justify-content: space-evenly;
	align-items:center
}
img{
	width:100px;
	height:100px;
}
.img-div{
	width:150px;
	background-color:white;
	display:flex;
	justify-content:center;
}
.compagny-logo>div:first-child{
	color:white;
	font-size:25px;
}
.compagny-logo>div:last-child{
	color:white;
	font-size:25px;
}
.compagny-info,.client-info{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.client-info{
	margin-top: 10px;
	margin-bottom: 10px;
	border-top: 1px solid black !important;
}
table{
	width: 100%;
	white-space: normal;
}
table thead{
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
td{
	padding-right: 5px;
}
td{
	text-align: right;
}
.letter{
	font-weight: bold;
}
center{
	margin-top: 10px;
	font-size: 11px;
}
.invoice-footer{
	margin-top: 10px;
	border-top: 1px solid black !important;
}
p{
	padding-top: 2px;
	padding-bottom: 2px;
}
table{
	margin-bottom: 10px;
}
thead{
	color:white;
}
.btn{
	background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
	color:white;
}
.invoice-compagny,.client-info,.invoice-footer, table{
	font-size: 16px;
}

@media print{
	.dialog{
		margin: 0;
		padding: 0;
		background-color: white;
	}
	.invoice-main{
		position: absolute;
		top: 0;
		left: 0;
	}
	*{
		-webkit-print-color-adjust: exact !important;
		color-adjust : exact !important
	}
}
@page{
	size: A4 portrait;
	-webkit-print-color-adjust: exact !important;
	color-adjust : exact !important
}
</style>