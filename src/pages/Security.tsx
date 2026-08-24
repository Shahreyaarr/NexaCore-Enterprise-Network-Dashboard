import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { InfoPanel } from "../components/ui/InfoPanel";
import { Badge } from "../components/ui/badge";
import { Shield, Lock, ShieldCheck, Key, EyeOff } from "lucide-react";

export function Security() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Security Posture</h2>
          <p className="text-[var(--color-text-secondary)]">Network access control and device hardening.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-white border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-700">94/100</div>
            <div className="text-sm font-medium text-green-600 mt-1">Security Score</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Device Hardening Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">SSH Access</div>
                      <div className="text-xs text-gray-500">v2 Enabled, Telnet Disabled</div>
                    </div>
                  </div>
                  <Badge variant="success">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">AAA Authentication</div>
                      <div className="text-xs text-gray-500">TACACS+ / RADIUS enabled on VTY lines</div>
                    </div>
                  </div>
                  <Badge variant="success">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">Port Security</div>
                      <div className="text-xs text-gray-500">Max 2 MACs per access port, Violation: Restrict</div>
                    </div>
                  </div>
                  <Badge variant="success">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <EyeOff className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium">DHCP Snooping</div>
                      <div className="text-xs text-gray-500">Enabled on all access VLANs</div>
                    </div>
                  </div>
                  <Badge variant="warning">Partial (IT VLAN Only)</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <InfoPanel title="Why disable Telnet?">
            <p><strong>SSH (Secure Shell)</strong> encrypts remote management traffic, protecting credentials and session data from interception.</p>
            <p className="mt-2"><strong>Telnet</strong> transmits all data in plaintext. An attacker on the local network could easily capture the administrator's password using a packet sniffer like Wireshark.</p>
          </InfoPanel>

          <InfoPanel title="What is DHCP Snooping?">
            <p>DHCP Snooping is a Layer 2 security feature that acts like a firewall between untrusted hosts and trusted DHCP servers.</p>
            <p className="mt-2">It prevents a rogue DHCP server from handing out incorrect IP addresses and gateways (Man-in-the-Middle attack) by only allowing DHCP offers from trusted ports.</p>
          </InfoPanel>
        </div>
      </div>
    </div>
  );
}
