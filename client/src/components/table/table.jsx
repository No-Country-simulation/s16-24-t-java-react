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
import LoadingSpinner from '../login/loading-spinner.jsx'
import CreateCustomer from '../modals/create-customer.jsx'
import CreateEmployee from '../modals/create-employee.jsx'
import CreateComplex from '../modals/create-complex.jsx'
import CustomerDetail from "../modals/customer-detail.jsx"
import ComplexDetail from '../modals/complex-detail.jsx'
import EmployeeDetail from '../modals/employee-detail.jsx'

import { PATHS, MembersColumns, StaffColumns, HeadquartersColumns } from '../../lib/const.js'
import useGetCustomers from '../../hooks/useGetCustomers.jsx'
import useGetEmployees from '../../hooks/useGetEmployees.jsx'

//TODO - fix main filter 
const MainFilter = [
  "sport",
  "subscription",
  "payment",
]

// const Sports = [
//   "football",
//   "tennis",
//   "swimming",
//   "gymnastics",
//   "cycling",
//   "yoga",
//   "pilates",
//   "boxing",
//   "running",
//   "crossfit"
// ]

// const Payment = [
//   "monthly",
//   "quarterly",
//   "semiannual",
//   "annual"
// ]

// const Subscriptions = [
//   "black",
//   "gold",
//   "platinum"
// ]


function Table() {
  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState([]);
  const [selectedSubFilter, setSelectedSubFilter] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [initialTableData, setInitialTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [tableHeaderInfo, setTableHeaderInfo] = useState(MembersColumns);
  const [editModal, setEditModal] = useState(false)
  const [ID, setID] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const { t } = useTranslation();
  const pathname = useOutletContext();

  const { complexes } = useContext(ComplexContext);
  const { customers, rawCustomers } = useGetCustomers(refresh);
  const { employees, rawEmployees } = useGetEmployees(refresh);

  useEffect(() => {
    if (pathname === PATHS.HOME) {
      // TODO : filtrar por status o ver como hacer para los que estan dados de baja aparezcan en otro color
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
      dataToFilter = dataToFilter.filter((data) => {
        if (pathname !== PATHS.HEADQUARTERS) {
          return data.dni.includes(search)
        }
        return data.cuit.includes(search)
      }
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

  const handleEditModal = () => {
    setEditModal(!editModal)
  }

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  const choseCreteModal = (pathname) => {
    if (pathname === PATHS.HEADQUARTERS) {
      return (<CreateComplex handleCreateModal={handleCreateModal} />)
    } else if (pathname === PATHS.STAFF) {
      return (<CreateEmployee handleCreateModal={handleCreateModal} handleRefresh={handleRefresh} />)
    } else {
      return <CreateCustomer handleCreateModal={handleCreateModal} handleRefresh={handleRefresh} />
    }
  }

  const choseEditModal = (pathname) => {
    if (pathname === PATHS.HEADQUARTERS) {
      const [complex] = initialTableData.filter((complex) => complex.cuit === ID);
      return (<ComplexDetail handleEditModal={handleEditModal} complexToEdit={complex} />)
    } else if (pathname === PATHS.STAFF) {
      const [employee] = rawEmployees.filter((employee) => employee.personalInfo.dni === ID);
      return (<EmployeeDetail handleEditModal={handleEditModal} handleRefresh={handleRefresh} employeeToEdit={employee} />)
    } else {
      const [customer] = rawCustomers.filter((customer) => customer.personalInfoDTO.dni === ID);
      return <CustomerDetail handleEditModal={handleEditModal} handleRefresh={handleRefresh} customerToEdit={customer} />
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
        <ProfileButton />
      </div>
      <div className="overflow-y-auto max-h-[800px]">
        <table className="w-full text-primary-0 font-bold px-10">
          <TableHeader headers={tableHeaderInfo} />
          <tbody>
            {tableData.length === 0 ? (<td colSpan={tableHeaderInfo.length - 1}><LoadingSpinner size={40} text={"Cargando..."} classNameContainer={"text-xl items-center gap-10 flex flex-col text-primary-20  absolute top-1/2 left-1/2 right-1/2 bottom-1/2 justify-center mx-auto bg-transparent"} /></td>) : (tableData.map((data) => (
              <TableRow setID={setID} handleEditModal={handleEditModal} data={data} key={data.dni} pathname={pathname} />)
            ))}
          </tbody>
        </table>
      </div>
      {createModal && choseCreteModal(pathname)}
      {editModal && choseEditModal(pathname)}
    </>
  )
}

export default Table

