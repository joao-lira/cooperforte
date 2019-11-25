import React from "react";
import { Button } from "reactstrap";

const ComponentHeader = ({ title, description, btnLabel, onClick }) => {
  return (
    <div className="text-center mt-5 empty">
      <h2 className="mt-3 mb-0 pb-0">{title}</h2>
      <small>{description}</small>
      <br />
      <br />
      <Button size="sm" color="info" onClick={onClick}>
        {btnLabel}
      </Button>
    </div>
  );
};

export { ComponentHeader };
