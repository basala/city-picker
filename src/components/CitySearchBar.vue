<template>
    <div class="search-box">
        <div class="search-bar">
            <input type="text" class="search-input" placeholder="城市名称/拼音" @keydown="entry()" v-model="searchText" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CitySearchBar',
    props: {
        clearText: Boolean
    },
    data () {
        return {
            searchText: '',
            timer: {}
        }
    },
    methods: {
        entry () {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.$emit('txtdata', this.searchText)
            }, 500)
        }
    },
    watch: {
        clearText (val) {
            if (val) {
                this.searchText = ''
                this.entry()
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-box {
    height: 50px;
    background: #317ee2;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-box .search-bar {
    width: 80%;
    height: 80%;
}

.search-box .search-bar .search-input {
    box-sizing: border-box;
    width: 100%;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 20px;
    line-height: 40px;
    border: none;
    outline: none;
    padding-left: 40px;
}
</style>
