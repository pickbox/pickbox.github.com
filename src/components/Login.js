require('toastr/toastr.scss')
import API from 'src/api/APIBox'

var tplLoginDlgBody = require('raw!./LoginDialog.html').trim()

Toast.options.positionClass = "toast-bottom-center"


function showLoginDlg(lastName) {
    var defer = $.Deferred()

    var body = $(tplLoginDlgBody)
    if (lastName) {
        body.find('#inputName').attr('value', lastName)
    }

    $.confirm({
        title: '登录',
        body: body.html(),
        okHide: function () {
            var elem = this.$element
            var name = elem.find('#inputName').val()
            var password = elem.find('#inputPassword').val()

            defer.resolve(name, password)
        }
    })

    return defer.promise()
}

export default class {

    static login(lastName) {
        var defer = $.Deferred()

        showLoginDlg(lastName).done((name, password) => {
            API.login(name, md5(password)).done(result => {
                Toast.success('登录成功')
                defer.resolve(result)

            }).fail(err => {
                var msg = `${err.code}: ${err.error}`
                Toast.error(msg)
            });
        });

        return defer.promise()
    }

    static logout() {
        var defer = $.Deferred()

        Toast.success('注销成功')
        defer.resolve({
            token: ''
        })

        return defer.promise()
    }


}
