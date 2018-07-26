<template>
    <div class="city-abbr-nav-body">
        <div class="city-abbr-nav-list" @touchstart.stop.prevent="start" @touchmove.stop.prevent="move">
            <div :class="navClass(item)" :data-name="item" v-for="item in navList" :key="item">{{item}}</div>
        </div>
    </div>
</template>

<script>
import {handleNavData, getIndex} from '../common/handle'

export default {
    name: 'CityAbbrNav',
    props: {
        navList: Array,
        flagText: String
    },
    data () {
        return {
            touch: {
                start: 0,
                startIndex: '',
                end: 0,
                endIndex: ''
            }
        }
    },
    methods: {
        navClass (abbr) {
            return this.flagText === abbr ? 'active-item' : 'nav-item'
        },
        scrollToElement (abbr) {
            this.$emit('toElement', abbr)
        },
        start (event) {
            let abbr = handleNavData(event.target, 'data-name')
            this.touch.start = event.touches[0].pageY
            this.touch.startIndex = getIndex(this.navList, abbr)
            this.scrollToElement(abbr)
        },
        move (event) {
            this.touch.end = event.touches[0].pageY
            let distance = this.touch.end - this.touch.start
            this.touch.endIndex = Math.min(Math.max(this.touch.startIndex + Math.floor((distance + 10) / 20), 0), 22);
            this.scrollToElement(this.navList[this.touch.endIndex])
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-abbr-nav-body {
    box-sizing: border-box;
    width: 20px;
    height: 480px;
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: #eee;
    opacity: 0.6;
    padding: 10px 0;
    z-index: 50;
}

.nav-item {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #000;
    font-weight: 900;
}

.active-item {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #f12020;
    font-weight: 900;
}
</style>