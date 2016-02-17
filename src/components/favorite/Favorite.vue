<template>
<div>
    <div v-if="!loading" id="favorite">

        <div v-if="isLogin">
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

        <div id="block_group" class="row">
            <block v-for="block in blocks" :block="block" :index="$index" track-by="$index" class="col-xs-12 col-md-6 block-wrapper">
            </block>
        </div>
    </div>

    <div v-else class="dis-box box-vertical justify-center" :style="'height:' + windowHeight() / 2 + 'px'">
        <div class="sui-loading loading-xlarge"><i class="sui-icon icon-pc-loading"></i></div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">

    require('src/css/flexbox.css')
    var Masonry = require('masonry-layout')

    import Block from './Block'
    import API from 'src/api/LeanCloud'
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
                importing: false,
                saving: false,
                loading: false
            }
        },

        computed: {
            isLogin () {
                return !!store.user.token
            }
        },

        ready () {
            var drake = null;

            function init() {
                $(".block").off('mouseenter mouseleave')

                $(".block").hover(function () {
                    $(this).find("#title_controls").show()
                }, function () {
                    $(this).find("#title_controls").hide()
                })

                drake && drake.destroy()
                drake = dragula($("#block_group").get(), {
                    moves: function (el, container, handle) {
                        return handle.className.indexOf('title') >= 0;
                    }
                })

                var elem = this.$el.querySelector('#block_group');
                this.msnry = new Masonry( elem, {
                    itemSelector: '.block-wrapper',
                });

                this.$parent.$broadcast('fav-titles', this.blocks)
            }

            this.$watch('blocks', (newValue, oldValue) => {
//                this.$nextTick(() => {
                init.apply(this)
                this.$broadcast('init-block')
//                })
            })

            init.apply(this)

            this.fetchData()
        },

        events: {
            loggedin () {
                this.fetchData()
            },

            loggedout () {
                this.blocks = TEST_DATA
            },

            save () {
                this.onSave()
            },

            'toggle-block-edit': function () {
                this.$nextTick(() => {
                    this.msnry && this.msnry.layout()
                })
            }
        },

        methods: {
            fetchData (token) {
                var token = store.user.token
                if (token) {
                    this.loading = true
                    API.getData(token).done(data => {
                        this.blocks = JSON.parse(data)
                    }).always(() => {
                        this.loading = false
                    })
                }
            },

            windowHeight () {
                return document.documentElement['clientHeight']
            },

            onDeleteBlock (index) {
                this.blocks.splice(index, 1)
                this.onSave()
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
                Toast.error(`${err.code}: ${err.error}`, '导入失败')
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

                    if (!token) {
                        return
                    }

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
            },


            failSave () {
                this.saving = false
                Toast.clear()
                Toast.error(`${err.code}: ${err.error}`, '保存失败')
            },

            successSave () {
                this.saving = false
                Toast.clear()
                Toast.success('已保存')
            },

            onSave () {
                var token = store.user.token
                if (!token) {
                    return
                }

                var data = JSON.stringify(this.blocks)
                API.getData(token, true).done((dummy, id) => {

                    if (id) {
                        API.updateData(token, id, data).done(() => {
                            this.successSave()
                        }).fail(this.failSave)
                    } else {
                        var userId = store.user.id
                        API.insertData(token, data, userId).done(() => {
                            this.successSave()
                        }).fail(this.failSave)
                    }
                }).fail(this.failSave)
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