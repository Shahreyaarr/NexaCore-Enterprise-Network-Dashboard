import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { Badge } from "../components/ui/badge";

export function Ipam() {
  const subnets = [
    { network: "192.168.10.0/24", name: "HR", used: 38, total: 254 },
    { network: "192.168.20.0/24", name: "IT", used: 124, total: 254 },
    { network: "192.168.30.0/24", name: "Finance", used: 15, total: 254 },
    { network: "192.168.40.0/24", name: "Management", used: 42, total: 254 },
    { network: "192.168.50.0/24", name: "Data Center", used: 85, total: 254 },
    { network: "192.168.60.0/24", name: "Guest Wi-Fi", used: 210, total: 254 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">IP Address Management (IPAM)</h2>
          <p className="text-[var(--color-text-secondary)]">Subnet utilization and allocation tracking.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {subnets.map((subnet, idx) => {
            const percent = Math.round((subnet.used / subnet.total) * 100);
            return (
              <Card key={idx} className="overflow-hidden">
                <CardHeader className="bg-gray-50/50 pb-4 border-b border-[var(--color-border)]">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {subnet.network}
                        <Badge variant="outline">{subnet.name}</Badge>
                      </CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{percent}% Used</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className={`h-3 rounded-full ${percent > 80 ? 'bg-red-500' : percent > 50 ? 'bg-amber-500' : 'bg-green-500'}`} 
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                    <div>Used: <span className="font-semibold text-[var(--color-text-primary)]">{subnet.used}</span></div>
                    <div>Available: <span className="font-semibold text-[var(--color-text-primary)]">{subnet.total - subnet.used}</span></div>
                    <div>Total: <span className="font-semibold text-[var(--color-text-primary)]">{subnet.total}</span></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <InfoPanel title="Subnet Explanation (Example)">
            <div className="font-mono text-sm space-y-3 bg-white p-3 rounded border border-blue-100">
              <div>
                <span className="text-gray-500">Network Address:</span><br/>
                <span className="font-semibold">192.168.10.0</span>
              </div>
              <div>
                <span className="text-gray-500">Usable Range:</span><br/>
                <span className="font-semibold">192.168.10.1 – 192.168.10.254</span>
              </div>
              <div>
                <span className="text-gray-500">Broadcast:</span><br/>
                <span className="font-semibold">192.168.10.255</span>
              </div>
              <div>
                <span className="text-gray-500">Subnet Mask:</span><br/>
                <span className="font-semibold">255.255.255.0 (/24)</span>
              </div>
            </div>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
