class ApiResonse{
    constructor(statusCode, data,message = "success"){
        this.statusCode = statusCode;
        this.data = data
        this.message = message
        this.success = statusCode     // statuscode <  400
    }
}

export {ApiResonse};