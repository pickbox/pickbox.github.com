<template>

    <div id="block" class="dis-box box-vertical block">

        <!-- titlebar -->
        <div class="dis-box box-horizontal align-center titlebar">
        <span id="title" class="flex title">{{ block.title }}<i v-if="editMode" @click="onEditTitle(block)"
                                                                class="icon iconfont item_control">&#xe75d;</i></span>
            <div v-if="!editMode" id="title_controls" class="title_controls">
                <span @click="toggleEdit" class="title_control c_edit"><i class="icon iconfont">&#xe61e;</i>编辑</span>
                <span @click="onDeleteBlock" class="title_control c_delete"><i class="icon iconfont">&#xe65c;</i></span>
            </div>
        <span v-if="editMode" @click="toggleEdit" class="title_control c_back"><i class="icon iconfont">
            &#xe602;</i>完成</span>
        </div>

        <!-- rows -->
        <div v-for="list_row in block.list"
             class="dis-box box-horizontal align-center flex-wrap list_row {{ $index % 2 === 1 ? 'even' : '' }} {{ editMode ? 'list_row_edit' : '' }}">
            <span class="column_type">{{ list_row.type }}<i v-if="editMode" @click="onEditItemsType(list_row)"
                                                            class="icon iconfont item_control">&#xe75d;</i></span>
            <span class="column_seperator">|</span>
            <a v-for="item in list_row.items"
               :href="editMode ? '#' : item.link"
               title="{{ item.prompt || item.name }}"
               target="{{ !editMode ? '_blank' : '' }}"
               class="dis-box box-horizontal align-center item_link {{ editMode ? 'item_link_edit' : '' }}">
                <img :src="item.link + '/favicon.ico'" class="item_link_img"
                     @error="onLinkImgError($event)"/>
                {{ item.name }}
                <i v-if="editMode" @click="onEditItem(item)" class="icon iconfont item_control i_edit">&#xe75d;</i>
                <i v-if="editMode" @click="onDeleteItem(list_row, $index)" class="icon iconfont item_control i_delete">&#xf0046;</i>
            </a>

            <span v-if="editMode" @click="onEditAddItem(list_row.items)" class="item_link item_link_add"><i
                    class="icon iconfont">&#xe607;</i>添加</span>
            <span class="flex"></span>
            <span v-if="editMode" @click="onDeleteRow(block, $index)" class="item_link column_tail"><i class="icon iconfont i_close">&#xe65c;</i></span>
        </div>

        <!-- row for add new category -->
        <div v-if="editMode" @click="onEditAddRow(block.list)"
             class="dis-box box-horizontal justify-center list_row column_type list_row_add">
            <span v-if="editMode"><i class="icon iconfont">&#xe607;</i>添加新类别</span>
        </div>

    </div>

</template>

