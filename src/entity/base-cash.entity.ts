import { IRawCashIn } from '../interface/raw-cashIn.interface';
import { IRawCashOutJuridical } from '../interface/raw-cash-out-juridical.interface';
import { IRawCashOutNatural } from '../interface/raw-cash-out-natural.interface';

export class BaseCashEntity {
  protected readonly feePercents: number;
  protected limitAmount: number;
  protected currency: string;

  constructor(data: IRawCashIn | IRawCashOutJuridical | IRawCashOutNatural) {
    this.feePercents = data.percents || 0;
  }

  getFeePercent(): number {
    return this.feePercents;
  }
}
