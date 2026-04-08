import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Sla from "./pages/Sla";
import Docs from "./pages/Docs";
import Status from "./pages/Status";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DomainSearch from "./pages/DomainSearch";

function Router() {
  // make sure to consider if you need authentication for certain routes
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
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
