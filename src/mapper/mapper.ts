import { ICash } from '#entity/cash.interface';
import { IOperation } from '#entity/operation.interface';
import { IRawCashIn } from '#interface/raw-cashIn.interface';
import { IRawCashOutJuridical } from '#interface/raw-cash-out-juridical.interface';
import { IRawCashOutNatural } from '#interface/raw-cash-out-natural.interface';
import { IRawOperation } from '#interface/raw-operation.interface';
import { Reader } from '#reader/reader';

export class Mapper {
  protected cashInEntity: { new (data: IRawCashIn): ICash };
  protected cashOutJuridicalEntity: { new (data: IRawCashOutJuridical): ICash };
  protected cashOutNaturalEntity: { new (data: IRawCashOutNatural): ICash };
  protected operationEntity: { new (data: IRawOperation): IOperation };
  protected reader: Reader;

  #operationCollection: IOperation[] = [];
  #cashInEntityObject: ICash;
  #cashOutJuridicalEntityObject: ICash;
  #cashOutNaturalEntityObject: ICash;

  constructor(
    reader: Reader,
    operationEntity: { new (data: IRawOperation): IOperation },
    cashInEntity: { new (data: IRawCashIn): ICash },
    cashOutJuridicalEntity: { new (data: IRawCashOutJuridical): ICash },
    cashOutNaturalEntity: { new (data: IRawCashOutNatural): ICash }
  ) {
    this.cashInEntity = cashInEntity;
    this.cashOutJuridicalEntity = cashOutJuridicalEntity;
    this.cashOutNaturalEntity = cashOutNaturalEntity;
    this.operationEntity = operationEntity;
    this.reader = reader;
  }

  async process(): Promise<void> {
    // firstly read the file, if it doesn't exist other steps don't make sense
    (await this.reader.readInputFile()).forEach((item: IRawOperation) => {
      // only EUR - task requirement
      if (item.operation.currency === (process.env.CURRENCY || 'EUR')) {
        this.#operationCollection.push(new this.operationEntity(item));
      }
    });

    // fee configurations read
    this.#cashInEntityObject = new this.cashInEntity(await this.reader.readCacheIn());
    this.#cashOutJuridicalEntityObject = new this.cashOutJuridicalEntity(await this.reader.readCashOutJuridical());
    this.#cashOutNaturalEntityObject = new this.cashOutNaturalEntity(await this.reader.readCashOutNatural());
  }

  getOperationCollection(): IOperation[] {
    return this.#operationCollection;
  }

  getCashInEntity(): ICash {
    return this.#cashInEntityObject;
  }

  getCashOutJuridicalEntity(): ICash {
    return this.#cashOutJuridicalEntityObject;
  }

  getCashOutNaturalEntity(): ICash {
    return this.#cashOutNaturalEntityObject;
  }
}
