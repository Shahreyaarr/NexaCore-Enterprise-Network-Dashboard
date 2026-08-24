import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { Activity, Server, ShieldAlert, HardDrive, Network, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const trafficData = [
  { time: "00:00", inbound: 400, outbound: 240 },
  { time: "04:00", inbound: 300, outbound: 139 },
  { time: "08:00", inbound: 200, outbound: 980 },
  { time: "12:00", inbound: 278, outbound: 390 },
  { time: "16:00", inbound: 189, outbound: 480 },
  { time: "20:00", inbound: 239, outbound: 380 },
  { time: "24:00", inbound: 349, outbound: 430 },
];

export function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Network Overview</h2>
          <p className="text-[var(--color-text-secondary)]">Enterprise Network Health and Status</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
            <HardDrive className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              <span className="text-green-500 font-medium">38 Online</span>, 2 Warning, 2 Offline
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Network Infrastructure</CardTitle>
            <Network className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              4 Routers, 8 Switches
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Data Center</CardTitle>
            <Server className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Servers operating normally
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-[var(--color-text-secondary)]">
              1 Critical, 2 Warnings
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Network Traffic (24h)</CardTitle>
            <CardDescription>
              Inbound and outbound traffic across the edge router.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}Mbps`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="inbound" stroke="var(--color-primary)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Inbound" />
                  <Line type="monotone" dataKey="outbound" stroke="var(--color-success)" strokeWidth={2} dot={false} name="Outbound" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              Latest network events requiring attention.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-md border border-red-100 bg-red-50 p-3">
                <ShieldAlert className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-red-900">SW-CORE-01 Unreachable</p>
                  <p className="text-xs text-red-700">Core switch stopped responding to ICMP and SNMP requests.</p>
                  <p className="text-[10px] text-red-600 font-medium">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 rounded-md border border-amber-100 bg-amber-50 p-3">
                <Activity className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-amber-900">High Utilization: Finance VLAN</p>
                  <p className="text-xs text-amber-700">Finance VLAN utilization reached 82% threshold.</p>
                  <p className="text-[10px] text-amber-600 font-medium">12 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-md border border-blue-100 bg-blue-50 p-3">
                <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-blue-900">OSPF Neighbor Restored</p>
                  <p className="text-xs text-blue-700">OSPF adjacency formed with 10.0.0.2.</p>
                  <p className="text-[10px] text-blue-600 font-medium">28 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <InfoPanel title="Welcome to NexaCore Enterprise Network Lab">
        <p>This dashboard is a simulated Network Operations Center (NOC) environment designed for educational purposes, reflecting real-world enterprise infrastructure managed with CCNA-level networking concepts.</p>
        <p className="mt-2">Use the sidebar to explore the network topology, inspect VLAN and IP addressing strategies, manage security policies, and even troubleshoot simulated network faults.</p>
      </InfoPanel>
    </div>
  );
}
