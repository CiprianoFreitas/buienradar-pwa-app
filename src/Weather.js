import React, { useEffect, useState } from "react";
import { AreaChart, ResponsiveContainer, Area, XAxis } from "recharts";
import { format } from "date-fns";

const Chart = ({ data }) => (
    <>
        <h2>Rainfall</h2>
        <div style={{ width: '100vw', maxWidth: '900px', height: '100px' }}>
            <ResponsiveContainer>
                <AreaChart height={100} data={data}>
                    <XAxis
                        interval={2}
                        dataKey="time"
                        padding={{ left: 20, right: 20 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8884d8"
                        strokeWidth={1}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </>
);

const Temp = ({ forecast }) => (
    <>
        <h3>Temperature</h3>
        <h1>{forecast.data.temperature}°</h1>
    </>
);

const Forecast = ({ forecast }) => (
  <>
    <details>
      <summary>
        <b>Forecast</b>
      </summary>
      <table style={{ width: "100%" }}>
        <tbody>
          {forecast.data.forecast.map(f => (
            <tr>
              <td align="right">
                <i>{format(new Date(f.datetime), "iiiiii dd/MM")}</i>
              </td>
              <td align="left">
                <b>
                  {f.maxtemp}° / {f.mintemp}°
                </b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  </>
);

const Weather = ({ weather }) => (
    <>
        <Temp forecast={weather.forecast} />
        <Chart data={weather.rainfall} />
        <Forecast forecast={weather.forecast} />
    </>
);

const Rainfall = () => {
    function getData() {
        setWeather(undefined);
        navigator.geolocation.getCurrentPosition(
            function(position) {
                fetch(
                    `https://buienradar-api.herokuapp.com/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
                )
                    .then(response => response.json())
                    .then(setWeather);
            },
            null,
            { timeout: 10000 }
        );
    }
    const [weather, setWeather] = useState(undefined);
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <button onClick={getData}>Refresh</button>
            <div>{weather ? <Weather weather={weather} /> : 'Loading...'}</div>
        </>
    );
};

export default Rainfall;
