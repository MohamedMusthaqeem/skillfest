import { useReactToPrint } from "react-to-print";
import { useMemo, useRef, useState,useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import axios from "axios";



const Report = () => {
  const [regsiter, setRegister] = useState([]);
  useEffect(() => {
    const fetchRegister = async () => {
      const res = await axios.get("http://localhost:5000/api/register");
      const data = res.data;
      if (res.status) {
        setRegister(data);
        console.log(data);
      }
    };
    fetchRegister();
  },[]);
  //   "Unique_Id": 1,
  // "Name": "Batsheva",
  // "College": "National Ilan University",
  // "Year": 1987,
  // "Event": "Business Development",
  // "Phone_No": "6712411257",
  // "Email": "bmallinar0@slate.com"
  const data = useMemo(() => regsiter);

  const columns = [
    {
      header: "UNIQUE_ID",
      accessorKey: "_id",
    },
    {
      header: "NAME",
      accessorKey: "name",
    },
    {
      header: "COLLEGE",
      accessorKey: "college",
    },
    {
      header: "YEAR",
      accessorKey: "year",
    },
    {
      header: "EVENT",
      accessorKey: "event_name",
    },
    {
      header: "PHONE_NO",
      accessorKey: "phone_no",
    },
    {
      header: "EMAIL",
      accessorKey: "email",
    },
    {
      header: "AMOUNT",
      accessorKey: "fees",
    },
  ];

  const saveToPdf = useRef();
  const generateUserPdf = useReactToPrint({
    content: () => saveToPdf.current,
    documentTitle: "Report",
    onAfterPrint: () => alert("Report Printed"),
  });
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [showPagination, setShowPagination] = useState(true);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <>
      <div className=" p-2 flex flex-col items-center justify-center">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search"
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-md pl-11 pr-4"
        />
      </div>
      <div className="py-4 flex flex-row items-center justify-center space-x-8  ">
        {/* <button
          onClick={() => table.setPageIndex(0)}
          className="bg-[#071952] text-white p-2 rounded-md active:scale-105 duration-150 "
        >
          First Page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="bg-[#071952] text-white p-2 rounded-md active:scale-105 duration-150 "
        >
          Prev Page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="bg-[#071952] text-white p-2 rounded-md active:scale-105 duration-150 "
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="bg-[#071952] text-white p-2 rounded-md active:scale-105 duration-150 "
        >
          Last Page
        </button> */}
        <button
          onClick={generateUserPdf}
          className="bg-[#071952] text-white p-2 rounded-md active:scale-105 duration-150 "
        >
          Print Report
        </button>
      </div>
      <div className="w3-container mt-2 " ref={saveToPdf}>
        <h1 className="flex flex-col items-center justify-center text-2xl pb-5 font-bold">
          Report-Skillfest:2023
        </h1>
        <table className="w3-table-all ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {
                      { asc: "⬆️", desc: "⬇️" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody ref={saveToPdf}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="w3-hover-blue">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Report;
