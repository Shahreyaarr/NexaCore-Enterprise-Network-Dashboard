import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { AlertCircle, ServerCrash, CheckCircle2, ChevronRight, Activity } from "lucide-react";

export function Troubleshooting() {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const scenarios = [
    {
      id: 1,
      title: "Wrong VLAN Assignment",
      problem: "HR workstation (PC-HR-02) cannot reach the HR gateway (192.168.10.1).",
      symptoms: ["Ping fails", "Workstation receives 169.254.x.x APIPA address or wrong subnet DHCP"],
      cause: "Port Fa0/5 on SW-ACC-HR was assigned to VLAN 30 instead of VLAN 10.",
      fix: "Switchport access vlan 10",
      commands: ["show vlan brief", "show interfaces fa0/5 switchport"],
    },
    {
      id: 2,
      title: "OSPF Neighbor Down",
      problem: "Core switch lost routing to the edge router.",
      symptoms: ["Internet unreachable from all internal VLANs", "OSPF adjacency state is INIT"],
      cause: "Mismatched OSPF Hello/Dead timers on Gi0/0/1.",
      fix: "Ensure 'ip ospf hello-interval' matches on both sides of the link.",
      commands: ["show ip ospf neighbor", "show ip ospf interface gi0/0/1"],
    },
    {
      id: 3,
      title: "ACL Blocking Traffic",
      problem: "IT Administrator cannot SSH into the Web Server.",
      symptoms: ["Ping succeeds", "SSH connection refused or times out"],
      cause: "ACL 110 applied inbound on server VLAN interface accidentally blocks TCP 22.",
      fix: "Insert 'permit tcp 192.168.20.0 0.0.0.255 host 192.168.50.10 eq 22' before the deny rule.",
      commands: ["show access-lists 110", "show ip interface vlan 50"],
    }
  ];

  const handleSelect = (id: number) => {
    setActiveScenario(id);
    setRevealed(false);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Troubleshooting Lab</h2>
        <p className="text-[var(--color-text-secondary)]">Interactive network fault resolution scenarios.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Available Scenarios</h3>
          {scenarios.map((s) => (
            <Card 
              key={s.id} 
              className={`cursor-pointer transition-colors hover:border-[var(--color-primary)] ${activeScenario === s.id ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : ''}`}
              onClick={() => handleSelect(s.id)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-100 p-2 rounded-md text-red-600">
                    <ServerCrash className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Scenario #{s.id}</div>
                    <div className="text-xs text-gray-500">{s.title}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          {activeScenario ? (() => {
            const scenario = scenarios.find(s => s.id === activeScenario)!;
            return (
              <div className="space-y-4 animate-in fade-in">
                <Card>
                  <CardHeader className="bg-gray-50 border-b border-[var(--color-border)]">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Incident Report: {scenario.title}</CardTitle>
                      <Badge variant="danger">Active Ticket</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-red-500" /> 
                        Reported Problem
                      </h4>
                      <div className="bg-red-50 text-red-900 p-3 rounded-md text-sm border border-red-100">
                        {scenario.problem}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <Activity className="h-4 w-4 text-amber-500" /> 
                        Observed Symptoms
                      </h4>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                        {scenario.symptoms.map((sym, i) => <li key={i}>{sym}</li>)}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Diagnostic Commands</h4>
                      <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-xs space-y-1 shadow-inner">
                        {scenario.commands.map((cmd, i) => <div key={i}>R1# {cmd}</div>)}
                      </div>
                    </div>

                    {!revealed ? (
                      <div className="pt-4 border-t flex justify-center">
                        <Button onClick={() => setRevealed(true)} size="lg">Investigate & Reveal Root Cause</Button>
                      </div>
                    ) : (
                      <div className="pt-4 border-t space-y-4 animate-in slide-in-from-bottom-4">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                          <h4 className="font-bold text-blue-900 mb-1">Root Cause</h4>
                          <p className="text-sm text-blue-800">{scenario.cause}</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-md">
                          <h4 className="font-bold text-green-900 flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4" /> Recommended Fix
                          </h4>
                          <p className="text-sm text-green-800 font-mono">{scenario.fix}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })() : (
            <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center flex-col text-gray-400">
              <ServerCrash className="h-12 w-12 mb-2 opacity-50" />
              <p>Select a scenario from the left to begin troubleshooting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
