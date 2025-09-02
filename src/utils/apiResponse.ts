class ApiResponse<T = any> {
  public statusCode: number;
  public success: boolean;
  public message: string;
  public data: null | T;

  constructor(statusCode: number, data: null | T = null, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

class ApiError extends Error {
  public statusCode: any;
  public success: boolean = false;
  public errors: any[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiResponse, ApiError };
