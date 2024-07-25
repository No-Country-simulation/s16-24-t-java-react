import { useContext, useEffect, useState } from 'react'
import { useTranslation } from "react-i18next"
import { useOutletContext } from 'react-router-dom'
import { ComplexContext } from '../../contexts/complex-context.jsx'

import Filter from './filter.jsx'
import SearchInput from './search-input.jsx'
import TableHeader from './table-header.jsx'
import TableRow from './table-row.jsx'
import NewModalButton from './new-modal-button.jsx'
import ReportButton from './report-button.jsx'
import ProfileButton from './profile-button.jsx'
import CreateUser from '../modals/create-user.jsx'
import UserDetail from "../modals/userDetail.jsx"
import CreateComplex from '../modals/create-complex.jsx'
import CreateEmployee from '../modals/create-employee.jsx'

import { PATHS, MembersColumns, StaffColumns, HeadquartersColumns } from '../../lib/const.js'
import useGetCustomers from '../../hooks/useGetCustomers.jsx'
import useGetEmployees from '../../hooks/useGetEmployees.jsx'

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
    fechaVencimientoCuota: "2024-07-01",
    tipoCuota: "mensual",
    diasDesdeVencimiento: 11,
    fechaAlta: "2022-01-15",
    correoElectronico: "juan.perez@example.com",
    ciudad: "Buenos Aires",
    direccion: "Calle Falsa 123",
    CP: "1000",
    telefono: "123456789"
  },
  {
    nombreCompleto: "María García",
    fechaNacimiento: "1990-11-23",
    dni: "87654321",
    deporte: "Tenis",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-06-30",
    tipoCuota: "anual",
    diasDesdeVencimiento: 12,
    fechaAlta: "2021-05-10",
    correoElectronico: "maria.garcia@example.com",
    ciudad: "Rosario",
    direccion: "Avenida Siempre Viva 742",
    CP: "2000",
    telefono: "987654321"
  },
  {
    nombreCompleto: "Carlos López",
    fechaNacimiento: "1978-02-05",
    dni: "23456789",
    deporte: "Natación",
    tipoMembresia: "black",
    fechaVencimientoCuota: "2024-01-01",
    tipoCuota: "semestral",
    diasDesdeVencimiento: 193,
    fechaAlta: "2019-11-20",
    correoElectronico: "carlos.lopez@example.com",
    ciudad: "Córdoba",
    direccion: "Calle Siempreviva 123",
    CP: "5000",
    telefono: "234567890"
  },
  {
    nombreCompleto: "Ana Martínez",
    fechaNacimiento: "1982-07-14",
    dni: "34567890",
    deporte: "Gimnasia",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-05-01",
    tipoCuota: "trimestral",
    diasDesdeVencimiento: 72,
    fechaAlta: "2020-08-30",
    correoElectronico: "ana.martinez@example.com",
    ciudad: "Mendoza",
    direccion: "Avenida Principal 456",
    CP: "5500",
    telefono: "345678901"
  },
  {
    nombreCompleto: "Luis Fernández",
    fechaNacimiento: "1995-09-18",
    dni: "45678901",
    deporte: "Ciclismo",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-06-15",
    tipoCuota: "mensual",
    diasDesdeVencimiento: 27,
    fechaAlta: "2022-03-25",
    correoElectronico: "luis.fernandez@example.com",
    ciudad: "Salta",
    direccion: "Calle Nueva 789",
    CP: "4400",
    telefono: "456789012"
  },
  {
    nombreCompleto: "Laura Gómez",
    fechaNacimiento: "1988-03-22",
    dni: "56789012",
    deporte: "Yoga",
    tipoMembresia: "black",
    fechaVencimientoCuota: "2024-04-15",
    tipoCuota: "trimestral",
    diasDesdeVencimiento: 88,
    fechaAlta: "2021-09-12",
    correoElectronico: "laura.gomez@example.com",
    ciudad: "San Juan",
    direccion: "Pasaje Escondido 321",
    CP: "5400",
    telefono: "567890123"
  },
  {
    nombreCompleto: "Sofía Rodríguez",
    fechaNacimiento: "1993-12-30",
    dni: "67890123",
    deporte: "Pilates",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-02-28",
    tipoCuota: "anual",
    diasDesdeVencimiento: 135,
    fechaAlta: "2018-06-05",
    correoElectronico: "sofia.rodriguez@example.com",
    ciudad: "La Plata",
    direccion: "Boulevard Grande 654",
    CP: "1900",
    telefono: "678901234"
  },
  {
    nombreCompleto: "Miguel Silva",
    fechaNacimiento: "1980-01-07",
    dni: "78901234",
    deporte: "Boxeo",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-05-30",
    tipoCuota: "semestral",
    diasDesdeVencimiento: 43,
    fechaAlta: "2021-11-17",
    correoElectronico: "miguel.silva@example.com",
    ciudad: "Tucumán",
    direccion: "Calle Pequeña 987",
    CP: "4000",
    telefono: "789012345"
  },
  {
    nombreCompleto: "Elena Torres",
    fechaNacimiento: "1975-08-25",
    dni: "89012345",
    deporte: "Running",
    tipoMembresia: "black",
    fechaVencimientoCuota: "2024-07-05",
    tipoCuota: "mensual",
    diasDesdeVencimiento: 7,
    fechaAlta: "2023-04-14",
    correoElectronico: "elena.torres@example.com",
    ciudad: "Neuquén",
    direccion: "Avenida Central 111",
    CP: "8300",
    telefono: "890123456"
  },
  {
    nombreCompleto: "Diego Sánchez",
    fechaNacimiento: "1992-06-11",
    dni: "90123456",
    deporte: "CrossFit",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-03-15",
    tipoCuota: "trimestral",
    diasDesdeVencimiento: 110,
    fechaAlta: "2020-12-01",
    correoElectronico: "diego.sanchez@example.com",
    ciudad: "Mar del Plata",
    direccion: "Calle Sur 222",
    CP: "7600",
    telefono: "901234567"
  },
  {
    nombreCompleto: "Fernando Ruiz",
    fechaNacimiento: "1987-05-22",
    dni: "11223344",
    deporte: "Fútbol",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-07-10",
    tipoCuota: "mensual",
    diasDesdeVencimiento: 2,
    fechaAlta: "2023-03-12",
    correoElectronico: "fernando.ruiz@example.com",
    ciudad: "San Luis",
    direccion: "Calle Oeste 333",
    CP: "5700",
    telefono: "112233445"
  },
  {
    nombreCompleto: "Lucía Vázquez",
    fechaNacimiento: "1991-08-19",
    dni: "22334455",
    deporte: "Tenis",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-12-31",
    tipoCuota: "anual",
    diasDesdeVencimiento: -172,
    fechaAlta: "2020-07-23",
    correoElectronico: "lucia.vazquez@example.com",
    ciudad: "Bariloche",
    direccion: "Calle Norte 444",
    CP: "8400",
    telefono: "223344556"
  },
  {
    nombreCompleto: "Hugo Delgado",
    fechaNacimiento: "1983-03-15",
    dni: "33445566",
    deporte: "Natación",
    tipoMembresia: "black",
    fechaVencimientoCuota: "2024-10-01",
    tipoCuota: "semestral",
    diasDesdeVencimiento: -91,
    fechaAlta: "2017-09-10",
    correoElectronico: "hugo.delgado@example.com",
    ciudad: "Jujuy",
    direccion: "Calle Este 555",
    CP: "4600",
    telefono: "334455667"
  },
  {
    nombreCompleto: "Clara Morales",
    fechaNacimiento: "1997-07-08",
    dni: "44556677",
    deporte: "Gimnasia",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-08-01",
    tipoCuota: "trimestral",
    diasDesdeVencimiento: -20,
    fechaAlta: "2021-02-14",
    correoElectronico: "clara.morales@example.com",
    ciudad: "Ushuaia",
    direccion: "Avenida Final 666",
    CP: "9410",
    telefono: "445566778"
  },
  {
    nombreCompleto: "Emilio Castillo",
    fechaNacimiento: "1986-11-27",
    dni: "55667788",
    deporte: "Ciclismo",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-07-15",
    tipoCuota: "mensual",
    diasDesdeVencimiento: -3,
    fechaAlta: "2022-05-18",
    correoElectronico: "emilio.castillo@example.com",
    ciudad: "San Rafael",
    direccion: "Calle Media 777",
    CP: "5600",
    telefono: "556677889"
  },
  {
    nombreCompleto: "Valeria Rojas",
    fechaNacimiento: "1990-04-02",
    dni: "66778899",
    deporte: "Yoga",
    tipoMembresia: "black",
    fechaVencimientoCuota: "2024-09-30",
    tipoCuota: "anual",
    diasDesdeVencimiento: -92,
    fechaAlta: "2019-12-05",
    correoElectronico: "valeria.rojas@example.com",
    ciudad: "Catamarca",
    direccion: "Calle Corta 888",
    CP: "4700",
    telefono: "667788990"
  },
  {
    nombreCompleto: "Javier Ortiz",
    fechaNacimiento: "1984-12-13",
    dni: "77889900",
    deporte: "Pilates",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-11-01",
    tipoCuota: "semestral",
    diasDesdeVencimiento: -60,
    fechaAlta: "2016-04-07",
    correoElectronico: "javier.ortiz@example.com",
    ciudad: "Corrientes",
    direccion: "Calle Larga 999",
    CP: "3400",
    telefono: "778899001"
  },
  {
    nombreCompleto: "Alejandra Mendoza",
    fechaNacimiento: "1993-05-03",
    dni: "88990011",
    deporte: "Boxeo",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-07-20",
    tipoCuota: "trimestral",
    diasDesdeVencimiento: -8,
    fechaAlta: "2022-11-22",
    correoElectronico: "alejandra.mendoza@example.com",
    ciudad: "Posadas",
    direccion: "Avenida Lejana 1000",
    CP: "3300",
    telefono: "889900112"
  },
  {
    nombreCompleto: "Pablo Soto",
    fechaNacimiento: "1982-01-20",
    dni: "99001122",
    deporte: "Running",
    tipoMembresia: "black",
    fechaVencimientoCuota: "2024-07-03",
    tipoCuota: "mensual",
    diasDesdeVencimiento: 9,
    fechaAlta: "2021-08-27",
    correoElectronico: "pablo.soto@example.com",
    ciudad: "Santa Fe",
    direccion: "Boulevard Central 1234",
    CP: "3000",
    telefono: "990011223"
  },
  {
    nombreCompleto: "Andrea Gil",
    fechaNacimiento: "1996-10-14",
    dni: "11112222",
    deporte: "CrossFit",
    tipoMembresia: "gold",
    fechaVencimientoCuota: "2024-12-01",
    tipoCuota: "anual",
    diasDesdeVencimiento: -142,
    fechaAlta: "2018-05-21",
    correoElectronico: "andrea.gil@example.com",
    ciudad: "Trelew",
    direccion: "Calle Solitaria 12345",
    CP: "9100",
    telefono: "111122224"
  },
  {
    nombreCompleto: "Manuel Herrera",
    fechaNacimiento: "1989-06-17",
    dni: "22223333",
    deporte: "Fútbol",
    tipoMembresia: "platinum",
    fechaVencimientoCuota: "2024-06-25",
    tipoCuota: "mensual",
    diasDesdeVencimiento: 17,
    fechaAlta: "2023-01-30",
    correoElectronico: "manuel.herrera@example.com",
    ciudad: "Bahía Blanca",
    direccion: "Calle Vecina 123456",
    CP: "8000",
    telefono: "222233334"
  }
];

