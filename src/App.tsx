import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

// --- Person Type
type Person = {
  id: number;
  name: string;
  age: number;
  avatar: string;
};

// --- Sample Data with Avatars
const data: Person[] = [
  { id: 1, name: "Alice Johnson", age: 21, avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Bob Smith", age: 25, avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Charlie Brown", age: 28, avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 4, name: "Diana Prince", age: 22, avatar: "https://i.pravatar.cc/40?img=4" },
  { id: 5, name: "Ethan Hunt", age: 27, avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 6, name: "Fiona Carter", age: 23, avatar: "https://i.pravatar.cc/40?img=6" },
  { id: 7, name: "George Wilson", age: 29, avatar: "https://i.pravatar.cc/40?img=7" },
  { id: 8, name: "Hannah Scott", age: 24, avatar: "https://i.pravatar.cc/40?img=8" },
  { id: 9, name: "Ian Clarke", age: 26, avatar: "https://i.pravatar.cc/40?img=9" },
  { id: 10, name: "Julia Adams", age: 25, avatar: "https://i.pravatar.cc/40?img=10" },
  { id: 11, name: "Kevin Turner", age: 28, avatar: "https://i.pravatar.cc/40?img=11" },
  { id: 12, name: "Laura Bennett", age: 22, avatar: "https://i.pravatar.cc/40?img=12" },
  { id: 13, name: "Michael Reed", age: 29, avatar: "https://i.pravatar.cc/40?img=13" },
  { id: 14, name: "Nina Collins", age: 24, avatar: "https://i.pravatar.cc/40?img=14" },
  { id: 15, name: "Oliver Brooks", age: 26, avatar: "https://i.pravatar.cc/40?img=15" },
  { id: 16, name: "Paula Morris", age: 23, avatar: "https://i.pravatar.cc/40?img=16" },
  { id: 17, name: "Quentin Blake", age: 27, avatar: "https://i.pravatar.cc/40?img=17" },
  { id: 18, name: "Rachel Foster", age: 21, avatar: "https://i.pravatar.cc/40?img=18" },
  { id: 19, name: "Samuel Hayes", age: 28, avatar: "https://i.pravatar.cc/40?img=19" },
  { id: 20, name: "Tina Lawrence", age: 25, avatar: "https://i.pravatar.cc/40?img=20" },
  { id: 21, name: "Umar Patel", age: 23, avatar: "https://i.pravatar.cc/40?img=21" },
  { id: 22, name: "Victoria Hughes", age: 29, avatar: "https://i.pravatar.cc/40?img=22" },
  { id: 23, name: "William Ross", age: 22, avatar: "https://i.pravatar.cc/40?img=23" },
  { id: 24, name: "Xavier Lopez", age: 27, avatar: "https://i.pravatar.cc/40?img=24" },
  { id: 25, name: "Yasmin Khan", age: 24, avatar: "https://i.pravatar.cc/40?img=25" },
  { id: 26, name: "Zachary Green", age: 26, avatar: "https://i.pravatar.cc/40?img=26" },
  { id: 27, name: "Amelia Wright", age: 23, avatar: "https://i.pravatar.cc/40?img=27" },
  { id: 28, name: "Benjamin Parker", age: 28, avatar: "https://i.pravatar.cc/40?img=28" },
  { id: 29, name: "Clara Mitchell", age: 21, avatar: "https://i.pravatar.cc/40?img=29" },
  { id: 30, name: "David Thompson", age: 25, avatar: "https://i.pravatar.cc/40?img=30" },
];

export default function App() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");

  const columns: ColumnDef<Person>[] = [
    { accessorKey: "id", header: "ID" },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting()}>
          Name {column.getIsSorted() === "asc" ? "▲" : column.getIsSorted() === "desc" ? "▼" : ""}
        </button>
      ),
      cell: ({ row }) => (
        <div className="person-cell">
          <img src={row.original.avatar} alt={row.original.name} className="avatar" />
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <button onClick={() => column.toggleSorting()}>
          Age {column.getIsSorted() === "asc" ? "▲" : column.getIsSorted() === "desc" ? "▼" : ""}
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: data.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase())),
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container">
      <h1>📋 People Directory</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="search"
      />

      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? "even" : "odd"}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          ⬅ Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
