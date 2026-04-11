import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import {
  LayoutDashboard,
  Server,
  HardDrive,
  Globe,
  Receipt,
  LifeBuoy,
  Settings,
  Shield,
  LogOut,
  PanelLeft,
  ChevronRight,
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Visão Geral", path: "/painel" },
  { icon: Server, label: "VPS", path: "/painel/vps" },
  { icon: HardDrive, label: "Hospedagem", path: "/painel/hospedagem" },
  { icon: Globe, label: "Domínios", path: "/painel/dominios" },
  { icon: Receipt, label: "Faturas", path: "/painel/faturas" },
  { icon: LifeBuoy, label: "Suporte", path: "/painel/suporte" },
  { icon: Settings, label: "Configurações", path: "/painel/configuracoes" },
];

const adminItems = [
  { icon: Shield, label: "Admin", path: "/painel/admin" },
];

const SIDEBAR_WIDTH_KEY = "sidebar-width";
const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  if (loading || !user) {
    return <DashboardLayoutSkeleton />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </DashboardLayoutContent>
    </SidebarProvider>
  );
}

type DashboardLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function DashboardLayoutContent({
  children,
  setSidebarWidth,
}: DashboardLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isAdmin = (user as any)?.role === "admin";

  const activeMenuItem = [...menuItems, ...adminItems].find(
    (item) => item.path === location || location.startsWith(item.path + "/")
  );

  useEffect(() => {
    if (isCollapsed) setIsResizing(false);
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <>
      <div className="relative flex" ref={sidebarRef}>
        <Sidebar collapsible="icon" className="border-r border-zinc-800 bg-zinc-950 z-50" disableTransition={isResizing}>
          {/* Header */}
          <SidebarHeader className="h-16 justify-center border-b border-zinc-800">
            <div className="flex items-center gap-3 px-2 w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-zinc-800 rounded-lg transition-colors focus:outline-none shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-zinc-400" />
              </button>
              {!isCollapsed && (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-md flex items-center justify-center shrink-0">
                    <Server className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="font-bold text-white tracking-tight truncate text-sm">
                    DevHosting
                  </span>
                </div>
              )}
            </div>
          </SidebarHeader>

          {/* Menu */}
          <SidebarContent className="gap-0 py-2">
            <SidebarMenu className="px-2 gap-0.5">
              {menuItems.map((item) => {
                const isActive =
                  item.path === "/painel"
                    ? location === "/painel"
                    : location === item.path || location.startsWith(item.path + "/");
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-9 transition-all font-normal rounded-lg ${
                        isActive
                          ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/15"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-amber-400" : ""}`} />
                      <span className="text-sm">{item.label}</span>
                      {isActive && !isCollapsed && <ChevronRight className="ml-auto h-3 w-3 text-amber-400/60" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              {/* Admin section */}
              {isAdmin && (
                <>
                  {!isCollapsed && (
                    <div className="px-2 pt-4 pb-1">
                      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">Admin</p>
                    </div>
                  )}
                  {adminItems.map((item) => {
                    const isActive = location === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => setLocation(item.path)}
                          tooltip={item.label}
                          className={`h-9 transition-all font-normal rounded-lg ${
                            isActive
                              ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/15"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                          }`}
                        >
                          <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-amber-400" : ""}`} />
                          <span className="text-sm">{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </>
              )}
            </SidebarMenu>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="p-3 border-t border-zinc-800">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-zinc-800 transition-colors w-full text-left focus:outline-none">
                  <Avatar className="h-8 w-8 border border-zinc-700 shrink-0">
                    <AvatarFallback className="text-xs font-semibold bg-amber-500/10 text-amber-400">
                      {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate leading-none">
                        {user?.name || "Usuário"}
                      </p>
                      <p className="text-[10px] text-zinc-500 truncate mt-1">
                        {user?.email || ""}
                      </p>
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-zinc-900 border-zinc-800">
                <DropdownMenuItem
                  onClick={() => setLocation("/painel/configuracoes")}
                  className="cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-zinc-800"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Resize handle */}
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-amber-500/20 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => { if (!isCollapsed) setIsResizing(true); }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="bg-zinc-950">
        {/* Responsive header */}
        <div className="flex md:hidden border-b border-zinc-800 h-14 items-center justify-between bg-zinc-950 px-4 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-9 w-9 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400" />
            <span className="text-sm font-semibold text-white">
              {activeMenuItem?.label ?? "Painel"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-500/20 rounded-md flex items-center justify-center">
              <Server className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="font-bold text-white text-sm">DevHosting</span>
          </div>
        </div>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </>
  );
}
