# Methodology

## Algorithm 1:

for i in range(5):

  select 80 random rows from PathVQA dataset (image, question, expected_answer)
  select 40 random rows from VQA-RAD dataset (image, question, expected_answer)
  select 40 random rows from PMC-VQA dataset (image, question, choices, expected_answer)

  Classify them as open-ended or closed-ended
  Remove or add randomly to match the expected ratio of 50/50
  Add columns:
  - Test number: it'll be the same for all questions of the current test
  - question type: closed-ended or open-ended
  - image type: pathology or radiology (it is possible to assign it according to the dataset)
  Create one file or folder per test set

## Algorithm 2:

for test in tests:
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

Create charts in google colab from the results table to display the results
