import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ShieldAlert, AlertTriangle, Info } from "lucide-react";

export function Alerts() {
  const alerts = [
    { id: "ALT-01", severity: "Critical", time: "2 mins ago", device: "SW-CORE-01", desc: "Core switch unreachable", status: "Open" },
    { id: "ALT-02", severity: "Warning", time: "12 mins ago", device: "VLAN 30", desc: "Finance VLAN utilization 82%", status: "Acknowledged" },
    { id: "ALT-03", severity: "Info", time: "28 mins ago", device: "RTR-EDGE-01", desc: "OSPF adjacency restored", status: "Resolved" },
    { id: "ALT-04", severity: "Warning", time: "1 hr ago", device: "AP-FL1-02", desc: "WLC controller lost", status: "Open" },
    { id: "ALT-05", severity: "Critical", time: "3 hrs ago", device: "FW-CORE-01", desc: "Intrusion detected: SSH Brute Force", status: "Resolved" },
  ];

  const getIcon = (severity: string) => {
    if (severity === "Critical") return <ShieldAlert className="h-4 w-4 text-red-600" />;
    if (severity === "Warning") return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  const getBadge = (severity: string) => {
    if (severity === "Critical") return <Badge variant="danger">Critical</Badge>;
    if (severity === "Warning") return <Badge variant="warning">Warning</Badge>;
    return <Badge variant="info">Info</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Network Alerts</h2>
          <p className="text-[var(--color-text-secondary)]">Centralized event and alarm management.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Alarms</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{getIcon(alert.severity)}</TableCell>
                <TableCell>{getBadge(alert.severity)}</TableCell>
                <TableCell className="text-xs text-gray-500">{alert.time}</TableCell>
                <TableCell className="font-medium">{alert.device}</TableCell>
                <TableCell>{alert.desc}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${alert.status === 'Resolved' ? 'text-green-600' : 'text-gray-900'}`}>
                    {alert.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
