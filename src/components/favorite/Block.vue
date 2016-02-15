<template>

    <div id="block" class="dis-box box-vertical block">

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
             class="dis-box box-horizontal align-center flex-wrap list_row {{ $index % 2 === 1 ? 'even' : '' }} {{ editMode ? 'list_row_edit' : '' }}">
            <span class="column_type">{{ list_row.type }}<i v-if="editMode" @click="onEditItemsType(list_row)"
                                                            class="icon iconfont item_control">&#xe60e;</i></span>
            <span class="column_seperator">|</span>
            <a v-for="item in list_row.items"
               :href="editMode ? '#' : item.link"
               title="{{ item.prompt || item.name }}"
               target="{{ !editMode ? '_blank' : '' }}"
               class="dis-box box-horizontal align-center item_link {{ editMode ? 'item_link_edit' : '' }}">
                <img :src="item.link + '/favicon.ico'" class="item_link_img"
                     @error="onLinkImgError($event)"/>
                {{ item.name }}
                <i v-if="editMode" @click="onEditItem(item)" class="icon iconfont item_control i_edit">&#xe60e;</i>
                <i v-if="editMode" @click="onDeleteItem(list_row, $index)" class="icon iconfont item_control i_delete">&#xe60a;</i>
            </a>

            <span v-if="editMode" @click="onEditAddItem(list_row.items)" class="item_link item_link_add"><i
                    class="icon iconfont">&#xe611;</i>添加</span>
            <span class="flex"></span>
            <span v-if="editMode" @click="onDeleteRow(block, $index)" class="item_link column_tail"><i class="icon iconfont i_close">&#xe60d;</i></span>
        </div>

        <!-- row for add new category -->
        <div v-if="editMode" @click="onEditAddRow(block.list)"
             class="dis-box box-horizontal justify-center list_row column_type list_row_add">
            <span v-if="editMode"><i class="icon iconfont">&#xe611;</i>添加新类别</span>
        </div>

    </div>

</template>

<script>
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

        methods: {
            toggleEdit () {
                this.editMode = !this.editMode
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
        float: left;
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