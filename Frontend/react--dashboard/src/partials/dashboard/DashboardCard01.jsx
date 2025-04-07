import React from "react";

function DashboardCard01({
  icon,
  iconBgColor,
  title,
  subtitle,
  width = "w-12", 
  height = "h-12" 
}) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col items-center justify-center px-5 py-8 h-full text-center">
        <div
          className={`flex items-center justify-center ${width} ${height} rounded-full ${iconBgColor} mb-4`}
        >
          <img src={icon} width="25" height="25" alt="Icon" />
        </div>
        <h2 className="text-lg font-semibold text-[#68627b] mb-1">{title}</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase">{subtitle}</div>
      </div>
    </div>
  );
}

export default DashboardCard01;
