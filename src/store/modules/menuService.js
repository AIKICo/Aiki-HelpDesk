const menuService = {
    state: {
        menuItems: [
            {text: "داشبورد", icon: "mdi-monitor-dashboard", to: '/dashboard'},
            {text: "کارتابل", icon: "mdi-briefcase-check", to: "/cartabl"},
            {text: "آرشیو درخواست ها", icon: "mdi-archive", to: "/TicketsArchive"},
            {text: "کنترل اموال", icon: "mdi-desktop-classic", to: '/AssetList'},
            {text: "گزارشات", icon: "mdi-file-chart", to: '/Reports'},
            {text: "تنظیمات", icon: "mdi-cogs", to: "/settingsControlPanel"}
        ],
    }
};

export default menuService;
