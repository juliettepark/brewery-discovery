import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const DetailView = () => {
    const { breweryID } = useParams();
    const [brewInfo, setBrewInfo] = useState({});

    const makeQuery = () => {
        // Grab a list of breweries
        const query = `https://api.openbrewerydb.org/v1/breweries/${breweryID}`;
        console.log(breweryID);
        callAPI(query).catch(console.error);
    }

    const callAPI = async (query) => {
        const response = await fetch(query);
        const json = await response.json();
        if (json == null) {
            alert("Oops! Something went wrong with that query, let's try again!");
        } else {
            console.log(json);
            setBrewInfo(json);
        }
    }

    useEffect(makeQuery,[]);

    return (
        <div className="detailView">
            <h1>{brewInfo.name}</h1>
            <p>{brewInfo.name} is a {brewInfo.brewery_type} brewery located in {brewInfo.city}, {brewInfo.state}</p>
            <p>You can visit it:</p>
            <ul>
                <li>In person at: {brewInfo.street}, {brewInfo.city}, {brewInfo.state} {brewInfo.country}</li>
                <li>Online at: <a href={brewInfo.website_url}>{brewInfo.website_url}</a></li>
            </ul>
        </div>
    );
};

export default DetailView;