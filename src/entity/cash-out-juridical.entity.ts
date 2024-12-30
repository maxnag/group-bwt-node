import { BaseCashEntity } from './base-cash.entity';
import { ICash } from './cash.interface';
import { IRawCashOutJuridical } from '../interface/raw-cash-out-juridical.interface';

export class CashOutJuridicalEntity extends BaseCashEntity implements ICash {
  constructor(data: IRawCashOutJuridical) {
    super(data);

    this.limitAmount = data.min.amount || 0;
    this.currency = data.min.currency || process.env.CURRENCY || 'EUR';
  }

  getLimitAmount(): number {
    return this.limitAmount;
  }

  getCurrency(): string {
    return this.currency;
  }
}
