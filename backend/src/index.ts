import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();
import { randomUUID } from "crypto";
import fastify from "fastify";
import cors from '@fastify/cors';
import { routerFactory } from './routes';
import { setupSwagger } from './config/swagger';
import './config/ioc'

const routerInstance = fastify({ logger: true, genReqId: () => randomUUID() });
routerInstance.register(cors, { origin: '*' })
routerInstance.register(require('@fastify/websocket'));

routerFactory(routerInstance);

setupSwagger(routerInstance);

const PORT = process.env.PORT ?? 3000;
routerInstance.listen({ port: +PORT });
