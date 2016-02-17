<template>
    <div class="container">
        <div class="row">
            <side-bar class="col-xs-3 col-md-2"></side-bar>
            <favorite class="col-xs-9 col-md-10"></favorite>
        </div>
    </div>
</template>

<style>
</style>

<script>
    import SideBar from './SideBar'
    import Favorite from './Favorite'

    export default {

        components: {
            SideBar,
            Favorite
        }

    }
</script>

