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

const saveSample = (sample, type, sampleNumber) => {
    sample.forEach((element) => {
        const imagePath = `images/${element.image_name}`;

        execSync(
            `bash src/bash/save-image.sh ${DATASET} ${imagePath} ${type} ${sampleNumber}`,
            {
                stdio: "inherit",
                encoding: "utf-8",
            }
        );
    });
    writeFileSync(
        `../../samples/${DATASET}/${type}/${sampleNumber}/sample.json`,
        JSON.stringify(sample),
        "utf-8"
    );
};

CLOSED_SAMPLES_NUMBER.forEach((sampleNumber) => {
    const sample = shuffleArray(closedEnded, RANDOM_SEED).slice(
        0,
        SAMPLE_LENGTH
    );
    saveSample(sample, "closed", sampleNumber);
});

const closedEndedPopulation = shuffleArray(closedEnded, RANDOM_SEED);
saveSample(closedEndedPopulation, "closed", "population");

OPEN_SAMPLES_NUMBER.forEach((sampleNumber) => {
    const sample = shuffleArray(openEnded, RANDOM_SEED).slice(0, SAMPLE_LENGTH);
    saveSample(sample, "open", sampleNumber);
});

const openEndedPopulation = shuffleArray(openEnded, RANDOM_SEED);
saveSample(openEndedPopulation, "open", "population");
