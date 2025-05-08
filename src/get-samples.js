import { readFileSync } from "fs";
import { shuffleArray } from "./helpers/random.js";

const VQA_RAD_LENGTH = 40;

const rawData = readFileSync("datasets/vqa-rad/vqa-rad.json", "utf-8");
const vqaRad = JSON.parse(rawData);

const groupedByQuestionType = Object.groupBy(
    vqaRad,
    ({ answer_type }) => answer_type
);

const openEnded = groupedByQuestionType.OPEN;
const closedEnded = groupedByQuestionType.CLOSED;

const vqaRadSample = [
    ...shuffleArray(openEnded, "vqa-rad").slice(0, VQA_RAD_LENGTH / 2),
    ...shuffleArray(closedEnded, "vqa-rad").slice(0, VQA_RAD_LENGTH / 2),
];

// move json to stratified-sample folder with the images


console.log(vqaRadSample);
