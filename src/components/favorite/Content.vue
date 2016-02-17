<template>
    <div class="container">
        <div class="row">
            <side-bar></side-bar>
            <favorite></favorite>
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

