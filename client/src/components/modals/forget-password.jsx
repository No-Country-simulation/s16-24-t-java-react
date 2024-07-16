import Icon from "../accesories/icon"
import { InputData, NoUsarEsteModal } from "./createUser"
function ForgetPassword() {

  return (
    <NoUsarEsteModal>
      <div className="relative inset-0 flex justify-center items-center bg-gray-100 w-[800px] h-[310px] rounded-[32px] shadow-2xl flex-col gap-10">
      <button className="absolute top-5 right-5 text-primary-0">
        <Icon iconName="x" />
      </button>
        <h3>Ingresa tu correo electrónico</h3>
        <InputData type="text" name="email" placeholder="Email" />
      </div>
    </NoUsarEsteModal>
  )
}

export default ForgetPassword