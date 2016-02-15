<template>
    <div id="favorite">

        <div>
            <div class="sui-btn-group">
                <button @click="onEditAddBlock" class="sui-btn btn-bordered btn-primary"><i class="icon iconfont">
                    &#xe611;</i>添加新组
                </button>
            </div>

            <div class="sui-btn-group pull-right">
                <button class="sui-btn btn-bordered btn-primary"><i class="icon iconfont">&#xe615;</i>导入</button>
                <button class="sui-btn btn-bordered btn-primary"><i class="icon iconfont">&#xe60c;</i>导出</button>
            </div>

            <div class="clearfix"></div>
        </div>

        <div id="block_group" class="dis-box box-vertical">

            <block v-for="block in blocks" :block="block" :index="$index" track-by="$index">
            </block>

        </div>
    </div>

</template>

<script>
    require('src/css/flexbox.css')

    import Block from './Block'


    var TEST_DATA = require('./TestData.json')

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
                blocks: TEST_DATA
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
            }
        }
    }

</script>