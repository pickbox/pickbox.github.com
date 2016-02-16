<template>
    <div>
        <nav-bar></nav-bar>

        <div class="container">
            <div class="row">
                <div class="col-xs-3 col-md-2">
                    <side-bar></side-bar>
                </div>
                <div class="col-xs-9 col-md-10">
                    <favorite></favorite>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBar from './components/NavBar'
    import SideBar from './components/SideBar'
    import Favorite from './components/favorite/Favorite'
    import store from './components/Store'

    var storage = $.localStorage

    export default {
        ready () {
            console.log('Im ready!')
        },

        components: {
            NavBar,
            SideBar,
            Favorite
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