<script>
    require("src/assets/fonts/iconfont.css");
    require('src/css/flexbox.css')
    require('dragula/dist/dragula.css')

    import dragula from 'dragula'


    var tplEditItemBody = require('raw!./EditDialog.html').trim()
    var TEST_DATA = '[    {        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "link": "http://mail.google.com/",                        "prompt": ""                    }                ]            },            {                "type": "博客",                "items": [                    {                        "name": "jfo planet",                        "link": "http://blog.pickbox.me",                        "prompt": ""                    }                ]            },            {                "type": "社交",                "items": [                    {                        "name": "新浪微博",                        "link": "http://weibo.com/",                        "prompt": ""                    },                    {                        "name": "人人网",                        "link": "http://www.renren.com/",                        "prompt": ""                    },                    {                        "name": "QQ空间",                        "link": "http://qzone.qq.com/",                        "prompt": ""                    },                    {                        "name": "开心网",                        "link": "http://www.kaixin001.com/",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "谷歌新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    },                    {                        "name": "新浪",                        "link": "http://www.sina.com.cn/",                        "prompt": ""                    },                    {                        "name": "凤凰网",                        "link": "http://www.ifeng.com/",                        "prompt": ""                    },                    {                        "name": "腾讯",                        "link": "http://www.qq.com/",                        "prompt": ""                    },                    {                        "name": "网易",                        "link": "http://www.163.com/",                        "prompt": ""                    }                ]            },            {                "type": "购物",                "items": [                    {                        "name": "淘宝",                        "link": "http://www.taobao.com/",                        "prompt": ""                    },                    {                        "name": "京东",                        "link": "http://www.360buy.com/",                        "prompt": ""                    },                    {                        "name": "亚马逊",                        "link": "http://www.amazon.cn/",                        "prompt": ""                    },                    {                        "name": "凡客",                        "link": "http://www.vancl.com/",                        "prompt": ""                    },                    {                        "name": "1号店",                        "link": "http://www.yihaodian.com/",                        "prompt": ""                    }                ]            }        ]    },    {        "title": "娱乐",        "list": [            {                "type": "影视",                "items": [                    {                        "name": "YouKu",                        "link": "http://www.youku.com/",                        "prompt": ""                    },                    {                        "name": "奇异",                        "link": "http://www.iqiyi.com/",                        "prompt": ""                    },                    {                        "name": "土豆",                        "link": "http://www.tudou.com/",                        "prompt": ""                    },                    {                        "name": "迅雷看看",                        "link": "http://www.xunlei.com/",                        "prompt": ""                    }                ]            },            {                "type": "音乐",                "items": [                    {                        "name": "百度MP3",                        "link": "http://mp3.baidu.com/",                        "prompt": ""                    },                    {                        "name": "QQ音乐",                        "link": "http://y.qq.com/",                        "prompt": ""                    }                ]            },            {                "type": "游戏",                "items": [                    {                        "name": "三国杀",                        "link": "http://www.sanguosha.com/",                        "prompt": ""                    },                    {                        "name": "4399游戏",                        "link": "http://www.4399.com/",                        "prompt": ""                    }                ]            }        ]    },{        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "link": "http://mail.google.com/",                        "prompt": ""                    }                ]            },            {                "type": "博客",                "items": [                    {                        "name": "jfo planet",                        "link": "http://blog.pickbox.me",                        "prompt": ""                    }                ]            },            {                "type": "社交",                "items": [                    {                        "name": "新浪微博",                        "link": "http://weibo.com/",                        "prompt": ""                    },                    {                        "name": "人人网",                        "link": "http://www.renren.com/",                        "prompt": ""                    },                    {                        "name": "QQ空间",                        "link": "http://qzone.qq.com/",                        "prompt": ""                    },                    {                        "name": "开心网",                        "link": "http://www.kaixin001.com/",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "谷歌新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    },                    {                        "name": "新浪",                        "link": "http://www.sina.com.cn/",                        "prompt": ""                    },                    {                        "name": "凤凰网",                        "link": "http://www.ifeng.com/",                        "prompt": ""                    },                    {                        "name": "腾讯",                        "link": "http://www.qq.com/",                        "prompt": ""                    },                    {                        "name": "网易",                        "link": "http://www.163.com/",                        "prompt": ""                    }                ]            },            {                "type": "购物",                "items": [                    {                        "name": "淘宝",                        "link": "http://www.taobao.com/",                        "prompt": ""                    },                    {                        "name": "京东",                        "link": "http://www.360buy.com/",                        "prompt": ""                    },                    {                        "name": "亚马逊",                        "link": "http://www.amazon.cn/",                        "prompt": ""                    },                    {                        "name": "凡客",                        "link": "http://www.vancl.com/",                        "prompt": ""                    },                    {                        "name": "1号店",                        "link": "http://www.yihaodian.com/",                        "prompt": ""                    }                ]            }        ]    },    {        "title": "娱乐",        "list": [            {                "type": "影视",                "items": [                    {                        "name": "YouKu",                        "link": "http://www.youku.com/",                        "prompt": ""                    },                    {                        "name": "奇异",                        "link": "http://www.iqiyi.com/",                        "prompt": ""                    },                    {                        "name": "土豆",                        "link": "http://www.tudou.com/",                        "prompt": ""                    },                    {                        "name": "迅雷看看",                        "link": "http://www.xunlei.com/",                        "prompt": ""                    }                ]            },            {                "type": "音乐",                "items": [                    {                        "name": "百度MP3",                        "link": "http://mp3.baidu.com/",                        "prompt": ""                    },                    {                        "name": "QQ音乐",                        "link": "http://y.qq.com/",                        "prompt": ""                    }                ]            },            {                "type": "游戏",                "items": [                    {                        "name": "三国杀",                        "link": "http://www.sanguosha.com/",                        "prompt": ""                    },                    {                        "name": "4399游戏",                        "link": "http://www.4399.com/",                        "prompt": ""                    }                ]            }        ]    }]';

    export default {

        props: [
            'block', 'index'
        ],

        data () {
            return {
                editMode: false
            }
        },

        ready () {
            this.initDrag()
        },

        methods: {
            toggleEdit () {
                this.editMode = !this.editMode
            },

            initDrag () {
                var thiz = this;

                dragula($(".list_row", thiz.$el).get(), {
                    moves: function (el, container, handle) {
                        return thiz.editMode &&
                                (handle.className.indexOf('item_link_edit') >= 0 ||
                                handle.className.indexOf('item_link_img') >= 0);
                    },
                    // sibling is en element after el, null means el would be placed as the last element
                    accepts: function (el, target, source, sibling) {
                        return sibling != null && (sibling.className.indexOf('item_link_edit') >= 0 ||
                                sibling.className.indexOf('item_link_add') >= 0);
                    }
                })
                dragula([thiz.$el], {
                    revertOnSpill: true,
                    moves: function (el, container, handle) {
                        return thiz.editMode &&
                                handle.className.indexOf('item_link_edit') < 0 &&
                                el.className.indexOf('list_row_add') < 0 &&
                                el.className.indexOf('titlebar') < 0;
                    },
                    accepts: function (el, target, source, sibling) {
                        return sibling != null && (sibling.className.indexOf('list_row_edit') >= 0 ||
                                sibling.className.indexOf('list_row_add') >= 0);
                    }
                })
            },

            onLinkImgError (event) {
                var img = require('src/assets/web.png')
                event.target.src = img
            },

            getEditDialogBody () {
                var jDlg = $(tplEditItemBody)
                return jDlg
            },

            onEditItem (item) {
                var body = this.getEditDialogBody()
                body.find('#inputName').attr('value', item.name)
                body.find('#inputLink').attr('value', item.link)
                body.find('#inputPrompt').attr('value', item.prompt)
                $.confirm({
                    title: '编辑' + item.name,
                    body: body.html(),
                    okHide: function () {
                        var body = this.$element
                        var name = body.find('#inputName').val()
                        var link = body.find('#inputLink').val()
                        var prompt = body.find('#inputPrompt').val()
                        item.name = name
                        item.link = link
                        item.prompt = prompt
                    }
                })
            },

            onEditAddItem (items) {
                var body = this.getEditDialogBody()
                $.confirm({
                    title: '添加链接',
                    body: body.html(),
                    okHide: function () {
                        var body = this.$element
                        var name = body.find('#inputName').val()
                        var link = body.find('#inputLink').val()
                        var prompt = body.find('#inputPrompt').val()
                        items.push({
                            name, link, prompt
                        })
                    }
                })
            },

            onEditItemsType (row) {
                var body = this.getEditDialogBody()
                body.find('#control-group-link').hide()
                body.find('#control-group-prompt').hide()
                $.confirm({
                    title: '编辑类型',
                    body: body.html(),
                    shown: function () {
                        var body = $(this)
                        body.find('#inputName').focus().val(row.type)
                    },
                    okHide: function () {
                        var body = this.$element
                        var type = body.find('#inputName').val()
                        row.type = type
                    }
                })
            },

            onEditTitle (block) {
                var body = this.getEditDialogBody()
                body.find('#control-group-link').hide()
                body.find('#control-group-prompt').hide()
                $.confirm({
                    title: '编辑分类',
                    body: body.html(),
                    shown: function () {
                        var body = $(this)
                        body.find('#inputName').focus().val(block.title)
                    },
                    okHide: function () {
                        var body = this.$element
                        var title = body.find('#inputName').val()
                        block.title = title
                    }
                })
            },

            onEditAddRow (rows) {
                var body = this.getEditDialogBody()
                body.find('#control-group-link').hide()
                body.find('#control-group-prompt').hide()
                $.confirm({
                    title: '添加新类别',
                    body: body.html(),
                    shown: function () {
                        var body = $(this)
                        body.find('#inputName').focus()
                    },
                    okHide: function () {
                        var body = this.$element
                        var type = body.find('#inputName').val()
                        rows.push({
                            type, items: []
                        })
                    }
                })
            },

            onDeleteItem (row, index) {
                row.items.splice(index, 1)
            },

            onDeleteRow(block, index) {
                block.list.splice(index, 1)
            },

            onDeleteBlock () {
                this.$parent.onDeleteBlock(this.index)
            }
        }
    }

