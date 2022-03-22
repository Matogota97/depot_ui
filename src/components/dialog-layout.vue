<template>
    <div class="dialog animate__animated animate__backInDown" @click.stop>
        <div class="dialog-body">
            <div class="d-head">
                <div class="title">
                    <h4>{{title}}</h4>
                </div>
                <div class="close" @click="close">
                    <span class="mdi mdi-close"></span>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:['title',],
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
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
.dialog::after {
    content: '';
    background: rgba(0, 0, 0, .6);
    filter: blur(3px);
    overflow: hidden;
    z-index: -1;
}

.dialog-body {
    width: 350px;
    border-radius: 8px;
    background: var(--white);
    position: relative;
    overflow: hidden;
}
.dialog-body .d-head {
    background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
    padding: 8px 3px;
    color:white;
}
.dialog-body .close {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 25px;
    width: 25px;
    color: var(--grey-text);
    cursor: pointer;
}
.dialog-body .close .mdi {
    font-size: 20px;
}
</style>