class ApiError extends Error {
    status: number; // add status to class

    constructor(message: string, status: number) {
        super(message); // comes from Error
        this.status = status;
    }
}

export { ApiError };
//  ApiError exists so middleware can throw errors that already know which HTTP status they belong to.
