/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export default function FormInput(props: any) {
  const {
    type,
    placeholder,
    className,
    label,
    rules,
    value,
    errMsg,
    style,
    required,
    onChange,
    name,
    err,
    setErr,
  } = props;

  useEffect(() => {
    if (rules && value) {
      setErr(!rules.test(value));
    }
  }, [value]);

  return (
    <div className={`form-control ${className || ""}`} style={style}>
      <label className="label">
        <span className={`label-text text-neutral-500  ${err && "text-error"}`}>
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered bg-inherit w-full ${
          err && "border-error"
        }`}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
      />

      {err && <span className="text-error">{errMsg}</span>}
    </div>
  );
}
