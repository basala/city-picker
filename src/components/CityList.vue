<template>
    <div class="city-list">
        <div v-for="citys in citylist" :key="citys[0]" :dataNum="citys[1].length">
            <p class="city-abbr" :ref="citys[0]">{{citys[0]}}</p>
            <p class="city-item" v-for="city in citys[1]" :key="city.id" @click="changeCity(city.name)">{{city.name}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CityLsit',
    props: {
        citylist: Array,
        cityIndexList: Array,
        elementIndex: String
    },
    methods: {
        changeCity (city) {
            this.$emit('locatedCity', city)
        }
    },
    watch: {
        elementIndex (val) {
            if (val === '顶') {
                return false
            }
            this.$emit('singleLetter', this.$refs[val][0])
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-list {
    width: 100%;
    background: #fff;
}

.city-list .city-abbr {
    box-sizing: border-box;
    height: 30px;
    padding-left: 10px;
    line-height: 30px;
    border-top: 1px solid #abc;
    background: #dde0e8;
    margin: 0;
}

.city-list .city-item {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    margin: 0 10px;
    border-bottom: 1px solid #abc;
}

.city-list .city-item:last-child {
    border-bottom: none;
}
</style>
