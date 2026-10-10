import { isThisWeek } from "../../utils/dates";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function WeekTag({ question }) {
  const addedThisWeek = isThisWeek(question.createdAt);

  const completedThisWeek =
    question.status === "Completed" &&
    isThisWeek(question.completedAt);

  if (!addedThisWeek && !completedThisWeek) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {addedThisWeek && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[11px] font-medium text-purple-300">
          <Sparkles size={12} />
          New this week
        </span>
      )}

      {completedThisWeek && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
          <CheckCircle2 size={12} />
          Done this week
        </span>
      )}
    </div>
  );
}