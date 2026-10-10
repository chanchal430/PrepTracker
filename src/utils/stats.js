// pure functions that compute dashboard numbers
export function getStats(questions) {
  const completed = questions.filter((q) => q.status === "Completed");

  return {
    total: questions.length,
    completed,
    completedDSAQuestion: completed.filter((q) => q.category === "DSA").length,
    completedInterviewQuestion: completed.filter((q) => q.category !== "DSA").length,
    percentage: questions.length === 0 ? 0 : Math.round((completed.length / questions.length) * 100),
  };
}