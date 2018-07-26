<template>
    <div class="city-position-box">
        <div class="choosen-bar">
            <p>你已选择: {{chooseCity}}</p>
        </div>
        <div class="history-bar">
            <p>定位/最近访问</p>
            <div class="city-bar">
                <button class="orientate" @click="changeCity(orientate)">{{orientate}}</button>
                <button @click="changeCity(city)" v-for="city in historyCity" :key="city">{{city}}</button>
            </div>
        </div>
        <div class="hotcity-bar">
            <p>热门城市</p>
            <div class="city-bar">
                <button v-for="city in hotCitys" :key="city" @click="changeCity(city)">{{city}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CityPositionBox',
    props: {
        chooseCity: {
            type: String,
            default: ''
        },
        historyCity: Array,
        orientate: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            hotCitys: ['北京', '上海', '广州', '深圳', '天津', '西安', '重庆', '杭州', '南京']
        }
    },
    methods: {
        changeCity (city) {
            this.$emit('changeCity', city)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-position-box {
    background: #eee;
    padding-bottom: 10px;
}

.choosen-bar {
    box-sizing: border-box;
    line-height: 40px;
    height: 40px;
    border-bottom: 1px solid #ccc;
    background: #fff;
    padding: 0 10px;
    box-sizing: border-box;
}

.choosen-bar p {
    font-weight: 900;
    margin: 0;
}

.history-bar {
    height: 70px;
    box-sizing: border-box;
    padding: 0 10px;
}

.history-bar p {
    height: 30px;
    font-weight: 900;
    line-height: 30px;
    color: #8e8a8a;
    margin: 0;
}

.history-bar .city-bar {
    box-sizing: border-box;
    height: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.history-bar .city-bar button {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 26%;
    height: 30px;
    background: #fff;
    font-size: 15px;
    line-height: 30px;
    font-weight: 900;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.hotcity-bar {
    height: 130px;
    padding: 0 10px;
    box-sizing: border-box;
}

.hotcity-bar p {
    height: 30px;
    font-weight: 900;
    line-height: 30px;
    color: #8e8a8a;
    margin: 0;
}

.hotcity-bar .city-bar {
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

.hotcity-bar .city-bar button {
    box-sizing: border-box;
    height: 30px;
    font-size: 15px;
    font-weight: 900;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 26%;
    background: #fff;
    padding: 0;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
}

.orientate {
    color: #4395ff;
}
</style>