import React, { useState, useEffect } from 'react';
import TableMarket from "./components/TableMarket";
import CoinDetails from "./components/CoinDetails";
import "./app.css";

function App() {
    const [marketData, setMarketData] = useState([]);
    const [coinData, setCoinData] = useState(null);
    const [error, setIsError] = useState(false);

    useEffect(() => {
        fetchMarketDataHandler();
    }, [])

    function fetchMarketDataHandler() {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong with fetching market data');
                }
            })
            .then((data) => {
                const transformedMarketData = data.map((marketData) => {
                    return {
                        id: marketData.id,
                        name: marketData.name,
                        image: marketData.image,
                        symbol: marketData.symbol,
                        currentPrice: marketData.current_price,
                        highPrice: marketData.high_24h,
                        lowPrice: marketData.low_24h,
                    };
                });
                setMarketData(transformedMarketData);
            }).catch((error) => {
                setIsError(true);
                console.log(error)
        });
    }

    function onSetCoinData(data) {
        setCoinData(data);
    }

  return (
    <div className="App">
        {error && <p>Something went wrong with fetching market data</p>}
        {!coinData && marketData.length > 0 && <TableMarket marketData={marketData} onSetCoindData={onSetCoinData} coinData={coinData} />}
        {coinData && <CoinDetails coinData={coinData} onClickHandler={setCoinData}/>}
    </div>
  );
}

export default App;
