import '../css/SearchBar.css'; 

const SearchBar = ({updateList, onSubmit, searchHistory}:any) => {
    return (
        <div className="SearchBar" onSubmit={onSubmit}>
            <h1 className="SearchBarTitle">Search for Crypto coins:</h1>
            <form>
                <input type="text" placeholder="What we looking for?" list="SearchHistoryList" className="SearchBarInput" onChange={updateList} />
                <datalist id="SearchHistoryList">
                    {searchHistory.length < 1 ? ("") : (
                        searchHistory.map((text:string) => {
                            return (
                                <option key={text} value={text} />
                            )
                        })
                    )}
                </datalist>
            </form>
        </div>
    );
}

export default SearchBar
