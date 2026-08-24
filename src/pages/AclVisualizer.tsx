import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { InfoPanel } from "../components/ui/InfoPanel";
import { ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";

export function AclVisualizer() {
  const aclRules = [
    {
      id: 10,
      source: "Guest VLAN (192.168.60.0/24)",
      destination: "Internal Network (192.168.0.0/16)",
      action: "DENY",
      protocol: "IP",
      reason: "Guest isolation",
    },
    {
      id: 20,
      source: "IT VLAN (192.168.20.0/24)",
      destination: "Server VLAN (192.168.50.0/24)",
      action: "ALLOW",
      protocol: "IP",
      reason: "IT administration",
    },
    {
      id: 30,
      source: "HR VLAN (192.168.10.0/24)",
      destination: "Web Server (192.168.50.10)",
      action: "ALLOW",
      protocol: "TCP/80,443",
      reason: "Intranet access",
    },
    {
      id: 99,
      source: "ANY",
      destination: "ANY",
      action: "DENY",
      protocol: "IP",
      reason: "Implicit Deny",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ACL Visualizer</h2>
          <p className="text-[var(--color-text-secondary)]">Human-readable Access Control List representation.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Extended ACL: 100 (Inbound on FW-Inside)</h3>
          
          {aclRules.map((rule) => (
            <Card key={rule.id} className={rule.action === "ALLOW" ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"}>
              <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-shrink-0 w-12 text-center text-sm font-bold text-gray-500">
                  #{rule.id}
                </div>
                
                <div className="flex-1 flex flex-col md:flex-row items-center gap-4 w-full">
                  <div className="bg-white px-3 py-2 border rounded text-sm font-mono flex-1 text-center w-full shadow-sm">
                    {rule.source}
                  </div>
                  <ArrowRight className="text-gray-400 hidden md:block" />
                  <div className="bg-white px-3 py-2 border rounded text-sm font-mono flex-1 text-center w-full shadow-sm">
                    {rule.destination}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1 min-w-[100px]">
                  <Badge variant={rule.action === "ALLOW" ? "success" : "danger"} className="w-full justify-center">
                    {rule.action === "ALLOW" ? <ShieldCheck className="w-3 h-3 mr-1" /> : <ShieldAlert className="w-3 h-3 mr-1" />}
                    {rule.action}
                  </Badge>
                  <span className="text-[10px] font-bold text-gray-500">{rule.protocol}</span>
                </div>
              </CardContent>
              <div className={`px-4 py-2 text-xs border-t ${rule.action === "ALLOW" ? "border-green-200 text-green-800" : "border-red-200 text-red-800"}`}>
                <strong>Reason:</strong> {rule.reason}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <InfoPanel title="How ACLs Work">
            <p>An Access Control List (ACL) is a sequential set of permit or deny statements that apply to IP addresses or upper-layer protocols.</p>
            <p className="mt-2"><strong>Top-Down Processing:</strong></p>
            <ul className="list-decimal pl-5 mt-1 space-y-1">
              <li>The router checks rules from top to bottom.</li>
              <li>Once a match is found, the action is taken and <strong>no further rules are checked</strong>.</li>
            </ul>
            <p className="mt-2"><strong>Implicit Deny:</strong> Every ACL has a hidden "deny all" rule at the very bottom. If traffic doesn't match any explicit rule, it is dropped.</p>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
