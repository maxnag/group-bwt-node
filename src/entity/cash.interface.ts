export interface ICash {
  getFeePercent(): number;
  getLimitAmount(): number;
  getCurrency(): string;
}
