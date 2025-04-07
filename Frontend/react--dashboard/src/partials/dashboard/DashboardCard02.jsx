import React from "react";

function DashboardCard02({
  iconBgColor,
  image,
  title,
  subtitle
}) {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden">
     
      <div className={`${iconBgColor} flex items-center justify-center p-4`} style={{ minHeight: '160px' }}>
        {image && (
          <img 
            src={image} 
            alt={title}
            className="object-contain w-full h-full max-h-[120px]"
          />
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-center items-center p-4 flex-grow">
        <h2 className="text-lg font-semibold text-[#68627b] mb-1 text-center">{title}</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase text-center">{subtitle}</div>
      </div>
    </div>
  );
}

export default DashboardCard02;