import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { ICalculator } from './calculator/calculator.interface';
import { ICash } from './entity/cash.interface';
import { IOperation } from './entity/operation.interface';
import { Mapper } from './mapper/mapper';
import { OperationTypeEnum } from './enum/operation-type.enum';
import { PersonTypeEnum } from './enum/person-type.enum';

dayjs.extend(isoWeek);

export class Manager {
  protected mapper: Mapper;

  #cashInCalculator: { new (cashEntity: ICash, operationEntity: IOperation): ICalculator };
  #cashOutNaturalCalculator: {
    new (cashEntity: ICash, operationEntity: IOperation, operationCollection: IOperation[]): ICalculator;
  };
  #cashOutJuridicalCalculator: { new (cashEntity: ICash, operationEntity: IOperation): ICalculator };

  constructor(
    mapper: Mapper,
    cashInCalculator: { new (cashEntity: ICash, operationEntity: IOperation): ICalculator },
    cashOutNaturalCalculator: {
      new (cashEntity: ICash, operationEntity: IOperation, operationCollection: IOperation[]): ICalculator;
    },
    cashOutJuridicalCalculator: { new (cashEntity: ICash, operationEntity: IOperation): ICalculator }
  ) {
    this.mapper = mapper;
    this.#cashInCalculator = cashInCalculator;
    this.#cashOutNaturalCalculator = cashOutNaturalCalculator;
    this.#cashOutJuridicalCalculator = cashOutJuridicalCalculator;
  }

  async getResult(): Promise<number[]> {
    await this.mapper.process();
    const result = [];

    this.mapper.getOperationCollection().forEach((item: IOperation) => {
      if (item.getType() === OperationTypeEnum.CASH_IN) {
        result.push(this.calculateCommissionIn(item));
      }

      if (item.getType() === OperationTypeEnum.CASH_OUT) {
        if (item.getUserType() === PersonTypeEnum.NATURAL) {
          result.push(this.calculateCommissionOutNatural(item));
        }

        if (item.getUserType() === PersonTypeEnum.JURIDICAL) {
          result.push(this.calculateCommissionOutJuridical(item));
        }
      }
    });

    return result;
  }

  protected calculateCommissionIn(operationEntity: IOperation): number {
    return new this.#cashInCalculator(this.mapper.getCashInEntity(), operationEntity).calculate();
  }

  protected calculateCommissionOutNatural(operationEntity: IOperation): number {
    return new this.#cashOutNaturalCalculator(
      this.mapper.getCashOutNaturalEntity(),
      operationEntity,
      this.mapper.getOperationCollection()
    ).calculate();
  }

  protected calculateCommissionOutJuridical(operationEntity: IOperation): number {
    return new this.#cashOutJuridicalCalculator(this.mapper.getCashOutJuridicalEntity(), operationEntity).calculate();
  }
}
