import { BaseCashEntity } from '#entity/base-cash.entity';
import { ICash } from '#entity/cash.interface';
import { IRawCashOutNatural } from '#interface/raw-cash-out-natural.interface';

export class CashOutNaturalEntity extends BaseCashEntity implements ICash {
  constructor(data: IRawCashOutNatural) {
    super(data);

    this.limitAmount = data.week_limit.amount || 0;
    this.currency = data.week_limit.currency || process.env.CURRENCY || 'EUR';
  }

  getLimitAmount(): number {
    return this.limitAmount;
  }

  getCurrency(): string {
    return this.currency;
  }
}
