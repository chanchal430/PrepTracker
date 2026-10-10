import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuestions } from "../context/QuestionContext";
import QuestionModal from "../components/questions/QuestionModal";
import Filters from "../components/questions/Filters";
import QuestionList from "../components/questions/QuestionList";
// import Filters from "../components/Questions/Filters";
// import QuestionList from "../components/Questions/QuestionList";

const initialFilters = {
  search: "",
  category: "All",
  difficulty: "All",
  status: "All",
};

const QuestionsPage = () => {
  const { questions, addQuestion, updateQuestion, deleteQuestion } =
    useQuestions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const openAddModal = () => {
    setSelectedQuestion(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  const openEditModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (selectedQuestion) {
      updateQuestion(selectedQuestion.id, data);
    } else {
      addQuestion(data);
    }

    closeModal();
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(filters.search.toLowerCase().trim()
    )

    const matchesCategory = filters.category === "All" || question.category === filters.category;

    const matchesDifficulty =
      filters.difficulty === "All" ||
      question.difficulty.toLowerCase() ===
        filters.difficulty.toLowerCase();

    const matchesStatus =
      filters.status === "All" || question.status === filters.status;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesStatus
    );
  })

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.category !== "All" ||
    filters.difficulty !== "All" || 
    filters.status !== "All";

  const clearFilters = () => setFilters(initialFilters);
  return (
    <section>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Questions
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage your interview preparation.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 sm:w-auto"
        >
          <Plus size={18} />
          Add Question
        </button>
      </div>

      {/* Search and filters */}
      <Filters
        filters={filters}
        onChange={handleFilterChange}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Question list */}
      <div className="mt-6">
        <QuestionList
          questions={filteredQuestions}
          hasQuestions={questions.length > 0}
          hasActiveFilters={hasActiveFilters}
          onEdit={openEditModal}
          onDelete={deleteQuestion}
          onClearFilters={clearFilters}
          onAdd={openAddModal}
        />
      </div>

      {/* Add/Edit modal */}
      <QuestionModal
        isOpen={isModalOpen}
        question={selectedQuestion}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default QuestionsPage;
