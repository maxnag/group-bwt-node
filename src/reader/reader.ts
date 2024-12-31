import path from 'path';
import { promises as fs } from 'fs';

import { IRawCashIn } from '#interface/raw-cashIn.interface';
import { IRawCashOutJuridical } from '#interface/raw-cash-out-juridical.interface';
import { IRawCashOutNatural } from '#interface/raw-cash-out-natural.interface';
import { IRawOperation } from '#interface/raw-operation.interface';

export class Reader {
  cashInDestination: string;
  cashOutNaturalDestination: string;
  cashOutJuridicalDestination: string;
  fileDestination: string;

  constructor(cashInDestination: string, cashOutNaturalDestination: string, cashOutJuridicalDestination: string, fileDestination: string) {
    this.cashInDestination = cashInDestination;
    this.cashOutNaturalDestination = cashOutNaturalDestination;
    this.cashOutJuridicalDestination = cashOutJuridicalDestination;
    this.fileDestination = fileDestination;
  }

  async readCacheIn(): Promise<IRawCashIn> {
    return (await this.httpRead(this.cashInDestination)) as IRawCashIn;
  }

  async readCashOutNatural(): Promise<IRawCashOutNatural> {
    return (await this.httpRead(this.cashOutNaturalDestination)) as IRawCashOutNatural;
  }

  async readCashOutJuridical(): Promise<IRawCashOutJuridical> {
    return (await this.httpRead(this.cashOutJuridicalDestination)) as IRawCashOutJuridical;
  }

  async readInputFile(): Promise<IRawOperation[]> {
    return (await this.fileRead()) as IRawOperation[];
  }

  protected async httpRead(url: string): Promise<unknown> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error for the URL: ${url}. Status: ${response.status}`);
    }

    return await response.json();
  }

  protected async fileRead(): Promise<unknown> {
    if (this.fileDestination === undefined) {
      throw new Error(`You need to specify the file path in the CLI`);
    }

    try {
      await fs.access(this.fileDestination);
    } catch {
      throw new Error(`The file ${path.resolve(this.fileDestination)} does not exist.`);
    }

    let result = {};

    try {
      result = JSON.parse(await fs.readFile(this.fileDestination, 'utf8'));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error(`The file ${path.resolve(this.fileDestination)} does not contain a valid JSON.`);
    }

    return result;
  }
}
