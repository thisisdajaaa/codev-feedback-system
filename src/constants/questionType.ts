interface IQuestionTypeItem {
  sortOrder: number;
  name: string;
}

interface IQuestionTypeInfo {
  code: string;
  name: string;
  options: IQuestionTypeItem[];
}

export const QuestionType: { [key: string]: IQuestionTypeInfo } = {
  Rating: {
    code: "Rating",
    name: "Rating (1 - 5)",
    options: [
      { sortOrder: 1, name: "1" },
      { sortOrder: 2, name: "2" },
      { sortOrder: 3, name: "3" },
      { sortOrder: 4, name: "4" },
      { sortOrder: 5, name: "5" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Satisfaction-Scale": {
    code: "Satisfaction-Scale",
    name: "Satisfaction Scale (Very dissatisfied - Very satisfied)",
    options: [
      { sortOrder: 1, name: "Very dissatisfied" },
      { sortOrder: 2, name: "Dissatisfied" },
      { sortOrder: 3, name: "Neither" },
      { sortOrder: 4, name: "Satisfied" },
      { sortOrder: 5, name: "Very satisfied" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Likelihood-Scale": {
    code: "Likelihood-Scale",
    name: "Likelihood Scale (Very unlikely - Very likely)",
    options: [
      { sortOrder: 1, name: "Very unlikely" },
      { sortOrder: 2, name: "Unlikely" },
      { sortOrder: 3, name: "Neutral" },
      { sortOrder: 4, name: "Likely" },
      { sortOrder: 5, name: "Very satisfied" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Concern-Scale": {
    code: "Concern-Scale",
    name: "Level of Concern (Very unconcerned - Very concerned)",
    options: [
      { sortOrder: 1, name: "Very unconcerned" },
      { sortOrder: 2, name: "Unconcerned" },
      { sortOrder: 3, name: "Neutral" },
      { sortOrder: 4, name: "Concerned" },
      { sortOrder: 5, name: "Very concerned" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Agreement-Scale": {
    code: "Agreement-Scale",
    name: "Agreement Scale (Strongly disagree - Strongly agree)",
    options: [
      { sortOrder: 1, name: "Strongly disagree" },
      { sortOrder: 2, name: "Disagree" },
      { sortOrder: 3, name: "Neither" },
      { sortOrder: 4, name: "Agree" },
      { sortOrder: 5, name: "Strongly agree" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Frequency-Scale": {
    code: "Frequency-Scale",
    name: "Frequency Scale (Never - Always)",
    options: [
      { sortOrder: 1, name: "Never" },
      { sortOrder: 2, name: "Rarely" },
      { sortOrder: 3, name: "Sometimes" },
      { sortOrder: 4, name: "Often" },
      { sortOrder: 5, name: "Always" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Awareness-Scale": {
    code: "Awareness-Scale",
    name: "Awareness Scale (Very unaware - Very aware)",
    options: [
      { sortOrder: 1, name: "Very unaware" },
      { sortOrder: 2, name: "Unaware" },
      { sortOrder: 3, name: "Neither" },
      { sortOrder: 4, name: "Aware" },
      { sortOrder: 5, name: "Very aware" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Familiarity-Scale": {
    code: "Familiarity-Scale",
    name: "Familiarity Scale (Very unfamiliar - Very familiar)",
    options: [
      { sortOrder: 1, name: "Very unfamiliar" },
      { sortOrder: 2, name: "Unfamiliar" },
      { sortOrder: 3, name: "Somewhat familiar" },
      { sortOrder: 4, name: "Familiar" },
      { sortOrder: 5, name: "Very familiar" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Quality-Scale": {
    code: "Quality-Scale",
    name: "Quality Scale (Very poor - Very good)",
    options: [
      { sortOrder: 1, name: "Very poor" },
      { sortOrder: 2, name: "Poor" },
      { sortOrder: 3, name: "Acceptable" },
      { sortOrder: 4, name: "Good" },
      { sortOrder: 5, name: "Very good" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Importance-Scale": {
    code: "Importance-Scale",
    name: "Importance Scale (Very unimportant - Very important)",
    options: [
      { sortOrder: 1, name: "Very unimportant" },
      { sortOrder: 2, name: "Unimportant" },
      { sortOrder: 3, name: "Neutral" },
      { sortOrder: 4, name: "Important" },
      { sortOrder: 5, name: "Very important" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Age-Range": {
    code: "Age-Range",
    name: "Age Range (Under 18 - 65+)",
    options: [
      { sortOrder: 1, name: "Under 18" },
      { sortOrder: 2, name: "18 - 24" },
      { sortOrder: 3, name: "25 - 34" },
      { sortOrder: 4, name: "35 - 44" },
      { sortOrder: 5, name: "45 - 54" },
      { sortOrder: 6, name: "55 - 64" },
      { sortOrder: 7, name: "65+" },
    ] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Custom-Sigle": {
    code: "Custom-Single",
    name: "Custom Single Choice",
    options: [] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Custom-Multiple": {
    code: "Custom-Multiple",
    name: "Custom Multiple Choice",
    options: [] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Text-Input": {
    code: "Text-Input",
    name: "Text Input",
    options: [] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
  "Text-Area": {
    code: "Text-Area",
    name: "Text Area",
    options: [] as IQuestionTypeItem[],
  } as IQuestionTypeInfo,
};
