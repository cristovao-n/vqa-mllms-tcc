import { readFileSync, writeFileSync } from "fs";
import { shuffleArray } from "./helpers/random.js";
import { execSync } from "child_process";
import { RANDOM_SEED } from "./config/environment.js";

const NUM_OF_SAMPLES = [1];
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

NUM_OF_SAMPLES.forEach((sampleNumber) => {
    const vqaRadSampleOpenEnded = shuffleArray(openEnded, RANDOM_SEED).slice(
        0,
        SAMPLE_LENGTH
    );

    const vqaRadSampleClosedEnded = shuffleArray(
        closedEnded,
        RANDOM_SEED
    ).slice(0, SAMPLE_LENGTH);

    const sample = [...vqaRadSampleOpenEnded, ...vqaRadSampleClosedEnded];

    sample.forEach((vqaRad) => {
        const imagePath = `images/${vqaRad.image_name}`;

        execSync(
            `bash src/bash/save-element.sh ${DATASET} ${imagePath} ${sampleNumber} `,
            {
                stdio: "inherit",
                encoding: "utf-8",
            }
        );
        writeFileSync(
            `../../samples/${DATASET}/${sampleNumber}/sample.json`,
            JSON.stringify(sample),
            "utf-8"
        );
    });
});
