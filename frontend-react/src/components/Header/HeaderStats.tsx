import React from "react";

const HeaderStats: React.FC = () => {
  const stats = [
    {
      title: "Ventes aujourd'hui",
      value: "1,245 €",
      change: "+12%",
      trend: "up",
      icon: "fa-euro-sign",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Commandes en cours",
      value: "87",
      change: "-3%",
      trend: "down",
      icon: "fa-shopping-cart",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Nouveaux clients",
      value: "34",
      change: "+8%",
      trend: "up",
      icon: "fa-user-plus",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Produits en stock",
      value: "3,412",
      change: "Stock total",
      trend: "neutral",
      icon: "fa-boxes",
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 md:pt-32 pb-32 pt-24">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-md`}>
                    <i className={`fas ${stat.icon} text-lg`}></i>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {stat.title}
                    </h5>
                    <span className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </span>
                    <p className={`text-sm mt-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderStats;