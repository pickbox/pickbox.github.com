<template>
    <div class="sui-navbar navbar-inverse">
        <div class="navbar-inner">
            <a href="#" class="sui-brand">PickBox</a>'
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
                <li v-else @click="logout"><a href="#">{{ getStore().user.name }} 注销</a></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Login from './Login'
    import store from './Store'
    import API from 'src/api/LeanCloud'

    var storage = $.localStorage

    export default {

        computed: {
            isLogin () {
                return !!store.user.token
            }
        },

        methods: {
            getStore () {
                return store
            },

            updateUserInfo (info) {
                if (info) {
                    var keys = Object.keys(store.user)
                    for (var key of keys) {
                        if (key in info) {
                            store.user[key] = info[key]
                            storage.set(key, info[key])
                        }
                    }
                }
            },

            login () {
                Login.login(store.user.name).done(result => {
                    this.updateUserInfo(result)
                    this.$root.$broadcast('loggedin')
                })
            },

            logout () {
                Login.logout().done(() => {
                    this.updateUserInfo({token: ''})
                    this.$root.$broadcast('loggedout')
                })
            }
        }

    }
</script>
