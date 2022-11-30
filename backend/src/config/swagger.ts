import { FastifyInstance } from "fastify";

export const setupSwagger = (router: FastifyInstance) => {
    router.register(require('@fastify/swagger'), {
        swagger: {
            info: {
                title: 'Altar.io swagger!',
                description: 'awesome Altar.io swagger',
                version: '0.0.1'
            },
            securityDefinitions: {
                apiKey: {
                    type: 'apiKey',
                    name: 'apiKey',
                    in: 'header'
                }
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json']
        },
        hideUntagged: true,
        exposeRoute: true
    })
}