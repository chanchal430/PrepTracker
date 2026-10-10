import StatsGrid from "../components/dashboard/StatsGrid";
import ProgressBar from "../components/dashboard/ProgressBar";
import RecentQuestions from "../components/dashboard/RecentQuestions";
import { useQuestions } from "../context/QuestionContext";
import { getStats } from "../utils/stats";

const Dashboard = () => {
  const { questions } = useQuestions();
  const stats = getStats(questions);

  return (
    <>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="mt-1 text-sm text-slate-400">
        Track your interview preparation progress.
      </p>

      <StatsGrid stats={stats}/>

      <div className="mt-8">
        <ProgressBar
          percentage={stats.percentage}
          total={stats.total}
          completed={stats.completed}
        />
      </div>

      <RecentQuestions questions={questions} />
    </>
  );
};

export default Dashboard;