import { Parser } from "json2csv";

export const json2csv = <T extends object>(data: T[]): string => {
  const parser = new Parser<T>();
  return parser.parse(data);
};
