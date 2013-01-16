/* Author:
 */
ApplicationID = "Hku4WXToAqKzCQ9ALyIVi9yJMY2x3TJ7wb0XK8zB";
JavascriptKey = "aAKd8J7Diq0XylBNzKFpjWdqEHyolBJHNoqjxBzO";
Parse.initialize(ApplicationID, JavascriptKey);

$.fn.spin = function(opts) {
    this.each( function() {
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
(function() {
    var TEST = false;
    var DEF_FAV_ICON = "http://2.su.bdimg.com/icon/1.png";
    var LOAD_ICON = true;
    var TYPE_DEFAULT_SYMBOL = "*";

    var TEST_DATA = '[    {        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "link": "http://mail.google.com/",                        "prompt": ""                    }                ]            },            {                "type": "博客",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "社交",                "items": [                    {                        "name": "新浪微博",                        "link": "http://weibo.com/",                        "prompt": ""                    },                    {                        "name": "人人网",                        "link": "http://www.renren.com/",                        "prompt": ""                    },                    {                        "name": "QQ空间",                        "link": "http://qzone.qq.com/",                        "prompt": ""                    },                    {                        "name": "开心网",                        "link": "http://www.kaixin001.com/",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "谷歌新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    },                    {                        "name": "新浪",                        "link": "http://www.sina.com.cn/",                        "prompt": ""                    },                    {                        "name": "凤凰网",                        "link": "http://www.ifeng.com/",                        "prompt": ""                    },                    {                        "name": "腾讯",                        "link": "http://www.qq.com/",                        "prompt": ""                    },                    {                        "name": "网易",                        "link": "http://www.163.com/",                        "prompt": ""                    }                ]            },            {                "type": "购物",                "items": [                    {                        "name": "淘宝",                        "link": "http://www.taobao.com/",                        "prompt": ""                    },                    {                        "name": "京东",                        "link": "http://www.360buy.com/",                        "prompt": ""                    },                    {                        "name": "亚马逊",                        "link": "http://www.amazon.cn/",                        "prompt": ""                    },                    {                        "name": "凡客",                        "link": "http://www.vancl.com/",                        "prompt": ""                    },                    {                        "name": "1号店",                        "link": "http://www.yihaodian.com/",                        "prompt": ""                    }                ]            }        ]    },    {        "title": "娱乐",        "list": [            {                "type": "影视",                "items": [                    {                        "name": "YouKu",                        "link": "http://www.youku.com/",                        "prompt": ""                    },                    {                        "name": "奇异",                        "link": "http://www.iqiyi.com/",                        "prompt": ""                    },                    {                        "name": "土豆",                        "link": "http://www.tudou.com/",                        "prompt": ""                    },                    {                        "name": "迅雷看看",                        "link": "http://www.xunlei.com/",                        "prompt": ""                    }                ]            },            {                "type": "音乐",                "items": [                    {                        "name": "百度MP3",                        "link": "http://mp3.baidu.com/",                        "prompt": ""                    },                    {                        "name": "QQ音乐",                        "link": "http://y.qq.com/",                        "prompt": ""                    }                ]            },            {                "type": "游戏",                "items": [                    {                        "name": "三国杀",                        "link": "http://www.sanguosha.com/",                        "prompt": ""                    },                    {                        "name": "4399游戏",                        "link": "http://www.4399.com/",                        "prompt": ""                    }                ]            }        ]    },{        "title": "常用",        "list": [            {                "type": "谷歌",                "items": [                    {                        "name": "GReader",                        "link": "https://www.google.com/reader/view",                        "prompt": ""                    },                    {                        "name": "GMail",                        "link": "http://mail.google.com/",                        "prompt": ""                    }                ]            },            {                "type": "博客",                "items": [                    {                        "name": "j_fo blog",                        "link": "http://hi.baidu.com/j_fo/blog",                        "prompt": ""                    }                ]            },            {                "type": "社交",                "items": [                    {                        "name": "新浪微博",                        "link": "http://weibo.com/",                        "prompt": ""                    },                    {                        "name": "人人网",                        "link": "http://www.renren.com/",                        "prompt": ""                    },                    {                        "name": "QQ空间",                        "link": "http://qzone.qq.com/",                        "prompt": ""                    },                    {                        "name": "开心网",                        "link": "http://www.kaixin001.com/",                        "prompt": ""                    }                ]            },            {                "type": "资讯",                "items": [                    {                        "name": "谷歌新闻",                        "link": "http://news.google.com.hk/",                        "prompt": ""                    },                    {                        "name": "新浪",                        "link": "http://www.sina.com.cn/",                        "prompt": ""                    },                    {                        "name": "凤凰网",                        "link": "http://www.ifeng.com/",                        "prompt": ""                    },                    {                        "name": "腾讯",                        "link": "http://www.qq.com/",                        "prompt": ""                    },                    {                        "name": "网易",                        "link": "http://www.163.com/",                        "prompt": ""                    }                ]            },            {                "type": "购物",                "items": [                    {                        "name": "淘宝",                        "link": "http://www.taobao.com/",                        "prompt": ""                    },                    {                        "name": "京东",                        "link": "http://www.360buy.com/",                        "prompt": ""                    },                    {                        "name": "亚马逊",                        "link": "http://www.amazon.cn/",                        "prompt": ""                    },                    {                        "name": "凡客",                        "link": "http://www.vancl.com/",                        "prompt": ""                    },                    {                        "name": "1号店",                        "link": "http://www.yihaodian.com/",                        "prompt": ""                    }                ]            }        ]    },    {        "title": "娱乐",        "list": [            {                "type": "影视",                "items": [                    {                        "name": "YouKu",                        "link": "http://www.youku.com/",                        "prompt": ""                    },                    {                        "name": "奇异",                        "link": "http://www.iqiyi.com/",                        "prompt": ""                    },                    {                        "name": "土豆",                        "link": "http://www.tudou.com/",                        "prompt": ""                    },                    {                        "name": "迅雷看看",                        "link": "http://www.xunlei.com/",                        "prompt": ""                    }                ]            },            {                "type": "音乐",                "items": [                    {                        "name": "百度MP3",                        "link": "http://mp3.baidu.com/",                        "prompt": ""                    },                    {                        "name": "QQ音乐",                        "link": "http://y.qq.com/",                        "prompt": ""                    }                ]            },            {                "type": "游戏",                "items": [                    {                        "name": "三国杀",                        "link": "http://www.sanguosha.com/",                        "prompt": ""                    },                    {                        "name": "4399游戏",                        "link": "http://www.4399.com/",                        "prompt": ""                    }                ]            }        ]    }]';
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
    var API = new API_parse();
              //new API_sina();
              //new API_offline();


    // var BlobBuilder = BlobBuilder || WebKitBlobBuilder || MozBlobBuilder;
    // var URL = URL || webkitURL || window;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

    function handleItemDropEvent(event, ui) {
        var offsetXPos = parseInt(ui.offset.left);
        var offsetYPos = parseInt(ui.offset.top);
        var draggable = ui.draggable;
        var droppable = $(this);
        var id = droppable.attr('id');
        if (id === 'item') {
            droppable.after(draggable);
            draggable.attr("style", "position:relative;");
        } else if (id === 'list_item') {
            // droppable.append(draggable);
            droppable.find("#item_add").before(draggable);
        }
    }

    function showDialog(jDialog) {
        // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
        jDialog.dialog("destroy");

        var name = jDialog.find("#name");
        var password = jDialog.find("#password");
        var password2 = jDialog.find("#password2");
        var allFields = $([]).add(name).add(password).add(password2);
        var tips = jDialog.find("#validateTips");
        var progress = jDialog;

        function updateTips(t) {
            tips.text(t).addClass("ui-state-highlight").show();
            setTimeout( function() {
                tips.removeClass("ui-state-highlight");
            }, 1500);
        }

        function checkLength(o, n, min, max) {
            if (o.val().length > max || o.val().length < min) {
                o.addClass("ui-state-error");
                updateTips("Length of " + n + " must be between " +
                min +
                " and " +
                max +
                ".");
                return false;
            } else {
                return true;
            }
        }

        function checkRegexp(o, regexp, n) {
            if (!(regexp.test(o.val()))) {
                o.addClass("ui-state-error");
                updateTips(n);
                return false;
            } else {
                return true;
            }
        }

        function checkPassword(p1, p2, n) {
            if (p1.val() != p2.val()) {
                p2.addClass("ui-state-error");
                updateTips(n);
                return false;
            } else {
                return true;
            }
        }

        $("#dialog-register").dialog({
            autoOpen: false,
            width: 300,
            height: 300,
            modal: true,
            buttons: {
                "注册": function() {
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
                        register(name.val(), password.val(), function(ret) {
                            progress.data('spinner').stop();
                            updateTips("注册失败，请重试");
                            log(ret);
                        }, function(ret) {
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
                "取消": function() {
                    $(this).dialog("close");
                }
            },
            close: function() {
                allFields.val("").removeClass("ui-state-error");
            }
        });
        $("#dialog-register").keyup(function(e){
            if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find('button:first').click();
            }
        });

        $("#dialog-login").dialog({
            autoOpen: false,
            width: 300,
            height: 240,
            modal: true,
            buttons: {
                "登录": function() {
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
                        login(name.val(), password.val(), function(ret) {
                            progress.data('spinner').stop();
                            updateTips("登录失败，请重试");
                            log(ret);
                        }, function(ret) {
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
                "取消": function() {
                    $(this).dialog("close");
                }
            }
        });
        $("#dialog-login").keyup(function(e){
            if (e.keyCode == $.ui.keyCode.ENTER) {
                $(this).parent().find('button:first').click();
            }
        });

        var selectedFile;
        $("#dialog-import").dialog({
            autoOpen: false,
            width: 400,
            height: 240,
            modal: true,
            buttons: {
                "上传": function() {
                    var thiz = this;
                    tips.hide();
                    allFields.removeClass("ui-state-error");

                    var file = selectedFile;
                    var reader = new FileReader();
                    reader.onload = function() {
                        var json = this.result;
                        $.jStorage.set(KEY_FAVORITE_DATA, json);
                        FAVORITE_DATA = json;
                        fillUI();

                        API.doUpdateFavorite({
                            data: json,
                            user: USER_ID,
                            token: TOKEN
                        }).error( function(ret) {
                            log(ret);
                            updateTips("很抱歉，导入失败，请重试...");
                        }).success( function(ret) {
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
                "取消": function() {
                    $(this).dialog("close");
                }
            },
            open: function(event, ui) {
                $("#datafile").on("change", function(event) {
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

    function register(name, password, onError, onSuccess) {
        var passwdMd5 = password;
        if (API instanceof API_sina)
            passwdMd5 = $.md5(password);
        API.doRegister({
            account: name,
            password: passwdMd5
        }).error(onError).success( function(ret) {
            var errCode = onSuccess(ret);
            if (errCode == 0) {
                getToken(name, password, function() {
                }, function() {
                    insertFavorite();
                });
            }
        });
    }

    function login(name, password, onError, onSuccess) {
        getToken(name, password, onError, function(ret) {
            var errCode = onSuccess(ret);
            if (errCode == 0)
                checkLogin();
        });
    }

    function getToken(name, password, onError, onSuccess) {
        API.doLogin({
            account: name,
            password: password
        }).error(onError).success( function(ret) {
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

    function logout() {
        var token = TOKEN;
        clearUI();
        $.jStorage.flush();
        USER_ID = "";
        USER_NAME = "";
        FAVORITE_DATA = TEST_DATA;
        TOKEN = "";
        API.doLogout({
            token: token
        }).error( function(ret) {
            log(ret);
        }).success( function(ret) {
            log(ret);
        });
        // location.reload();
    }

    function insertFavorite() {
        API.doInsertFavorite({
            data: TEST_DATA,
            dataType: "json",
            user: USER_ID,
            token: TOKEN
        }).error( function(ret) {
            log(ret);
        }).success( function(ret) {
            log(ret);
            checkLogin();
        });
    }

    function checkLogin() {
        if (!USER_ID || !TOKEN) {
            clearUI();
            return;
        }
        fillUI();
        API.doGetFavorite({
            user: USER_ID,
            token: TOKEN
        }).error( function(ret) {
            log(ret);
            clearUI();
        }).success( function(ret) {
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

    function sync() {
        var thiz = Favorite;
        var arr = [];
        $("#favorite").find(".block").each( function() {
            var s = thiz.onExport($(this));
            arr = arr.concat(s);
        });
        var json = "[" + arr.join(",") + "]";
        API.doUpdateFavorite({
            data: json,
            user: USER_ID,
            token: TOKEN
        }).error( function(ret) {
            log(ret);
            alert("sync fail. " + ret);
        }).success( function(ret) {
            log(ret);
            var objRet = $.evalJSON(ret);
            if (!objRet || objRet.err_code != 0 || !objRet.data) {
                alert("sync fail. " + ret);
                return;
            }
            alert("sync success. ");
        });
    }

    function clearUI() {
        $("#nav_user_name").text("");
        $("#nav_profile #guest").show();
        $("#nav_profile #user").hide();
        Favorite.load(TEST_DATA);
    }

    function fillUI() {
        $("#nav_user_name").text(USER_NAME);
        $("#nav_profile #guest").hide();
        $("#nav_profile #user").show();
        Favorite.load(FAVORITE_DATA);
    }


    function API_sina() {
        var HOST = TEST ? "http://127.0.0.1" : "http://justlog.sinaapp.com";
        var URL_USER_INSERT = HOST + "/api/user/insert/";
        var URL_GET_TOKEN = HOST + "/api/user/get_token/";
        var URL_LOGOUT = HOST + "/api/user/logout/";
        var URL_FAV_INSERT = HOST + "/api/http_address/insert/";
        var URL_FAV_LIST = HOST + "/api/http_address/list/";
        var URL_FAV_UPDATE = HOST + "/api/http_address/update/";

        $.extend(API_sina.prototype, {
            doRegister : function(params) {
                return $.post(URL_USER_INSERT, params);
            },

            doLogin : function(params) {
                return $.post(URL_GET_TOKEN, params);
            },

            doLogout : function(params) {
                return $.post(URL_LOGOUT, params);
            },

            doInsertFavorite : function(params) {
                return $.post(URL_FAV_INSERT, params);
            },

            doGetFavorite : function(params) {
                return $.post(URL_FAV_LIST, params);
            },

            doUpdateFavorite : function(params) {
                return $.post(URL_FAV_UPDATE, params);
            }
        });

        function Dummy() {}
        Dummy.prototype = API_sina.prototype;
        return new Dummy();
    }

    function wrapDeferred(defer) {
        return $.extend(defer.promise(), {
            success : defer.done,
            error : defer.fail
        });
    }

    function API_parse() {
        var Favorite = Parse.Object.extend("Favorite");
        var F_USER = 1, 
            F_FAVORITE_DATA = 2;
        var T_ERROR = 1,
            T_REGISTER_SUCCESS = 2,
            T_LOGIN_SUCCESS = 3,
            T_INSERT_FAVORITE_DATA = 4,
            T_GET_FAVORITE_DATA = 5,
            T_UPDATE_FAVORITE_DATA = 6;

        function from(type, params) {
            switch (type) {
                case F_USER:
                    return {
                        username : params.account,
                        password : params.password
                    };
                case F_FAVORITE_DATA:
                    return {
                        data : params.data
                    };
            }
        }

        function to(type, obj) {
            switch (type) {
                case T_ERROR:
                    // {"err_code":10004,"err_msg":"DATABASE ERROR "}
                    return $.toJSON({
                        err_code : obj.code,
                        err_msg : obj.message
                    });
                case T_REGISTER_SUCCESS:
                    // {"err_code":"0","err_msg":"success","data":
                    // [{"id":"25","account":"aaa","password":"123456"}]}
                    return $.toJSON({
                        err_code : 0,
                        err_msg : "success",
                        data : [{
                            id : obj.id,
                            account : obj.getUsername(),
                            password : obj.changed.password
                        }]
                    });
                case T_LOGIN_SUCCESS:
                    // {"err_code":"0","err_msg":"success","data":
                    // {"token":"98fddc227b264275d792ec2f1384997f","uid":"13"}}
                    return $.toJSON({
                        err_code : 0,
                        err_msg : "success",
                        data : {
                            uid : obj.id,
                            token : obj._sessionToken
                        }
                    });
                case T_INSERT_FAVORITE_DATA:
                    // {"err_code":"0","err_msg":"success","data":
                    // [{"id":"56","user":"1(userId)","data":"abc","time":"2012-11-29 18:40:10"}]}
                    return $.toJSON({
                        err_code : 0,
                        err_msg : "success",
                        data : [{
                            id : obj.id,
                            user : Parse.User.current().id,
                            data : obj.changed.data,
                            time : obj.createdAt
                        }]
                    });
                case T_GET_FAVORITE_DATA:
                    if (!obj)
                        return '{"err_code":"0","err_msg":"success","data":null}';
                    // "{"err_code":"0","err_msg":"success","data":
                    // {"items":[{"id":"45","user":"13(userId)","data":"...json...","time":"2012-05-23 10:47:27"}],
                    // "max_id":"45","min_id":"45"}}"
                    return $.toJSON({
                        err_code : 0,
                        err_msg : "success",
                        data : {
                            items : [{
                                id : obj.id,
                                user : Parse.User.current().id,
                                data : obj.attributes.data,
                                time : obj.updatedAt
                            }],
                            max_id : obj.id,
                            min_id : obj.id
                        }
                    });
                case T_UPDATE_FAVORITE_DATA:
                    // "{"err_code":"0","err_msg":"success","data":
                    // [{"id":"45","user":"13(userId)","data":"...json...","time":"2012-05-23 10:47:27"}]}"
                    return $.toJSON({
                        err_code : 0,
                        err_msg : "success",
                        data : [{
                            id : obj.id,
                            user : Parse.User.current().id,
                            data : obj.attributes.data,
                            time : obj.updatedAt
                        }]
                    });
            }
        }

        $.extend(API_parse.prototype, {
            doRegister : function(params) {
                var defer = $.Deferred();
                var user = new Parse.User();
                user.set(from(F_USER, params));
                user.signUp(null, {
                    success : function(user) {
                        defer.resolve(to(T_REGISTER_SUCCESS, user));
                    },
                    error : function(user, error) {
                        defer.reject(to(T_ERROR, error));
                    }
                });
                return wrapDeferred(defer);
            },

            doLogin : function(params) {
                var defer = $.Deferred();
                var user = new Parse.User();
                user.set(from(F_USER, params));
                user.logIn({
                    success : function(user) {
                        defer.resolve(to(T_LOGIN_SUCCESS, user));
                    },
                    error : function(user, error) {
                        defer.reject(to(T_ERROR, error));
                    }
                });
                return wrapDeferred(defer);
            },

            doLogout : function(params) {
                var defer = $.Deferred();
                Parse.User.logOut();
                defer.resolve("logout success.");
                return wrapDeferred(defer);
            },

            doInsertFavorite : function(params) {
                var defer = $.Deferred();
                var fav = new Favorite();
                fav.set(from(F_FAVORITE_DATA, params));
                fav.setACL(new Parse.ACL(Parse.User.current()));
                fav.save(null, {
                    success : function(fav) {
                        defer.resolve(to(T_INSERT_FAVORITE_DATA, fav));
                    },
                    error : function(fav, error) {
                        defer.reject(to(T_ERROR, error));
                    }
                });
                return wrapDeferred(defer);
            },

            doGetFavorite : function(params) {
                var defer = $.Deferred();
                var query = new Parse.Query(Favorite);
                query.find({
                    success: function(results) {
                        var fav = results[0];
                        if (!fav) {
                            defer.resolve('{"err_code":"0","err_msg":"success","data":null}');
                        } else {
                            defer.resolve(to(T_GET_FAVORITE_DATA, fav));
                        }
                    },
                    error: function(error) {
                        defer.reject(to(T_ERROR, error));
                    }
                })
                return wrapDeferred(defer);
            },

            doUpdateFavorite : function(params) {
                var defer = $.Deferred();
                var query = new Parse.Query(Favorite);
                query.find({
                    success: function(results) {
                        var fav = results[0];
                        fav.set(from(F_FAVORITE_DATA, params));
                        fav.save(null, {
                            success: function(fav) {
                                defer.resolve(to(T_UPDATE_FAVORITE_DATA, fav));
                            },
                            error: function(fav, error) {
                                defer.reject(to(T_ERROR, error));
                            }
                        });
                    },
                    error: function(error) {
                        defer.reject(to(T_ERROR, error));
                    }
                }); 
                return wrapDeferred(defer);
            }
        });

        function Dummy() {}
        Dummy.prototype = API_parse.prototype;
        return new Dummy();    }

    function API_offline() {
        var USER_ID_LOCAL = "local";
        var TOKEN_LOCAL = "local";

        $.extend(API_offline.prototype, {
            doRegister : function(params) {
                var defer = $.Deferred();
                defer.reject();
                return wrapDeferred(defer);
            },

            doLogin : function(params) {
                var defer = $.Deferred();
                defer.resolve($.toJSON({
                    err_code : 0,
                    err_msg : "success",
                    data : {
                        uid : USER_ID_LOCAL,
                        token : TOKEN_LOCAL
                    }
                }));
                return wrapDeferred(defer);
            },

            doLogout : function(params) {
                var defer = $.Deferred();
                defer.resolve();
                return wrapDeferred(defer);
            },

            doInsertFavorite : function(params) {
                var defer = $.Deferred();
                defer.reject();
                return wrapDeferred(defer);
            },

            doGetFavorite : function(params) {
                var defer = $.Deferred();
                var arr = [];
                $("#favorite").find(".block").each( function() {
                    var s = Favorite.onExport($(this));
                    arr = arr.concat(s);
                });
                var json = "[" + arr.join(",") + "]";
                log(json);
                defer.resolve($.toJSON({
                    err_code : 0,
                    err_msg : "success",
                    data : {
                        items : [{
                            id : -1,
                            user : USER_ID_LOCAL,
                            data : json,
                            time : new Date().toLocaleString()
                        }]
                    }
                }));
                return wrapDeferred(defer);
            },

            doUpdateFavorite : function(params) {
                var defer = $.Deferred();
                defer.reject("Not supported in offline mode");
                return wrapDeferred(defer);
            }
        });

        function Dummy() {}
        Dummy.prototype = API_offline.prototype;
        return new Dummy();
    }


    var Favorite = {
        "jTemplateBlock": null,
        "jTemplateBlockGroup": null,
        "jTemplateIMenu": null,
        "jTemplateBlockJson": '{"title": "新分组","list": [{"type": "新类别","items": [{"name": "新浪微博","link": "https://weibo.com/","prompt": "新浪微博"}]}]}',
        "lastItemEdited": null,
        "init": function() {
            this.initUI();
        },
        "initUI": function() {
            if (this.jTemplateBlock === null) {
                this.jTemplateBlock = $("#block");
                this.jTemplateBlock.show();
            }
            if (this.jTemplateBlockGroup === null) {
                this.jTemplateBlockGroup = $("#block_group");
            }
            if (this.jTemplateIMenu === null) {
                this.jTemplateIMenu = $("#imenu");
            }
            $("#imenu").remove();
            $("#block_group").remove();
            $("#block").remove();
            this.initFavoriteMenu();
        },
        "initFavoriteMenu": function() {
            var thiz = this;
            var jFavoriteMenu = $("#favorite_menu");
            jFavoriteMenu.hover( function() {
                $(this).children("#menu_items").slideDown(150);
            }, function() {
                $(this).children("#menu_items").slideUp(150);
            });
            jFavoriteMenu.find("#menu_import").click( function() {
            });
            jFavoriteMenu.find("#menu_export").click( function() {
            });
            var jNavItem = $("#nav_profile");
            jNavItem.hover( function() {
                $(this).children("#menu_items").slideDown(150);
            }, function() {
                $(this).children("#menu_items").slideUp(150);
            });
            jNavItem.find(".menu_item").click( function() {
                jNavItem.children("#menu_items").slideUp(150);
            });
            jNavItem.find("#login").click( function() {
                showDialog($("#dialog-login"));
            });
            jNavItem.find("#register").click( function() {
                showDialog($("#dialog-register"));
            });
            jNavItem.find("#logout").click( function() {
                logout();
            });
            jNavItem.find("#sync").click( function() {
                sync();
            });
            jNavItem.find("#import").click( function() {
                showDialog($("#dialog-import"));
            });
            jNavItem.find("#export").click( function() {
                API.doGetFavorite({
                    user: USER_ID,
                    token: TOKEN
                }).error( function(ret) {
                    log(ret);
                    alert("抱歉，导出失败，请重试...");
                }).success( function(ret) {
                    log(ret);
                    var objRet = $.evalJSON(ret);
                    if (!objRet || objRet.err_code != 0 || !objRet.data) {
                        alert("抱歉，导出失败，请重试...");
                    }
                    var data = objRet.data.items[0].data;
                    var json = data;
                    log(json);
                    var bb = new BlobBuilder;
                    bb.append(json);
                    saveAs(bb.getBlob("text/plain;charset=utf-8"), "favorite.json");
                });
            });
            $("#add_block").click( function() {
                var jBlock = thiz.getBlock(thiz.jTemplateBlock, $.evalJSON(thiz.jTemplateBlockJson));
                thiz.initMenu(jBlock);
                $("#block_group").append(jBlock);
            });
        },
        "load": function(json) {
            $("#block_group").remove();
            $("#favorite").prepend(this.jTemplateBlockGroup.clone());
            var jBlockGroup = $("#block_group");
            if (typeof json === "string")
                json = $.evalJSON(json);
            for (var i = 0; i < json.length; i++) {
                var block = this.getBlock(this.jTemplateBlock, json[i]);
                this.initMenu(block);
                jBlockGroup.append(block);
            };
            jBlockGroup.sortable({
                items: '#block',
                start: function(event, ui){
                    ui.item.parent().masonry('reload');
                },
                change: function(event, ui){
                    ui.item.parent().masonry('reload');
                },
                stop: function(event, ui){
                    ui.item.parent().masonry('reload');
                }
            });
            jBlockGroup.masonry({itemSelector:'#block'});
        },
        "getBlock": function(jTemplate, json) {
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
                } else {
                    jListItem2.find("#type").text(TYPE_DEFAULT_SYMBOL);
                    // jListItem2.find("#seperator").hide();
                    // jListItem2.find("#type").hide();
                    jListItem2.find("#seperator").css("display", "none");
                    jListItem2.find("#type").css("display", "none");
                }
                var jItemAdd = jListItem2.find("#item_add");
                // jItemAdd.hide();
                jItemAdd.css("display", "none");
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
                    var favicon = this.getHost(link);
                    if (favicon)
                        favicon += "/favicon.ico";
                    else
                        favicon = DEF_FAV_ICON;
                    if (!LOAD_ICON)
                        favicon = DEF_FAV_ICON;
                    var jItem2 = jItem.clone();
                    var jItem2link = jItem2.find("#a");
                    jItem2link.attr("href", link);
                    jItem2link.attr("title", prompt);
                    jItem2link.find("#item_name").text(name);
                    jItem2link.find("img").attr("src", favicon);
                    // jItem2.find("#control_edit").hide();
                    // jItem2.find("#control_delete").hide();
                    jItem2.find("#control_edit").css("display", "none");
                    jItem2.find("#control_delete").css("display", "none");
                    jItemAdd.before(jItem2);
                    this.attachDragAndDrop(jItem2, jBlock);
                };
                jItemAdd.parent().append(jItemAdd);
                // initRowDelete here
                var jItemRowDelete = jListItem2.find("#row_delete");
                jItemRowDelete.click(function(){
                    $(this).parents("#list_item").remove();
                    jBlock.find("#list #list_item:odd").addClass("even");
                    jBlock.find("#list #list_item:even").removeClass("even");
                });
                jListItem2.hover(function(){
                    $(this).find("#row_delete").css("display", "");
                }, function(){
                    $(this).find("#row_delete").css("display", "none");
                });
                jListItem2.droppable({
                    drop: handleItemDropEvent
                });
                jBlock.find("#list").append(jListItem2);
            };
            jBlock.find("#list #list_item:odd").addClass("even");
            var listItemAdd = jBlock.find("#list_item_add");
            jBlock.find("#list").append(listItemAdd);
            // listItemAdd.hide();
            listItemAdd.css("display", "none");
            if (list.length > 10) {
                var listItemAdd2 = listItemAdd.clone();
                jBlock.find("#list").prepend(listItemAdd2);
                // listItemAdd2.hide();
                listItemAdd2.css("display", "none");
            }
            jBlock.find("#list").sortable({
                items: '#list_item',
                update: function() {
                    jBlock.find("#list #list_item:odd").addClass("even");
                    jBlock.find("#list #list_item:even").removeClass("even");
                }
            });
            return jBlock;
        },
        "initMenu": function(jBlock) {
            var thiz = this;
            var control = jBlock.find("#control");
            control.hide();
            jBlock.find("#c_ok").hide();
            jBlock.hover( function() {
                if (jBlock.attr("data-mode") == "edit")
                    return;
                control.show();
            }, function() {
                if (jBlock.attr("data-mode") == "edit")
                    return;
                control.hide();
            });
            control.find("#c_delete").click( function() {
                jBlock.remove();
            });
            control.find("#c_edit").click( function() {
                thiz.onEditMode(jBlock);
                control.hide();
                jBlock.find("#c_ok").show();
            });
            jBlock.find("#c_ok").click( function() {
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
        "onDeleteMode": function(jBlock) {
            if (jBlock.attr("data-mode") == "delete")
                return;
            jBlock.attr("data-mode", "delete");

            var thiz = this;
            var jItem = jBlock.find("#item");
            jItem.click( function() {
                thiz.onDelete(jBlock, $(this));
            });
            var jLink = jItem.find("#a");
            this.inactivateLink(jLink);
        },
        "onEditMode": function(jBlock) {
            var thiz = this;

            if (jBlock.attr("data-mode") == "edit")
                return;
            jBlock.attr("data-mode", "edit");

            var jItem = jBlock.find("#item");
            jItem.addClass("dotted_border");
            // jItem.find("#control_edit").show();
            // jItem.find("#control_delete").show();
            jItem.find("#control_edit").css("display", "");
            jItem.find("#control_delete").css("display", ""); 

            var jLink = jItem.find("#a");
            this.inactivateLink(jLink);

            this.wrapIMenu(jItem);
            var jItemAdd = jBlock.find("#item_add");
            // jItemAdd.show();
            jItemAdd.css("display", "");

            this.wrapIMenu(jItemAdd);

            // jBlock.find("#type").show();
            // jBlock.find("#seperator").show();
            jBlock.find("#type").css("display", "");
            jBlock.find("#seperator").css("display", "");

            this.wrapIMenu(jBlock.find("#item_box_type"));

            var jListItemAdd = jBlock.find("#list_item_add");
            // jListItemAdd.show();
            jListItemAdd.css("display", "");

            this.wrapIMenu(jListItemAdd.find("#list_item_add_item"));
            this.wrapIMenu(jBlock.find("#title"));

            jItem.each(function() {
                var item = $(this);
                var jElem = item.parents("#imenu");
                item.find("#control_edit").unbind();
                item.find("#control_edit").click(function() {
                    if (thiz.lastItemEdited != null)
                        thiz.lastItemEdited.children("#imenu_items").slideUp(150);
                    jElem.children("#imenu_items").slideDown(150);
                    thiz.lastItemEdited = jElem;
                    thiz.onEdit(jElem);
                });
                item.find("#control_delete").unbind();
                item.find("#control_delete").click(function() {
                    if (thiz.lastItemEdited != null)
                        thiz.lastItemEdited.children("#imenu_items").slideUp(150);
                    thiz.onDelete(jBlock, item);
                });
            }); 
            $("#block_group").masonry({itemSelector:'#block'});
        },
        "onNormalMode": function(jBlock) {
            var mode = jBlock.attr("data-mode");
            jBlock.attr("data-mode", "");

            // jBlock.find("#ok").hide();
            // jBlock.find("#menu").show();
            jBlock.find("#ok").css("display", "none");
            jBlock.find("#menu").css("display", "");
            var jItem = jBlock.find("#item");
            jItem.removeClass("dotted_border");

            var jLink = jItem.find("#a");
            this.activateLink(jLink);

            if (mode == "delete") {
                jItem.click( function() {
                });
            } else if (mode == "edit") {
                this.unwrapIMenu(jBlock.find("#item"));
                this.unwrapIMenu(jBlock.find("#item_add"));
                // jBlock.find("#item_add").hide();
                jBlock.find("#item_add").css("display", "none");
                this.unwrapIMenu(jBlock.find("#item_box_type"));

                jBlock.find("#list_item").each(function(){
                    var jListItem = $(this);
                    var jType = jListItem.find("#type");
                    var jSeperator = jListItem.find("#seperator");
                    if (!jType.text() || jType.text() == TYPE_DEFAULT_SYMBOL) {
                        // jType.hide();
                        // jSeperator.hide();
                        jType.css("display", "none");
                        jSeperator.css("display", "none");
                    }
                    jListItem.unbind();
                    jListItem.hover(function(){
                        $(this).find("#row_delete").css("display", "");
                    }, function(){
                        $(this).find("#row_delete").css("display", "none");
                    });
                    jListItem.droppable({
                        drop: handleItemDropEvent
                    });
                });
                jItem.unbind();
                this.attachDragAndDrop(jItem, jBlock);
                var jListItemAdd = jBlock.find("#list_item_add");
                // jListItemAdd.hide();
                jListItemAdd.css("display", "none");
                if (jListItemAdd.length == 2) {
                    var jList = jBlock.find("#list");
                    jList.prepend(jListItemAdd[0]);
                    jList.append(jListItemAdd[1]);
                }
                this.unwrapIMenu(jBlock.find("#list_item_add_item"));
                this.unwrapIMenu(jBlock.find("#title"));

                // jItem.find("#control_edit").hide();
                // jItem.find("#control_delete").hide();
                jItem.find("#control_edit").css("display", "none");
                jItem.find("#control_delete").css("display", "none");
            }
            $("#block_group").masonry({itemSelector:'#block'});
        },
        "onDelete": function(jBlock, jItem) {
            if (jItem.attr("id") == "item") {
                var jParentListItem = jItem.parent();
                jItem.remove();
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
            else if (id === "item_box_type")
                this.onEditItemType(jElem);
            else if (id === "list_item_add_item")
                this.onEditListItemAdd(jElem);
            else if (id === "title")
                this.onEditTitle(jElem);
        },
        "onEditItem": function(jElem) {
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
            btnOk.click( function() {
                var jThisLink = jElem.find("#a");
                jThisLink.find("#item_name").text(jElem.find("#imenu_item_name").val());
                jThisLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jThisLink.attr("title", jElem.find("#imenu_item_prompt").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click( function() {
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditItemAdd": function(jElem) {
            var thiz = this;
            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click( function() {
                var jNewItem = thiz.jTemplateBlock.find("#item").clone();
                var jNewElem = thiz.wrapIMenu(jNewItem);

                var jNewLink = jNewElem.find("#a");
                thiz.inactivateLink(jNewLink);
                jNewLink.find("#item_name").text(jElem.find("#imenu_item_name").val());
                jNewLink.attr("data-href", jElem.find("#imenu_item_link").val());
                jNewLink.attr("title", jElem.find("#imenu_item_prompt").val());

                jElem.before(jNewElem);
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click( function() {
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
            btnOk.click( function() {
                jItemType.text(jElem.find("#imenu_item_name").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click( function() {
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditListItemAdd": function(jElem) {
            var thiz = this;
            jElem.find("#tr_link").hide();
            jElem.find("#tr_prompt").hide();

            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click( function() {
                var itemType = jElem.find("#imenu_item_name").val();
                if (itemType) {
                    var jListItem2 = thiz.jTemplateBlock.find("#list_item").clone();
                    jListItem2.find("#item").remove();
                    jListItem2.find("#type").text(itemType);
                    thiz.wrapIMenu(jListItem2.find("#item_box_type"));
                    thiz.wrapIMenu(jListItem2.find("#item_add"));
                    jElem.parent().before(jListItem2);

                    var jBlock = jElem.parents(".block");
                    jBlock.find("#list #list_item:odd").addClass("even");
                    jBlock.find("#list #list_item:even").removeClass("even");
                }
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click( function() {
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onEditTitle": function(jElem) {
            var jTitle = jElem.find("#title");
            var name = jTitle.text();
            jElem.find("#imenu_item_name").val(name);
            jElem.find("#tr_link").hide();
            jElem.find("#tr_prompt").hide();

            var btnOk = jElem.find("#imenu_ok");
            var btnCancel = jElem.find("#imenu_cancel");
            btnOk.unbind();
            btnCancel.unbind();
            btnOk.click( function() {
                jTitle.text(jElem.find("#imenu_item_name").val());
                jElem.find("#imenu_items").slideUp(150);
            });
            btnCancel.click( function() {
                jElem.find("#imenu_items").slideUp(150);
            });
        },
        "onImport": function(jBlock, json) {
            var jBlock2 = this.getBlock(this.jTemplateBlock, json);
            jBlock.after(jBlock2);
            jBlock.remove();
        },
        "onExport": function(jBlock) {
            var data = {};
            data.title = jBlock.find("#title").text();
            var list = [];
            jBlock.find("#list_item").each( function() {
                var list_item = {};
                var type = "";
                if ($(this).find("#type").is(":visible") && $(this).find("#type").text() != TYPE_DEFAULT_SYMBOL)
                    type = $(this).find("#type").text();
                list_item.type = type;
                var items = [];
                $(this).find("#item").each( function() {
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
        "wrapIMenu": function(jItem) {
            var thiz = this;
            var jIMenu = this.jTemplateIMenu.clone();
            jItem.wrap(jIMenu);
            var parent = jItem.parent();
            parent.each( function() {
                var menu_items = $(this).find("#imenu_items");
                var item = $(this).children(":last");
                var menu_title = $(this).find("#imenu_title");
                item.remove();
                menu_title.wrapInner(item);
            });
            if (jItem.attr("id") == "item") {
            } else {
                parent.hover( function() {
                    $(this).children("#imenu_items").slideDown(150);
                    thiz.onEdit($(this));
                }, function() {
                    $(this).children("#imenu_items").slideUp(150);
                });
            }
            return parent;
        },
        "unwrapIMenu": function(jItem) {
            jItem.unwrap();
            jItem.siblings().remove();
            jItem.unwrap();
        },
        "inactivateLink": function(jLink) {
            jLink.each( function() {
                var href = $(this).attr("href");
                $(this).attr("data-href", href);
                $(this).attr("href", "javascript:");
            });
        },
        "activateLink": function(jLink) {
            jLink.each( function() {
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
                drop: handleItemDropEvent,
                greedy: true
            });
        },
        "swapItem": function(jItem1, jItem2) {
            var placeHolder = $("<div/>");
            jItem1.before(placeHolder);
            jItem2.after(jItem1);
            placeHolder.after(jItem2);
            placeHolder.remove();
        },
        "go": function() {
            this.init();
            this.load(FAVORITE_DATA);
            checkLogin();
        },
        "getHost": function(link) {
            if (/file:\/\//gi.test(link))
                return "";
            if (/javascript:/gi.test(link))
                return "";
            var regExp = /https?:\/\/[^\/]+/gi;
            var obj = regExp.exec(link);
            if (obj)
                return obj.toString();
            regExp = /[^\/]+/gi;
            obj = regExp.exec(link);
            if (obj)
                return obj.toString();
            return "";
        },
        "goOffline": function() {
            // for offline use
            var thiz = this;
            this.init();
            this.load(FAVORITE_DATA);
            fillUI();
            var jNavItem = $("#nav_profile");
            jNavItem.find("#logout").unbind();
            jNavItem.find("#sync").unbind();
            jNavItem.find("#import").unbind();
            jNavItem.find("#export").unbind();
            jNavItem.find("#logout").click( function() {
                alert("Not supported in offline mode.");
            });
            jNavItem.find("#sync").click( function() {
                alert("Not supported in offline mode.");
            });
            jNavItem.find("#import").click( function() {
                showDialog($("#dialog-import"));
            });
            jNavItem.find("#export").click( function() {
                var arr = [];
                $("#favorite").find(".block").each( function() {
                    var s = thiz.onExport($(this));
                    arr = arr.concat(s);
                });
                var json = "[" + arr.join(",") + "]";
                log(json);
                var bb = new BlobBuilder;
                bb.append(json);
                saveAs(bb.getBlob("text/plain;charset=utf-8"), "favorite.json");
            });
        },
        "test": function() {
        }
    };
    window.Favorite = Favorite;
})();
window.Favorite.go();
window.Favorite.test();
