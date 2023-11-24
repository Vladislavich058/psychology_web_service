import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Input } from "@material-tailwind/react";
Chart.register(...registerables);

const ChartAnalitic = ({ analitics, setDate, date }) => {
  let labels = [];
  let dataset = [];
  analitics &&
    analitics.map((analitic) => {
      labels.push(
        analitic.surname +
          " " +
          analitic.name.substring(0, 1).toUpperCase() +
          "." +
          analitic.lastname.substring(0, 1).toUpperCase()
      );
      dataset.push(analitic.records);
    });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Специалист",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: dataset,
      },
    ],
  };
  return (
    <div className="h-[500px] w-full">
      <div className="text-center uppercase font-medium text-3xl mb-10">
        Аналитика загруженности
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div>Выберите дату:</div>
          <div className="w-[120px]">
            <Input
              variant="static"
              type="date"
              value={date}
              className="text-base !font-montserrat w-[120px]"
              onChange={(e) => setDate(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </div>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: "Количество записей",
                color: "black",
              },
              ticks: {
                stepSize: 1,
              },
            },
            x: {
              title: {
                display: true,
                text: "Специалисты",
                color: "black",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ChartAnalitic;
