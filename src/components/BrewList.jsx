import React from 'react';

const BrewList = ({brewList}) => {

    // Make sure to return the li since I used {}
    // This is now a function body and I must return.
    // Using () means 1-liner implicit return
    const mapToList = () => {
        return brewList.map((item) => {
            return <li className='breweryItem' key={item.id}>{item.name}, Located in {item.address_1}, {item.city}, {item.state}</li>
        })
    }

    return (
        <ul>
            {mapToList()}
        </ul>
    );
}

export default BrewList;