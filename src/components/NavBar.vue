<template>
    <div class="sui-navbar navbar-inverse">
        <div class="navbar-inner">
            <a href="#" class="sui-brand">SUI</a>'
            <ul class="sui-nav">
                <li class="active"><a href="#">首页</a></li>
                <li><a href="#">组件</a></li>
                <li class="sui-dropdown"><a href="javascript:void(0);" data-toggle="dropdown" class="dropdown-toggle">其他
                    <i class="caret"></i></a>
                    <ul role="menu" class="sui-dropdown-menu">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">关于</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">项目组成员</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">版权</a></li>
                    </ul>
                </li>
            </ul>
            <form class="sui-form sui-form pull-left ui-sortable">
                <input type="text" placeholder="宝贝/店铺名称...">
                <button class="sui-btn">搜索</button>
            </form>
            <ul class="sui-nav pull-right">
                <li><a href="#">个人中心</a></li>
                <li><a href="#">帮助</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
