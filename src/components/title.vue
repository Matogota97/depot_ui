<template>
	<h3 class="title">{{title}}</h3>
</template>

<script>
export default {
	props: ['title'],
}
</script>

<style scoped>
	.title {
		text-align: center;
		padding: 8px 25px;
		background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
		color: white;
		margin:0 10px 8px 0;
	}
</style>