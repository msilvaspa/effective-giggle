import { container } from "tsyringe";
import PaymentsRepository, { IPaymentsRepository } from "../repositories/payments";

container.registerSingleton<IPaymentsRepository>('PaymentsRepository', PaymentsRepository);