import { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import Filter from './filter.jsx'
import SearchInput from './search-input.jsx'
import TableHeader from './table-header.jsx'
import TableRow from './table-row.jsx'
import NewMemberButton from './new-member-button.jsx'
import ReportButton from './report-button.jsx'
import ProfileButton from './profile-button.jsx'
import CreateUser from '../modals/createUser.jsx'
import { useOutletContext } from 'react-router-dom'
import { PATHS, MembersColumns, StaffColumns } from '../../lib/const.js'
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

const Users = [
  {
    nombreCompleto: "Juan Pérez",
    fechaNacimiento: "1985-04-12",
    dni: "12345678",
    deporte: "Fútbol",
    tipoMembresia: "gold",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-07-01",
    diasDesdeVencimiento: 11,
    fechaAlta: "2022-01-15"
  },
  {
    nombreCompleto: "María García",
    fechaNacimiento: "1990-11-23",
    dni: "87654321",
    deporte: "Tenis",
    tipoMembresia: "platinum",
    tipoCuota: "anual",
    fechaVencimientoCuota: "2024-06-30",
    diasDesdeVencimiento: 12,
    fechaAlta: "2021-05-10"
  },
  {
    nombreCompleto: "Carlos López",
    fechaNacimiento: "1978-02-05",
    dni: "23456789",
    deporte: "Natación",
    tipoMembresia: "black",
    tipoCuota: "semestral",
    fechaVencimientoCuota: "2024-01-01",
    diasDesdeVencimiento: 193,
    fechaAlta: "2019-11-20"
  },
  {
    nombreCompleto: "Ana Martínez",
    fechaNacimiento: "1982-07-14",
    dni: "34567890",
    deporte: "Gimnasia",
    tipoMembresia: "gold",
    tipoCuota: "trimestral",
    fechaVencimientoCuota: "2024-05-01",
    diasDesdeVencimiento: 72,
    fechaAlta: "2020-08-30"
  },
  {
    nombreCompleto: "Luis Fernández",
    fechaNacimiento: "1995-09-18",
    dni: "45678901",
    deporte: "Ciclismo",
    tipoMembresia: "platinum",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-06-15",
    diasDesdeVencimiento: 27,
    fechaAlta: "2022-03-25"
  },
  {
    nombreCompleto: "Laura Gómez",
    fechaNacimiento: "1988-03-22",
    dni: "56789012",
    deporte: "Yoga",
    tipoMembresia: "black",
    tipoCuota: "trimestral",
    fechaVencimientoCuota: "2024-04-15",
    diasDesdeVencimiento: 88,
    fechaAlta: "2021-09-12"
  },
  {
    nombreCompleto: "Sofía Rodríguez",
    fechaNacimiento: "1993-12-30",
    dni: "67890123",
    deporte: "Pilates",
    tipoMembresia: "gold",
    tipoCuota: "anual",
    fechaVencimientoCuota: "2024-02-28",
    diasDesdeVencimiento: 135,
    fechaAlta: "2018-06-05"
  },
  {
    nombreCompleto: "Miguel Silva",
    fechaNacimiento: "1980-01-07",
    dni: "78901234",
    deporte: "Boxeo",
    tipoMembresia: "platinum",
    tipoCuota: "semestral",
    fechaVencimientoCuota: "2024-05-30",
    diasDesdeVencimiento: 43,
    fechaAlta: "2021-11-17"
  },
  {
    nombreCompleto: "Elena Torres",
    fechaNacimiento: "1975-08-25",
    dni: "89012345",
    deporte: "Running",
    tipoMembresia: "black",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-07-05",
    diasDesdeVencimiento: 7,
    fechaAlta: "2023-04-14"
  },
  {
    nombreCompleto: "Diego Sánchez",
    fechaNacimiento: "1992-06-11",
    dni: "90123456",
    deporte: "CrossFit",
    tipoMembresia: "gold",
    tipoCuota: "trimestral",
    fechaVencimientoCuota: "2024-03-15",
    diasDesdeVencimiento: 110,
    fechaAlta: "2020-12-01"
  },
  {
    nombreCompleto: "Fernando Ruiz",
    fechaNacimiento: "1987-05-22",
    dni: "11223344",
    deporte: "Fútbol",
    tipoMembresia: "gold",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-07-10",
    diasDesdeVencimiento: 2,
    fechaAlta: "2023-03-12"
  },
  {
    nombreCompleto: "Lucía Vázquez",
    fechaNacimiento: "1991-08-19",
    dni: "22334455",
    deporte: "Tenis",
    tipoMembresia: "platinum",
    tipoCuota: "anual",
    fechaVencimientoCuota: "2024-12-31",
    diasDesdeVencimiento: -172,
    fechaAlta: "2020-07-23"
  },
  {
    nombreCompleto: "Hugo Delgado",
    fechaNacimiento: "1983-03-15",
    dni: "33445566",
    deporte: "Natación",
    tipoMembresia: "black",
    tipoCuota: "semestral",
    fechaVencimientoCuota: "2024-10-01",
    diasDesdeVencimiento: -91,
    fechaAlta: "2017-09-10"
  },
  {
    nombreCompleto: "Clara Morales",
    fechaNacimiento: "1997-07-08",
    dni: "44556677",
    deporte: "Gimnasia",
    tipoMembresia: "gold",
    tipoCuota: "trimestral",
    fechaVencimientoCuota: "2024-08-01",
    diasDesdeVencimiento: -20,
    fechaAlta: "2021-02-14"
  },
  {
    nombreCompleto: "Emilio Castillo",
    fechaNacimiento: "1986-11-27",
    dni: "55667788",
    deporte: "Ciclismo",
    tipoMembresia: "platinum",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-07-15",
    diasDesdeVencimiento: -3,
    fechaAlta: "2022-05-18"
  },
  {
    nombreCompleto: "Valeria Rojas",
    fechaNacimiento: "1990-04-02",
    dni: "66778899",
    deporte: "Yoga",
    tipoMembresia: "black",
    tipoCuota: "anual",
    fechaVencimientoCuota: "2024-09-30",
    diasDesdeVencimiento: -92,
    fechaAlta: "2019-12-05"
  },
  {
    nombreCompleto: "Javier Ortiz",
    fechaNacimiento: "1984-12-13",
    dni: "77889900",
    deporte: "Pilates",
    tipoMembresia: "gold",
    tipoCuota: "semestral",
    fechaVencimientoCuota: "2024-11-01",
    diasDesdeVencimiento: -60,
    fechaAlta: "2016-04-07"
  },
  {
    nombreCompleto: "Alejandra Mendoza",
    fechaNacimiento: "1993-05-03",
    dni: "88990011",
    deporte: "Boxeo",
    tipoMembresia: "platinum",
    tipoCuota: "trimestral",
    fechaVencimientoCuota: "2024-07-20",
    diasDesdeVencimiento: -8,
    fechaAlta: "2022-11-22"
  },
  {
    nombreCompleto: "Pablo Soto",
    fechaNacimiento: "1982-01-20",
    dni: "99001122",
    deporte: "Running",
    tipoMembresia: "black",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-07-03",
    diasDesdeVencimiento: 9,
    fechaAlta: "2021-08-27"
  },
  {
    nombreCompleto: "Andrea Gil",
    fechaNacimiento: "1996-10-14",
    dni: "11112222",
    deporte: "CrossFit",
    tipoMembresia: "gold",
    tipoCuota: "anual",
    fechaVencimientoCuota: "2024-12-01",
    diasDesdeVencimiento: -142,
    fechaAlta: "2018-05-21"
  },
  {
    nombreCompleto: "Manuel Herrera",
    fechaNacimiento: "1989-06-17",
    dni: "22223333",
    deporte: "Fútbol",
    tipoMembresia: "platinum",
    tipoCuota: "mensual",
    fechaVencimientoCuota: "2024-06-25",
    diasDesdeVencimiento: 17,
    fechaAlta: "2023-01-30"
  }
];

function Table({ handleLogOut }) {
  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState([]);
  const [selectedSubFilter, setSelectedSubFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [newMember, setNewMember] = useState(false);
  const [tableHeaderInfo, setTableHeaderInfo] = useState(MembersColumns);
  const [users, setUsers] = useState(Users)
  const [profileModal, setProfileModal] = useState(false)
  const [userID, setUserID] = useState(null)
  const { t } = useTranslation();
  const pathname = useOutletContext();



  useEffect(() => {
    if (pathname === PATHS.HOME) {
      setTableHeaderInfo(MembersColumns)
    }
    if (pathname === PATHS.STAFF) {
      setTableHeaderInfo(StaffColumns)
    }
    filterUsers();
  }, [search, mainFilter, selectedSubFilter, pathname]);

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

  const handleProfileModal = () => {
    setProfileModal(!profileModal)
  }


  return (

    <>
      <div className="flex gap-32 w-full py-4 justify-around">
        <SearchInput handleSearch={handleSearch} />
        <Filter filters={MainFilter} handleChange={handleChangeMainFilter} />
        <Filter filters={subFilter} handleChange={handleSubFilter} />
        <NewMemberButton handleNewMember={handleNewMember} />
        <ReportButton />
        <ProfileButton handleLogOut={handleLogOut} />
      </div>
      <div className="overflow-y-auto max-h-[800px]">
        <table className="w-full text-sm text-gray-500 px-10">
          <TableHeader headers={tableHeaderInfo} />
          <tbody>
            {users.map((user) => (
              <TableRow setUserID={setUserID} handleProfileModal={handleProfileModal} user={user} key={user.dni} pathname={pathname}/>
            ))}
          </tbody>
        </table>
      </div>
      {newMember && <CreateUser handleNewMember={handleNewMember} closeCallback={() => setNewMember(false)}/>}
      {profileModal && <UserDetail usuarioCorrecto={Users.filter((user) => user.dni === userID)} />}

    </>

  )
}

export default Table

//CreateUser handleNewMember={handleNewMember} closeCallback={() => setNewMember(false)}