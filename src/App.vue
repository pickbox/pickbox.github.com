<template>
    <div>
        <nav-bar></nav-bar>

        <!--<fav-content></fav-content>-->
        <component :is="currentView"></component>

        <foot-bar></foot-bar>
    </div>
</template>

<script type="text/ecmascript-6">
    import NavBar from './components/NavBar'
    import FootBar from './components/FootBar'
//    import FavContent from './components/favorite/Content'
    import store from './components/Store'

    require('jquery-storage-api/jquery.storageapi.js')
    var storage = $.localStorage

    var Loading = Vue.extend({
        template: '<div>loading...</div>'
    })
    Vue.component('loading', Loading)

    Vue.component('fav-content', (resolve, reject) => {
        require.ensure(['./components/favorite/Content'], function () {
            var FavContent = require('./components/favorite/Content')
            resolve(FavContent)
        })
    })

    export default {
        ready () {
            console.log('Im ready!')
            this.currentView = 'fav-content'
        },

        components: {
            NavBar,
            FootBar,
//            FavContent
            Loading
        },

        data () {
            var name = storage.get('name')
            var id = storage.get('id')
            var token = storage.get('token')

            $.extend(store, {
                user: {name, id, token},
                currentView: 'Loading'
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
