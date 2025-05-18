import { Parser } from "json2csv";

export async function json2csv(data: any[]) {
  const parser = new Parser();
  return parser.parse(data);
}
