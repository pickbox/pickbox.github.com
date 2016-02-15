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
    require('lib/bootstrap/less/bootstrap-grid.less')
//    require('lib/bootstrap/dist/css/bootstrap.css')

    import NavBar from './components/NavBar'
    import SideBar from './components/SideBar'
    import Favorite from './components/favorite/Favorite'

    export default {
        components: {
            NavBar,
            SideBar,
            Favorite
        }
    }
</script>

<style>
    body {
        font-family: "Microsoft YaHei";
    }
</style>
