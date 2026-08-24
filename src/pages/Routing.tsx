import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { mockRoutes } from "../data/networkData";

export function Routing() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Routing Topology</h2>
          <p className="text-[var(--color-text-secondary)]">Edge and Core routing information.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OSPF Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">ACTIVE</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">OSPF Neighbors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Routes Learned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Routes Advertised</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Routing Table (RTR-EDGE-01)</CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Next Hop</TableHead>
                  <TableHead>Interface</TableHead>
                  <TableHead>Protocol</TableHead>
                  <TableHead>Metric</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRoutes.map((route, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono text-xs">{route.destination}</TableCell>
                    <TableCell className="font-mono text-xs">{route.nextHop}</TableCell>
                    <TableCell>{route.interface}</TableCell>
                    <TableCell>
                      <Badge variant={route.protocol === 'OSPF' ? 'info' : route.protocol === 'Static' ? 'warning' : 'default'}>
                        {route.protocol}
                      </Badge>
                    </TableCell>
                    <TableCell>{route.metric}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="space-y-6">
          <InfoPanel title="Dynamic Routing: OSPF">
            <p><strong>Open Shortest Path First (OSPF)</strong> is an interior gateway protocol (IGP) for routing IP packets within a single routing domain.</p>
            <p className="mt-2">It uses a link-state routing algorithm and falls into the group of interior routing protocols, operating within a single autonomous system (AS).</p>
            <p className="mt-2 font-semibold">In this lab:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>OSPF Area 0 is configured.</li>
              <li>Edge router redistributes the default static route to the core switch.</li>
            </ul>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
