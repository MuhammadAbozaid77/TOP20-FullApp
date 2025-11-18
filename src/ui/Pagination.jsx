import { ChevronRight, ChevronLeft } from "lucide-react";

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages,
  visiblePages = 3,
  showAllButton = true,
}) {
  const getPages = () => {
    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = start + visiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-sky-500 text-white rounded disabled:opacity-50 flex justify-center items-center gap-1"
      >
        Prev
      </button>

      {/* Dynamic pages */}
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-sky-600 text-white"
              : "bg-sky-200 hover:bg-sky-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* All ثابت */}
      {showAllButton && (
        <button
          disabled
          className="px-3 py-1 rounded bg-sky-200 text-zinc-500 cursor-not-allowed font-semibold"
        >
          All
        </button>
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-sky-500 text-white rounded disabled:opacity-50 flex justify-center items-center gap-1"
      >
        <span className="font-semibold">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
