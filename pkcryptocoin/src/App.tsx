import {useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import './css/GeneralApp.css'; 
import './css/SearchResults.css'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CoinInfo from "./components/CoinInfo";

function App() {
  const [coins, setCoins] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');

  //search history
  const [searchHistory, setSearchHistory] = useState<any[]>([]);
  const onSubmit = (e:any) => {
    //stops reload of the page.
    e.preventDefault(); 

    //If what we searched by, have more then 0 results. 
    // We take the first, and use it's id, to save a search history.
    // This way we only save useful search history. 
    if(searchResult.length > 0){ 
      setSearchHistory([...searchHistory, searchResult[0].id]);
    }
  }

  // When the program loads, we use the imported axios to make a GET request, 
  // to get a list of all supported coins back. This is limited to 100 atm.
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=dkk&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data);
    }).catch(error => console.log(error));
  });

  // We set our search value. so we can use it to filter later.
  const updateList = (e:any) => {
    setSearch(e.target.value);
  }

  // Shows us a list of coins by what setSearch in updateList was put to.
  const searchResult = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  const onClick = async (id:string) => {
    window.location.href = 'CoinInfo';
    //window.history.pushState("", "", "/CoinInfo");
  }

  // The Typescript React code, that will be turned into html.
  return (
    <Router>
      <div className="pkcryptocoin">
        <SearchBar updateList={updateList} onSubmit={onSubmit} searchHistory={searchHistory} />
        <Routes>
          <Route path='/CoinInfo' element={<CoinInfo />} />
          <Route path='/' element={ <>
          <div className='CryptoCoin firstTime'>
            <p className="Logo">Logo.</p>
            <p className="Name">Name.</p>
            <p>Symbol.</p>
            <div className="Data">
                <p className="Price">Price.</p>
                <p className="Volume">Volume.</p>
                <p className="Percent">Change in 24h.</p>
                <p className="Marketcap">Market Cap.</p>
            </div>
          </div>
          {searchResult.length < 1 ? ( <h2>No coins found</h2> ) : (
          searchResult.map(coin => {
            return (
              <SearchResults 
                key={coin.id} 
                onClick={onClick}
                id={coin.id}
                name={coin.name} 
                image={coin.image} 
                symbol={coin.symbol}
                marketcap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume}
              />
            )
          }))}
          </> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
