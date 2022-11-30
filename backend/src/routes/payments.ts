import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { container } from "tsyringe";
import PaymentsRepository, { IPaymentsRepository } from "../repositories/payments";

export type payment = {
    name: string;
    amount: number;
    code: number;
    grid: Array<string[]>
};

const paymentsRepository = container.resolve<IPaymentsRepository>(PaymentsRepository)

export const setPaymentsRouter = (router: FastifyInstance) => {
    router.post('/payments', (request: FastifyRequest, reply: FastifyReply) => {
        request.log.info(request.body);
        paymentsRepository.addPayment(request.body as any);
        reply.code(201);
        reply.send();
    })

    router.get('/payments', () => {
        return paymentsRepository.getPayments();
    })
}
