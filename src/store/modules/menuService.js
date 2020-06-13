const menuService = {
    state: {
        menuItems: [
            {text: "داشبورد", icon: "mdi-monitor-dashboard", to: '/dashboard'},
            {text: "کارتابل", icon: "mdi-account-convert", to: "/cartabl"},
            {text: "مدیریت اموال", icon: "mdi-desktop-classic", to: '/AssetList'},
            {text: "گزارشات", icon: "mdi-file-chart", to: '/Reports'},
            {text: "تنظیمات", icon: "mdi-cogs", to: "/settingsControlPanel"}
        ],
    }
};

export default menuService;
