/* Author:
    
 */
(function() {
    // var TEST_DATA = '[    {        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    },    {        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    }]';
    var TEST_DATA = '{        "title": "测试",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    }';
    var NAME = "jfo";

    function handleItemDropEvent(event, ui) {
        var offsetXPos = parseInt( ui.offset.left );
        var offsetYPos = parseInt( ui.offset.top );
        var draggable = ui.draggable;
        var droppable = $(this);
        var id = droppable.attr('id');
        if (id === 'item') {
            droppable.after(draggable);
            draggable.attr("style", "position:relative;");
        } else if (id === 'list_item') {
            droppable.append(draggable);
        }
    }

    var Favorite = {
        "jTemplateBlock": null,
        "load": function(json) {
            if (typeof json === "string")
                json = JSON.parse(json);
            if (this.jTemplateBlock === null)
                this.jTemplateBlock = $("#favorite div.block");
            var jBlock = $("#favorite div.block");
            jBlock.remove();
            // for (var i=0; i < json.length; i++) {
                var block = this.getBlockHtml(this.jTemplateBlock, json);
                this.initMenu(block);
                $("#favorite").append(block);
            // };
        },
        "getBlockHtml": function(jTemplate, json) {
            var list = json.list;
            var title = json.title;
            var jBlock = jTemplate.clone();
            var jListItem = jBlock.find("#list_item").clone();
            jBlock.find("#list_item").remove();
            jListItem.removeClass("even");
            var jItem = jListItem.find("#item").clone();
            jListItem.find("#item").remove();
            jBlock.find("#title").text(title);
            for (var i=0; i < list.length; i++) {
                var type = list[i].type;
                var items = list[i].items;
                var jListItem2 = jListItem.clone();
                if (type) {
                    jListItem2.find("#type").text(type);
                } else {
                    // jListItem2.find("#seperator").hide();
                    // jListItem2.find("#type").hide();
                }
                jListItem2.find("#item_add").hide();
                for (var j=0; j < items.length; j++) {
                    var link = items[j].link;
                    var name = items[j].name;
                    var prompt = items[j].prompt;
                    if (!link) link = "#";
                    if (!name) name = link;
                    if (!prompt) prompt = name;
                    var jItem2 = jItem.clone();
                    var jItem2link = jItem2.find("#a");
                    jItem2link.attr("href", link);
                    jItem2link.attr("title", prompt);
                    jItem2link.text(name);
                    jListItem2.append(jItem2);
                    this.attachDragAndDrop(jItem2, jBlock);
                };
                jListItem2.droppable({
                    drop: handleItemDropEvent
                });
                jBlock.find("#list").append(jListItem2);
            };
            jBlock.find("#list #list_item:odd").addClass("even");
            jBlock.find("#list_item_add").hide();
            jBlock.find("#list").sortable({
                update: function(){
                    jBlock.find("#list #list_item:odd").addClass("even");
                    jBlock.find("#list #list_item:even").removeClass("even");
                }
            });
            return jBlock;
        },
        "initMenu": function(jBlock) {
            var thiz = this;
            jMenu = jBlock.find("#menu");
            jMenu.hover(
                function() {
                    $(this).children("#menu_items").slideDown(150);
                },
                function() {
                    $(this).children("#menu_items").slideUp(150);
                }
            );
            jMenu.find("#menu_delete").click(function(){
                thiz.onDeleteMode(jBlock);
                jBlock.find("#menu").hide();
                jBlock.find("#ok").show();
            });
            jMenu.find("#menu_edit").click(function(){
                thiz.onEditMode(jBlock);
                jBlock.find("#menu").hide();
                jBlock.find("#ok").show();
            });
            jMenu.find("#menu_import").click(function(){
                thiz.onImport(jBlock);
                jBlock.find("#menu").hide();
                jBlock.find("#ok").show();
            });
            jMenu.find("#menu_export").click(function(){
                thiz.onExport(jBlock);
                jBlock.find("#menu").hide();
                jBlock.find("#ok").show();
            });
            jBlock.find("#ok").hide();
            jBlock.find("#ok").click(function(){
                thiz.onNormalMode(jBlock);
            });
        },
        "onDeleteMode": function(jBlock) {
            if (jBlock.attr("data-mode") == "delete")
                return;
            jBlock.attr("data-mode", "delete");
            
            var thiz = this;
            var jItem = jBlock.find("#item");
            jItem.click(function(){
                thiz.onDelete(jBlock, $(this));
            });
            
            var jLink = jItem.find("#a");
            this.inactivateLink(jLink);
        },
        "onEditMode": function(jBlock) {
            if (jBlock.attr("data-mode") == "edit")
                return;
            jBlock.attr("data-mode", "edit");
            
            var jItem = jBlock.find("#item");
            var jLink = jItem.find("#a");
            this.inactivateLink(jLink);

            this.wrapIMenu(jItem);
            var jItemAdd = jBlock.find("#item_add");
            jItemAdd.show();
            this.wrapIMenu(jItemAdd);
            this.wrapIMenu(jBlock.find("#type"));
        },
        "onNormalMode": function(jBlock) {
            var mode = jBlock.attr("data-mode");
            jBlock.attr("data-mode", "");

            jBlock.find("#ok").hide();
            jBlock.find("#menu").show();
            var jItem = jBlock.find("#item");
            
            var jLink = jItem.find("#a");
            this.activateLink(jLink);
            
            if (mode == "delete") {
                jItem.click(function(){});
            } else if (mode == "edit") {
                this.unwrapIMenu(jBlock.find("#item"));
                this.unwrapIMenu(jBlock.find("#item_add"));
                jBlock.find("#item_add").hide();
                this.unwrapIMenu(jBlock.find("#type"));
                jItem.unbind();
                this.attachDragAndDrop(jItem, jBlock);
            }
        },
        "onDelete": function(jBlock, jElem) {
            if (jElem.attr("id") == "item") {
                var jParentListItem = jElem.parent();
                jElem.remove();
                if (jParentListItem.find("#item").length == 0) {
                    jParentListItem.remove();
                    jBlock.find("#list #list_item").removeClass("even");
                    jBlock.find("#list #list_item:odd").addClass("even");
                }
            }
        },
        "onEdit": function(jElem) {
            var jItem = jElem.find("#imenu_title").children(":first");
            var id = jItem.attr("id");
            if (id === "item")
                this.onEditItem(jElem);
            else if (id === "item_add")
                this.onEditItemAdd(jElem);
            else if (id === "type")
                this.onEditItemType(jElem);
        },
        "onEditItem": function(jElem) {
            var thiz = this;
            var jItem = jElem.find("#item");
            var jLink = jItem.find("#a");
            var name = jLink.text();
            var link = jLink.attr("data-href");
            var prompt = jLink.attr("title");
            
            jElem.find("#imenu_item_name").val(name);
            jElem.find("#imenu_item_link").val(link);
            jElem.find("#imenu_item_prompt").val(prompt);

            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click(function(){
                var jThisLink = jElem.find("#a");
                jThisLink.text(jElem.find("#imenu_item_name").val());
                jThisLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jThisLink.attr("title", jElem.find("#imenu_item_prompt").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditItemAdd": function(jElem) {
            var thiz = this;
            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click(function(){
                var jNewItem = thiz.jTemplateBlock.find("#item").clone();
                var jNewElem = thiz.wrapIMenu(jNewItem);
                
                var jNewLink = jNewElem.find("#a");
                thiz.inactivateLink(jNewLink);
                jNewLink.text(jElem.find("#imenu_item_name").val());
                jNewLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jNewLink.attr("title", jElem.find("#imenu_item_prompt").val());
                
                jElem.after(jNewElem);
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditItemType": function(jElem) {
            var jItemType = jElem.find("#type");
            var name = jItemType.text();
            jElem.find("#imenu_item_name").val(name);
            jElem.find("#tr_link").hide();
            jElem.find("#tr_prompt").hide();

            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click(function(){
                jItemType.text(jElem.find("#imenu_item_name").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onImport": function(jBlock) {
            var thiz = this;
            $.post("http://justlog.sinaapp.com/api/http_address/list/",
                {user:NAME}
            )
            .error(function(ret){alert("import fail. " + ret);})
            .success(function(ret){
                var objRet = JSON.parse(ret);
                var record = objRet.data.items[0];
                log(record);
                var data = record.data;
                log(data);
                thiz.load(data);
            });
        },
        "onExport": function(jBlock) {
            var data = {};
            data.title = jBlock.find("#title").text();
            var list = [];
            jBlock.find("#list_item").each(function(){
                var list_item = {};
                var type = "";
                if ($(this).find("#type").is(":visible"))
                    type = $(this).find("#type").text();
                list_item.type = type;
                var items = [];
                $(this).find("#item").each(function(){
                    var item = {};
                    var jLink = $(this).find("#a");
                    item.name = jLink.text();
                    item.link = jLink.attr("href");
                    item.prompt = jLink.attr("title");
                    items.push(item);
                });
                list_item.items = items;
                list.push(list_item);
            });
            data.list = list;
            var value = JSON.stringify(data);
            log(value);
            $.post("http://justlog.sinaapp.com/api/http_address/update/",
                {data:value,user:NAME}
            )
            .error(function(ret){alert("export fail. " + ret);})
            .success(function(ret){alert("export success. " + ret);});
        },
        "wrapIMenu": function(jItem) {
            var thiz = this;
            var jIMenu = $("#imenu").clone();
            jItem.wrap(jIMenu);
            var parent = jItem.parent();
            parent.each(function() {
                var menu_items = $(this).find("#imenu_items");
                var item = $(this).children(":last");
                var menu_title = $(this).find("#imenu_title");
                item.remove();
                menu_title.wrapInner(item);
            });
            parent.hover(
                function() {
                    $(this).children("#imenu_items").slideDown(150);
                    thiz.onEdit($(this));
                },
                function() {
                    $(this).children("#imenu_items").slideUp(150);
                }
            );
            return parent;
        },
        "unwrapIMenu": function(jItem) {
            jItem.unwrap();
            jItem.siblings().remove();
            jItem.unwrap();
        },
        "inactivateLink": function(jLink) {
            jLink.each(function(){
                var href = $(this).attr("href");
                $(this).attr("data-href", href);
                $(this).attr("href", "#");
            });
        },
        "activateLink": function(jLink) {
            jLink.each(function(){
                var href = $(this).attr("data-href");
                $(this).attr("href", href);
                $(this).removeAttr("data-href");
            });
        },
        "attachDragAndDrop": function(jItem, jBlock) {
            jItem.draggable({
                containment: jBlock,
                revert: true
            });
            jItem.droppable({
                drop: handleItemDropEvent
            });
        },
        "swapItem": function(jItem1, jItem2) {
            var placeHolder = $("<div/>");
            jItem1.before(placeHolder);
            jItem2.after(jItem1);
            placeHolder.after(jItem2);
            placeHolder.remove();
        },
        "test": function() {
            this.load(TEST_DATA);
        }
    }
    window.Favorite = Favorite;
})();

Favorite.test();

