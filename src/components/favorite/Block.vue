<template>
<div>
    <div id="{{ 'block' + index }}" class="dis-box box-vertical block">

        <!-- titlebar -->
        <div class="dis-box box-horizontal align-center titlebar">
        <span id="title" class="flex title">{{ block.title }}<i v-if="editMode" @click="onEditTitle(block)"
                                                                class="icon iconfont item_control">&#xe60e;</i></span>
            <div v-if="!editMode" id="title_controls" class="title_controls">
                <span @click="toggleEdit" class="title_control c_edit"><i class="icon iconfont">&#xe60f;</i>编辑</span>
                <span @click="onDeleteBlock" class="title_control c_delete"><i class="icon iconfont">&#xe60d;</i></span>
            </div>
        <span v-if="editMode" @click="toggleEdit" class="title_control c_back"><i class="icon iconfont">
            &#xe610;</i>保存</span>
        </div>

        <!-- rows -->
        <div v-for="list_row in block.list"
             data-index="{{$index}}"
             class="dis-box box-horizontal align-center flex-wrap list_row {{ $index % 2 === 1 ? 'even' : '' }} {{ editMode ? 'list_row_edit' : '' }}">
            <span class="column_type">{{ list_row.type }}<i v-if="editMode" @click="onEditItemsType(list_row)"
                                                            class="icon iconfont item_control">&#xe60e;</i></span>
            <span class="column_seperator">|</span>
            <a v-for="item in list_row.items"
               data-index="{{$index}}"
               :href="editMode ? '#' : item.link"
               title="{{ item.prompt || item.name }}"
               target="{{ !editMode ? '_blank' : '' }}"
               class="dis-box box-horizontal align-center item_link {{ editMode ? 'item_link_edit' : '' }}">
                <img :src="favIcon(item.link)" class="item_link_img"
                     @error="onLinkImgError($event)"/>
                {{ item.name }}
                <i v-if="editMode" @click="onEditItem(item)" class="icon iconfont item_control i_edit">&#xe60e;</i>
                <i v-if="editMode" @click="onDeleteItem(list_row, $index)" class="icon iconfont item_control i_delete">
                    &#xe60a;</i>
            </a>

            <span v-if="editMode" @click="onEditAddItem(list_row.items)" class="item_link item_link_add"><i
                    class="icon iconfont">&#xe611;</i>添加</span>
            <span class="flex"></span>
            <span v-if="editMode" @click="onDeleteRow(block, $index)" class="item_link column_tail"><i
                    class="icon iconfont i_close">&#xe60d;</i></span>
        </div>

        <!-- row for add new category -->
        <div v-if="editMode" @click="onEditAddRow(block.list)"
             class="dis-box box-horizontal justify-center list_row list_row_add">
            <span v-if="editMode"><i class="icon iconfont">&#xe611;</i>添加新类别</span>
        </div>

    </div>
</div>
</template>

