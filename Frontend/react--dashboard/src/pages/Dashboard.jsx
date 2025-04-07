import React, { useState, useEffect } from "react";
import Datepicker from "../partials/actions/Datepicker";
import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import ShoppingIcon from "../images/cards icons/shopping-bag.png";
import CrediCardIcon from "../images/cards icons/credit-card.png";
import ShareIcon from "../images/cards icons/share-2.png";
import NavigationIcon from "../images/cards icons/navigation.png";
import PanierIcon from "../images/cards icons/panier.png";
import Image from "../images/avatars/Image.png";
import icon1 from "../images/cards icons/smartphone.png";
import icon3 from "../images/cards icons/award.png";
import icon5 from "../images/cards icons/package.png";
import icon2 from "../images/cards icons/target.png";
import icon4 from "../images/cards icons/calendar.png";
import icon6 from "../images/cards icons/sun.png";
import frFlag from "../images/countries/fr.svg";
import usFlag from "../images/countries/us.svg";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";
import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useParams } from "react-router-dom";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [salesmetricsData, setsalesmetricsData] = useState(null);
  const [salespercentageData, setsalespercentageData] = useState(null);
  const [salesinfluencerData, setsalesinfluencerData] = useState(null);
  const [bestCountry, setBestCountry] = useState(null);

  const [influencerData, setinfluencerData] = useState(null);
  const [activeinfluencerData, setactiveinfluencerData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const iconArray = [icon1, icon2, icon3, icon4, icon5, icon6];
  const bgColorArray = [
    "bg-red-100",
    "bg-red-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-blue-100",
    "bg-blue-100",
  ];

  const subtitleArray = [
    "Appareil la plus utilisée",
    "Meilleure catégorie",
    "Meilleur produit",
    "Meilleur couleur",
    "Meilleur jour de la semaine",
    "Meilleur moment du jour",
  ];
  const getDayName = (dayIndex) => {
    const days = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    return days[dayIndex] || "Inconnu";
  };

  const getTimeOfDay = (hour) => {
    if (hour < 12) return "Matin";
    if (hour < 18) return "Après-midi";
    return "Inconnu";
  };
  const titleArray = articleData
    ? [
        articleData?.mostUsedArticle?.name || "Inconnu", //Article name
        articleData?.mostLikedCategory?.categ || "Inconnu", // Catégorie
        articleData?.mostLikedArticle?.name || "Inconnu", // Produit
        articleData?.mostLikedColor?.maincolor || "Inconnu", // Couleur
        getDayName(articleData?.bestDayOfWeek?.day_of_week), // Jour
        getTimeOfDay(articleData?.bestTimeOfDay?.hour_of_day), // Heure
      ]
    : ["-", "-", "-", "-", "-", "-"];

  const formatLocalDateTime = (date) => {
    const pad = (n) => n.toString().padStart(2, "0");
    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds()
      )}`
    );
  };
  const handleDateChange = (dates) => {
    if (dates.length === 2) {
      setDateRange(dates);
      setFromDate(dates[0]);
      setToDate(dates[1]);
    }
  };
  const countryFlags = {
    fr: frFlag,
    us: usFlag,
   
  };

  useEffect(() => {
    setIsLoading(true);
    
    const fetchData = async () => {
      try {
        const from = formatLocalDateTime(fromDate);
        const to = formatLocalDateTime(toDate);

        console.log("Formatted dates:", from, to);

        const params = `?from=${from}&to=${to}`;
        const response = await fetch(
          `http://localhost:3000/articles/statistics/${id}${params}`
        );
        const response2 = await fetch(
          `http://localhost:3000/sales/sales-metrics/${id}${params}`
        );
        const response3 = await fetch(
          `http://localhost:3000/sales/sales-percentage/${id}${params}`
        );
        const response4 = await fetch(
          `http://localhost:3000/sales/best-influencer/${id}${params}`
        );
        const response5 = await fetch(
          `http://localhost:3000/influencers/total-influencers/${id}${params}`
        );
        const response6 = await fetch(
          `http://localhost:3000/influencers/active-influencers/${id}${params}`
        );
        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        const data5 = await response5.json();
        const data6 = await response6.json();
        setArticleData(data);
        setBestCountry(data?.bestCountry);
        setsalesmetricsData(data2);
        setsalespercentageData(data3);
        setsalesinfluencerData(data4);
        setinfluencerData(data5);
        setactiveinfluencerData(data6);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, fromDate, toDate]);
  const flagImage = countryFlags[bestCountry?.countrycode] || frFlag;
  console.log(articleData);
  console.log(salesmetricsData);
  console.log(activeinfluencerData);
  console.log(influencerData);
  console.log(salespercentageData);
  console.log(salesinfluencerData);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-10 w-full max-w-9xl mx-auto">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Dashboard actions */}
            <div className="gap-2 py-2">
              <h1 className="text-xl text-[#022857]">Vue d'ensemble</h1>
            </div>

            {/* Right: Actions */}
            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 py-8 mr-20">
              <Datepicker
                onDateChange={handleDateChange}
                selectedDates={dateRange}
              />
            </div>
            {isLoading && (
              <div className="loader">
                <p>Loading...</p>{" "}
                
              </div>
            )}

            <div className="gap-2 py-2">
              <h1 className="text-xxl text-[#022857]">Performances globales</h1>
            </div>

            {/* Cards  */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column  */}
              <div className="col-span-12 lg:col-span-8">
                {/* Top 2 Cards */}
                <div className="grid grid-cols-8  gap-6 mb-6">
                  <DashboardCard01
                    icon={ShoppingIcon}
                    iconBgColor="bg-red-100"
                    title={`${salesmetricsData?.CA} €`}
                    subtitle="CA"
                  />
                  <DashboardCard01
                    icon={CrediCardIcon}
                    iconBgColor="bg-[#e2e5ec]"
                    title={`${salesmetricsData?.transactions}K`}
                    subtitle="Transactions"
                  />
                </div>

                {/* Bottom 3 Cards */}
                <div className="grid grid-cols-12 gap-6">
                  {[
                    {
                      icon: PanierIcon,
                      color: "bg-[#fdf4e5]",
                      title: `${salesmetricsData?.panierMoyen}€`,
                      subtitle: "Panier moyen",
                    },
                    {
                      icon: ShareIcon,
                      color: "bg-[#e9f5ec]",
                      title: `${activeinfluencerData?.activeInfluencers}`,
                      subtitle: "actifs influencers",
                    },
                    {
                      icon: NavigationIcon,
                      color: "bg-red-100",
                      title: `${influencerData?.totalInfluencers}`,
                      subtitle: "Total influencers",
                    },
                  ].map((card, index) => (
                    <DashboardCard01
                      key={index}
                      icon={card.icon}
                      iconBgColor={card.color}
                      title={card.title}
                      subtitle={card.subtitle}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column  */}
              <div className="col-span-12 w-full lg:col-span-4 lg:mt-0 mt-6">
                <DashboardCard06
                  percentage={
                    Array.isArray(salespercentageData) &&
                    salespercentageData?.length > 0
                      ? salespercentageData[0]?.percentage_of_total_sales
                      : 0
                  }
                />
              </div>

              {/* Insights Section */}
              <div className="col-span-12 mt-8">
                <h1 className="text-xxl text-[#022857]">Insights</h1>
              </div>

              {/* Bottom Row Cards */}
              <div className="col-span-12">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-6">
                    <DashboardCard04
                      icons={iconArray}
                      iconBgColors={bgColorArray}
                      titles={titleArray}
                      subtitles={subtitleArray}
                    />
                  </div>
                  <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                    {bestCountry && (
                      <DashboardCard02
                        image={flagImage}
                        title={
                          bestCountry
                            ? bestCountry.countrycode.toUpperCase()
                            : "Pas de meilleur pays"
                        }
                        subtitle="Meilleur Pays"
                      />
                    )}

                    {!bestCountry && (
                      <DashboardCard02
                        title="Pas de meilleur pays"
                        subtitle="Meilleur Pays"
                      />
                    )}
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                    {salesinfluencerData?.bestInfluencer ? (
                      <DashboardCard02
                        image={Image}
                        iconBgColor="bg-red-100"
                        title={salesinfluencerData.bestInfluencer.firstName}
                        subtitle="Meilleur influenceur"
                      />
                    ) : (
                      <DashboardCard02
                        title="Pas de meilleur influenceur"
                        subtitle="Meilleur influenceur"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
