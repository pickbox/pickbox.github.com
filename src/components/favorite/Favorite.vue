<template>
    <div id="favorite">

        <div>
            <div class="sui-btn-group">
                <button @click="onEditAddBlock" class="sui-btn btn-bordered btn-primary"><i class="icon iconfont">
                    &#xe611;</i>添加新组
                </button>
            </div>

            <div class="sui-btn-group pull-right">
                <button class="sui-btn btn-bordered btn-primary file-upload">
                    <span v-if="!importing"><i class="icon iconfont">&#xe615;</i>导入<input @change="onImport($event)"
                                                                                          class="upload"
                                                                                          type="file"></span>
                    <span v-else><i class="icon iconfont icon-loading"></i>上传中...</span>
                </button>
                <button @click="onExport" class="sui-btn btn-bordered btn-primary"><i class="icon iconfont">&#xe60c;</i>导出
                </button>
            </div>

            <div class="clearfix"></div>
        </div>

        <div id="block_group" class="dis-box box-vertical">

            <block v-for="block in blocks" :block="block" :index="$index" track-by="$index">
            </block>

        </div>
    </div>

</template>

<script type="text/ecmascript-6">

    require('src/css/flexbox.css')
    import Block from './Block'
    import { API_AVOS as API } from '../API'
    import store from '../Store'


    var TEST_DATA = require('./TestData.json')
    Toast.options.positionClass = "toast-bottom-center"

    export default {
        components: {
            Block
        },

        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                blocks: TEST_DATA,
                importing: false
            }
        },

        ready () {
            $(".block").hover(function () {
                $(this).find("#title_controls").show()
            }, function () {
                $(this).find("#title_controls").hide()
            })

            dragula($("#block_group").get(), {
                moves: function (el, container, handle) {
                    return handle.className.indexOf('title') >= 0;
                }
            })

            var token = store.user.token
            if (token) {
                API.getData(token).done(data => {
                    this.blocks = JSON.parse(data)
                })
            }
        },

        events: {
            loggedin () {
                API.getData(store.user.token).done(data => {
                    this.blocks = JSON.parse(data)
                })
            },

            loggedout () {
                this.blocks = TEST_DATA
            }
        },

        methods: {
            onDeleteBlock (index) {
                this.blocks.splice(index, 1)
            },

            onEditAddBlock () {
                var tpl = {
                    "title": "新分组",
                    "list": [{
                        "type": "新类别",
                        "items": [{"name": "新浪微博", "link": "https://weibo.com/", "prompt": "新浪微博"}]
                    }]
                }
                this.blocks.unshift(tpl)
//                this.$nextTick(function () {
                this.$children[0].editMode = true
//                })
            },

            failImport (err) {
                this.importing = false
                Toast.clear()
                Toast.error(`${err.code}: ${err.error}`)
            },

            successImport (data) {
                this.importing = false
                this.blocks = JSON.parse(data)
                Toast.clear()
                Toast.success('导入成功')
            },

            onImport (event) {
                this.importing = true

                var file = event.target.files[0]

                var fileInfo = file.name + " - " + file.size + " bytes, " +
                        (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : "")

                Toast.info(fileInfo, '', {
                    closeButton: true,
                    timeOut: 24 * 3600,
                    extendedTimeOut: 24 * 3600
                });


                var reader = new FileReader();
                reader.onload = function (event) {
                    var newData = event.target.result
                    var token = store.user.token

                    API.getData(token, true).done((dummy, id) => {

                        if (id) {
                            API.updateData(token, id, newData).done(() => {
                                this.successImport(newData)
                            }).fail(this.failImport)
                        } else {
                            var userId = store.user.id
                            API.insertData(token, newData, userId).done(() => {
                                this.successImport(newData)
                            }).fail(this.failImport)
                        }
                    }).fail(this.failImport)
                }.bind(this)

                reader.readAsText(file);
            },

            onExport () {
                var fav = JSON.stringify(this.blocks)
                var blob = new Blob([fav], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(blob, "favorite.json");

            }
        }
    }

</script>

<style>
    .file-upload {
        position: relative;
        overflow: hidden;
    }

    .file-upload input.upload {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        filter: alpha(opacity=0);
    }

    .icon-loading {
        animation: rotation 2s infinite linear;
    }

    .icon-loading:before {
        content: "\e602;";
    }
</style>