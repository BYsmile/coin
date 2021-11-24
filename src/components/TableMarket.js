import React from "react";
import "./table-market.css"

const TableMarket = (props) => {
    function fetchCoinDataHandler(e) {
        const id = e.currentTarget.dataset.id;

        props.onSetCoindData(null);

        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong with fetching coin data');
                }
            })
            .then((data) => {
                props.onSetCoindData(data);
            }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th colSpan={3}>Coin</th>
                <th>Current</th>
                <th>High</th>
                <th>Low</th>
            </tr>
            </thead>
            <tbody>
            {props.marketData.map((item, index) => {
                    return (
                        <tr data-id={item.id} key={item.id} onClick={fetchCoinDataHandler}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={item.image} width="20" height="20" alt={item.name}/>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.symbol.toUpperCase()}</td>
                            <td>{item.currentPrice}</td>
                            <td>{item.highPrice}</td>
                            <td>{item.lowPrice}</td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
    )
}

export default TableMarket;