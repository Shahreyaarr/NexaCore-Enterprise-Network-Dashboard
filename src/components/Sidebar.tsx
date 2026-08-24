import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Network, 
  Server, 
  Shield, 
  Wifi, 
  Activity,
  ServerCrash,
  BookOpen,
  Route,
  MapPin,
  Settings,
  HardDrive,
  FileCode,
  GraduationCap
} from "lucide-react";
import { cn } from "../utils/cn";

const navItems = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Network Topology", path: "/topology", icon: Network },
  { name: "Devices", path: "/devices", icon: HardDrive },
  { name: "VLANs", path: "/vlans", icon: Network },
  { name: "IP Addressing", path: "/ipam", icon: MapPin },
  { name: "Routing", path: "/routing", icon: Route },
  { name: "Servers", path: "/servers", icon: Server },
  { name: "Wireless", path: "/wireless", icon: Wifi },
  { name: "Security", path: "/security", icon: Shield },
  { name: "ACL Visualizer", path: "/acl", icon: FileCode },
  { name: "Monitoring", path: "/monitoring", icon: Activity },
  { name: "Alerts", path: "/alerts", icon: Activity },
  { name: "Troubleshooting", path: "/troubleshooting", icon: ServerCrash },
  { name: "Command Ref", path: "/commands", icon: BookOpen },
  { name: "Documentation", path: "/documentation", icon: BookOpen },
  { name: "CCNA Map", path: "/ccna", icon: GraduationCap },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex h-14 items-center border-b border-[var(--color-border)] px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-primary)] text-white">
            <Network className="h-4 w-4" />
          </div>
          <span className="text-lg tracking-tight text-[var(--color-text-primary)]">NEXACORE</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-3">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-[var(--color-primary)]" 
                    : "text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-[var(--color-text-primary)]"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-[var(--color-border)] p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-[var(--color-text-primary)] cursor-pointer">
          <Settings className="h-4 w-4" />
          Settings
        </div>
      </div>
    </div>
  );
}
