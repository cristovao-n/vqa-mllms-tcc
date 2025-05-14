import 'dotenv/config'

import { readFileSync, writeFileSync } from "fs";
import { shuffleArray } from "./helpers/random.js";
import { execSync } from "child_process";
import { RANDOM_SEED } from './config/environment.js';

const NUM_OF_SAMPLES = [1, 2, 3, 4, 5];

const VQA_RAD_LENGTH = 40;
const dataset = "vqa-rad";

const rawData = readFileSync("../datasets/vqa-rad/vqa-rad.json", "utf-8");
const vqaRad = JSON.parse(rawData);

const groupedByQuestionType = Object.groupBy(
    vqaRad,
    ({ answer_type }) => answer_type
);

const openEnded = groupedByQuestionType.OPEN;
const closedEnded = groupedByQuestionType.CLOSED;

NUM_OF_SAMPLES.forEach((sampleNumber) => {
    const vqaRadSampleOpenEnded = shuffleArray(
        openEnded,
        RANDOM_SEED
    ).slice(0, VQA_RAD_LENGTH);

    const vqaRadSampleClosedEnded = shuffleArray(
        closedEnded,
        RANDOM_SEED
    ).slice(0, VQA_RAD_LENGTH);

    [vqaRadSampleOpenEnded, vqaRadSampleClosedEnded].forEach((vqaRadGroup) => {
        vqaRadGroup.forEach((vqaRad) => {
            const imageName = vqaRad.image_name;
            const sampleName = `${vqaRad.answer_type.toLowerCase()}${sampleNumber}`;

            execSync(
                `bash src/bash/save-element.sh ${dataset} ${imageName} ${sampleName} `,
                {
                    stdio: "inherit",
                    encoding: "utf-8",
                }
            );
            writeFileSync(
                `../samples/${dataset}/${sampleName}/sample.json`,
                JSON.stringify(vqaRadGroup),
                "utf-8"
            );
        });
    });
});
