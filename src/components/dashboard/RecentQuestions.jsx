import EmptyState from "../common/EmptyState";
import { NavLink } from "react-router";
import { ArrowRight } from "lucide-react";
import WeekTag from "../common/WeekTag";

const RecentQuestions = ({ questions }) => {
  const recentQuestions = [...questions]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);

  return (
    <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-5 flex flex-col gap-3 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent Questions</h2>
          <p className="mt-1 text-sm text-slate-400">
            Your latest tracked questions
          </p>
        </div>

        <NavLink
          to="/questions"
          className="w-fit shrink-0 text-sm font-medium text-purple-400 transition hover:text-purple-300 flex gap-1 items-center"
        >
          <span>View all</span> <ArrowRight size={18} />
        </NavLink>
      </div>

      {recentQuestions.length === 0 ? (
        <EmptyState
          title="No Questions Yet"
          message="Start Tracking Your Interview Preparation By Adding Your First Question"
        />
      ) : (
        <div className="space-y-3">
          {recentQuestions.map((question) => (
            <div
              key={question.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-slate-800 p-4 sm:items-center"
            >
              <div className="min-w-0 flex-1">
                <h3 className="wrap-break-words font-medium text-white">
                  {question.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {question.category} · {question.difficulty}
                </p>

                <WeekTag question={question} />
              </div>

              <span className="shrink-0 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {question.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentQuestions;
