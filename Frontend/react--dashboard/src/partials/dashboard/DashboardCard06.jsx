import React from 'react';

function DashboardCard06({ percentage, label = 'Taux de vente par influenceur' }) {
  const segments = 40;
  const filledSegments = Math.round((percentage / 100) * segments);
  const radius = 140;
  const strokeWidth = 16;
  const center = 160;
  const svgSize = 320;
  const segmentAngle = 250 / segments;
  const startAngle = 135;

  // Function to interpolate colors between blue and red
  const interpolateColor = (startColor, endColor, factor) => {
    const r1 = parseInt(startColor.slice(1, 3), 16);
    const g1 = parseInt(startColor.slice(3, 5), 16);
    const b1 = parseInt(startColor.slice(5, 7), 16);
    const r2 = parseInt(endColor.slice(1, 3), 16);
    const g2 = parseInt(endColor.slice(3, 5), 16);
    const b2 = parseInt(endColor.slice(5, 7), 16);

    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const generateSegments = () => {
    const paths = [];
    const startColor = '#012856';  
    const middleColor = '#e4657c'; 
    const endColor = '#fe5e5f';   

    for (let i = 0; i < segments; i++) {
      const angle = startAngle + i * segmentAngle;
      const x1 = center + radius * Math.cos((angle * Math.PI) / 180);
      const y1 = center + radius * Math.sin((angle * Math.PI) / 180);
      const x2 = center + (radius - strokeWidth) * Math.cos((angle * Math.PI) / 180);
      const y2 = center + (radius - strokeWidth) * Math.sin((angle * Math.PI) / 180);

      let strokeColor;
      if (i < filledSegments) {
        const factor = i / filledSegments; 

       
        if (i < segments / 2) {
          strokeColor = interpolateColor(startColor, middleColor, factor);
        } else {
          strokeColor = interpolateColor(middleColor, endColor, factor);
        }
      } else {
        strokeColor = 'transparent';
      }

      paths.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="butt"
        />
      );
    }

    return paths;
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex items-center justify-center h-[380px] relative">
        <svg width={svgSize} height={svgSize}>
          {generateSegments()}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="text-base text-slate-600 ">{label}</div>
          <div className="text-xl  text-slate-800 mt-1">{percentage}%</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard06;
