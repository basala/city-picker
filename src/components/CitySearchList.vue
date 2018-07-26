<template>
    <div class="search-list-box">
        <scroll :data="searchListContent">
            <div class="search-list-body">
                <p class="city-item" v-for="city in searchListContent" :key="city.id" @click="changeCity(city.name)">
                    {{city.name}}
                </p>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from './Scroll'

export default {
    name: 'CitySearchList',
    components: {
        'scroll': Scroll
    },
    props: {
        searchListContent: Array
    },
    methods: {
        changeCity (city) {
            this.$emit('changeName', city)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-list-box {
    width: 100%;
    z-index: 90;
    background: #fff;
    position: absolute;
    top: 50px;
    opacity: 0.9;
}

.search-list-body {
    width: 100%;
    background: #fff;
}

.search-list-body .city-item {
    box-sizing: border-box;
    height: 40px;
    background: #fff;
    margin: 0 10px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
}
</style>
