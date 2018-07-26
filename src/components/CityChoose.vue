<template>
    <div class="city-choose-box">
        <div class="city-choose-background"></div>
        <div class="city-choose-btn-box">
            <div class="message">
                <p>{{message}}</p>
            </div>
            <div class="btn">
                <div class="btn-left" @click="chooseConfirm()">
                    <p>Confirm</p>
                </div>
                <div class="btn-right" @click="chooseCancel()">
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CityChoose',
    props: {
        message: {
            type: String,
            default: ''
        }
    },
    methods: {
        chooseConfirm () {
            this.$emit('chooseBox', true)
        },
        chooseCancel () {
            this.$emit('chooseBox', false)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-choose-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.city-choose-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.1;
    z-index: 100;
}

.city-choose-btn-box {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 50%;
    height: 25%;
    background: #fff;
    z-index: 200;
    border-radius: 10px;
    overflow: hidden;
}

.message {
    width: 100%;
    height: 75%;
    box-sizing: border-box;
    border-bottom: 2px solid #000;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    display: flex;
    flex-direction: row;
}

.btn-left {
    width: 50%;
    height: 25%;
    box-sizing: border-box;
    border-right: 1px solid #000;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-right {
    width: 50%;
    height: 25%;
    box-sizing: border-box;
    border-left: 1px solid #000;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>