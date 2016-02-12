<template>
    <div>
        <nav-bar></nav-bar>

        <div class="sui-container ui-sortable">
            <div class="sui-row-fluid">
                <div class="span2 column ui-sortable">
                    <side-bar></side-bar>
                </div>
                <div class="span10 column ui-sortable">
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
