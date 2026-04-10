import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CookieProvider } from "./context/CookieContext";
import CookieBanner from "./components/CookieBanner";
import CookieModal from "./components/CookieModal";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Sla from "./pages/Sla";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DomainSearch from "./pages/DomainSearch";
import CookiesPage from "./pages/Cookies";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/termos"} component={Terms} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/privacidade"} component={Privacy} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/sla"} component={Sla} />
      <Route path={"/docs"} component={Docs} />
      <Route path={"/status"} component={Status} />
      <Route path={"/sobre"} component={About} />
      <Route path={"/about"} component={About} />
      <Route path={"/contato"} component={Contact} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/dominios"} component={DomainSearch} />
      <Route path={"/domains"} component={DomainSearch} />
      <Route path={"/cookies"} component={CookiesPage} />
      <Route path={"/login"} component={Login} />
      <Route path={"/painel"} component={Dashboard} />
      <Route path={"/painel/:rest*"} component={Dashboard} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <CookieProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              {/* Sistema global de cookies — renderizado fora do Router para persistir entre rotas */}
              <CookieBanner />
              <CookieModal />
            </TooltipProvider>
          </CookieProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
