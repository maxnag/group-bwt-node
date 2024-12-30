export interface IRawOperation {
  date: string;
  user_id: number;
  user_type: string;
  type: string;
  operation: {
    amount: number;
    currency: string;
  };
}
