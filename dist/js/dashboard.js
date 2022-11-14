import Api from "./models/Api.js";
import { element } from "./helpers.js";
import PersistentData from "./models/PersistentData.js";

let data = {};
let isWeeklyRevenueChart = true;

const populateTableData = (parent, data = []) => {
  const tableData = data.map(
    (dt) => `
  <tr>
    <td>${dt?.product?.name}</td>
    <td></td>
    <td>${dt?.units}</td>
    <td>${dt?.revenue}</td>
  </tr>
  `
  );
  parent.innerHTML = tableData.toLocaleString();
};

const displaySalesOnCards = () => {
  const date = new Date();
  const dashboardData = data?.dashboard;
  console.log(dashboardData);
  const todaySales = dashboardData?.sales_over_time_week[date.getDay()];
  const lastMonthSales =
    dashboardData?.sales_over_time_year[date.getMonth() - 1];
  let total_week_orders = 0,
    total_week_price = 0;

  const lastWeekSales = Object.values(dashboardData?.sales_over_time_week);
  lastWeekSales.forEach((value, index) => {
    total_week_orders += value?.orders;
    total_week_price += value?.total;
  });

  element(
    "#today-sales"
  ).textContent = `$${todaySales?.total} / ${todaySales?.orders} orders`;

  element(
    "#last-week-sales"
  ).textContent = `$${total_week_price} / ${total_week_orders} orders`;

  element(
    "#last-month-sales"
  ).textContent = `$${lastMonthSales?.total} / ${lastMonthSales?.orders} orders`;
};

const flattenData = (data={}) => {
  const weeklyData = data?.sales_over_time_week.values
  const monthlyData = data?.sales_over_time_year
  return 
}

const displayRevenueChart = (data={}, weekly=true) => {
  const weeklyData = Object.values(data?.sales_over_time_week)
    .map( sale => sale.orders)
  const monthlyData = Object.values(data?.sales_over_time_year)
    .map( sale => sale.orders)

  const weeklyLabels = [
    "today",
    "yesterday",
    "day3",
    "day 4",
    "day 5",
    "day 6",
    "day 7",
  ]
  const monthlyLabels = [
    'this month', 
    'last month',
    'month 3',
    'month 4',
    'month 5',
    'month 6',
    'month 7',
    'month 8',
    'month 9',
    'month 10',
    'month 11',
    'month 12',
  ]
  const chart = element('#myChart')
  const myChart = new Chart(chart, {
    type: "bar",
    data: {
      labels: weekly ? weeklyLabels : monthlyLabels, 
      datasets: [
        {
          label: weekly ? 'Revenue (Last 7 days)' : 'Revenue (12 months)',
          data: weekly ? weeklyData : monthlyData,
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const api = new Api(axios);

const token = PersistentData.getUser(api);

api
  .token(token["access_token"])
  .get("/dashboard")
  .then((response) => {
    data = { ...response.data };

    populateTableData(
      element("#best-sellers-tbody"),
      data?.dashboard?.bestsellers
    );

    displaySalesOnCards();
    displayRevenueChart(data?.dashboard)
  });

