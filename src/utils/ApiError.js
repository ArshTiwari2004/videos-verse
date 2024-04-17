class ApiError extends Error {
  constructor(
statusCode,
message="Something went wrong",
errors=[],
statck=""
    ) {
    super(message)
    this.statusCode=statusCode
    this.errors=errors
    this.data=null
    this.message=message
    this.succes=false;

    if (statck) {
        this.stack=statck
    }
    else {
        Error.captureStackTrace(this, this.constructor)
    }
  
  }
}