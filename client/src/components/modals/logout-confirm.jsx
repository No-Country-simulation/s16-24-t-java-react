import Modal from "./modal";

function LogoutConfirm() {
  return (
    <Modal>
       <div className="relative flex bg-gray-100 w-[800px] min-h-[200px] rounded-xl shadow-2xl flex-col p-10 gap-10 items-center" onClick={(e) => e.stopPropagation()} >
          <p className="text-center text-2xl">¿Estas seguro que quieres cerrar sesión?</p>
          <div className="flex gap-20">
            <button className="bg-primary-20 text-secondary-10 font-bold px-20 py-3 rounded-full hover:bg-primary-0 hover:text-secondary-0">Si</button>
            <button className="bg-secondary-20 text-primary-10 font-bold px-20 py-3 rounded-full hover:bg-secondary-0 hover:text-primary-0">No</button>
          </div>
       </div>
    </Modal>
  )
}

export default LogoutConfirm