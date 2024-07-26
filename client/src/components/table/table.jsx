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
import ComplexDetail from '../modals/complex-detail.jsx'

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
  const { customers } = useGetCustomers(refresh);
  const { employees } = useGetEmployees(refresh);

  useEffect(() => {
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
      return <CreateUser handleCreateModal={handleCreateModal} closeCallback={() => setCreateModal(false)} />
    }
  }

  const choseEditModal = (pathname) => {
    if (pathname === PATHS.HEADQUARTERS) {
      const [complex] = initialTableData.filter((complex) => complex.cuit === ID);
      return (<ComplexDetail handleEditModal={handleEditModal} complexToEdit={complex} />)
    } else if (pathname === PATHS.STAFF) {
      console.log("employee", initialTableData.filter((employee) => employee.dni === ID));
      // return (<EditEmployee handleEditModal={handleEditModal} handleRefresh={handleRefresh} />)
    } else {
      console.log("customer", initialTableData.filter((customer) => customer.dni === ID));
      return <UserDetail handleProfileModal={handleEditModal} usuarioCorrecto={customers.filter((customer) => customer.dni === ID)} />
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
            {tableData.map((data) => (
              <TableRow setID={setID} handleEditModal={handleEditModal} data={data} key={data.dni} pathname={pathname}/>
            ))}
          </tbody>
        </table>
      </div>
      {createModal && choseCreteModal(pathname)}
      {editModal &&  choseEditModal(pathname)}
    </>
  )
}

export default Table

