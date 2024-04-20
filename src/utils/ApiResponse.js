class ApiResponse{
    constructor(statusCode, message, data, success="Success"){
        this.statusCode=statusCode <400
        this.message=message;
        this.data=data;
        this.success=success;
    }
}
export {ApiResponse}