let APP_ID = '28usqm6hgo13ehfb9c57eo339jnhx20klmpkzcxzybk7j1rk'
let APP_KEY = 'rs6uwhj8oo1kq9it1bzhg75hk3mv9ur7rdrdjdyrmq7m7aph'
let HEADER_KEY_ID = 'X-LC-Id'
let HEADER_KEY_KEY = 'X-LC-Key'
let HEADER_KEY_TOKEN = 'X-LC-Session'

class API_AVOS {

    static login(name, password) {
        var defer = $.Deferred()

        $.ajax({
            url: 'https://api.leancloud.cn/1.1/login',
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
            var err = JSON.parse(jqXHR.responseText)
            defer.reject({
                code: err.code,
                error: err.error
            })
        });

        return defer.promise()
    }

    static getFavoriteData(token) {
        var defer = $.Deferred()

        $.ajax({
            url: 'https://api.leancloud.cn/1.1/classes/Favorite',
            headers: {
                [HEADER_KEY_ID]: APP_ID,
                [HEADER_KEY_KEY]: APP_KEY,
                [HEADER_KEY_TOKEN]: token
            },
            data: {
                limit: 1
            }
        }).done((data, textStatus, jqXHR) => {
            //{results: [{createdAt: "2016-02-15T09:41:52.345Z", data: "xxx", objectId: "56c19d60c24aa800534cc54b", updatedAt: "2016-02-15T09:46:33.031Z"}]}
            var fav = []
            if (data.results.length === 1) {
                fav = data.results[0].data || []
                console.log(fav)
            }
            defer.resolve(fav)

        }).fail((jqXHR, textStatus, errorThrown) => {
            // eg: {"code":210,"error":"The username and password mismatch."}
            console.log(jqXHR)
            var err = JSON.parse(jqXHR.responseText)
            defer.reject({
                code: err.code,
                error: err.error
            })
        });

        return defer.promise()
    }

}

export {API_AVOS}
