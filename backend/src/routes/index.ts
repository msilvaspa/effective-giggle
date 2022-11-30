import { FastifyInstance } from 'fastify';
import { setGridRouter } from './grid';
import { setPaymentsRouter } from './payments';

export const routerFactory = (router: FastifyInstance) => {
    setGridRouter(router);
    setPaymentsRouter(router);

    router.get('/ping', () => {
        return { health: 'OK', date: new Date() };
    })
}
