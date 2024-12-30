import dayjs from 'dayjs';

import { IOperation } from './operation.interface';
import { IRawOperation } from '../interface/raw-operation.interface';
import { OperationTypeEnum } from '../enum/operation-type.enum';
import { PersonTypeEnum } from '../enum/person-type.enum';

export class OperationEntity implements IOperation {
  protected readonly date: dayjs.Dayjs;
  protected readonly userId: number;
  protected readonly userType: PersonTypeEnum;
  protected readonly type: OperationTypeEnum;
  protected readonly amount: number;
  protected readonly currency: string;

  constructor(data: IRawOperation) {
    this.date = dayjs(data.date);
    this.userId = data.user_id || 0;
    this.userType = data.user_type.toLowerCase() as PersonTypeEnum;
    this.type = data.type.toLowerCase() as OperationTypeEnum;
    this.amount = data.operation.amount || 0;
    this.currency = data.operation.currency || process.env.CURRENCY || 'EUR';
  }

  getDate(): dayjs.Dayjs {
    return this.date;
  }

  getUserId(): number {
    return this.userId;
  }

  getUserType(): PersonTypeEnum {
    return this.userType;
  }

  getType(): OperationTypeEnum {
    return this.type;
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }
}
