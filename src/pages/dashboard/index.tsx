// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icons Imports
import AccountGroup from "mdi-material-ui/AccountGroup";
import Rocket from "mdi-material-ui/RocketLaunchOutline";
import Emotion from "mdi-material-ui/EmoticonHappyOutline";
import TopRight from "mdi-material-ui/ArrowTopRight";

// ** Custom Components Imports
import CardStatisticsVerticalComponent from "@/components/card-statistics/card-stats-vertical";

// ** Styled Component Import
import ApexChartWrapper from "@/styles/libs/react-apexcharts";

import SalesSummary from "@/views/dashboard/SalesSummary";
import ProductSales from "@/views/dashboard/ProductSales";
import SalesByCountries from "@/views/dashboard/SalesByCountries";
import Schedules from "@/views/dashboard/Schedules";
import StaffApplication from "@/views/dashboard/StaffApplications";
import StatisticsCard from "@/views/dashboard/StatisticsCard";
import DashboardTable from "@/views/dashboard/DashboardTable";
import TotalEarning from "@/views/dashboard/TotalEarning";
import Trophy from "@/views/dashboard/Trophy";
import Withdraw from "@/views/dashboard/Withdraw";
import SideBarLayout from "@/components/SideBarLayout/SideBarLayout";

const Dashboard = () => {
  return (
    <SideBarLayout>
      <ApexChartWrapper>
        <Grid padding={3} container spacing={6}>
          <Grid item xs={12} md={4}>
            <Trophy />
          </Grid>
          <Grid item xs={12} md={8}>
            <StatisticsCard />
          </Grid>
          <Grid item xs={14} lg={8}>
            <SalesSummary />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StaffApplication />
              </Grid>
              <Grid item xs={12}>
                <ProductSales />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} lg={3}>
            <CardStatisticsVerticalComponent
              stats="250"
              icon={<AccountGroup />}
              color="warning"
              title="Total number of staff"
              trendNumber=""
              subtitle="12 more than last quarter "
            />
          </Grid>
          <Grid item xs={6} lg={3}>
            <CardStatisticsVerticalComponent
              stats="450"
              title="Happy Customers"
              trend="negative"
              color="secondary"
              trendNumber=""
              subtitle="15 more than last quarter"
              icon={<Emotion />}
            />
          </Grid>
          <Grid item xs={6} lg={3}>
            <CardStatisticsVerticalComponent
              stats="10"
              trend="negative"
              trendNumber=""
              title="Total Project"
              subtitle="2% more than last quarter"
              icon={<Rocket />}
            />
          </Grid>
          <Grid item xs={6} lg={3}>
            <CardStatisticsVerticalComponent
              stats="10"
              color="success"
              trend="negative"
              trendNumber=""
              subtitle="Total departments"
              title="Potential growth "
              icon={<TopRight />}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={7}>
            <Withdraw />
          </Grid>
          <Grid item xs={12} lg={5}>
            <SalesByCountries />
          </Grid>

          <Grid item xs={12} md={10} lg={5}>
            <Schedules />
          </Grid>

          <Grid item xs={12} md={10} lg={7}>
            <TotalEarning />
          </Grid>
          <Grid item xs={12}>
            <DashboardTable />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </SideBarLayout>
  );
};

export default Dashboard;
