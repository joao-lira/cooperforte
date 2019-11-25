import React from "react";

const ComponentMessage = ({ icon, title, description }) => {
  return (
    <div className="text-center mt-5 empty">
      <i className={icon} style={{ fontSize: 35 }} />
      <h2 className="mb-0 pb-0">{title}</h2>
      <h5>{description}</h5>
    </div>
  );
};

export { ComponentMessage };
