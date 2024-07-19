import React from "react";

const Input = ({ label, type, placeholder, onChange, value, name }) => {
  return (
    <div >
      <label htmlFor={label} className="text-xl text-left ">
        {label}
      </label>
      <br />
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={" border-2 border-slate-200 h-12 md:w-[500px] pl-3 mt-2 mb-5 w-[300px]"}
        //id={label}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
