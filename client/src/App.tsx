import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Ebooks from "./pages/Ebooks";
import Support from "./pages/Support";
import Products from "./pages/Products";
import VoiceAgent from "./pages/VoiceAgent";
import Admin from "./pages/Admin";
import DailyGoodNews from "./pages/DailyGoodNews";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DementiaExperience from "./pages/DementiaExperience";
import Terms from "./pages/Terms";
import FamilyWorkshop from "./pages/FamilyWorkshop";
import DreamHome from "./pages/DreamHome";
import CookieBanner from "./components/CookieBanner";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/ebooks" component={Ebooks} />
          <Route path="/support" component={Support} />
          <Route path="/products" component={Products} />
          <Route path="/voice-agent" component={VoiceAgent} />
          <Route path="/daily-good-news" component={DailyGoodNews} />
          <Route path="/admin" component={Admin} />
          <Route path="/dementia-experience" component={DementiaExperience} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/family-workshop" component={FamilyWorkshop} />
          <Route path="/dream-home" component={DreamHome} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CookieBanner />
    </div>
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
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
