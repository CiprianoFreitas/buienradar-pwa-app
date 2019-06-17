import React, { useEffect, useState } from 'react';
import { AreaChart, ResponsiveContainer, Area, XAxis } from 'recharts';

// const TinyLineChart = React.createClass({
//     render() {
//         return (

//         );
//     },
// });

// ReactDOM.render(<TinyLineChart />, document.getElementById('container'));

const Chart = ({ data }) => (
    <>
        <h2>Rainfall</h2>
        <div style={{ width: '500px', height: '100px' }}>
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
        <h3>Feels like: </h3>
        <h1>{forecast.data.feeltemperature}°</h1>
    </>
);

const Weather = ({ weather }) => (
    <>
        <Temp forecast={weather.forecast} />
        <Chart data={weather.rainfall} />
    </>
);

const Rainfall = () => {
    const [weather, setWeather] = useState(undefined);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(
                `https://buienradar-api.herokuapp.com/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            )
                .then(response => response.json())
                .then(setWeather);
        });
    }, []);
    return (
        <>
            <div>{weather ? <Weather weather={weather} /> : 'Loading...'}</div>
        </>
    );
};

export default Rainfall;
