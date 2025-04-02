# Multimodal ChatGPT for Medical Applications: an Experimental Study of GPT-4V

# 1 Introduction

The new GPT-4 with Vision model may have a potential for VQA, specially processing information in a question and answer format.

## 1.1 Analysis Dimensions

-   Recognize the used modalities, such as X-Ray, MRI, or microscopy
-   Notion of localization
-   The precision with which GPT-4V gauges the dimensions of regions of interest
-   Should combine image and textual descriptions
-   Assurance in its responses
-   Construction of optimal prompts

## 1.2 Highlights

Findings related to the analysis dimensions, mentioned previously

## 1.3 Contributions

-   A precise analysis of GPT-4V performance in VQA
-   Empirical results suggest that GPT-4V should not be employed for practical diagnostic purposes
-   Seven distinct dimensions of GPT-4V's operational capabilities within the medical VQA context

# 2 Experimental Setup

Zero-shot questions using ChatGPT webpage  
Accuracy metric was used  
For closed-ended questions, the metric gauges the consistency of GPT-4V's answers with factual accuracy  
For open-ended queries, it assesses how often GPT-4V's responses contain the correct information

## Criteria

-   It should directly answer the question and provide the correct response
-   It does not refuse to answer the questions
-   It should be devoid of ambiguity
-   It needs to provide comprehensive answers
-   Multi-round conversations are not permissible
-   Only one single response from GPT-4V, a virtual doctor like GPT-4V cannot be afforded a second chance

## Dataset

133 samples meticulously selected  
56 from VQA-RAD and PMC-VQA  
77 from PathVQA

# 3 Data Collection

## 3.1 Pathology

63 randomly selected pathology images, 77 high quality questions manually selected from teh corresponding question set  
Diversity of the data ensured

Question categories:

-   Anatomical Structures: specific organs or tissues within the body
-   Lesion and Abnormality Detection: identification of unusual imaging findings
-   Disease Diagnosis: determine specific medical conditions from given findings
-   Temporal and History-Related Effects: progression or changes over time
-   Spatial Relationships: relative positioning of structures or abnormalities within the body
-   Contrast Agents and Staining: use and interpretation of imaging contrasts or histologial stains
-   Microscopic Features: detail observations made at a cellular level
-   Pathophysiological Mechanisms and Manifestations: underpinnings and outcomes of diseases

## 3.2 Radiology

56 samples  
37 from VQA-RAD  
19 from PMC-VQA

Question categories:

...

# 4 Experimental Results

It shows charts with bad results  
It then examines specific cases and interprets various characteristics of the model
