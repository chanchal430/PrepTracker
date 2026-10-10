const StatsCards = ({ title, value, description }) => {
  return (
    <div className="min-w-0 rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-center transition-colors hover:border-slate-700 sm:p-4 sm:text-left lg:p-5">
      <p className="text-xs font-medium text-slate-400 sm:text-sm">
        {title}
      </p>

      <p className="mt-2 wrap-break-words text-2xl font-bold text-white sm:text-3xl">
        {value}
      </p>

      <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
        {description}
      </p>
    </div>
  );
};

export default StatsCards;