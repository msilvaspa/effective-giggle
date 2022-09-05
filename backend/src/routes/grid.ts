import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import grid, { generateCode } from "../services/grid";

let bias: string = '';

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const charGenerator = () => alphabet[Math.floor(Math.random() * alphabet.length)];

export const setGridRouter = (router: FastifyInstance) => {
    router.get('/grid', async (request: FastifyRequest, reply: FastifyReply) => {
        const generatedGrid = (await grid())(charGenerator)(bias)
        const code = await generateCode(generatedGrid);
        return ({ grid: generatedGrid, code })
    })


    const isValid = (param: string) => /^[a-z]{1}$/g.test(param);

    router.put('/grid/bias', (request: FastifyRequest, reply: FastifyReply) => {
        request.log.info(request.params);
        const input = request.params as string;
        if (!isValid(input)) {
            reply.code(400);
            reply.send();
        }
        bias = input;
        reply.code(200);
        reply.send();
    })
}