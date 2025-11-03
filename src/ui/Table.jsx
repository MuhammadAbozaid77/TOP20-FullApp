export function Table({ children }) {
  return (
    <div className="overflow-x-auto  shadow-md bg-white w-full rounded-lg overflow-hidden">
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

export function TableTOP({ children }) {
  return <div>{children}</div>;
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-sky-500 text-white h-[60px] ">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return (
    <tr className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition-colors h-[50px]">
      {children}
    </tr>
  );
}

export function HeaderCell({ children, onClick, classes = "" }) {
  return (
    <th
      onClick={onClick}
      className={`px-4 py-2 font-medium cursor-pointer ${classes}`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, classes = "" }) {
  return <td className={`px-4 py-2 ${classes}`}>{children}</td>;
}

/*
<Table>
<TableTOP></TableTOP>
  <TableHeader>
    <HeaderCell>Product Name</HeaderCell>
    <HeaderCell>Store</HeaderCell>
    <HeaderCell>Category</HeaderCell>
    <HeaderCell>Price</HeaderCell>
  </TableHeader>

  <TableBody>
    {paginatedData.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.productName}</TableCell>
        <TableCell>{item.store}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell classes="text-right">{item.price}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>


*/
