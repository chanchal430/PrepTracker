const EmptyState = ({ title, message, action }) => {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 p-10 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{message}</p>
      {action}
    </div>
  );
};

export default EmptyState;