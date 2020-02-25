const menuService = {
  state: {
      menuItems: [
          { text: "داشبورد", icon: "mdi-monitor-dashboard", to:'/dashboard' },
          { text: "کارتابل", icon: "mdi-account-convert", to:"/cartabl" },
          { text: "رهگیری درخواست", icon: "mdi-eye-check", to:'/tracking' },
          { text: "مدیریت اموال", icon: "mdi-desktop-classic", to:'/assets' },
          { text: "گزارشات", icon: "mdi-file-chart", to:'/Reports' },
          { text: "کاربران", icon: "mdi-account-supervisor", to:'/Users' },
          { text: "چارت سازمانی", icon: "mdi-file-tree", to:'/organCharts' },
          { text: "تنظیمات", icon: "mdi-cogs", to:"/settingsControlPanel" }
      ],
  }
};

export default menuService;
