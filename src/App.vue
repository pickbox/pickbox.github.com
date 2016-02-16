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
            var id = storage.get('id')
            var token = storage.get('token')

            return {
                user: {
                    name: name,
                    id: id,
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
                    var keys = Object.keys(this.user)
                    for (var key of keys) {
                        if (key in info) {
                            this.user[key] = info[key]
                            storage.set(key, info[key])
                        }
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
