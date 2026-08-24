import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { Badge } from "../components/ui/badge";
import { Wifi, Users, ShieldAlert, Smartphone } from "lucide-react";

export function Wireless() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Wireless Infrastructure</h2>
          <p className="text-[var(--color-text-secondary)]">Corporate and Guest Wi-Fi management.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-[var(--color-primary)]">
          <CardHeader className="bg-blue-50/50 pb-4 border-b border-[var(--color-border)] flex flex-row items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wifi className="h-5 w-5 text-[var(--color-primary)]" />
                Company-Corp
              </CardTitle>
              <div className="text-sm text-gray-500">Corporate WPA3 Enterprise</div>
            </div>
            <Badge variant="success">Active</Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">VLAN</span>
                <span className="font-semibold">VLAN 20/30 (Dynamic)</span>
              </div>
              <div>
                <span className="text-gray-500 block">Security</span>
                <span className="font-semibold">802.1X / RADIUS</span>
              </div>
              <div>
                <span className="text-gray-500 block">Clients</span>
                <span className="font-semibold text-[var(--color-primary)] flex items-center gap-1"><Users className="h-3 w-3" /> 42 Active</span>
              </div>
              <div>
                <span className="text-gray-500 block">Isolation</span>
                <span className="font-semibold text-gray-600">Disabled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-300">
          <CardHeader className="bg-gray-50/50 pb-4 border-b border-[var(--color-border)] flex flex-row items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-gray-500" />
                Company-Guest
              </CardTitle>
              <div className="text-sm text-gray-500">Open with Captive Portal</div>
            </div>
            <Badge variant="warning">Restricted</Badge>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">VLAN</span>
                <span className="font-semibold">VLAN 60</span>
              </div>
              <div>
                <span className="text-gray-500 block">Security</span>
                <span className="font-semibold">Open + WLC Portal</span>
              </div>
              <div>
                <span className="text-gray-500 block">Clients</span>
                <span className="font-semibold flex items-center gap-1"><Users className="h-3 w-3" /> 18 Active</span>
              </div>
              <div>
                <span className="text-gray-500 block">Isolation</span>
                <span className="font-semibold text-green-600">Enabled (Peer-to-Peer Blocked)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Point Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">AP-FL1-01</div>
                      <div className="text-xs text-gray-500">Ceiling-F1-North • Ch 6 (2.4GHz), Ch 36 (5GHz)</div>
                    </div>
                  </div>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="font-medium text-red-900">AP-FL1-02</div>
                      <div className="text-xs text-red-700">Ceiling-F1-South • WLC Controller Lost</div>
                    </div>
                  </div>
                  <Badge variant="danger">Offline</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <InfoPanel title="Wireless Security Concepts">
            <p><strong>Corporate Wi-Fi</strong> uses 802.1X authentication. Instead of a shared password, users authenticate with their individual AD credentials via a RADIUS server. Dynamic VLAN assignment places them in their respective department VLAN (e.g., IT or HR) upon successful login.</p>
            <p className="mt-2"><strong>Guest Wi-Fi</strong> has <em>Client Isolation</em> enabled. This prevents guests from communicating directly with each other (preventing malware spread or snooping) and restricts them solely to internet access.</p>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