const Staff = [
  {
    full_name: "Pablo Soto",
    dni: '112313',
    status: "active",
    email: "pablo@pablo",
    phone_number: "123456789",
    role: "admin",
    adress: "calle falsa 123",
    created_at: "2022-11-22"
  }
]


class usuarioParaTabla {
  constructor(nombreCompleto, fechaNacimiento, dni, deporte, tipoMembresia, tipoCuota, fechaVencimientoCuota, diasDesdeVencimiento) {
    this.nombreCompleto = nombreCompleto;
    this.fechaNacimiento = fechaNacimiento;
    this.dni = dni;
    this.deporte = deporte;
    this.tipoMembresia = tipoMembresia;
    this.tipoCuota = tipoCuota;
    this.fechaVencimientoCuota = fechaVencimientoCuota;
    this.diasDesdeVencimiento = diasDesdeVencimiento;
  }
}

var usuariosTabla = []


function Table() {
  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState([]);
  const [selectedSubFilter, setSelectedSubFilter] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [initialTableData, setInitialTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [tableHeaderInfo, setTableHeaderInfo] = useState(MembersColumns);
  const [users, setUsers] = useState(Users)
  const [isClicked, setIsClicked] = useState(false)

  const [profileModal, setProfileModal] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [userID, setUserID] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const { t } = useTranslation();
  const pathname = useOutletContext();

  const { complexes } = useContext(ComplexContext);
  const { customers } = useGetCustomers();
  const { employees } = useGetEmployees(refresh);

  useEffect(() => {

    console.log("initialTableData", initialTableData);
    console.log("tableData", tableData);

    if (pathname === PATHS.HOME) {
      setTableHeaderInfo(MembersColumns)
      setTableData(customers);
      setInitialTableData(customers);
    }
    if (pathname === PATHS.STAFF) {
      setTableHeaderInfo(StaffColumns)
      setInitialTableData(employees);
      setTableData(employees);
    }
    if (pathname === PATHS.HEADQUARTERS) {
      setTableHeaderInfo(HeadquartersColumns)
      setInitialTableData(complexes);
      setTableData(complexes);

    }
    filterData();
  }, [search, mainFilter, selectedSubFilter, pathname, initialTableData, complexes, customers, employees, refresh]);

  const filterData = () => {
    let dataToFilter = [...initialTableData];

    if (mainFilter === "sport") {
      if (selectedSubFilter && selectedSubFilter !== "all") {
        dataToFilter = dataToFilter.filter((data) => data.deporte === t(`filter.${selectedSubFilter}`))
      } else {
        dataToFilter = [...initialTableData];
      }
    }

    if (mainFilter === "subscription") {
      if (selectedSubFilter && selectedSubFilter !== "all") {
        dataToFilter = dataToFilter.filter((data) => (data.tipoMembresia === t(`filter.${selectedSubFilter}`).toLowerCase()));
      } else {
        dataToFilter = [...initialTableData];
      }
    }

    if (mainFilter === "payment") {
      if (selectedSubFilter && selectedSubFilter !== "all") {
        dataToFilter = dataToFilter.filter((data) => data.tipoCuota === t(`filter.${selectedSubFilter}`).toLowerCase());
      } else {
        dataToFilter = [...initialTableData];
      }
    }

    if (search) {
      dataToFilter = dataToFilter.filter((data) =>
        data.dni.includes(search)
      );
    }
    setTableData(dataToFilter);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChangeMainFilter = (e) => {

    if (e.target.value === "all") {
      setTableData(initialTableData);
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
      setTableData(initialTableData);
    }
    setSelectedSubFilter(e.target.value);
  };

  const handleCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handleProfileModal = () => {
    setProfileModal(!profileModal)
  }

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

const handleClick = () => {
  setIsClicked(!isClicked)
}

  const openLogoutModal = () =>{ 
      setLogoutModal(true)
  }

  const closeLogoutModal = () =>{ 
    setLogoutModal(false)
}


  const choseCreteModal = (pathname) => {
    if (pathname === PATHS.HEADQUARTERS) {
      return (<CreateComplex handleCreateModal={handleCreateModal} />)
    } else if (pathname === PATHS.STAFF) {
      return (<CreateEmployee handleCreateModal={handleCreateModal} handleRefresh={handleRefresh}/>)
    } else {
      return <CreateUser handleCreateModal={handleCreateModal} closeCallback={() => setCreateModal(false)} />
    }
  }

  return (
    <>
      <div className="flex  w-full py-4 justify-around bg-primary-0 px-4">
        <SearchInput handleSearch={handleSearch} />
        <Filter filters={MainFilter} handleChange={handleChangeMainFilter} />
        <Filter filters={subFilter} handleChange={handleSubFilter} />
        <NewModalButton handleCreateModal={handleCreateModal} />
        <ReportButton />
        <ProfileButton isClicked={isClicked} handleClick={handleClick} openLogoutModal={openLogoutModal} closeLogoutModal={closeLogoutModal} logoutModal={logoutModal} />
      </div>
      <div className="overflow-y-auto max-h-[800px]">
        <table className="w-full text-primary-0 font-bold px-10">
          <TableHeader headers={tableHeaderInfo} />
          <tbody>
            {tableData.map((data) => (
              <TableRow setUserID={setUserID} handleProfileModal={handleProfileModal} data={data} key={data.dni} />
            ))}
          </tbody>
        </table>
      </div>
      {createModal && choseCreteModal(pathname)}
      {profileModal && <UserDetail handleProfileModal={handleProfileModal} usuarioCorrecto={customers.filter((customer) => customer.dni === userID)} />}
    </>
  )
}

export default Table

