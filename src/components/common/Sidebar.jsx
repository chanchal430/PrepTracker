import {
  LayoutDashboard,
  Settings,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Questions",
    path: "/questions",
    icon: ClipboardList,
  },
];

const Sidebar = ({ onNavigate }) => {
  return (
    <aside className="flex h-screen w-full flex-col border-r border-slate-800 bg-amber-50 p-5 text-slate-800">
      {/* Brand */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-800">
            <Sparkles size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-black">
              PrepTracker
            </h1>
            <p className="mt-0.5 text-xs text-slate-600">
              Interview Preparation
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="mt-8 flex flex-col gap-2">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
          Workspace
        </p>

        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-purple-500/10 text-purple-600"
                  : "text-slate-600 hover:bg-slate-800/70 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-purple-400" />
                )}

                <Icon
                  size={19}
                  className={
                    isActive
                      ? "text-purple-600"
                      : "text-slate-600 transition-colors group-hover:text-slate-600"
                  }
                />

                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto border-t border-slate-800 pt-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-800/70 hover:text-white"
        >
          <Settings size={19} className="text-slate-600" />
          <span>Settings</span>
        </button>

        <p className="mt-4 px-3 text-xs text-slate-600">
          Stay consistent. Keep improving.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;