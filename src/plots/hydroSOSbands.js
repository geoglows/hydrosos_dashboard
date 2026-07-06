import Plotly from "plotly.js-dist-min";


function percentile(arr, p) {

    const idx = (p / 100) * (arr.length - 1);
  
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
  
    if (lower === upper) {
      return arr[lower];
    }
  
    return (
      arr[lower] +
      (arr[upper] - arr[lower]) *
      (idx - lower)
    );
  }

  export function plotHydroSOSBands(data) {
    const dates = data.datetime;
const flows = data[data.metadata.river_id];

const records = dates.map((d, i) => ({
  date: new Date(d),
  flow: flows[i]
}));

const monthlyGroups = {};

records.forEach(r => {

  const year = r.date.getUTCFullYear();
  const month = r.date.getUTCMonth() + 1;

  const key = `${year}-${month}`;

  if (!monthlyGroups[key]) {
    monthlyGroups[key] = [];
  }

  monthlyGroups[key].push(r.flow);

});

const monthlyMeans = {};

Object.entries(monthlyGroups).forEach(([key, values]) => {

  const [year, month] = key.split("-").map(Number);

  const mean =
    values.reduce((a, b) => a + b, 0) / values.length;

  if (!monthlyMeans[year]) {
    monthlyMeans[year] = {};
  }

  monthlyMeans[year][month] = mean;

});

const currentYear = new Date().getUTCFullYear();

const climatologyYears = [];

for (
  let y = currentYear - 30;
  y < currentYear;
  y++
) {
  climatologyYears.push(y);
}

const p10 = [];
const p25 = [];
const p75 = [];
const p90 = [];

for (let month = 1; month <= 12; month++) {

    const values = climatologyYears
      .map(y => monthlyMeans[y]?.[month])
      .filter(v => v !== undefined);
  
    values.sort((a, b) => a - b);
  
    p10.push(percentile(values, 10));
    p25.push(percentile(values, 25));
    p75.push(percentile(values, 75));
    p90.push(percentile(values, 90));
  
  }
  const currentYearMonthly = [];

for (let month = 1; month <= 12; month++) {

  currentYearMonthly.push(
    monthlyMeans[currentYear]?.[month] ?? null
  );

}const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const traces = [];

traces.push({
  x: months,
  y: p10,
  mode: "lines",
  line: { width: 0 },
  showlegend: false
});

traces.push({
    x: months,
    y: p25,
    mode: "lines",
    fill: "tonexty",
    fillcolor: "rgba(255,165,0,0.4)",
    line: { width: 0 },
    name: "Dry"
  });

  traces.push({
    x: months,
    y: p75,
    mode: "lines",
    fill: "tonexty",
    fillcolor: "rgba(0,180,0,0.35)",
    line: { width: 0 },
    name: "Normal"
  });

  traces.push({
    x: months,
    y: p90,
    mode: "lines",
    fill: "tonexty",
    fillcolor: "rgba(100,180,255,0.4)",
    line: { width: 0 },
    name: "Wet"
  });

  traces.push({
    x: months,
    y: currentYearMonthly,
  
    mode: "lines+markers",
  
    name: currentYear.toString(),
  
    line: {
      color: "black",
      width: 4
    },
  
    marker: {
      size: 8
    }
  });

  Plotly.newPlot(
    "hydrosos-bands",
    traces,
    {
      title: "HydroSOS Monthly Status",
  
      xaxis: {
        title: "Month"
      },
  
      yaxis: {
        title: "Mean Monthly Flow (m³/s)"
      }
    }
  );

  }