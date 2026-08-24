import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Button } from "../components/ui/button";

const cpuData = [
  { time: "10:00", core: 45, edge: 30, fw: 60 },
  { time: "10:10", core: 48, edge: 35, fw: 65 },
  { time: "10:20", core: 50, edge: 32, fw: 70 },
  { time: "10:30", core: 85, edge: 40, fw: 80 },
  { time: "10:40", core: 55, edge: 35, fw: 65 },
  { time: "10:50", core: 42, edge: 31, fw: 60 },
];

const trafficData = [
  { time: "10:00", inbound: 400, outbound: 240 },
  { time: "10:10", inbound: 450, outbound: 280 },
  { time: "10:20", inbound: 500, outbound: 300 },
  { time: "10:30", inbound: 950, outbound: 600 },
  { time: "10:40", inbound: 600, outbound: 450 },
  { time: "10:50", inbound: 420, outbound: 260 },
];

export function Monitoring() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">NOC Monitoring</h2>
          <p className="text-[var(--color-text-secondary)]">Real-time performance and utilization metrics.</p>
        </div>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-md">
          <Button variant="ghost" size="sm" className="bg-white shadow-sm">1H</Button>
          <Button variant="ghost" size="sm">6H</Button>
          <Button variant="ghost" size="sm">24H</Button>
          <Button variant="ghost" size="sm">7D</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Edge Interface Traffic (Gi0/0/0)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="inbound" stackId="1" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} name="Inbound (Mbps)" />
                  <Area type="monotone" dataKey="outbound" stackId="2" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.2} name="Outbound (Mbps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device CPU Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cpuData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="core" stroke="var(--color-primary)" strokeWidth={2} dot={false} name="Core Switch" />
                  <Line type="monotone" dataKey="edge" stroke="var(--color-success)" strokeWidth={2} dot={false} name="Edge Router" />
                  <Line type="monotone" dataKey="fw" stroke="var(--color-danger)" strokeWidth={2} dot={false} name="Firewall" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
