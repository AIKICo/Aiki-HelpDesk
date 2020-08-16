const menuService = {
    state: {
        menuItems: [
            {text: "داشبورد", icon: "mdi-monitor-dashboard", to: '/dashboard', role: "admin,user,backupuser"},
            {text: "کارتابل", icon: "mdi-briefcase-check", to: "/cartabl", role: "admin,user,backupuser"},
            {text: "آرشیو درخواست ها", icon: "mdi-archive", to: "/TicketsArchive", role: "admin,user,backupuser"},
            {text: "کنترل اموال", icon: "mdi-desktop-classic", to: '/AssetList', role: "admin,backupuser"},
            {text: "تنظیمات", icon: "mdi-cogs", to: "/settingsControlPanel", role: "admin,backupuser"}
        ],
    }
};

export default menuService;
