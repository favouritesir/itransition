/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

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
  } = props;
  const [inputErr, setInputErr] = useState(false);
  const regex = new RegExp(rules);

  const handleError = (e: any) => {
    if (rules) {
      const inputValue = e.target.value;
      setInputErr(!regex.test(inputValue));
    }
  };

  return (
    <div className={`form-control ${className || ""}`} style={style}>
      <label className="label">
        <span
          className={`label-text text-neutral-500  ${inputErr && "text-error"}`}
        >
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered bg-inherit w-full"
        value={value}
        onKeyUp={handleError}
        onChange={onChange || handleError}
        required={required}
        name={name}
      />

      {inputErr && <span className="text-error">{errMsg}</span>}
    </div>
  );
}
// FormInput.propTypes = {
//   type: PropTypes.oneOf(["email", "text", "number", "password"]).isRequired, // 'type' must be a string and required
//   placeholder: PropTypes.string, // 'placeholder' is optional and must be a string
//   className: PropTypes.string, // 'className' is optional and must be a string
//   label: PropTypes.string.isRequired, // 'label' must be a string and required
//   rules: PropTypes.string, // 'rules' is optional and must be an strings
//   value: PropTypes.any, // 'value' is optional and can be any type
//   errMsg: PropTypes.string, // 'errMsg' is optional and must be a string
//   style: PropTypes.object, // 'style' is optional and must be
//   required: PropTypes.bool, // 'required' is optional and must be
// };
