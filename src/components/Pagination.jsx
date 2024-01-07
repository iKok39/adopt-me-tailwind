import React from "react";

const Pagination = ({ petsPerPage, totalPets, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPets / petsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" mt-12 flex w-full items-center justify-center">
      {pageNumbers.map((page) => (
        <button
          className="button mx-1 mb-2 px-3 py-0"
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
