import { AbstractCalculator } from './abstract.calculator';
import { ICalculator } from './calculator.interface';

export class CashOutJuridicalCalculator extends AbstractCalculator implements ICalculator {
  override calculate(): number {
    const feeLimit = this.cashEntity.getLimitAmount();
    const rawFeeAmount = (this.operationEntity.getAmount() * this.cashEntity.getFeePercent()) / 100;

    return rawFeeAmount < feeLimit ? feeLimit : this.ceilCents(rawFeeAmount);
  }
}
