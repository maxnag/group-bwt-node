import 'dotenv/config';
import process from 'node:process';

import { CashInCalculator } from '#calculator/cash-in.calculator';
import { CashInEntity } from '#entity/cash-in.entity';
import { CashOutJuridicalCalculator } from '#calculator/cash-out-juridical.calculator';
import { CashOutJuridicalEntity } from '#entity/cash-out-juridical.entity';
import { CashOutNaturalCalculator } from '#calculator/cash-out-natural.calculator';
import { CashOutNaturalEntity } from '#entity/cash-out-natural.entity';
import { Manager } from '#manager';
import { Mapper } from '#mapper/mapper';
import { OperationEntity } from '#entity/operation.entity';
import { Reader } from '#reader/reader';

const reader = new Reader(
  'https://developers.paysera.com/tasks/api/cash-in',
  'https://developers.paysera.com/tasks/api/cash-out-natural',
  'https://developers.paysera.com/tasks/api/cash-out-juridical',
  process.argv[2]
);
const mapper = new Mapper(reader, OperationEntity, CashInEntity, CashOutJuridicalEntity, CashOutNaturalEntity);

const feeAmounts: Promise<number[]> = new Manager(
  mapper,
  CashInCalculator,
  CashOutNaturalCalculator,
  CashOutJuridicalCalculator
).getResult();

feeAmounts
  .then((fees: number[]) => fees.forEach((fee: number) => console.log(fee.toFixed(2))))
  .catch(error => console.error(error.message));
