"use client";
import { useState } from "react";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import Pagination from "@/ui/Pagination";
import SearchInput from "@/ui/SearchInput";
import Select from "react-select";
import PageSizeSelector from "@/ui/PageSizeSelector";

export default function CategoriesTable({ categories }) {
  // State
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <SearchInput
          type="text"
          //   value={searchText}
          //   onChange={(e) => {
          //     setSearchText(e.target.value);
          //     setCurrentPage(1);
          //   }}
          placeholder="Search by product name..."
        />

        <div className="flex justify-center items-center gap-2">
          <Select
            // options={[
            //   { value: "", label: "All Categories" },
            //   ...categories.map((c) => ({ value: c, label: c })),
            // ]}
            // value={{
            //   value: selectedCategory,
            //   label: selectedCategory || "All Categories",
            // }}
            // onChange={(option) => {
            //   setSelectedCategory(option?.value);
            //   setCurrentPage(1);
            // }}
            className="w-64"
          />
          {/* Page size */}
          <PageSizeSelector
            pageSize={pageSize}
            onChange={(val) => setPageSize(val)}
            options={[5, 10, 15, 20, 25]}
            // label="Rows per page:"
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <HeaderCell>Product Name</HeaderCell>
          {/* <HeaderCell>Store</HeaderCell>
          <HeaderCell>Category</HeaderCell>
          <HeaderCell>Price</HeaderCell> */}
        </TableHeader>

        <TableBody>
          {categories.map((item, index) => (
            <>
              <TableRow key={index}>
                <TableCell>{item.categoryArabicName}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
