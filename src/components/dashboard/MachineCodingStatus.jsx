import { useQuestions } from "../../context/QuestionContext";
import { MACHINE_CODING_STATUSES } from "../../utils/constants";

const statusStyles = {
  "Not Started": "text-slate-400",
  "In Progress": "text-yellow-400",
  Completed: "text-green-400",
};

export default function MachineCodingStatus() {
  const { machineCoding, updateMachineCoding } = useQuestions();

  return (
    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-center transition-colors hover:border-slate-700 sm:p-4 sm:text-left lg:p-5">
      <p className="text-sm text-slate-400">Machine Coding</p>
      <p className={`mt-1 text-xl font-semibold ${statusStyles[machineCoding.status]}`}>
        {machineCoding.status}
      </p>

      <select
        value={machineCoding.status}
        onChange={(e) => updateMachineCoding(e.target.value)}
        aria-label="Machine coding status"
        className="mt-3 w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm"
      >
        {MACHINE_CODING_STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}