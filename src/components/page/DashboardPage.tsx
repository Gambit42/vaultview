import React from "react";
import Card from "../molecules/Card";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4">
        <Card
          title="Total Employees"
          value="5234"
          color="#7B57E0"
          image="/icons/wallet-icon.svg"
        />
        <Card
          title="Total Employees"
          value="5234"
          color="#50C099"
          image="/icons/wallet-icon.svg"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
