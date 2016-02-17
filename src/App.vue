<template>
    <div>
        <nav-bar></nav-bar>

        <fav-content></fav-content>

        <foot-bar></foot-bar>
    </div>
</template>

<script>
    import NavBar from './components/NavBar'
    import FootBar from './components/FootBar'
    import FavContent from './components/favorite/Content'
    import store from './components/Store'

    var storage = $.localStorage

    export default {
        ready () {
            console.log('Im ready!')
        },

        components: {
            NavBar,
            FootBar,
            FavContent
        },

        data () {
            var name = storage.get('name')
            var id = storage.get('id')
            var token = storage.get('token')

            $.extend(store, {
                user: {name, id, token}
            })

            return store
        },

        methods: {

        }

    }
</script>

<style>
    body {
        font-family: "Microsoft YaHei";
    }
</style>
