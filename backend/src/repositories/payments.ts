import { injectable } from "tsyringe";
import { payment } from "../routes/payments";

export interface IPaymentsRepository {
    addPayment(payment: payment): Promise<void>;
    getPayments(): Promise<payment[]>
}
@injectable()
export default class PaymentsRepository implements IPaymentsRepository {
    private payments: payment[] = [];

    public async addPayment(payment: payment) {
        this.payments.push(payment);
    }

    public async getPayments() {
        return this.payments;
    }
}