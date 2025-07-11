import { readFileSync, writeFileSync } from "fs";
import { shuffleArray } from "./helpers/random.js";
import { execSync } from "child_process";
import { RANDOM_SEED } from "./config/environment.js";

const CLOSED_SAMPLES_NUMBER = [1];
const OPEN_SAMPLES_NUMBER = [1];
const SAMPLE_LENGTH = 150;
const DATASET = "vqa-rad";

const rawData = readFileSync("../../datasets/vqa-rad/vqa-rad.json", "utf-8");
const vqaRad = JSON.parse(rawData);

const groupedByQuestionType = Object.groupBy(
    vqaRad,
    ({ answer_type }) => answer_type
);

const openEnded = groupedByQuestionType.OPEN;
const closedEnded = groupedByQuestionType.CLOSED;

CLOSED_SAMPLES_NUMBER.forEach((sampleNumber) => {
    const sample = shuffleArray(closedEnded, RANDOM_SEED).slice(
        0,
        SAMPLE_LENGTH
    );

    sample.forEach((element) => {
        const imagePath = `images/${element.image_name}`;

        execSync(
            `bash src/bash/save-image.sh ${DATASET} ${imagePath} "closed" ${sampleNumber} `,
            {
                stdio: "inherit",
                encoding: "utf-8",
            }
        );
    });
    writeFileSync(
        `../../samples/${DATASET}/closed/${sampleNumber}/sample.json`,
        JSON.stringify(sample),
        "utf-8"
    );
});

OPEN_SAMPLES_NUMBER.forEach((sampleNumber) => {
    const sample = shuffleArray(openEnded, RANDOM_SEED).slice(0, SAMPLE_LENGTH);

    sample.forEach((element) => {
        const imagePath = `images/${element.image_name}`;

        execSync(
            `bash src/bash/save-image.sh ${DATASET} ${imagePath} "open" ${sampleNumber}`,
            {
                stdio: "inherit",
                encoding: "utf-8",
            }
        );
    });
    writeFileSync(
        `../../samples/${DATASET}/open/${sampleNumber}/sample.json`,
        JSON.stringify(sample),
        "utf-8"
    );
});
