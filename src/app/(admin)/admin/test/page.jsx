"use client";
import { useState } from "react";
import {
  HeaderCell,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableTOP,
} from "@/ui/Table";
import { products } from "@/utils/data";
import Pagination from "@/ui/Pagination";
import SearchInput from "@/ui/SearchInput";
import Select from "react-select";
import PageSizeSelector from "@/ui/PageSizeSelector";

export default function AdvancedTable() {
  // State
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Unique categories for dropdown
  const categories = [...new Set(products.map((p) => p.category))];

  // Filter logic
  const filteredData = products.filter((item) => {
    const matchesSearch = item.productName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <SearchInput
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by product name..."
        />

        <div className="flex justify-center items-center gap-2">
          <Select
            options={[
              { value: "", label: "All Categories" },
              ...categories.map((c) => ({ value: c, label: c })),
            ]}
            value={{
              value: selectedCategory,
              label: selectedCategory || "All Categories",
            }}
            onChange={(option) => {
              setSelectedCategory(option?.value);
              setCurrentPage(1);
            }}
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
          <HeaderCell>Store</HeaderCell>
          <HeaderCell>Category</HeaderCell>
          <HeaderCell>Price</HeaderCell>
        </TableHeader>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.store}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center text-gray-500">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
        visiblePages={3}
      />
    </div>
  );
}
