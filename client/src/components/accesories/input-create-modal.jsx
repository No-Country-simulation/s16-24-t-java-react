function InputCreateModal({value, htmlFor, type, handleChange, label, editable = false, labelClassName="text-primary-10 ml-5 font-bold", inputClassName = "px-6 py-1 bg-primary-20 text-white rounded-full shadow-inner shadow-black border-2 border-primary-50 disabled:bg-primary-50", containerClassName="w-full flex flex-col gap-1"}) {
  return (
    <div className={containerClassName}>
      <label className={labelClassName} htmlFor={htmlFor}>{label}</label>
      <input className={inputClassName } disabled={editable} onChange={handleChange} type={type} name={htmlFor} defaultValue={value}/>
    </div>
  )
}

export default InputCreateModal