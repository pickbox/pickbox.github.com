/* Author:
 */
$.fn.spin = function(opts){
    this.each(function(){
        var $this = $(this), data = $this.data();
        
        if (data.spinner) {
            data.spinner.stop();
            delete data.spinner;
        }
        if (opts !== false) {
            data.spinner = new Spinner($.extend({
                color: $this.css('color')
            }, opts)).spin(this);
        }
    });
    return this;
};
(function(){
    var TEST = false;
    var HOST = TEST ? "http://127.0.0.1" : "http://justlog.sinaapp.com";
    var URL_USER_INSERT = HOST + "/api/user/insert/";
    var URL_GET_TOKEN = HOST + "/api/user/get_token/";
    var URL_LOGOUT = HOST + "/api/user/logout/";
    var URL_FAV_INSERT = HOST + "/api/http_address/insert/";
    var URL_FAV_LIST = HOST + "/api/http_address/list/";
    var URL_FAV_UPDATE = HOST + "/api/http_address/update/";
    
    var TEST_DATA = '[{        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    }]';
    // var TEST_DATA = '[{        "title": "测试",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    },                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "http://mail.google.com/": ""                    }                ]            },            {                "type": "",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "SNS",                "items": [                    {                        "name": "微博",                        "link": "http://t.sina.com.cn/jfojfo",                        "prompt": ""                    },                    {                        "name": "校内",                        "link": "http://home.xiaonei.com/Home.do?id=245505180",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "Google新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    }                ]            }        ]    }]';
    TEST_DATA = $.toJSON($.evalJSON(TEST_DATA));
    
    var KEY_USER_ID = "user_id";
    var USER_ID = $.jStorage.get(KEY_USER_ID) || "";
    var KEY_USER_NAME = "user_name";
    var USER_NAME = $.jStorage.get(KEY_USER_NAME) || "";
    var KEY_FAVORITE_DATA = "favorite";
    var FAVORITE_DATA = $.jStorage.get(KEY_FAVORITE_DATA) || TEST_DATA;
    var KEY_TOKEN = "token";
    var TOKEN = $.jStorage.get(KEY_TOKEN) || "";
    
    // var BlobBuilder = BlobBuilder || WebKitBlobBuilder || MozBlobBuilder;
    // var URL = URL || webkitURL || window;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    }
    else {
        alert('The File APIs are not fully supported in this browser.');
    }
    
    function uuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
    
    function handleItemDropEvent(event, ui){
        var offsetXPos = parseInt(ui.offset.left);
        var offsetYPos = parseInt(ui.offset.top);
        var draggable = ui.draggable;
        var droppable = $(this);
        var id = droppable.attr('id');
        if (id === 'item') {
            droppable.after(draggable);
            draggable.attr("style", "position:relative;");
        }
        else if (id === 'list_item') {
            droppable.append(draggable);
        }
    }
    
    function showDialog(jDialog){
        // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
        jDialog.dialog("destroy");
        
        var name = jDialog.find("#name");
        var password = jDialog.find("#password");
        var password2 = jDialog.find("#password2");
        var allFields = $([]).add(name).add(password).add(password2);
        var tips = jDialog.find("#validateTips");
        var progress = jDialog;
        
        function updateTips(t){
            tips.text(t).addClass("ui-state-highlight").show();
            setTimeout(function(){
                tips.removeClass("ui-state-highlight");
            }, 1500);
        }
        
        function checkLength(o, n, min, max){
            if (o.val().length > max || o.val().length < min) {
                o.addClass("ui-state-error");
                updateTips("Length of " + n + " must be between " +
                min +
                " and " +
                max +
                ".");
                return false;
            }
            else {
                return true;
            }
        }
        
        function checkRegexp(o, regexp, n){
            if (!(regexp.test(o.val()))) {
                o.addClass("ui-state-error");
                updateTips(n);
                return false;
            }
            else {
                return true;
            }
        }
        
        function checkPassword(p1, p2, n){
            if (p1.val() != p2.val()) {
                p2.addClass("ui-state-error");
                updateTips(n);
                return false;
            }
            else {
                return true;
            }
        }
        
        $("#dialog-register").dialog({
            autoOpen: false,
            width: 300,
            height: 300,
            modal: true,
            buttons: {
                "注册": function(){
                    var thiz = this;
                    tips.hide();
                    allFields.removeClass("ui-state-error");
                    
                    var bValid = true;
                    bValid = bValid && checkLength(name, "username", 3, 16);
                    bValid = bValid && checkLength(password, "password", 5, 16);
                    bValid = bValid && checkLength(password2, "confirm password", 5, 16);
                    
                    bValid = bValid && checkPassword(password, password2, "两次密码输入不一致");
                    
                    bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "用户名只能包含a-z, 0-9, _ 这些字符，并且以字母开头");
                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                    // bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
                    bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");
                    
                    if (bValid) {
                        progress.spin();
                        register(name.val(), password.val(), function(ret){
                            progress.data('spinner').stop();
                            updateTips("注册失败，请重试");
                            log(ret);
                        }, function(ret){
                            progress.data('spinner').stop();
                            log(ret);
                            var result = $.evalJSON(ret);
                            var errCode = result.err_code;
                            if (errCode != 0) {
                                name.addClass("ui-state-error");
                                updateTips("该用户名已被注册，请重新输入");
                                return errCode;
                            }
                            $(thiz).dialog("close");
                            alert("恭喜您注册成功，登录开始使用");
                            return errCode;
                        });
                    }
                },
                "取消": function(){
                    $(this).dialog("close");
                }
            },
            close: function(){
                allFields.val("").removeClass("ui-state-error");
            }
        });
        
        $("#dialog-login").dialog({
            autoOpen: false,
            width: 300,
            height: 240,
            modal: true,
            buttons: {
                "登录": function(){
                    var thiz = this;
                    tips.hide();
                    allFields.removeClass("ui-state-error");
                    
                    var bValid = true;
                    bValid = bValid && checkLength(name, "username", 3, 16);
                    bValid = bValid && checkLength(password, "password", 5, 16);
                    
                    bValid = bValid && checkRegexp(name, /^[a-z]([0-9a-z_])+$/i, "用户名只能包含a-z, 0-9, _ 这些字符，并且以字母开头");
                    bValid = bValid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");
                    
                    if (bValid) {
                        progress.spin();
                        login(name.val(), password.val(), function(ret){
                            progress.data('spinner').stop();
                            updateTips("登录失败，请重试");
                            log(ret);
                        }, function(ret){
                            progress.data('spinner').stop();
                            log(ret);
                            var result = $.evalJSON(ret);
                            var errCode = result.err_code;
                            if (errCode != 0) {
                                name.addClass("ui-state-error");
                                updateTips("用户名或密码错误，请重新输入");
                                return errCode;
                            }
                            $(thiz).dialog("close");
                            return errCode;
                        });
                    }
                },
                "取消": function(){
                    $(this).dialog("close");
                }
            }
        });
        
        var selectedFile;
        $("#dialog-import").dialog({
            autoOpen: false,
            width: 400,
            height: 240,
            modal: true,
            buttons: {
                "上传": function(){
                    var thiz = this;
                    tips.hide();
                    allFields.removeClass("ui-state-error");
                    
                    var file = selectedFile;
                    var reader = new FileReader();
                    reader.onload = function(){
                        var json = this.result;
                        $.post(URL_FAV_UPDATE, {
                            data: json,
                            user: USER_ID,
                            token: TOKEN
                        }).error(function(ret){
                            log(ret);
                            updateTips("很抱歉，导入失败，请重试...");
                        }).success(function(ret){
                            log(ret);
                            var objRet = $.evalJSON(ret);
                            if (!objRet || objRet.err_code != 0 || !objRet.data) {
                                updateTips("很抱歉，导入失败，请重试...");
                                return;
                            }
                            checkLogin(); // will refresh content
                            $(thiz).dialog("close");
                            alert("导入成功！");
                        });
                    }
                    reader.readAsText(file);
                },
                "取消": function(){
                    $(this).dialog("close");
                }
            },
            open: function(event, ui){
                $("#datafile").on("change", function(event){
                    var fileList = this.files;
                    var file = fileList[0];
                    updateTips(file.name + " - " +
                    file.size +
                    " bytes, " +
                    (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : ""));
                    selectedFile = file;
                });
            }
        });
        
        return jDialog.dialog("open");
    }
    
    function register(name, password, onError, onSuccess){
        var passwdMd5 = $.md5(password);
        $.post(URL_USER_INSERT, {
            account: name,
            password: passwdMd5
        }).error(onError).success(function(ret){
            var errCode = onSuccess(ret);
            if (errCode == 0) {
                getToken(name, password, function(){
                }, function(){
                    insertFavorite();
                });
            }
        });
    }
    
    function login(name, password, onError, onSuccess){
        getToken(name, password, onError, function(ret){
            var errCode = onSuccess(ret);
            if (errCode == 0) 
                checkLogin();
        });
    }
    
    function getToken(name, password, onError, onSuccess){
        $.post(URL_GET_TOKEN, {
            account: name,
            password: password
        }).error(onError).success(function(ret){
            var objRet = $.evalJSON(ret);
            if (!objRet || !objRet.data || objRet.err_code != 0) 
                return onSuccess(ret);
            var token = objRet.data.token;
            var uid = objRet.data.uid;
            log("token:" + token + ",uid:" + uid);
            $.jStorage.set(KEY_USER_ID, uid);
            $.jStorage.set(KEY_TOKEN, token);
            $.jStorage.set(KEY_USER_NAME, name);
            USER_ID = uid;
            TOKEN = token;
            USER_NAME = name;
            onSuccess(ret);
        });
    }
    
    function logout(){
        var token = TOKEN;
        clearUI();
        $.jStorage.flush();
        USER_ID = "";
        USER_NAME = "";
        FAVORITE_DATA = TEST_DATA;
        TOKEN = "";
        $.post(URL_LOGOUT, {
            token: token
        }).error(function(ret){
            log(ret);
        }).success(function(ret){
            log(ret);
        });
        // location.reload();
    }
    
    function insertFavorite(){
        $.post(URL_FAV_INSERT, {
            data: TEST_DATA,
            dataType: "json",
            user: USER_ID,
            token: TOKEN
        }).error(function(ret){
            log(ret);
        }).success(function(ret){
            log(ret);
            checkLogin();
        });
    }
    
    function checkLogin(){
        if (!USER_ID || !TOKEN) {
            clearUI();
            return;
        }
        fillUI();
        $.post(URL_FAV_LIST, {
            user: USER_ID,
            token: TOKEN
        }).error(function(ret){
            log(ret);
            clearUI();
        }).success(function(ret){
            log(ret);
            var objRet = $.evalJSON(ret);
            if (!objRet || objRet.err_code != 0 || !objRet.data) {
                clearUI();
                if (objRet.err_code == 0 && !objRet.data) 
                    insertFavorite();
                return;
            }
            var info = objRet.data.items[0];
            $.jStorage.set(KEY_FAVORITE_DATA, info.data);
            FAVORITE_DATA = info.data;
            fillUI();
        });
    }
    
    function sync(){
        var thiz = Favorite;
        var arr = [];
        $("#favorite").find(".block").each(function(){
            var s = thiz.onExport($(this));
            arr = arr.concat(s);
        });
        var json = "[" + arr.join(",") + "]";
        $.post(URL_FAV_UPDATE, {
            data: json,
            user: USER_ID,
            token: TOKEN
        }).error(function(ret){
            log(ret);
            alert("sync fail. " + ret);
        }).success(function(ret){
            log(ret);
            var objRet = $.evalJSON(ret);
            if (!objRet || objRet.err_code != 0 || !objRet.data) {
                alert("sync fail. " + ret);
                return;
            }
            alert("sync success. ");
        });
    }
    
    function clearUI(){
        $("#nav_user_name").text("");
        $("#nav_profile #guest").show();
        $("#nav_profile #user").hide();
        Favorite.load(TEST_DATA);
    }
    
    function fillUI(){
        $("#nav_user_name").text(USER_NAME);
        $("#nav_profile #guest").hide();
        $("#nav_profile #user").show();
        Favorite.load(FAVORITE_DATA);
    }
    
    var Favorite = {
        "jTemplateBlock": null,
        "jTemplateBlockJson": '{"title": "新分组","list": [{"type": "新类别","items": [{"name": "新浪微博","link": "https://weibo.com/","prompt": "新浪微博"}]}]}',
        "init": function(){
            this.initUI();
        },
        "initUI": function(){
            if (this.jTemplateBlock === null) {
                this.jTemplateBlock = $("#favorite div.block");
                this.jTemplateBlock.show();
            }
            var jBlock = $("#favorite div.block");
            jBlock.remove();
            this.initFavoriteMenu();
        },
        "initFavoriteMenu": function(){
            var thiz = this;
            var jFavoriteMenu = $("#favorite_menu");
            jFavoriteMenu.hover(function(){
                $(this).children("#menu_items").slideDown(150);
            }, function(){
                $(this).children("#menu_items").slideUp(150);
            });
            jFavoriteMenu.find("#menu_import").click(function(){
            });
            jFavoriteMenu.find("#menu_export").click(function(){
            });
            var jNavItem = $("#nav_profile");
            jNavItem.hover(function(){
                $(this).children("#menu_items").slideDown(150);
            }, function(){
                $(this).children("#menu_items").slideUp(150);
            });
            jNavItem.find(".menu_item").click(function(){
                jNavItem.children("#menu_items").slideUp(150);
            });
            jNavItem.find("#login").click(function(){
                showDialog($("#dialog-login"));
            });
            jNavItem.find("#register").click(function(){
                showDialog($("#dialog-register"));
            });
            jNavItem.find("#logout").click(function(){
                logout();
            });
            jNavItem.find("#sync").click(function(){
                sync();
            });
            jNavItem.find("#import").click(function(){
                showDialog($("#dialog-import"));
            });
            jNavItem.find("#export").click(function(){
                $.post(URL_FAV_LIST, {
                    user: USER_ID,
                    token: TOKEN
                }).error(function(ret){
                    log(ret);
                    alert("抱歉，导出失败，请重试...");
                }).success(function(ret){
                    log(ret);
                    var objRet = $.evalJSON(ret);
                    if (!objRet || objRet.err_code != 0 || !objRet.data) {
                        alert("抱歉，导出失败，请重试...");
                    }
                    var data = objRet.data.items[0].data;
                    var json = $.toJSON(data);
                    log(json);
                    var bb = new BlobBuilder;
                    bb.append(json);
                    saveAs(bb.getBlob("text/plain;charset=utf-8"), "favorite.json");
                });
            });
            $("#add_block").click(function(){
                var jBlock = thiz.getBlock(thiz.jTemplateBlock, $.evalJSON(thiz.jTemplateBlockJson));
                thiz.initMenu(jBlock);
                $("#favorite").append(jBlock);
            });
        },
        "load": function(json){
            var jBlock = $("#favorite div.block");
            jBlock.remove();
            if (typeof json === "string") 
                json = $.evalJSON(json);
            for (var i = 0; i < json.length; i++) {
                var block = this.getBlock(this.jTemplateBlock, json[i]);
                this.initMenu(block);
                $("#favorite").append(block);
            };
                    },
        "getBlock": function(jTemplate, json){
            var list = json.list;
            var title = json.title;
            var jBlock = jTemplate.clone();
            var jListItem = jBlock.find("#list_item").clone();
            jBlock.find("#list_item").remove();
            jListItem.removeClass("even");
            var jItem = jListItem.find("#item").clone();
            jListItem.find("#item").remove();
            jBlock.find("#title").text(title);
            for (var i = 0; i < list.length; i++) {
                var type = list[i].type;
                var items = list[i].items;
                var jListItem2 = jListItem.clone();
                if (type) {
                    jListItem2.find("#type").text(type);
                }
                else {
                    jListItem2.find("#type").text("*");
                    jListItem2.find("#seperator").hide();
                    jListItem2.find("#type").hide();
                }
                jListItem2.find("#item_add").hide();
                for (var j = 0; j < items.length; j++) {
                    var link = items[j].link;
                    var name = items[j].name;
                    var prompt = items[j].prompt;
                    if (!link) 
                        link = "#";
                    if (!name) 
                        name = link;
                    if (!prompt) 
                        prompt = name;
                    var jItem2 = jItem.clone();
                    var jItem2link = jItem2.find("#a");
                    jItem2link.attr("href", link);
                    jItem2link.attr("title", prompt);
                    jItem2link.find("#item_name").text(name);
                    jListItem2.append(jItem2);
                    this.attachDragAndDrop(jItem2, jBlock);
                };
                jListItem2.append(jListItem2.find("#item_add"));
                jListItem2.droppable({
                    drop: handleItemDropEvent
                });
                jBlock.find("#list").append(jListItem2);
            };
            jBlock.find("#list #list_item:odd").addClass("even");
            var listItemAdd = jBlock.find("#list_item_add");
            jBlock.find("#list").append(listItemAdd);
            listItemAdd.hide();
            jBlock.find("#list").sortable({
                items: '#list_item',
                update: function(){
                    jBlock.find("#list #list_item:odd").addClass("even");
                    jBlock.find("#list #list_item:even").removeClass("even");
                }
            });
            return jBlock;
        },
        "initMenu": function(jBlock){
            var thiz = this;
			var control = jBlock.find("#control");
			control.hide();
			jBlock.find("#c_ok").hide();
			jBlock.hover(function(){
	            if (jBlock.attr("data-mode") == "edit") 
	                return;
				control.show();
			}, function(){
	            if (jBlock.attr("data-mode") == "edit") 
	                return;
				control.hide();
			});
			control.find("#c_delete").click(function(){
				jBlock.remove();
			});
            control.find("#c_edit").click(function(){
                thiz.onEditMode(jBlock);
				control.hide();
				jBlock.find("#c_ok").show();
            });
			jBlock.find("#c_ok").click(function(){
				thiz.onNormalMode(jBlock);
				$(this).hide();
				control.show();
			});
//            jMenu = jBlock.find("#menu");
//            jMenu.hover(function(){
//                $(this).children("#menu_items").slideDown(150);
//            }, function(){
//                $(this).children("#menu_items").slideUp(150);
//            });
//            jMenu.find("#menu_delete").click(function(){
//                thiz.onDeleteMode(jBlock);
//                jBlock.find("#menu").hide();
//                jBlock.find("#ok").show();
//            });
//            jMenu.find("#menu_edit").click(function(){
//                thiz.onEditMode(jBlock);
//                jBlock.find("#menu").hide();
//                jBlock.find("#ok").show();
//            });
//            jBlock.find("#ok").hide();
//            jBlock.find("#ok").click(function(){
//                thiz.onNormalMode(jBlock);
//            });
        },
        "onDeleteMode": function(jBlock){
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
        "onEditMode": function(jBlock){
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
            
            jBlock.find("#type").show();
            jBlock.find("#seperator").show();
            this.wrapIMenu(jBlock.find("#type"));
            
            var jListItemAdd = jBlock.find("#list_item_add");
            jListItemAdd.show();
            this.wrapIMenu(jListItemAdd.find("#list_item_add_item"));
            this.wrapIMenu(jBlock.find("#title"));
        },
        "onNormalMode": function(jBlock){
            var mode = jBlock.attr("data-mode");
            jBlock.attr("data-mode", "");
            
            jBlock.find("#ok").hide();
            jBlock.find("#menu").show();
            var jItem = jBlock.find("#item");
            
            var jLink = jItem.find("#a");
            this.activateLink(jLink);
            
            if (mode == "delete") {
                jItem.click(function(){
                });
            }
            else if (mode == "edit") {
                this.unwrapIMenu(jBlock.find("#item"));
                this.unwrapIMenu(jBlock.find("#item_add"));
                jBlock.find("#item_add").hide();
                this.unwrapIMenu(jBlock.find("#type"));
                
                jBlock.find("#type").each(function(){
					var t = $(this).text();
                    if (!t || t == "*") {
                        $(this).hide();
                        $(this).siblings("#seperator").hide();
                    }
                });
                jItem.unbind();
                this.attachDragAndDrop(jItem, jBlock);
                jBlock.find("#list_item_add").hide();
                this.unwrapIMenu(jBlock.find("#list_item_add_item"));
                this.unwrapIMenu(jBlock.find("#title"));
            }
        },
        "onDelete": function(jBlock, jElem){
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
        "onEdit": function(jElem){
            var jItem = jElem.find("#imenu_title").children(":first");
            var id = jItem.attr("id");
            if (id === "item") 
                this.onEditItem(jElem);
            else if (id === "item_add") 
                this.onEditItemAdd(jElem);
            else if (id === "type") 
                this.onEditItemType(jElem);
            else if (id === "list_item_add_item") 
                this.onEditListItemAdd(jElem);
            else if (id === "title") 
                this.onEditTitle(jElem);
        },
        "onEditItem": function(jElem){
            var thiz = this;
            var jItem = jElem.find("#item");
            var jLink = jItem.find("#a");
            var name = jLink.find("#item_name").text();
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
                jThisLink.find("#item_name").text(jElem.find("#imenu_item_name").val());
                jThisLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jThisLink.attr("title", jElem.find("#imenu_item_prompt").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditItemAdd": function(jElem){
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
                jNewLink.find("#item_name").text(jElem.find("#imenu_item_name").val());
                jNewLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jNewLink.attr("title", jElem.find("#imenu_item_prompt").val());
                
                jElem.after(jNewElem);
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditItemType": function(jElem){
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
        "onEditListItemAdd": function(jElem){
            var thiz = this;
            jElem.find("#tr_link").hide();
            jElem.find("#tr_prompt").hide();
            
            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click(function(){
                var itemType = jElem.find("#imenu_item_name").val();
                if (itemType) {
                    var jListItem2 = thiz.jTemplateBlock.find("#list_item").clone();
                    jListItem2.find("#item").remove();
                    jListItem2.find("#type").text(itemType);
                    thiz.wrapIMenu(jListItem2.find("#type"));
                    thiz.wrapIMenu(jListItem2.find("#item_add"));
                    jElem.parent().before(jListItem2);
                    
                    var jBlock = jElem.parents(".block");
                    jBlock.find("#list #list_item:odd").addClass("even");
                    jBlock.find("#list #list_item:even").removeClass("even");
                }
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditTitle": function(jElem){
            var jTitle = jElem.find("#title");
            var name = jTitle.text();
            jElem.find("#imenu_item_name").val(name);
            jElem.find("#tr_link").hide();
            jElem.find("#tr_prompt").hide();
            
            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click(function(){
                jTitle.text(jElem.find("#imenu_item_name").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click(function(){
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onImport": function(jBlock, json){
            var jBlock2 = this.getBlock(this.jTemplateBlock, json);
            jBlock.after(jBlock2);
            jBlock.remove();
        },
        "onExport": function(jBlock){
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
                    item.name = jLink.find("#item_name").text();
                    item.link = jLink.attr("href");
                    item.prompt = jLink.attr("title");
                    items.push(item);
                });
                list_item.items = items;
                list.push(list_item);
            });
            data.list = list;
            var value = $.toJSON(data);
            return value;
        },
        "wrapIMenu": function(jItem){
            var thiz = this;
            var jIMenu = $("#imenu").clone();
            jItem.wrap(jIMenu);
            var parent = jItem.parent();
            parent.each(function(){
                var menu_items = $(this).find("#imenu_items");
                var item = $(this).children(":last");
                var menu_title = $(this).find("#imenu_title");
                item.remove();
                menu_title.wrapInner(item);
            });
            parent.hover(function(){
                $(this).children("#imenu_items").slideDown(150);
                thiz.onEdit($(this));
            }, function(){
                $(this).children("#imenu_items").slideUp(150);
            });
            return parent;
        },
        "unwrapIMenu": function(jItem){
            jItem.unwrap();
            jItem.siblings().remove();
            jItem.unwrap();
        },
        "inactivateLink": function(jLink){
            jLink.each(function(){
                var href = $(this).attr("href");
                $(this).attr("data-href", href);
                $(this).attr("href", "#");
            });
        },
        "activateLink": function(jLink){
            jLink.each(function(){
                var href = $(this).attr("data-href");
                $(this).attr("href", href);
                $(this).removeAttr("data-href");
            });
        },
        "attachDragAndDrop": function(jItem, jBlock){
            jItem.draggable({
                containment: jBlock,
                revert: true
            });
            jItem.droppable({
                drop: handleItemDropEvent
            });
        },
        "swapItem": function(jItem1, jItem2){
            var placeHolder = $("<div/>");
            jItem1.before(placeHolder);
            jItem2.after(jItem1);
            placeHolder.after(jItem2);
            placeHolder.remove();
        },
        "test": function(){
        },
        "go": function(){
            this.init();
            this.load(FAVORITE_DATA);
            checkLogin();
        }
    }
    window.Favorite = Favorite;
})();
window.Favorite.go();
window.Favorite.test();
