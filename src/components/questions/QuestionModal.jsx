import { useEffect } from "react";
import { X } from "lucide-react";
import QuestionForm from "./QuestionForm";

const QuestionModal = ({
  isOpen,
  question,
  onClose,
  onSubmit,
}) => {
  useEffect(() => {
    if(!isOpen) return;

    const handleKeyDown = (event) => {
        if(event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose])

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl sm:rounded-2xl sm:p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="question-modal-title"
              className="text-xl font-semibold text-white"
            >
              {question ? "Edit Question" : "Add New Question"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {question
                ? "Update your question details."
                : "Add a question to your preparation tracker."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <QuestionForm
          key={question?.id ?? "new-question"}
          initialData={question}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </section>
    </div>
  );
};

export default QuestionModal;