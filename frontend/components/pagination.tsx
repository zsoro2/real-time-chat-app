import React from "react";
import { useState, useEffect } from "react";

import {
  Pagination as Pag,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  const arr = [];
  for (let i = 1; i < lastPage + 1; i++) {
    arr[i] = i;
  }

  function handleNext() {
    let nextPage = currentPage + 1;
    if (nextPage <= lastPage) {
      onPageChange(nextPage);
    }
  }

  function handlePrev() {
    let prevPage = currentPage - 1;
    if (prevPage > 0) {
      onPageChange(prevPage);
    }
  }
  return (
    <Pag>
      <PaginationContent>
        <PaginationItem onClick={handlePrev}>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {arr.map((i) => {
          return (
            <PaginationItem key={i} onClick={() => onPageChange(i)}>
              <PaginationLink isActive={currentPage === i} href="#">
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem onClick={handleNext}>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pag>
  );
};

export default Pagination;
