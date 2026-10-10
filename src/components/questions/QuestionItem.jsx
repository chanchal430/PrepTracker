import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import WeekTag from "../common/WeekTag";

const statusStyles = {
  Completed: "bg-green-500/10 text-green-400",
  "In Progress": "bg-blue-500/10 text-blue-400",
  Pending: "bg-slate-700 text-slate-300",
};

const QuestionItem = ({ question, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(question.id);
    setShowConfirm(false);
  };

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <div className="flex gap-4  sm:items-center justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="wrap-break-words font-semibold leading-6 text-white">
            {question.title}
          </h3>

          <p className="mt-1.5 text-sm text-slate-400">
            {question.category}
            <span className="px-1.5 text-slate-600">·</span>
            {question.difficulty}
          </p>

          <WeekTag question={question} />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[question.status] ?? statusStyles.Pending
            }`}
          >
            {question.status}
          </span>

          <button
            type="button"
            onClick={() => onEdit(question)}
            aria-label={`Edit ${question.title}`}
            className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:bg-slate-800"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            aria-label={`Delete ${question.title}`}
            className="rounded-lg border border-slate-700 p-2 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <p className="text-sm text-slate-200">
            Delete <strong>{question.title}</strong>? This cannot be undone.
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default QuestionItem;
