import React from "react";

const BanList = ({ banList , handleClick }) => {
    console.log(banList); 
    return (
        <div>
            <h2>Ban List</h2>
            <ul>
                {banList.map((attribute, index) => (
                    <li key={index}>
                        <button onClick={() => handleClick(attribute)}>
                            {attribute}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BanList;