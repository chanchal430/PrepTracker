import EmptyState from "../common/EmptyState";
import QuestionItem from "./QuestionItem";

const QuestionList = ({
  questions,
  hasQuestions,
  hasActiveFilters,
  onEdit,
  onDelete,
  onClearFilters,
  onAdd,
}) => {
  if (!hasQuestions) {
    return (
      <EmptyState
        title="No questions yet"
        message="Add your first question to start tracking your preparation."
        action={
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-purple-500"
          >
            Add your first question
          </button>
        }
      />
    );
  }

  if (questions.length === 0 && hasActiveFilters) {
    return (
      <EmptyState
        title="No matching questions"
        message="Try changing your search or filters."
        action={
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Clear filters
          </button>
        }
      />
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-white">All Questions</h2>
        <span className="text-sm text-slate-400">
          {questions.length} {questions.length === 1 ? "question" : "questions"}
        </span>
      </div>

      <div className="space-y-3">
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestionList;