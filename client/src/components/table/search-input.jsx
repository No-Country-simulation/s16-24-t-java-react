import Icon from "../accesories/icon";

function SearchInput ({handleSearch}) {


  return (
    <div className="flex border-primary-40 border-2 px-2  rounded-lg bg-primary-20 text-primary-10 items-center text-white">
      <label htmlFor="search"><Icon iconName="magnifyingGlass" width="24"/></label>
      <input className="w-full bg-transparent focus:outline-none px-2 placeholder:text-white/80  font-semibold" type="text" id="search" name="search" onChange={handleSearch} placeholder="Ingresa un DNI"/>
    </div>
  )
}

export default SearchInput