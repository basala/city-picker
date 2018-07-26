<template>
    <div ref="wrapper" class="scroll">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        data: {
            type: Array,
            default: null
        },
        probeType: {
            type: Number,
            default: 1
        },
        listenScroll: {
            type: Boolean,
            default: false
        }
    },
    mounted () {
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll () {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                scrollY: true,
                click: true,
                momentum: true,
                bounce: false,
                bounceTime: 700,
                deceleration: 0.001,
                momentumLimitTime: 300,
                momentumLimitDistance: 15,
                resizePolling: 60
            })
            if (this.listenScroll) {
                this.scroll.on('scrollStart', () => {
                this.$emit('scrollStore', true)
                })
                this.scroll.on('scroll', (pos) => {
                    this.$emit('distance', Math.abs(pos.y))
                    this.$emit('scrollStore', true)
                })
                this.scroll.on('scrollEnd', () => {
                    this.$emit('scrollStore', false)
                })
            }
        },
        scrollTo () {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement () {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
        refresh () {
            this.scroll && this.scroll.refresh()
        }
    },
    watch: {
        data (val) {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll {
    position: fixed;
    top: 50px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
}
</style>
