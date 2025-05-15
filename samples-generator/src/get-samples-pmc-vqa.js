import { readFileSync, writeFileSync } from "fs";
import { parse } from "csv-parse/sync";
import { shuffleArray } from "./helpers/random.js";
import { execSync } from "child_process";
import { RANDOM_SEED } from "./config/environment.js";

const NUM_OF_SAMPLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SAMPLE_LENGTH = 40;
const DATASET = "pmc-vqa";

const rawData = readFileSync("../datasets/pmc-vqa/train_2.csv", "utf-8");

const data = parse(rawData, {
    columns: true,
    skip_empty_lines: true,
});

NUM_OF_SAMPLES.forEach((sampleNumber) => {
    const sample = shuffleArray(data, RANDOM_SEED).slice(0, SAMPLE_LENGTH);

    sample.forEach((element) => {
        const imagePath = `images_2/figures/${element.Figure_path}`;
        execSync(
            `bash src/bash/save-element.sh ${DATASET} ${imagePath} ${sampleNumber} `,
            {
                stdio: "inherit",
                encoding: "utf-8",
            }
        );
    });
    writeFileSync(
        `../samples/${DATASET}/${sampleNumber}/sample.json`,
        JSON.stringify(sample),
        "utf-8"
    );
});
