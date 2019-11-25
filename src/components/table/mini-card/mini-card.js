import React from "react";
import { Card, CardTitle, CardSubtitle, CardBody } from "reactstrap";

const MiniCard = ({ icon, title, description }) => {
  return (
    <Card className="bg-inf">
      <CardBody>
        <div className="d-flex">
          <div className="mr-3 align-self-center">
            <h2 className="text-whit">
              <i className={icon} />
            </h2>
          </div>
          <div>
            <h4 className="text-whit p-0 m-0">{description}</h4>
            <small className="text-whit op-5">{title}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default MiniCard;
