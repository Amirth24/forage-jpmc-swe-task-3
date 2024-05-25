import { ServerRespond } from './DataStreamer';

export interface Row {
  timestamp: Date,
  trigger_alert: undefined | number,
  price_abc: number,
  price_def: number,
  ratio: number,
  lower_bound: number,
  upper_bound: number,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price ) / 2.0;
    const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price ) / 2.0;
    const ratio = price_def === 0.0 ? 0.0 : price_abc/ price_def;
    const lower_bound = 1 - 0.05;
    const upper_bound = 1 + 0.05;

    return {
        price_abc,
        price_def,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
          serverResponds[0].timestamp : serverResponds[0].timestamp,
        lower_bound,
        upper_bound,
        trigger_alert: (ratio < lower_bound || ratio >= upper_bound) ? ratio : undefined
    };
  }
}
