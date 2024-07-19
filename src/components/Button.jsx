import React from "react";

const Button = ({ text, className, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {text}
      </button>
    </div>
  );
};

export default Button;
