/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "json2csv" {
  export class Parser<T extends object = any> {
    parse(data: T[]): string;
  }
}

