import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import QuestionsPage from "../pages/QuestionsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "/questions",
                element: <QuestionsPage />
            }
        ]
    }
])

const AppRouter = () => {
    return <RouterProvider router={router}/>
};

export default AppRouter;