</script>

<style>
    .block {
        float: left;
        width: 350px;
        margin: 5px;
        border: 1px solid #C4C4C4;
        border-top: 0;
    }

    .titlebar {
        height: 25px;
        padding: 0px 5px;
        border-bottom: 1px solid #EEE;
        background: url(../../assets/round-top-center.gif) repeat-x;
    }

    .title {
        font-weight: normal;
        font-size: 1.4em;
    }

    .title_control {
        cursor: pointer;
        text-decoration: none;
    }

    .title_controls {
        display: none;
    }

    .c_delete {
        color: #CFCFCF;
    }

    .c_delete:hover {
        color: #777;
    }

    .c_edit {
        margin-right: 10px;
        color: #CFCFCF;
    }

    .c_edit:hover {
        color: #777;
    }

    .c_back {
        color: #fff;
        border-color: #1299ec;
        padding: 2px 7px;
        background: #28a3ef;
        border-radius: 3px;
    }

    .c_back:hover {
        background: #4cb9fc;
    }

    .even {
        background-color: #E9F6FF;
    }

    .list_row {
        padding: 1px;
    }

    .list_row_edit {
    }

    .list_row_edit:hover {
        cursor: move;
    }

    .list_row_add {
        cursor: pointer;
    }

    .list_row_add:hover {
        background: #4cb9fc;
    }

    .column_type {
        background: #28a3ef;
        color: #fff;
        padding: 1px 6px;
    }

    .column_seperator {
        margin: 0 2px;
    }

    .column_tail {
        color: #CFCFCF;
    }

    .column_tail:hover {
        /*color: #777;*/
    }

    .item_link {
        cursor: pointer;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 290px;
        margin: 2px 4px;
        transition: color .2s ease-out;
    }

    a.item_link {
        color: black;
        text-decoration: none;
    }

    .item_link:hover {
        color: #28a3ef;
    }

    .item_link_edit {
        /*border: dashed 1px;*/
        cursor: move;
        background: #f7f7f7;
        border: 1px solid #dedede;
        padding: 0 7px;
    }

    .item_link_edit:hover {
        color: black;
    }

    .item_link img {
        width: 16px;
        height: 16px;
        margin-right: 2px;
    }

    .item_control {
        margin-left: 8px;
        cursor: pointer;
        color: #CFCFCF;
        transition: color .2s ease-out;
    }

    .item_control:hover {
        color: #4cb9fc;
    }

    .i_delete {

    }

    .i_delete:hover {
    }

</style>