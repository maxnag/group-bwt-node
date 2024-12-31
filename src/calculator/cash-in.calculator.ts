import { ICalculator } from '#calculator/calculator.interface';
import { AbstractCalculator } from '#calculator/abstract.calculator';

export class CashInCalculator extends AbstractCalculator implements ICalculator {
  override calculate(): number {
    const feeLimit = this.cashEntity.getLimitAmount();
    const rawFeeAmount = (this.operationEntity.getAmount() * this.cashEntity.getFeePercent()) / 100;

    return rawFeeAmount < feeLimit ? this.ceilCents(rawFeeAmount) : feeLimit;
  }
}
