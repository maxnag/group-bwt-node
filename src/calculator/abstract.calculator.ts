import { ICalculator } from '#calculator/calculator.interface';
import { ICash } from '#entity/cash.interface';
import { IOperation } from '#entity/operation.interface';

export abstract class AbstractCalculator implements ICalculator {
  protected cashEntity: ICash;
  protected operationEntity: IOperation;

  constructor(cashEntity: ICash, operationEntity: IOperation) {
    this.cashEntity = cashEntity;
    this.operationEntity = operationEntity;
  }

  abstract calculate(): number;

  protected ceilCents(value: number): number {
    return Math.ceil(value * 100) / 100;
  }
}
