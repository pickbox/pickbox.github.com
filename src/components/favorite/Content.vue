<template>
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

