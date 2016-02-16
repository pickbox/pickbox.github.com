<template>
    <div class="sui-navbar navbar-inverse">
        <div class="navbar-inner">
            <a href="#" class="sui-brand">Pickbox</a>'
            <ul class="sui-nav">
                <li class="active"><a href="#">收藏夹</a></li>
                <li><a href="http://blog.pickbox.me" target="_blank">博客</a></li>
                <li><a href="http://note.pickbox.me" target="_blank">网络剪贴板</a></li>
                <li class="sui-dropdown"><a href="javascript:void(0);" data-toggle="dropdown" class="dropdown-toggle">其他
                    <i class="caret"></i></a>
                    <ul role="menu" class="sui-dropdown-menu">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://shell.pickbox.me"
                                                   target="_blank">Shell</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="https://rest.pickbox.me:4433"
                                                   target="_blank">Rest</a></li>
                    </ul>
                </li>
            </ul>
            <!--<form class="sui-form sui-form pull-left ui-sortable">-->
            <!--<input type="text" placeholder="宝贝/店铺名称...">-->
            <!--<button class="sui-btn">搜索</button>-->
            <!--</form>-->
            <ul class="sui-nav pull-right">
                <li v-if="!isLogin" @click="login"><a href="#">登录</a></li>
                <li v-else @click="logout"><a href="#">{{ $parent.user.name }} 注销</a></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Login from './Login'
    import { API_AVOS as API } from './API'

    export default {

        computed: {
            isLogin () {
                return this.$parent.isLogin
            }
        },

        methods: {
            login () {
                Login.login(this.$parent.user.name).done(result => {
                    this.$parent.updateUserInfo(result)
                    this.$root.$broadcast('loggedin')
                })
            },

            logout () {
                Login.logout().done(() => {
                    this.$parent.updateUserInfo({token: ''})
                    this.$root.$broadcast('loggedout')
                })
            }
        }

    }
</script>
