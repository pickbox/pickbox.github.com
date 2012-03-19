/* Author:
    
 */
(function() {
    var TEST_DATA = '[    {        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    },    {        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    }]';
    var Favorite = {
        "load": function(json) {
            if (typeof json === "string")
                json = JSON.parse(json);
            var jBlock = $("#favorite div.block");
            jBlock.remove();
            for (var i=0; i < json.length; i++) {
                var block = this.getBlockHtml(jBlock, json[i]);
                this.initMenu(block);
                $("#favorite").append(block);
            };
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
                    jListItem2.find("#seperator").hide();
                    jListItem2.find("#type").hide();
                }
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
                };
                jBlock.find("#list").append(jListItem2);
            };
            jBlock.find("#list #list_item:odd").addClass("even");
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
            jLink.each(function(){
                var href = $(this).attr("href");
                $(this).attr("data-href", href);
                $(this).attr("href", "#");
            });
        },
        "onEditMode": function(jBlock) {
            if (jBlock.attr("data-mode") == "edit")
                return;
            jBlock.attr("data-mode", "edit");
            
            var thiz = this;
            var jItem = jBlock.find("#item");
            var jLink = jItem.find("#a");
            jLink.each(function(){
                var href = $(this).attr("href");
                $(this).attr("data-href", href);
                $(this).attr("href", "#");
            });

            var jIMenu = $("#imenu").clone();
            jItem.wrap(jIMenu);
            var parent = jItem.parent();
            parent.each(function() {
                var menu_items = $(this).find("#imenu_items");
                var item = $(this).find("#item");
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
        },
        "onNormalMode": function(jBlock) {
            var mode = jBlock.attr("data-mode");
            jBlock.attr("data-mode", "");

            jBlock.find("#ok").hide();
            jBlock.find("#menu").show();
            var jItem = jBlock.find("#item");
            jItem.unbind();
            
            var jLink = jItem.find("#a");
            jLink.each(function(){
                var href = $(this).attr("data-href");
                $(this).attr("href", href);
                $(this).removeAttr("data-href");
            });
            
            if (mode == "delete") {
                
            } else if (mode == "edit") {
                var jIMenu = jBlock.find("#imenu");
                var jItem = jBlock.find("#item");
                jItem.unwrap();
                jItem.siblings().remove();
                jItem.unwrap();
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
            var thiz = this;
            var jItem = jElem.find("#item");
            var jLink = jItem.find("#a");
            var name = jLink.text();
            var link = jLink.attr("data-href");
            var prompt = jLink.attr("title");
            
            jElem.find("#imenu_item_name").val(name);
            jElem.find("#imenu_item_link").val(link);
            jElem.find("#imenu_item_prompt").val(prompt);
            jElem.find("#imenu_ok").click(function(){
                var jThisLink = jElem.find("#a");
                jThisLink.text(jElem.find("#imenu_item_name").val());
                jThisLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jThisLink.attr("title", jElem.find("#imenu_item_prompt").val());
            });
            jElem.find("#imenu_cancel").click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onImport": function(jBlock) {
            alert("TODO");
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
            $.post("http://justlog.sinaapp.com/api/http_address/insert/",
                {data:value},
                function(data){
                    alert("Data loaded: " + data);
                });
        },
        "test": function() {
            this.load(TEST_DATA);
        }
    }
    window.Favorite = Favorite;
    
})();

Favorite.test();

