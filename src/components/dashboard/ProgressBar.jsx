const ProgressBar = ({ total, percentage, completed }) => {
    
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 mt-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Overall Progress</h2>
          <p className="text-sm text-slate-400">Keep up your preparation!</p>
        </div>
        <span className="text-2xl font-bold text-green-400">{percentage}%</span>
      </div>

      {/* Progress track */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label="Question Completion Progress" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-green-500 transition-all duration-500" style={{ width: `${percentage}%` }}/>
      </div>
      <p className="mt-3 text-sm text-slate-400">{completed.length} of {total} questions completed</p>
    </div>
  );
};

export default ProgressBar;
