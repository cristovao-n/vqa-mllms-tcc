# 3 Medical VQA

## 3.1 Task Descriptions

### Common VQA architecture

(Image Encoder, Question Encoder) -> (Feature Fusion) -> (Answer Classification, Answer Generation)

QA settings can be open-ended or closed-ended  
Closed-ended ones have limited answer
choices and can be treated as classification tasks.  
Open-ended ones are more challenging, requiring
a broader understanding and free-form responses.

## 3.2 Enhanced Image Encoding

The limited medical data and lack of annotations restrict pre-training on medical VQA datasets.  
Enhancing pre-training methods is a key research focus in medical VQA.  
The state of the art has been using contrastive learning, meta-learning and multi-task learning.

### 3.2.1 Contrastive Learning

Techniques used by recent works:  
pretraining-finetuning paradigm with a self-supervised framework, incorporating contrastive loss, masked language modeling, and image-text matching.

### 3.2.2 Meta-learning

Due to the high data variance and scarcity, the VQA models tends to overfit  
To address this, researches employ meta-learning to use raw medical data better

### 3.2.3 Multi-task Learning

Multi-task learning can improve the generalization ability of a model by jointly learning on multiple related tasks, which is indicated to be effective for VQA tasks

## 3.4 Fusion Methods

Fusion methods models semantic links between images in order to obtain accurate question answering

### 3.4.1 Attention Mechanism

The attention mechanism mimics human observation by focusing on vital information of the image and crucial regions, filtering out noise and identifying relevant areas

### 3.4.2 Multimodal Pooling

It's a technique used to combine the image and the text features into a single representation

## 3.5 CLosed-ended vs Open-ended

Classification methods are better for closed-ended questions, while generative methods are better for open-ended questions  
Some methods use a switching strategy, using classification for closed-ended and generative for open-ended  
Some studies propose an approach where the image features are converted into learnable tokens that are passed to the language model along with question features

## 3.6 Dataset and Results

The most widely used datasets:

-   VQA-Med
-   VQA-RAD
-   PathVQA
-   SLAKE

## 3.7 Limitations and Insights

### Insufficient data

The datasets used for this purpose are limited, they have low quality and limited scope of data

### Text encoders

The majority of studies focus on innovating image encoders. Fewer studies proposes new methods for text encoders. The limited variety of questions the models can answer suggest that the text encoders could be improved

### Poor generalization

The VQA models often overfits to specific datasets and cannot be easily applied to other datasets

### The lack of context and dialogue

VQA models lack supports for multi-round dialogue, a critical aspect of real-world medical intercations where patients and doctors engage in dynamic, ongoing conversations.  
Currently, these models handle only single questions and responses, without tracking context
