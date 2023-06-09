export const QUESTIONNAIRE_MESSAGES = {
  ERROR: {
    INVALID_DATE_FORMAT: "Invalid ISO 8601 date string",
    MISSING_DATE: "Missing Date From or Date To",
    INCORRECT_DATE_RANGE: "Date To must be later than Date From",
    INVALID_QUESTION_TYPE: "Invalid question type",
    EMPTY_QUESTIONNAIRE: "Questionnaire must have a question",
    TITLE_IS_REQUIRED: "Title field is required",
    DEPARTMENT_IS_REQUIRED: "Department field is required",
    TEMPLATE_NOT_FOUND: "Template not found",
    QUESTION_NOT_FOUND: "Question not found",
  },
  SUCCESS: {
    ALL: "Successfully retrieve questionnaires!",
    CREATE: "Successfully created questionnaire!",
    CREATED_QUESTION: "Successfully created question!",
    DELETED: "Successfully deleted questionnaire!",
    DELETED_QUESTION: "Successfully deleted question!",
    SINGLE: "Successfully retrieved questionnaire!",
    UPDATED_STATUS: "Successfully updated questionnaire status!",
  },
};
