//let URL = 'https://pickbox.cc/api/favorite'
let URL = 'http://127.0.0.1:8099/api/favorite'
let URL_LOGIN = URL + '/login'
let URL_FAVORITE = URL + '/get'
let URL_FAVORITE_UPDATE = URL + '/update'
let URL_FAVORITE_CREATE = URL + '/create'

export default class {

    static ajaxFail (defer, jqXHR, textStatus, errorThrown) {
        console.log(jqXHR)
        var err = JSON.parse(jqXHR.responseText)
        defer.reject({
            code: err.code,
            error: err.error
        })
    }

    static login(name, password) {
        var defer = $.Deferred()
        defer.resolve({
            token: name,
            name: name,
            id: name
        })
        return defer.promise()
    }

    static getData(token, onlyId) {
        var defer = $.Deferred()

        $.ajax({
            url: URL_FAVORITE,
            data: {
                token: token
            }
        }).done((data, textStatus, jqXHR) => {
            //{"errno":0, "errmsg", "id":"56c19d60c24aa800534cc54b", data:"xxx"}
            console.log(data)
            var fav = []
            var id = null
            if (data.errno === 0) {
                fav = data.data || []
                id = data.id
                //console.log(fav)
            }
            defer.resolve(fav, id)

        }).fail((jqXHR, textStatus, errorThrown) => {
            this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
        });

        return defer.promise()
    }

    static updateData(token, id, data) {
        var defer = $.Deferred()

        $.ajax({
            url: URL_FAVORITE_UPDATE,
            //contentType: 'application/json',
            data: {
                token: token,
                data: data
            },
            method: 'POST'
        }).done((data, textStatus, jqXHR) => {
            console.log(data)
            defer.resolve()

        }).fail((jqXHR, textStatus, errorThrown) => {
            this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
        });

        return defer.promise()
    }

    static insertData(token, data, userId) {
        var defer = $.Deferred()

        $.ajax({
            url: URL_FAVORITE_CREATE,
            //contentType: 'application/json',
            token: token,
            data: JSON.stringify({
                data: data
            }),
            method: 'POST'
        }).done((data, textStatus, jqXHR) => {
            //{updatedAt: "2016-02-16T03:08:33.742Z", objectId: "56c19d60c24aa800534cc54b"}
            console.log(data)
            defer.resolve()

            //this.updateACL(token, data.objectId, userId).done(() => defer.resolve()).fail(err => defer.reject(err))

        }).fail((jqXHR, textStatus, errorThrown) => {
            this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
        });

        return defer.promise()
    }

    //static updateACL(token, favId, userId) {
    //    var defer = $.Deferred()
    //
    //    $.ajax({
    //        url: URL_FAVORITE + '/' + favId,
    //        headers: {
    //            [HEADER_KEY_ID]: APP_ID,
    //            [HEADER_KEY_KEY]: APP_KEY,
    //            [HEADER_KEY_TOKEN]: token
    //        },
    //        contentType: 'application/json',
    //        data: JSON.stringify({
    //            ACL: {
    //                [userId]: {
    //                    read: true,
    //                    write: true
    //                }
    //            }
    //        }),
    //        method: 'PUT'
    //    }).done((data, textStatus, jqXHR) => {
    //        //{updatedAt: "2016-02-16T03:08:33.742Z", objectId: "56c19d60c24aa800534cc54b"}
    //        console.log(data)
    //        defer.resolve()
    //
    //    }).fail((jqXHR, textStatus, errorThrown) => {
    //        this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
    //    });
    //
    //    return defer.promise()
    //}

}
