import DashboardCard from "@/components/shared/DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// @ts-ignore
import {CardBody, CardSubtitle, CardTitle } from 'reactstrap';

const SalesSummary = () => {

  const chartoptions = {
    series: [
      {
        name: "Any",
        data: [0, 31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Any",
        data: [0, 61, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Any",
        data: [0, 20, 50, 35, 70, 90, 60, 100]
      },
      {
        name: "Any",
        data: [0, 20, 30, 25, 40, 60, 30, 40 ]
      }
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };

  // @ts-ignore
  return (
    <DashboardCard>
      <CardBody>
        <CardTitle tag="h5">Sales Summary</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Yearly Sales Report
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="440"
          options={chartoptions.options}
          series={chartoptions.series}
        />
      </CardBody>
    </DashboardCard>
  )
};

export default SalesSummary;