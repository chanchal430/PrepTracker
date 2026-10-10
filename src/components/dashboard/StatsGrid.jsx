import MachineCodingStatus from "./MachineCodingStatus";
import StatsCards from "./StatsCards";

const StatsGrid = ({ stats }) => {
  const cards = [
    {
      title: "Total Questions",
      value: stats.total,
      description: "All tracked questions",
    },
    {
      title: "DSA Completed",
      value: stats.completedDSAQuestion,
      description: "Problems solved",
    },
    {
      title: "Interview Questions",
      value: stats.completedInterviewQuestion,
      description: "Questions completed",
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatsCards
          key={card.title}
          title={card.title}
          value={card.value}
          description={card.description}
        />
      ))}
      <MachineCodingStatus />
    </div>
  );
};

export default StatsGrid;
