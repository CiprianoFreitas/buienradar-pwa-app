import React, { useEffect } from 'react';

const Rainfall = () => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch(
                `https://buienradar-api.herokuapp.com/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
            );
        });
    });
    return <h2>rainfall</h2>;
};

export default Rainfall;
