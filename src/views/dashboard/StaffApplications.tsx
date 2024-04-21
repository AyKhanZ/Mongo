import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, Avatar } from "@mui/material";
import DashboardCard from "@/components/shared/DashboardCard";

const StaffApplication = () => {
  // chart color
  const theme = useTheme();
  const green = theme.palette.success.main;
  const orange = theme.palette.warning.main;
  const error = theme.palette.error.main;
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 50,
    },
    colors: [green, error, orange],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "70px",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 150,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [5368, 3500, 4106];

  return (
    <DashboardCard title="Staff Applications Card">
      <Grid container spacing={3}>
        {/* column */}
        <Grid item xs={6} sm={7}>
          <Typography variant="h5" fontWeight="700">
            500 Total applications
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            mt={1}
            alignItems="center"
          >
          </Stack>
          
          <Stack spacing={2} mt={3} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: green,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                fontSize="11px"
                color="textSecondary"
              >
               370 Approved
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: error,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                fontSize="11px"
                color="textSecondary"
              >
               50 Rejected
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: orange,
                  svg: { display: "none" },
                }}
              ></Avatar>
              <Typography
                variant="subtitle2"
                fontSize="11px"
                color="textSecondary"
              >
               80 Pending
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={4} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            width={"100%"}
            height="170px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default StaffApplication;