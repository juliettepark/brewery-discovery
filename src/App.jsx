import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/BrewList';
import BrewList from './components/BrewList';
import Card from './components/Card';
import { Link } from 'react-router-dom';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from "react-chartjs-2";


Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

Chart.defaults.color = "#FFFFFF";

const options = {
  response: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Graph of the number of breweries located in each state",
    },
  },
}

function App() {
  const [totalList, setTotalList] = useState([]);
  const [showList, setShowList] = useState([]);

  const makeQuery = () => {
    // Grab a list of breweries
    const query = "https://api.openbrewerydb.org/v1/breweries";
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    if (json == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      console.log(json);
      setTotalList(json);
      setShowList(json);
    }
  }

  const calculateMostBreweries = () => {
    // Count frequency of each city
    let frequency = {};

    totalList.forEach(brewery => {
      frequency[brewery.city] = (frequency[brewery.city] || 0) + 1;
    });
    // console.log(frequency);

    // Grab the max
    let maxCity = "None";
    let maxCount = -1;
    for (const city in frequency) {
      if (frequency[city] > maxCount) {
        maxCity = city;
        maxCount = frequency[city];
      }
    }
    // console.log(maxCity);
    // console.log(maxCount);

    return maxCity;
  }

  const stateToBrewery = () => {
    let frequency = {};

    totalList.forEach(brewery => {
      frequency[brewery.state] = (frequency[brewery.state] || 0) + 1;
    });

    return frequency;
  }

  const stateCount = stateToBrewery();
  const labels = Object.keys(stateCount);
  const data = {
    labels,
    datasets: [
      {
        label: "Brewery Count",
        data: Object.values(stateCount),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fillColor: 'rgba(255, 255, 255, 0.5)',
        color: 'rgba(255, 255, 255, 0.5)',
      }
    ]
  }

  const calculateBreweryType = () => {
    // Count frequency of each city
    let frequency = {};

    totalList.forEach(brewery => {
      frequency[brewery.brewery_type] = (frequency[brewery.brewery_type] || 0) + 1;
    });
    // console.log(frequency);

    // Grab the max
    let maxBrewery_type = "None";
    let maxCount = -1;
    for (const brew in frequency) {
      if (frequency[brew] > maxCount) {
        maxBrewery_type = brew;
        maxCount = frequency[brew];
      }
    }
    // console.log(maxCity);
    // console.log(maxCount);

    return maxBrewery_type;
  }

  const searchItems = (criteria) => {
    setShowList(totalList.filter((item) => {
      return item.name.includes(criteria);
    }));
  }

  const secondaryLocation = () => {
    setShowList(totalList.filter((item) => {
      return item.address_2 != null;
    }));
  }

  const westCoast = () => {
    setShowList(totalList.filter((item) => {
      return item.longitude <= "-124.0" && item.longitude >= "-117.0";
    }));
  }

  const phone = () => {
    setShowList(totalList.filter((item) => {
      console.log(item.phone);
      return item.phone && (item.phone).startsWith("7");
    }));
  }

  const removeFilters = () => {
    setShowList(totalList);
  }

  useEffect(makeQuery, []);

  return (
    <>
      <div>
        <h1>Brewery Discovery! 🍻</h1>

        <Bar options={options} data={data} />
  
        <div className='metrics'>
          <Card descrip="City with the most breweries:" metric={calculateMostBreweries()}/>
          <Card descrip="Most popular brewery type:" metric={calculateBreweryType()}/>
          <Card descrip="Number of matching breweries:" metric={showList.length}/>
        </div>

        <input className='searchBar'
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />

        <div className='filterButtons'>
          <button onClick={secondaryLocation}>Filter by Has Secondary Location</button>
          <button onClick={westCoast}>Filter by West Coast Breweries</button>
          <button onClick={phone}>Filter by Phone Area Code 7</button>
          <button onClick={removeFilters}>Remove Filters</button>
        </div>

        <BrewList brewList={showList} />
        
      </div>
    </>
  )
}

export default App
