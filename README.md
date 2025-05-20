# tcc

## Module 1: samples-generator

### VQA-RAD

select 5 samples of open-ended questions and 5 samples of closed-ended questions. Each sample containing 40 random rows from VQA-RAD dataset  
Data: qid, phrase_type, qid_linked_id, image_case_url, image_name, image_organ, evaluation, question, question_rephrase, question_relation, question_frame, question_type, answer, answer_type

### PathVQA

select 5 samples of open-ended questions and 5 samples of closed-ended questions. Each sample containing 40 random rows from PathVQA dataset  
Data: image, question, answer, answer_type

### PMC-VQA

select 10 samples of multi-choices questions. Each sample containing 40 random rows from PMC-VQA dataset  
Data: index, Figure_path, Caption, Question, Choice, Choice, Choice, Choice, Answer, split

Extra columns:

-   image type: pathology or radiology (it is possible to assign it according to the dataset)

## Module 2: Langchain

Do the experiment for all models using their APIs (pass the image and the question)
Models under test:

    GPT 4oV
    Gemini 2.0
    LLama 4 or LLama 3.2

Save in the table the model_answer and the model

Evaluate the results manually according to these criteria:

    Should directly answer the question and provide the correct response.

    Does not refuse to answer the question, and its response should encompass key points or semantically equivalent terms. Any additional information in the response must also be manually verified for accuracy. This criterion is particularly applicable to open-ended questions.

    Responses should be devoid of ambiguity. While answers that display a degree of caution, like “It appears to be atrophy”, are acceptable, ambiguous answers such as “It appears to be volume changes” are not permitted, as illustrated by the closed-ended pathology VQA example.

    Needs to provide comprehensive answers. For instance, if the prompt is “In which two ventricles... ” and it mentions only one, the answer is considered incorrect.

Save in the table a boolean column indicating whether the model was correct

## Module 3: Displaying results

Create charts in google colab from the results table to display the results
