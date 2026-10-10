import { Search, X } from "lucide-react";

const Filters = ({ filters, onChange, onClear, hasActiveFilters }) => {
  const selectClass =
    "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500";

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder="Search questions..."
          aria-label="Search questions"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* Dropdown filters */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <select
          aria-label="Filter By Category"
          value={filters.category}
          onChange={(e) => onChange("category", e.target.value)}
          className={selectClass}
        >
          <option value="All">All Categories</option>
          <option value="DSA">DSA</option>
          <option value="Git">Git</option>
          <option value="Technical">Technical</option>
        </select>

        <select
          aria-label="Filter by difficulty"
          value={filters.difficulty}
          onChange={(e) => onChange("difficulty", e.target.value)}
          className={selectClass}
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          aria-label="Filter by status"
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
          className={selectClass}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300"
        >
          <X size={15} />
          Clear filters
        </button>
      )}
    </div>
  );
};

export default Filters;
