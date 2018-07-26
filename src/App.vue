<template>
    <div id="app">
        <city-search-bar @txtdata="searchText" :clearText="clearSearch"></city-search-bar>
        <transition name="list">
            <city-search-list v-if="associationShow" :searchListContent="searchListContent" @changeName="changeCity"></city-search-list>
        </transition>
        <scroll :data="citylist" ref="suggest" :probeType="3" :listenScroll="true" @distance="distance" @scrollStore="scrollStore">
            <div>
                <city-position-box :chooseCity="chooseCity" :orientate="nowCity" :historyCity="historyCity" @changeCity="changeCity"></city-position-box>
                <city-list :citylist="citylist" :elementIndex="elementIndex" @locatedCity="changeCity" @singleLetter="singleLetter"></city-list>
            </div>
        </scroll>
        <city-abbr-nav :navList="cityIndexList" @toElement="toElement" :flagText="flagText"></city-abbr-nav>
        <city-choose v-if="maskShow" :message="maskMessage" @chooseBox="chooseResult"></city-choose>
        <transition name="flag">
            <div class="nowFlag" v-if="flag">{{flagText}}</div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
import CitySearchBar from './components/CitySearchBar'
import Scroll from './components/Scroll.vue'
import CityPositionBox from './components/CityPositionBox'
import CityList from './components/CityList'
import CityAbbrNav from './components/CityAbbrNav'
import CityChoose from './components/CityChoose'
import CitySearchList from './components/CitySearchList'
import { getSearchList, getDistance } from './common/handle'

export default {
    name: 'App',
    components: {
        'city-search-bar': CitySearchBar,
        'scroll': Scroll,
        'city-position-box': CityPositionBox,
        'city-abbr-nav': CityAbbrNav,
        'city-list': CityList,
        'city-choose': CityChoose,
        'city-search-list': CitySearchList
    },
    data () {
        return {
            nowCity: '',
            choiceCity: '',
            choiceCityName: '',
            historyCity: [],
            citylist: [],
            cityIndexList: ['顶'],
            maskShow: false,
            maskMessage: '',
            associationShow: false,
            searchListContent: [],
            clearSearch: false,
            elementIndex: '',
            arrHeight: [],
            flag: false,
            flagText: '顶'
        }
    },
    created () {
        this.getNowCity()
        this.getCityList()
    },
    computed: {
        chooseCity () {
            return this.choiceCityName ? this.choiceCityName : this.nowCity
        }
    },
    methods: {
        getNowCity () {
            this.getCity()
            this.getHistory()
            axios.get('http://localhost:8000/currentcity').then((res) => {
                this.nowCity = res.data.city;
                if (!this.choiceCity && !this.choiceCityName) {
                    this.choiceCity = this.nowCity
                    this.choiceCityName = this.nowCity
                }
            }, () => {
                this.nowCity = '无锡'
                if (!this.choiceCity && !this.choiceCityName) {
                    this.choiceCity = this.nowCity
                    this.choiceCityName = this.nowCity
                }
            })
        },
        getCityList () {
            axios.get('http://localhost:8000/').then((res) => {
                this.citylist = res.data.openCityList
                this.citylist.map((item) => {
                    this.cityIndexList.push(item[0])
                })
                this.getDomHeight()
            })
        },
        setHistory (arr) {
            localStorage.setItem('historyCity', arr)
        },
        getHistory () {
            let history = localStorage.getItem('historyCity')
            if (!history) {
                this.historyCity = []
            } else {
                this.historyCity = history.split(',')
            }
        },
        setCity (city) {
            localStorage.setItem('seeCity', city)
        },
        getCity: function () {
            let city = localStorage.getItem('seeCity')
            if (!city) {
                this.choiceCity = ''
                this.choiceCityName = ''
            } else {
                this.choiceCity = city
                this.choiceCityName = city
            }
        },
        searchText (text) {
            if (text.length === 0) {
                this.associationShow = false
                return false
            }
            this.clearSearch = false
            this.associationShow = true
            this.searchListContent = getSearchList(text, this.citylist)
        },
        changeCity (city) {
            if (this.choiceCityName === city) {
                this.associationShow = false
                this.clearSearch = true
                return false
            }
            this.choiceCity = city
            this.maskMessage = `确定选择${city}?`
            this.maskShow = true
        },
        maskClose () {
            this.maskShow = false
        },
        chooseResult (res) {
            if (!res) {
                this.maskClose()
            } else {
                this.choiceCityName = this.choiceCity
                this.local()
                this.associationShow = false
                this.clearSearch = true
                this.$refs.suggest.scrollTo(0, 0, 200)
                this.maskClose()
            }
        },
        local () {
            if (this.choiceCityName !== this.nowCity) {
                this.historyCity.unshift(this.choiceCityName)
            }
            this.historyCity = this.historyCity.slice(0, 2)
            this.setCity(this.choiceCityName)
        },
        toElement (text) {
            // console.log(text)
            if (text === '顶') {
                this.$refs.suggest.scrollTo(0, 0, 200)
            }
            this.elementIndex = text
            // this.flagText = text
        },
        singleLetter (dom) {
            this.$refs.suggest.scrollToElement(dom, 200, false, -1)
        },
        distance (val) {
            // console.log('hi ite me ')
            for (let i = 0, len = this.arrHeight.length; i < len; i++) {
                if (val < this.arrHeight[i]) {
                    this.flagText = this.cityIndexList[i]
                    // console.log(this.flagText)
                    return false
                }
            }
        },
        getDomHeight () {
            let arr = getDistance(this.citylist)
            arr.unshift(250)
            let i = 0
            arr.map((val) => {
                i = i + val
                this.arrHeight.push(i)
            })
        },
        scrollStore (val) {
            this.flag = val
        }
    },
    watch: {
        historyCity (val) {
            this.setHistory(val)
        }
    }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#app .nowFlag {
    width: 50px;
    height: 50px;
    background: #4395ff;
    color: #fff;
    font-size: 30px;
    font-weight: 900;
    line-height: 50px;
    text-align: center;
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -25px;
    border-radius: 25px
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter {
  opacity: 0;
}

.list-leave-to {
  transform: scale(0, 0);
  opacity: 0;
}

.flag-leave-active {
  transition: all 1s;
}

.flag-leave-to {
  opacity: 0;
}
</style>
