import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek.js';

import { AbstractCalculator } from '#calculator/abstract.calculator';
import { ICalculator } from '#calculator/calculator.interface';
import { ICash } from '#entity/cash.interface';
import { IOperation } from '#entity/operation.interface';
import { OperationTypeEnum } from '#enum/operation-type.enum';
import { PersonTypeEnum } from '#enum/person-type.enum';

dayjs.extend(isoWeek);

export class CashOutNaturalCalculator extends AbstractCalculator implements ICalculator {
  protected operationCollection: IOperation[];

  constructor(cashEntity: ICash, operationEntity: IOperation, operationCollection: IOperation[]) {
    super(cashEntity, operationEntity);
    this.operationCollection = operationCollection;
  }

  override calculate(): number {
    const feeLimit = this.cashEntity.getLimitAmount();

    if (this.calculateWeekLimit()) {
      const amount =
        this.operationEntity.getAmount() > feeLimit ? this.operationEntity.getAmount() - feeLimit : this.operationEntity.getAmount();

      return this.ceilCents((amount * this.cashEntity.getFeePercent()) / 100);
    }

    return 0;
  }

  protected calculateWeekLimit(): boolean {
    const weeklyTotals = {};
    const currentKey = `${this.operationEntity.getDate().year()}-W${this.operationEntity.getDate().isoWeek()}-U${this.operationEntity.getUserId()}`;

    this.operationCollection.forEach((item: IOperation) => {
      if (
        item.getUserId() === this.operationEntity.getUserId() &&
        item.getType() === OperationTypeEnum.CASH_OUT &&
        item.getUserType() === PersonTypeEnum.NATURAL
      ) {
        const date = item.getDate();
        const key = `${date.year()}-W${date.isoWeek()}-U${item.getUserId()}`;

        if (!weeklyTotals[key]) {
          weeklyTotals[key] = 0;
        }

        weeklyTotals[key] += item.getAmount();
      }
    });

    return weeklyTotals[currentKey] > this.cashEntity.getLimitAmount();
  }
}
