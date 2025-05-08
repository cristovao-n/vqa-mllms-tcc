import { readFileSync, writeFileSync } from "fs";
import { shuffleArray } from "./helpers/random.js";
import { execSync } from "child_process";

const NUM_OF_SAMPLES = [1, 2, 3, 4, 5];

const VQA_RAD_LENGTH = 40;
const dataset = "vqa-rad";

const rawData = readFileSync("datasets/vqa-rad/vqa-rad.json", "utf-8");
const vqaRad = JSON.parse(rawData);

const groupedByQuestionType = Object.groupBy(
    vqaRad,
    ({ answer_type }) => answer_type
);

const openEnded = groupedByQuestionType.OPEN;
const closedEnded = groupedByQuestionType.CLOSED;

NUM_OF_SAMPLES.forEach((sampleNumber) => {
    const vqaRadSample = [
        ...shuffleArray(openEnded, `${dataset}${sampleNumber}`).slice(
            0,
            VQA_RAD_LENGTH / 2
        ),
        ...shuffleArray(closedEnded, `${dataset}${sampleNumber}`).slice(
            0,
            VQA_RAD_LENGTH / 2
        ),
    ];

    vqaRadSample.forEach((vqaRad) => {
        `datasets/vqa-rad/images/${vqaRad.image_name}`;
        execSync(
            `bash src/bash/create-sample.sh ${vqaRad.image_name} ${sampleNumber} ${dataset}`,
            {
                stdio: "inherit",
                encoding: "utf-8",
            }
        );
    });
    writeFileSync(
        `stratified-sample/${sampleNumber}/${dataset}/sample.json`,
        JSON.stringify(vqaRadSample),
        "utf-8"
    );
});
