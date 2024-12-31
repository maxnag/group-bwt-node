import dayjs from 'dayjs';

import { OperationTypeEnum } from '#enum/operation-type.enum';
import { PersonTypeEnum } from '#enum/person-type.enum';

export interface IOperation {
  getDate(): dayjs.Dayjs;
  getUserId(): number;
  getUserType(): PersonTypeEnum;
  getType(): OperationTypeEnum;
  getAmount(): number;
  getCurrency(): string;
}
