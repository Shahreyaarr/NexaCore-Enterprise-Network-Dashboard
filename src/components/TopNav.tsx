import { Bell, Search, User, CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

export function TopNav() {
  const location = useLocation();
  
  // Format the path to look like breadcrumbs
  const path = location.pathname === "/" ? "Overview" : location.pathname.substring(1).charAt(0).toUpperCase() + location.pathname.substring(2);

  return (
    <header className="flex h-14 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 lg:h-[60px]">
      <div className="flex flex-1 items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-[var(--color-text-secondary)]">Enterprise Network</span>
          <span className="text-sm font-semibold">{path.replace("-", " ")}</span>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search resources..."
            className="w-full rounded-md border border-[var(--color-border)] bg-gray-50 pl-9 pr-4 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>98.7% Operational</span>
        </div>
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-600"></span>
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
          <User className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