<script type="text/ecmascript-6">
    require('dragula/dragula.styl')
    require("src/assets/fonts/iconfont.css");
    require('src/css/flexbox.css')

    var tplEditItemBody = require('raw!./EditDialog.html').trim()


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
            this.init()
        },

        events: {
            'init-block': function () {
                this.init()
            }
        },

        methods: {
            init () {
                var thiz = this;

                this.drakeItem && this.drakeItem.destroy()
                this.drakeRow && this.drakeRow.destroy()

                this.drakeItem = dragula($(".list_row", thiz.$el).get(), {
                    accepts: function (el, target, source, sibling) {
                        return sibling != null && (sibling.className.indexOf('item_link_edit') >= 0 ||
                                sibling.className.indexOf('item_link_add') >= 0);
                    },
                    invalid: function (el, handle) {
                        if (thiz.editMode && (el.className.indexOf('item_link_edit') >= 0 ||
                                el.className.indexOf('item_link_img') >= 0))
                            return false

                        return true
                    }
                })

                this.drakeItem.on('drop', (el, target, source, sibling) => {

                    if (target === source && target != null) {
                        var rowIndex = $(target).attr('data-index')
                        var oldItemsData = thiz.block.list[rowIndex].items

                        var newItemsData = []
                        $('a', target).each((i, elem) => {
                            var index = $(elem).attr('data-index')
                            newItemsData.push(oldItemsData[index])
                        })

                        thiz.block.list[rowIndex].items = newItemsData

                    } else {
                        var itemData = null
                        if (source != null) {
                            var srcRowIndex = $(source).attr('data-index')
                            var srcItemIndex = $(el).attr('data-index')
                            itemData = thiz.block.list[srcRowIndex].items[srcItemIndex]
                            thiz.block.list[srcRowIndex].items.splice(srcItemIndex, 1)
                        }
                        if (target != null && itemData != null) {
                            var targetRowIndex = $(target).attr('data-index')
                            var siblingIndex = $(sibling).attr('data-index')
                            if (siblingIndex === undefined) {
                                thiz.block.list[targetRowIndex].items.push(itemData)
                            } else {
                                thiz.block.list[targetRowIndex].items.splice(siblingIndex, 0, itemData)
                            }
                        }
                    }
                })

                this.drakeRow = dragula($(".block", thiz.$el).get(), {
                    revertOnSpill: true,
                    accepts: function (el, target, source, sibling) {
                        return sibling != null && (sibling.className.indexOf('list_row_edit') >= 0 ||
                                sibling.className.indexOf('list_row_add') >= 0);
                    },
                    invalid: function (el, handle) {
                        if (thiz.editMode && (el.className.indexOf('list_row_edit') >= 0 ||
                                el.className.indexOf('column_type') >= 0 ||
                                el.className.indexOf('column_seperator') >= 0))
                            return false

                        return true
                    }
                })
            },

            toggleEdit () {
                this.editMode = !this.editMode
                if (!this.editMode) {
                    this.$dispatch('save')
                }
                this.$dispatch('toggle-block-edit')
            },

            /*
             http://www.example.org:80/hello.html?abc&arg=123&c=[a,b]#ac

             hash: "#ac"
             host: "www.example.org:80"
             hostname: "www.example.org"
             pathname: "/hello.html"
             port: "80"
             protocol: "http:"
             search: "?abc&arg=123&c=[a,b]"
             */
            getLocation (href) {
                var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)?(\?[^#]*|)(#.*|)$/);
                return match && {
                            protocol: match[1],
                            host: match[2],
                            hostname: match[3],
                            port: match[4],
                            pathname: match[5],
                            search: match[6],
                            hash: match[7]
                        }
            },

            favIcon (link) {
                var loc = this.getLocation(link)
                if (DEBUG) loc = null
                return loc && loc.protocol && loc.host ? `${loc.protocol}//${loc.host}/favicon.ico` : '#'
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
                    okHide: function (event) {
                        var elem = this.$element
                        var name = elem.find('#inputName').val()
                        var link = elem.find('#inputLink').val()
                        var prompt = elem.find('#inputPrompt').val()
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
                        var elem = this.$element
                        var name = elem.find('#inputName').val()
                        var link = elem.find('#inputLink').val()
                        var prompt = elem.find('#inputPrompt').val()
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
                        var elem = $(this)
                        elem.find('#inputName').focus().val(row.type)
                    },
                    okHide: function () {
                        var elem = this.$element
                        var type = elem.find('#inputName').val()
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
                        var elem = $(this)
                        elem.find('#inputName').focus().val(block.title)
                    },
                    okHide: function () {
                        var elem = this.$element
                        var title = elem.find('#inputName').val()
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
                        var elem = $(this)
                        elem.find('#inputName').focus()
                    },
                    okHide: function () {
                        var elem = this.$element
                        var type = elem.find('#inputName').val()
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
        /*float: left;*/
        /*width: 350px;*/
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
        background: #28a3ef;
        color: #fff;
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