import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

const rawData = readFileSync("../datasets/path-vqa/trainrenamed.csv", "utf-8");

const pathVqa = parse(rawData, {
    columns: true,
    skip_empty_lines: true,
});

console.log(pathVqa);
