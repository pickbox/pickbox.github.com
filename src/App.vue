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
            var token = storage.get('token')

            return {
                user: {
                    name: name,
                    token: token
                }
            }
        },

        computed: {
            isLogin () {
                return !!this.user.token
            }
        },

        methods: {
            updateUserInfo (info) {
                if (info) {
                    if ('name' in info) {
                        this.user.name = info.name
                        storage.set('name', info.name)
                    }
                    if ('token' in info) {
                        this.user.token = info.token
                        storage.set('token', info.token)
                    }
                }
            }
        }

    }
</script>

<style>
    body {
        font-family: "Microsoft YaHei";
    }
</style>
