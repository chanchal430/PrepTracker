import { useForm } from "react-hook-form";
import { STATUSES, CATEGORIES, DIFFICULTIES } from "../../utils/constants";
import { useEffect } from "react";

const QuestionForm = ({ initialData, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      category: "DSA",
      difficulty: "Easy",
      status: "Pending",
    },
  });

  useEffect(() => {
    reset({
      title: initialData?.title ?? "",
      category: initialData?.category ?? "DSA",
      difficulty: initialData?.difficulty ?? "Easy",
      status: initialData?.status ?? "Pending",
    });
  }, [initialData, reset]);

  const submitHandler = async (data) => {
    await onSubmit({
      ...data,
      title: data.title.trim(),
    });

    reset();
  };

  const fieldClass =
    "mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-500";

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label htmlFor="title" className="text-sm font-medium text-slate-300 ">
          Question Title
        </label>
        <input
          id="title"
          {...register("title", {
            required: "Title is Required",
            validate: (value) => 
              value.trim().length >= 3 ||
                "Title should be at least 3 character long"
            ,
          })}
          type="text"
          placeholder="Title"
          className={fieldClass}
        />
        {errors.title && (
          <p className="mt-1 text-red-400 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="category"
            className="text-sm font-medium text-slate-300"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", {
              required: "Category is Required",
            })}
            className={fieldClass}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-red-400 text-sm">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="difficulty"
            className="text-sm font-medium text-slate-300"
          >
            Difficulty
          </label>
          <select
            id="difficulty"
            {...register("difficulty", {
              required: "Difficulty is Required",
            })}
            className={fieldClass}
          >
            {DIFFICULTIES.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
          {errors.difficulty && (
            <p className="mt-1 text-red-400 text-sm">
              {errors.difficulty.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="status" className="text-sm font-medium text-slate-300">
          Status
        </label>
        <select id="status" {...register("status")} className={fieldClass}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {
            isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Add Questions"
          }
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
