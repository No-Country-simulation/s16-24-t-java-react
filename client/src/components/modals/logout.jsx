import Modal from "./modal";
import { LoginContext } from "../../contexts/login-context"
import { useContext } from "react";


export default function LogoutModal ({closeLogoutModal}){
const {handleLogout} = useContext(LoginContext)
    return(
        <Modal>
            <div className="grid items-center justify-center bg-white w-[750px] h-[364px] rounded-lg ">
                <h1 className="font-extrabold text-xl">¿Estás seguro de que quieres cerrar sesión?</h1>
                <button onClick={handleLogout} className="bg-red-900 text-white relative top-10 right-10 w-[200px] ">Sí</button>
                <button onClick={closeLogoutModal} className="bg-slate-600 text-white relative bottom-20 left-60 w-[200px]">No</button>
            </div>
        </Modal>
    )
}
