import { OpenAPIV3 } from "openapi-types";
import swaggerUI from "swagger-ui-express";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0", //This tells Swagger which version of the OpenAPI specification your document follows.
    info: {
        //info about this document
        title: "Pizza API Documentation",
        version: "1.0.0", //describes my own API release
        description: "API Documentation for Pizza Shop",
    },
    servers: [
        //where it all will work
        {
            url: "http://localhost:7000",
            description: "Local server",
        },
    ],
    tags: [
        //to make better structure for documentation
        {
            name: "Auth",
            description: "Authentication endpoints",
        },
        {
            name: "Pizza",
            description: "Pizzas endpoints",
        },
        {
            name: "Users",
            description: "Users endpoints",
        },
    ],
    paths: {
        //where to request
        "/auth/sign-up": {
            //which method use
            post: {
                tags: ["Auth"], //to which tag this request is belong
                summary: "Register new user", //description what it's doing
                requestBody: {
                    //what needs to be in request
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                    name: { type: "string" },
                                    surname: { type: "string" },
                                    age: { type: "integer" },
                                },
                                required: [
                                    "email",
                                    "password",
                                    "name",
                                    "surname",
                                    "age",
                                ],
                            },
                        },
                    },
                },
                responses: {
                    //how response should look
                    "201": {
                        description: "User successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                avatar: { type: "string" },
                                                age: { type: "integer" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            example: 400,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/auth/sign-in": {
            post: {
                tags: ["Auth"],
                summary: "Login user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: { type: "string", format: "email" },
                                    password: {
                                        type: "string",
                                        format: "password",
                                    },
                                },
                                required: ["email", "password"],
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "User successfully logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                avatar: { type: "string" },
                                                age: { type: "integer" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                        tokens: {
                                            type: "object",
                                            properties: {
                                                accessToken: { type: "string" },
                                                refreshToken: {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "integer",
                                            example: 401,
                                        },
                                        message: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/pizzas": {
            get: {
                tags: ["Pizza"],
                summary: "Get all pizzas with pagination and filters",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "pageSize",
                        in: "query",
                        description: "Number of items per page",
                        schema: { type: "integer", default: 10 },
                    },
                    {
                        name: "page",
                        in: "query",
                        required: true,
                        description: "Page number",
                        schema: { type: "integer", default: 1 },
                    },
                    {
                        name: "price",
                        in: "query",
                        description: "Filter by price",
                        schema: { type: "integer" },
                    },
                    {
                        name: "diameter",
                        in: "query",
                        description: "Filter by diameter",
                        schema: { type: "integer" },
                    },
                    {
                        name: "name",
                        in: "query",
                        description: "Filter by name",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "List of pizzas with pagination",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totalItems: { type: "integer" },
                                        totalPages: { type: "integer" },
                                        prevPage: { type: "boolean" },
                                        nextPage: { type: "boolean" },
                                        data: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: { type: "string" },
                                                    name: { type: "string" },
                                                    price: { type: "integer" },
                                                    diameter: {
                                                        type: "integer",
                                                    },
                                                    createdAt: {
                                                        type: "string",
                                                    },
                                                    updatedAt: {
                                                        type: "string",
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users/{userId}": {
            get: {
                tags: ["Users"],
                summary: "Get users by id",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        description: "Get user by id",
                        required: true,
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "200": {
                        description: "User found by id",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            type: "object",
                                            properties: {
                                                email: { type: "string" },
                                                role: { type: "string" },
                                                name: { type: "string" },
                                                surname: { type: "string" },
                                                avatar: { type: "string" },
                                                age: { type: "integer" },
                                                isActive: { type: "boolean" },
                                                isDeleted: { type: "boolean" },
                                                isVerified: { type: "boolean" },
                                                _id: { type: "string" },
                                                createdAt: { type: "string" },
                                                updatedAt: { type: "string" },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            delete: {
                tags: ["Users"],
                summary: "Delete user by id",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: "userId",
                        in: "path",
                        description: "Delete user by id",
                        schema: { type: "string" },
                    },
                ],
                responses: {
                    "204": {
                        description: "Successfully deleted user by id",
                    },
                },
            },
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

export { swaggerDocument, swaggerUI };
