import '../css/SearchResults.css'; 

const SearchResults = ({ onClick, id, image, name, symbol, price, volume, priceChange, marketcap}:any) => {
    return (
        <div className='CryptoCoin' onClick={() => onClick({id})}>
            <img src={image} alt="crypto" className='Logo'/>
            <h3 className='Name'>{name}</h3>
            <p className="Symbol">{symbol}</p>
            <div className="Data">
                <p className="Price">{price} kr.</p>
                <p className="Volume">{volume.toLocaleString()} kr.</p>
                {priceChange < 0 ?(
                    <p className="Percent red">{priceChange.toFixed(2)}%</p>
                ) : (<p className="Percent green">{priceChange.toFixed(2)}%</p>)
                }
                <p className="Marketcap">
                    Marketcap: {marketcap.toLocaleString()} kr.
                </p>
            </div>
        </div>
    );
}

export default SearchResults;
