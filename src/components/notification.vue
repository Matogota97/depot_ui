<template>
    <transition
    enter-active-class="animate__animated animate__slideInDown animate__faster"
    leave-active-class="animate__animated animate__slideOutUp animate__faster">
        <div class="body" 
        :class="$store.state.notification.type"
        v-if="visible">
            <div class="content">
                <span>{{$store.state.notification.message}}</span>
                <span class="mdi mdi-close" @click="visible=false"></span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
		return {
			visible: false,
		}
	},
	watch:{
		"$store.state.notification":{
			deep:true,
			handler(new_val){
				if (new_val.message) {
					this.visible = true
					setTimeout(() => {
						this.$store.state.notification = {type:"", message:""}
					}, 5000)
				} else {
					this.visible = false
				}
			}
		},
	}
};
</script>

<style scoped>
.body {
    padding:.75rem 1.25rem;
    border-radius: 5px;
    position: absolute;
    /* transform: translateX(-50%); */
    top: 10px;left: 25%;
    width: 650px;
    margin: auto;
    border: 2px solid transparent;
    z-index: 1001;
}

.success {
    color:#20aa30;
    background-color:#d4eeda;
    border-color:#20aa30;
}
.danger {
    color:#721c24;
    background-color:#f7ddda;
    border-color:#721c24;
}

.content {
    position: relative;
}

.mdi {
    position: absolute;
    top: 50%;right: 0px;
    transform: translateY(-50%);
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
}
</style>
