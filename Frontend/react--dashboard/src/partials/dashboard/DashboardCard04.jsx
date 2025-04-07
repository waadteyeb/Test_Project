import React from "react";

function DashboardCard04({
  icons = [], 
  iconBgColors = [], 
  titles = [], 
  subtitles = [], 
  width = "w-12",
  height = "h-12"
}) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col items-center justify-center px-5 py-8 h-full text-center">
        {/* Icon grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {icons.map((icon, index) => (
            <div key={index} className="flex items-center">
              {/* Icon */}
              <div
                className={`flex items-center justify-center ${width} ${height} ${iconBgColors[index] || "bg-red-100"} rounded-none`}
              >
                <img src={icon} width="25" height="25" alt={`Icon ${index + 1}`} />
              </div>
              {/* Title and Subtitle  */}
              <div className="ml-3 text-left">
                <h2 className="text-lg font-semibold text-[#68627b] mb-1">{titles[index]}</h2>
                <div className="text-xs font-semibold text-slate-400 uppercase">{subtitles[index]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard04;
