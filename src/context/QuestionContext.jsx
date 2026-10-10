import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MACHINE_CODING_STATUSES } from "../utils/constants";

// 1. Create: store with empty value so components can read
const QuestionContext = createContext(null);

// 2. Provide: holds the states and shares everything with inside
export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useLocalStorage("questions", []);
  const [machineCoding, setMachineCoding] = useLocalStorage("machineCoding", {
    status: MACHINE_CODING_STATUSES[0],
  });

  const addQuestion = (data) => {
    const newQuestion = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      category: data.category,
      difficulty: data.difficulty,
      status: data.status,
      createdAt: Date.now(),
      completedAt: data.status === "Completed" ? Date.now() : null,
    };

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const updateQuestion = (id, data) => {
    setQuestions((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const becameCompleted =
          data.status === "Completed" && item.status !== "Completed";

        const leftCompleted = data.status !== "Completed";

        return {
          ...item,
          ...data,
          title: data.title.trim(),
          completedAt: becameCompleted
            ? Date.now()
            : leftCompleted
            ? null
            : item.completedAt,
        };
      }),
    );
  };

  const updateStatus = (id, status) => {
    setQuestions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              completedAt: status === "Completed" ? Date.now() : null,
            }
          : item,
      ),
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((item) => item.id !== id));
  };

  const updateMachineCoding = (status) => {
    setMachineCoding({ status });
  };

  const value = {
    questions,
    machineCoding,
    addQuestion,
    updateQuestion,
    updateStatus,
    deleteQuestion,
    updateMachineCoding,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

// 3. Consume: so components doesn't touch context directly
export const useQuestions = () => {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error("useContext must be used inside <QuestionProvider/>");
  }

  return context;
};
