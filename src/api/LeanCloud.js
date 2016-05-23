let APP_ID = 'ofk0Kl7wqrTUkHKKn5uPo6GS-gzGzoHsz'
let APP_KEY = 'BvDz0V2KpbJlT5zPSankYQ9h'
let HEADER_KEY_ID = 'X-LC-Id'
let HEADER_KEY_KEY = 'X-LC-Key'
let HEADER_KEY_TOKEN = 'X-LC-Session'

let URL = 'https://api.leancloud.cn/1.1'
let URL_LOGIN = URL + '/login'
let URL_FAVORITE = URL + '/classes/Favorite'

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

        $.ajax({
            url: URL_LOGIN,
            headers: {
                [HEADER_KEY_ID]: APP_ID,
                [HEADER_KEY_KEY]: APP_KEY
            },
            data: {
                username: name,
                password: password
            }
        }).done((data, textStatus, jqXHR) => {
            //{sessionToken: "jxlvg72oved7a53z6amoxh009", objectId: "56c17ef1df0eea004d15ec5c", username: "jfo"}
            defer.resolve({
                token: data.sessionToken,
                name: data.username,
                id: data.objectId
            })
        }).fail((jqXHR, textStatus, errorThrown) => {
            // eg: {"code":210,"error":"The username and password mismatch."}
            this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
        });

        return defer.promise()
    }

    static getData(token, onlyId) {
        var defer = $.Deferred()

        $.ajax({
            url: URL_FAVORITE,
            headers: {
                [HEADER_KEY_ID]: APP_ID,
                [HEADER_KEY_KEY]: APP_KEY,
                [HEADER_KEY_TOKEN]: token
            },
            data: {
                limit: 1,
                keys: onlyId ? 'objectId' : 'data'
            }
        }).done((data, textStatus, jqXHR) => {
            //{results: [{createdAt: "2016-02-15T09:41:52.345Z", data: "xxx", objectId: "56c19d60c24aa800534cc54b", updatedAt: "2016-02-15T09:46:33.031Z"}]}
            console.log(data)
            var fav = []
            var id = null
            if (data.results.length === 1) {
                fav = data.results[0].data || []
                id = data.results[0].objectId
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
            url: URL_FAVORITE + '/' + id,
            headers: {
                [HEADER_KEY_ID]: APP_ID,
                [HEADER_KEY_KEY]: APP_KEY,
                [HEADER_KEY_TOKEN]: token
            },
            contentType: 'application/json',
            data: JSON.stringify({
                data: data
            }),
            method: 'PUT'
        }).done((data, textStatus, jqXHR) => {
            //{updatedAt: "2016-02-16T03:08:33.742Z", objectId: "56c19d60c24aa800534cc54b"}
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
            url: URL_FAVORITE,
            headers: {
                [HEADER_KEY_ID]: APP_ID,
                [HEADER_KEY_KEY]: APP_KEY,
                [HEADER_KEY_TOKEN]: token
            },
            contentType: 'application/json',
            data: JSON.stringify({
                data: data
            }),
            method: 'POST'
        }).done((data, textStatus, jqXHR) => {
            //{updatedAt: "2016-02-16T03:08:33.742Z", objectId: "56c19d60c24aa800534cc54b"}
            console.log(data)

            this.updateACL(token, data.objectId, userId).done(() => defer.resolve()).fail(err => defer.reject(err))

        }).fail((jqXHR, textStatus, errorThrown) => {
            this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
        });

        return defer.promise()
    }

    static updateACL(token, favId, userId) {
        var defer = $.Deferred()

        $.ajax({
            url: URL_FAVORITE + '/' + favId,
            headers: {
                [HEADER_KEY_ID]: APP_ID,
                [HEADER_KEY_KEY]: APP_KEY,
                [HEADER_KEY_TOKEN]: token
            },
            contentType: 'application/json',
            data: JSON.stringify({
                ACL: {
                    [userId]: {
                        read: true,
                        write: true
                    }
                }
            }),
            method: 'PUT'
        }).done((data, textStatus, jqXHR) => {
            //{updatedAt: "2016-02-16T03:08:33.742Z", objectId: "56c19d60c24aa800534cc54b"}
            console.log(data)
            defer.resolve()

        }).fail((jqXHR, textStatus, errorThrown) => {
            this.ajaxFail(defer, jqXHR, textStatus, errorThrown)
        });

        return defer.promise()
    }

}
