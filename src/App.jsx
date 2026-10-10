import Sidebar from "./components/common/Sidebar";
import { Menu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // close on escape and lock scroll when opened
  useEffect(() => {
    if (!isDrawerOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-64 md:shrink-0">
          <div className="fixed inset-y-0 left-0 w-64">
            <Sidebar onNavigate={() => setIsDrawerOpen(false)} />
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`fixed inset-0 z-40 md:hidden ${
            isDrawerOpen ? "" : "pointer-events-none"
          }`}
          aria-hidden={!isDrawerOpen}
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
              isDrawerOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Panel */}
          <aside
            className={`absolute inset-y-0 left-0 w-64 bg-slate-900 shadow-xl transition-transform duration-300 ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar onNavigate={() => setIsDrawerOpen(false)} />
          </aside>
        </div>

        {/* main */}
        <main className="min-w-0 flex-1 md:ml-0">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur-md md:hidden">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
                <Sparkles size={17} />
              </div>

              <h1 className="text-base font-bold tracking-tight text-white">
                PrepTracker
              </h1>
            </div>

            <div className="w-10" aria-hidden="true" />
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
