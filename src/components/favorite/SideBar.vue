<template>
    <div v-show="!isEmpty">
        <ul class="sui-nav nav-list">
            <!--<li class="nav-header">分类</li>-->
            <li v-for="title in titles" track-by="$index"><a :href="'#block' + $index">{{ title }}</a></li>
        </ul>
    </div>
</template>

<script>
    export default {

        data () {
            return {
                titles: []
            }
        },

        computed: {
            isEmpty () {
                return this.titles.length === 0
            }
        },

        events: {
            'fav-titles' (blocks) {
                var list = []
                for (var block of blocks) {
                    list.push(block.title)
                }
                this.titles = list
            }
        },

        methods: {}
    }
</script>
