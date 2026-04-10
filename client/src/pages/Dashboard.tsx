import DashboardLayout from "@/components/DashboardLayout";
import Overview from "./dashboard/Overview";
import VPSPage from "./dashboard/VPS";
import HostingPage from "./dashboard/Hosting";
import DomainsPage from "./dashboard/Domains";
import InvoicesPage from "./dashboard/Invoices";
import SupportPage from "./dashboard/Support";
import SettingsPage from "./dashboard/Settings";
import AdminPage from "./dashboard/Admin";
import { Route, Switch } from "wouter";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/painel" component={Overview} />
        <Route path="/painel/vps" component={VPSPage} />
        <Route path="/painel/hospedagem" component={HostingPage} />
        <Route path="/painel/dominios" component={DomainsPage} />
        <Route path="/painel/faturas" component={InvoicesPage} />
        <Route path="/painel/suporte" component={SupportPage} />
        <Route path="/painel/configuracoes" component={SettingsPage} />
        <Route path="/painel/admin" component={AdminPage} />
        <Route component={Overview} />
      </Switch>
    </DashboardLayout>
  );
}
