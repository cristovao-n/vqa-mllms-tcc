import { readFileSync, writeFileSync } from "fs";
import { parse } from "csv-parse/sync";
import { shuffleArray } from "./helpers/random.js";
import { execSync } from "child_process";
import { RANDOM_SEED } from "./config/environment.js";

const NUM_OF_SAMPLES = [1, 2, 3, 4, 5];
const SAMPLE_LENGTH = 40;
const DATASET = "path-vqa";

const rawData = readFileSync(
    "../datasets/path-vqa/trainrenamed_gpt.csv",
    "utf-8"
);

const data = parse(rawData, {
    columns: true,
    skip_empty_lines: true,
});

const groupedByQuestionType = Object.groupBy(
    data,
    ({ answer_type }) => answer_type
);

const openEnded = groupedByQuestionType.OPEN;
const closedEnded = groupedByQuestionType.CLOSED;

NUM_OF_SAMPLES.forEach((sampleNumber) => {
    const sampleOpenEnded = shuffleArray(openEnded, RANDOM_SEED).slice(
        0,
        SAMPLE_LENGTH
    );

    const sampleClosedEnded = shuffleArray(closedEnded, RANDOM_SEED).slice(
        0,
        SAMPLE_LENGTH
    );

    [sampleOpenEnded, sampleClosedEnded].forEach((group) => {
        group.forEach((element) => {
            const imagePath = `train/${element.image}.png`;
            const sampleName = `${element.answer_type.toLowerCase()}${sampleNumber}`;

            execSync(
                `bash src/bash/save-element.sh ${DATASET} ${imagePath} ${sampleName} `,
                {
                    stdio: "inherit",
                    encoding: "utf-8",
                }
            );
            writeFileSync(
                `../samples/${DATASET}/${sampleName}/sample.json`,
                JSON.stringify(group),
                "utf-8"
            );
        });
    });
});

console.dir(groupedByQuestionType, { depth: 1 });
