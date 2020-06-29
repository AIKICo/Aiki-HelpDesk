const menuService = {
    state: {
        menuItems: [
            {text: "داشبورد", icon: "mdi-monitor-dashboard", to: '/dashboard', role: "admin,user"},
            {text: "کارتابل", icon: "mdi-briefcase-check", to: "/cartabl", role: "admin,user"},
            {text: "آرشیو درخواست ها", icon: "mdi-archive", to: "/TicketsArchive", role: "admin,user"},
            {text: "کنترل اموال", icon: "mdi-desktop-classic", to: '/AssetList', role: "admin,user"},
            {text: "گزارشات", icon: "mdi-file-chart", to: '/Reports', role: "admin,user"},
            {text: "تنظیمات", icon: "mdi-cogs", to: "/settingsControlPanel", role: "admin"}
        ],
    }
};

export default menuService;
