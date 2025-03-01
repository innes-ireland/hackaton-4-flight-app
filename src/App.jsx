import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Flightresults from './components/Flightresults';
import PageCounter from './components/PageCounter';
import axios from 'axios';


const App = () => {
  const [flightData, setFlightData] = useState(null);
  const [counterNr, setNrOnCounter] = useState(1);
  const [apiUrl, setApiUrl] = useState(null);
  const [isDirect, setIsDirect] = useState(false);
  const [searchInput, setSearchInput] = useState({
    flyFrom: "PRG",
    flyTo: "VLC",
    dateFrom: null,
    dateTo: null
  })

  //+++++++++++++++Bri&Bina's commented junk+++++++++++++++
  const [isLoading, setIsLoading] = useState(false);
  // const dateFrom = '11/11/2022';
  // const dateTo = '20/11/2022';
  //+++++++++++++++Bri&Bina's commented junk+++++++++++++++



  // // for setting and holding whatever we search for
  // const [searchQuery, setSearchQuery] = useState("");
  // // I assume for setting and holding whatever we get back
  // const [searchResult, setSearchResult] = useState("");


  // const getApiUrl = () => apiUrl;

  // tells the code what you want it to react to?? using the 
  // array at the bottom that you sort of understand
  useEffect(() => {
    // gets the shit from the API and for some reason we put it
    // in the useEffect, which we've never done before
    const loadData = async () => {
      setIsLoading(true);
      // console.log(dateFrom)
      //+++++++++++++++Bri&Bina's commented junk+++++++++++++++

      // the usual except it calls that function that builds the url
      // with our search data
      const url = apiUrl;
      const res = await axios.get(url);
      setFlightData(res.data);


      setIsLoading(false);
    };
    if (apiUrl !== null) {
      loadData();
    }

    // only loads data if something has been searched (need searchQuery in [] below)
    // if (searchQuery) {
    //   loadData();
    // }
  }, [apiUrl]);


  // const filterFlightData =
  //   flightData === null
  //     ? []
  //     : flightData.data.filter((flight, i) => i >= ((counterNr - 1) * 10) && i < ((counterNr * 10)));

  return (

    <div className="whole-app">

      <SearchBar
        setApiUrl={setApiUrl}
        setIsDirect={setIsDirect}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="flight-results">
        <Flightresults
          flightData={flightData}
          isLoading={isLoading}
          counterNr={counterNr}
          setNrOnCounter={setNrOnCounter}
          isDirect={isDirect}
          searchInput={searchInput}
        />
      </div>

    </div >
  );
};

export default App;
