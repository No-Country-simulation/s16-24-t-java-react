import { useEffect, useState, createContext, useContext } from 'react'
import Filter from './filter.jsx'
import SearchInput from './search-input.jsx'
import TableHeader from './table-header.jsx'
import TableRow from './table-row.jsx'
import { useTranslation } from "react-i18next"
import NewMemberButton from './new-member-button.jsx'
import ReportButton from './report-button.jsx'
import ProfileButton from './profile-button.jsx'
import CreateUser from '../modals/createUser.jsx'
import UserDetail from "../modals/userDetail.jsx"
import { usersContext } from './usersInfoContext.jsx'

const MainFilter = [
  "sport",
  "subscription",
  "payment",
]

const Sports = [
  "football",
  "tennis",
  "swimming",
  "gymnastics",
  "cycling",
  "yoga",
  "pilates",
  "boxing",
  "running",
  "crossfit"
]

const Payment = [
  "monthly",
  "quarterly",
  "semiannual",
  "annual"
]

const Subscriptions = [
  "black",
  "gold",
  "platinum"
]

function Table({handleLogOut}) {
  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState([]);
  const [selectedSubFilter, setSelectedSubFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [newMember, setNewMember] = useState(false);
  const [profile, setProfile] = useState(false)
  const {users, setUsers} = useContext(usersContext)
  const {t} = useTranslation();

  useEffect(() => {
    filterUsers();
  }, [search, mainFilter, selectedSubFilter]);

  const filterUsers = () => {
    let usersToFilter = [...users];

    if (mainFilter === "sport") {
      if (selectedSubFilter && selectedSubFilter !== "all") {
        usersToFilter = usersToFilter.filter((user) => user.deporte === t(`filter.${selectedSubFilter}`))
      } else {
        usersToFilter = [...Users];
      }
    }

    if (mainFilter === "subscription") {
      if (selectedSubFilter && selectedSubFilter !== "all") {
        usersToFilter = usersToFilter.filter((user) => (user.tipoMembresia === t(`filter.${selectedSubFilter}`).toLowerCase()));
      } else {
        usersToFilter = [...Users];
      }
    }

    if (mainFilter === "payment") {
      if (selectedSubFilter && selectedSubFilter !== "Todos") {
        usersToFilter = usersToFilter.filter((user) => user.tipoCuota === t(`filter.${selectedSubFilter}`).toLowerCase());
      } else {
        usersToFilter = [...Users];
      }
    }

    if (search) {
      usersToFilter = usersToFilter.filter((user) =>
        user.dni.includes(search)
      );
    }
    setUsers(usersToFilter);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeMainFilter = (e) => {
    if (e.target.value === "all") {
      setUsers(Users);
      setSubFilter([]);
    }
    if (e.target.value === "sport") {
      setMainFilter(e.target.value);
      setSubFilter(Sports);
      setSelectedSubFilter(null)
    }
    if (e.target.value === "subscription") {
      setMainFilter(e.target.value);
      setSubFilter(Subscriptions);
      setSelectedSubFilter(null)
    }
    if (e.target.value === "payment") {
      setMainFilter(e.target.value);
      setSubFilter(Payment);
      setSelectedSubFilter(null)
    }
  };

  const handleSubFilter = (e) => {
    if (e.target.value === "all") {
      setSelectedSubFilter(null)
      setUsers(Users);
    }
    setSelectedSubFilter(e.target.value);
  };

  const handleNewMember = () => {
    setNewMember(!newMember);
  };



  const handleProfile = () => {
    setProfile(!profile)
  } 

  

  return (
    <>
      <div className="flex gap-32 w-full py-4 justify-around">
        <SearchInput handleSearch={handleSearch} />
        <Filter filters={MainFilter} handleChange={handleChangeMainFilter} />
        <Filter filters={subFilter} handleChange={handleSubFilter} />
        <NewMemberButton handleNewMember={handleNewMember}/>
        <ReportButton />
        <ProfileButton handleLogOut={handleLogOut}/>
      </div>
      <div className="overflow-y-auto max-h-[800px]">
      <table className="w-full text-left text-sm text-gray-500 overflow-y-scroll px-10">
        <TableHeader />
        <tbody>
          {users.map((user) => (
            <TableRow handleClick={handleProfile} user={user} key={user.dni} />
          ))}
        </tbody>
      </table>
      </div>
      
      {newMember && <UserDetail />}
    </>

  )
}

export default Table

