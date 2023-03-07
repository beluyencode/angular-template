export interface CheckGrammarFeedbackType {
    context: string;
    error_grammar: string;
    feedback_grammar: string;
    feedback_grammar_suggestion: Array<string>;
    isDismiss: boolean;
}

export interface WritingAiResType {
    check_grammar_feedback: CheckGrammarFeedbackType[];
    error_grammar_count_total: number;
    error_grammar_percent: string;
    jsonrpc: string;
    message: string;
    status: Number;
}
