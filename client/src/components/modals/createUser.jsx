import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import axios from "axios"

const deportes = [ //  actividades (esta hardcodeado)
	{
		id: "football1",
		name: "Football Niños"
	},
	{
		id: "football2",
		name: "Football Adultos"
	},
	{
		id: "natacion1",
		name: "Natacion Niños"
	},
	{
		id: "natacion2",
		name: "Natacion Adultos"
	},
]

const subscriptions = [
	{
		id: "mes",
		name: "Mensual"
	},
	{
		id: "trimestre",
		name: "Trimestral"
	},
	{
		id: "semestre",
		name: "Semestral"
	},
	{
		id: "anual",
		name: "Anual"
	},
]
const FormOption = ({ data }) => {
	return (<option value={data.id}>{data.name}</option>)
}

const CreateUser = () => {

	const [fullname, setFullname] = useState("");
	const [birthDate, setBirthdate] = useState("");
	const [dni, setDNI] = useState("");
	const [email, setEmail] = useState("");
	const [activity, setActivity] = useState("");
	const [subscription, setSubscription] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault()

		console.log("Submit button!")
		if (fullname.length >= 3 && birthDate.length >= 6 && dni.length >= 5 && isEmail(email) && activity.length >= 1 && subscription.length >= 1) {

			console.log(fullname, birthDate, dni, email, activity, subscription)

			const { data } = await axios.post("/api/endpoint/noseIDK", {
				fullname,
				birthDate,
				dni,
				email,
				activity
			}, {
				headers: {
					["Content-Type"]: "Application/json"
				}
			})

			console.log("Estos datos devuelve el backend:")
			console.log(data)
		} else {
			console.log("Hay datos que faltan por completar o se rellenaron mal")
		}
	}

	const onChanged = (type, event) => {

		const value = event.target.value
		if (type == "email") {
			if (isEmail(value)) {
				console.log("email validado!")
				setEmail(value)
			} else {
				setEmail("")
			}
		} else if (type == "birth") {
			setBirthdate(value)
		} else if (type == "dni" && value.length >= 5) {
			setDNI(value)
		} else if (type == "fullname") {
			setFullname(value)
		} else if (type == "activity") {
			setActivity(value)
		} else if (type == "subscription") {
			setSubscription(value)
		}


	}

	//
	return (
		<div className="absolute w-[200px] left-[35%] top-[35%]">
			<form action="" method="post" id="createAlumno" className="flex flex-col">
				<label htmlFor="fullName">{"Nombre completo:"}</label>
				<input type="text" name="fullName" id="" required={true} onChange={(e) => onChanged("fullname", e)} />

				<label htmlFor="birthDate">{"Fecha de nacimiento:"}</label>
				<input type="date" name="birthDate" id="" required={true} onChange={(e) => onChanged("birth", e)} />

				<label htmlFor="dni">{"Numero DNI:"}</label>
				<input type="text" name="dni" id="" required={true} placeholder="Sin puntos ni comas" onChange={(e) => onChanged("dni", e)} />

				<label htmlFor="email">{"Correo Electronico:"}</label>
				<input type="text" name="email" id="" required={true} onChange={(e) => onChanged("email", e)} />

				<label htmlFor="activity">{"Deporte:"}</label>
				<select name="activity" id="" form="createAlumno" required={true} onChange={(e) => { onChanged("activity", e) }} defaultValue={"DEFAULT"}>
					<option disabled value="DEFAULT">{"Elige una opcion"}</option>
					{
						deportes.map((element, key) => {
							return <FormOption data={element} key={key} />
						})
					}
				</select>

				<label htmlFor="subscription">{"Subscripcion:"}</label>
				<select name="subscription" id="" form="createAlumno" required={true} onChange={(e) => { onChanged("subscription", e) }} defaultValue={"DEFAULT"}>
					<option disabled value="DEFAULT">{"Elige una opcion"}</option>
					{
						subscriptions.map((element, key) => {
							return <FormOption data={element} key={key} />
						})
					}
				</select>

				<input type="submit" value="Crear alumno" onClick={onSubmit} />
			</form>
		</div>
	)
}

export default CreateUser