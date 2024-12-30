import { ICalculator } from './calculator.interface';
import { AbstractCalculator } from './abstract.calculator';

export class CashInCalculator extends AbstractCalculator implements ICalculator {
  override calculate(): number {
    const feeLimit = this.cashEntity.getLimitAmount();
    const rawFeeAmount = (this.operationEntity.getAmount() * this.cashEntity.getFeePercent()) / 100;

    return rawFeeAmount < feeLimit ? this.ceilCents(rawFeeAmount) : feeLimit;
  }
}
