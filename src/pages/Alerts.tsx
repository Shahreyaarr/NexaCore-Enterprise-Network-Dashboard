import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ShieldAlert, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/ui/modal";

export function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
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
              <TableRow 
                key={alert.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedAlert(alert)}
              >
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

      <Modal 
        isOpen={selectedAlert !== null} 
        onClose={() => setSelectedAlert(null)} 
        title={`Incident Report: ${selectedAlert?.id}`}
      >
        {selectedAlert && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="p-3 bg-white rounded-full shadow-sm">
                {getIcon(selectedAlert.severity)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{selectedAlert.desc}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span>{selectedAlert.time}</span>
                  <span>•</span>
                  <span className="font-mono">{selectedAlert.device}</span>
                  <span>•</span>
                  {getBadge(selectedAlert.severity)}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Incident Details</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                This alert was generated automatically by the Network Management System. The device <strong>{selectedAlert.device}</strong> reported a condition matching a predefined alarm trigger. 
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3 border-b pb-2">Recommended Action</h4>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm text-blue-900 space-y-2">
                {selectedAlert.severity === "Critical" ? (
                  <>
                    <p><strong>1. Immediate check:</strong> Verify physical connectivity and power to {selectedAlert.device}.</p>
                    <p><strong>2. Secondary check:</strong> Review Syslog for exact failure timestamp.</p>
                    <p><strong>3. Remediation:</strong> Initiate failover procedures if device is unresponsive for &gt;5 minutes.</p>
                  </>
                ) : selectedAlert.severity === "Warning" ? (
                  <>
                    <p><strong>1. Monitor:</strong> Observe utilization trend over the next 15 minutes.</p>
                    <p><strong>2. Check:</strong> Identify top talkers contributing to the load.</p>
                  </>
                ) : (
                  <p>No immediate action required. System has stabilized.</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Acknowledge</button>
              <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md text-sm font-medium hover:bg-blue-700">Create Ticket</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
