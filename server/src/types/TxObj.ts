export interface TxObj {
  from: string;
  data: any;
  to: string;
  value?: number;
  nonce?: string;
  gasPrice?: string;
  gasLimit?: string;
}
