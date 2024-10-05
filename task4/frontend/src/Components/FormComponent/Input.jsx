import React from 'react'

export default function Input({values,value,type,name,placeholder,onChange}) {
  if(['password','text','email'].includes(type))
    return (
    <>
        <div className="form-floating mb-3">
            <input onChange={onChange} value={value} type={type} className="form-control" id={name} name={name} placeholder={placeholder}/>
            <label htmlFor={name}>{placeholder}</label>
            {
                values.err[name] && 
                <span 
                    style={{
                        color:"red",
                        paddingLeft:"3px",
                        fontSize:"small"
                    }}
                >
                    {values.err[name]}
                </span>
            }
        </div>
    </>
  )
}
