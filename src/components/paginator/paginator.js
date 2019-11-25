import React from "react";
import { ComponentMessage } from "../component-message/component-message";

export const defaultSorted = [
  {
    dataField: "user_username",
    order: "asc"
  }
];

export const customTotal = (from, to, size) => (
  <span className="ml-2 react-bootstrap-table-pagination-total">
    Exibindo {from} de {to} registros de um total de {size}
  </span>
);

export const options = {
  paginationSize: 5,
  pageStartIndex: 1,
  alwaysShowAllBtns: true,
  withFirstAndLast: false,
  hideSizePerPage: false,
  hidePageListOnlyOnePage: true,
  firstPageText: "Primeira página",
  prePageText: "<",
  nextPageText: ">",
  lastPageText: "Última página",
  nextPageTitle: "First page",
  prePageTitle: "Pre page",
  firstPageTitle: "Next page",
  lastPageTitle: "Last page",
  showTotal: true,
  paginationTotalRenderer: customTotal,
  sizePerPageList: [
    {
      text: "10",
      value: 10 
    },
    {
      text: "20",
      value: 20
    },
    {
      text: "30",
      value: 30
    }
  ]
};

export const noDataMessage = () => {
  return (
    <ComponentMessage
      icon="icon-ghost"
      title="Nenhum registro encontrado"
      description="Altere sua pesquisa e tente novamente."
    />
  );
};
