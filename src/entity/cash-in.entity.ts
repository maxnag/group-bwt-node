import { BaseCashEntity } from '#entity/base-cash.entity';
import { ICash } from '#entity/cash.interface';
import { IRawCashIn } from '#interface/raw-cashIn.interface';

export class CashInEntity extends BaseCashEntity implements ICash {
  constructor(data: IRawCashIn) {
    super(data);

    this.limitAmount = data.max.amount || 0;
    this.currency = data.max.currency || process.env.CURRENCY || 'EUR';
  }

  getLimitAmount(): number {
    return this.limitAmount;
  }

  getCurrency(): string {
    return this.currency;
  }
}
