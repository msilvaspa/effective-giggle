import { FastifyInstance } from "fastify";

export const setupSwagger = (router: FastifyInstance) => {
    router.register(require('@fastify/swagger'), {
        routePrefix: '/documentation',
        swagger: {
            info: {
                title: 'Test swagger',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'user', description: 'User related end-points' },
                { name: 'code', description: 'Code related end-points' }
            ],
            definitions: {
                Payment: {
                    type: 'object',
                    required: ['name', 'amount', 'code', 'grid'],
                    properties: {
                        name: { type: 'string' },
                        amount: { type: 'number' },
                        code: { type: 'number' },
                        grid: { type: 'array' }
                    }
                }
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                }
            }
        },
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (request: any, reply: any, next: any) { next() },
            preHandler: function (request: any, reply: any, next: any) { next() }
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        exposeRoute: true
    })
}