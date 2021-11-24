import React from "react";
import "./coin-details.css";

const CoinDetails = ({coinData, onClickHandler}) => {
    console.log(coinData);
    return (
        <>
            <button className='btn' onClick={() => {onClickHandler(null)}}>Back</button>
            <div className="coin-wrapper">
                <div>
                    <img className='coin-img' src={coinData.image.small} alt={coinData.name}/>
                </div>
                <div>
                    <h2 className="coin-title">{coinData.name}({coinData.symbol.toUpperCase()}) </h2>
                    <ul className="coin-info">
                        <li className="coin-homepage">HomePage: <a href={coinData.links.homepage[0]}> {coinData.links.homepage[0]}</a></li>
                        <li className="coin-genesis">Genesis date: <span>{coinData.genesis_date}</span></li>
                        <li className="coin-capitalization">Market Capitalization: <span>{coinData.market_data.market_cap.eur.toLocaleString()}</span>EUR</li>
                    </ul>
                    <p dangerouslySetInnerHTML={{__html: coinData.description.en}}></p>
                </div>
            </div>
        </>
    )
}

export default CoinDetails;