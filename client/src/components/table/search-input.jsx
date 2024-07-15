import Icon from "../accesories/icon";

function SearchInput ({handleSearch}) {


  return (
    <div className="flex border-primary-40 border-2 px-2 py-1 rounded-lg bg-secondary-50 text-primary-10 ">
      <input className="w-full bg-transparent focus:outline-none px-2 text-lg font-semibold" type="text" id="search" name="search" onChange={handleSearch}/>
      <label htmlFor="search"><Icon iconName="magnifyingGlass"/></label>
    </div>
  )
}

export default SearchInput