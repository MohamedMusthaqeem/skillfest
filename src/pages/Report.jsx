import { useReactToPrint } from "react-to-print";
import { useMemo, useRef, useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useDownloadExcel } from "react-export-table-to-excel";
import { FaRegFilePdf } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import axios from "axios";
import config from "../config";

const Report = () => {
  const { SERVER_ADDRESS } = config;
  const { user } = useAuthContext();
  const [register, setRegister] = useState([]);
  const tableRef = useRef(null);
  const saveToPdf = useRef();

  useEffect(() => {
    const fetchRegister = async () => {
      const res = await axios.get(`${SERVER_ADDRESS}/api/register/all`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (res.status) setRegister(res.data);
    };
    if (user) fetchRegister();
  }, [user]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Skillfest_Report",
    sheet: "Report",
  });

  const data = useMemo(() => register, [register]);
  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "College", accessorKey: "college" },
    { header: "Year", accessorKey: "year" },
    { header: "Event", accessorKey: "event_name" },
    { header: "Phone No", accessorKey: "phone_no" },
    { header: "Email", accessorKey: "email" },
    { header: "Amount", accessorKey: "fees" },
    {
      header: "Upload",
      accessorKey: "upload",
      cell: (row) => {
        const uploadData = row.row.original.upload;
        return uploadData ? (
          <a
            href={uploadData}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition"
          >
            Download
          </a>
        ) : (
          <span className="text-red-500">No Upload</span>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const generateUserPdf = useReactToPrint({
    content: () => saveToPdf.current,
    documentTitle: "Report",
    onAfterPrint: () => alert("Report Printed"),
  });

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search"
          className="border rounded-lg px-4 py-2 w-64 shadow-md"
        />
        <div className="flex space-x-4">
          <button
            onClick={generateUserPdf}
            className="bg-red-600 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            <FaRegFilePdf className="mr-2" /> PDF
          </button>
          <button
            onClick={onDownload}
            className="bg-green-600 text-white flex items-center px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            <SiMicrosoftexcel className="mr-2" /> Excel
          </button>
        </div>
      </div>
      <div
        ref={saveToPdf}
        className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Skillfest Report 2025
        </h2>
        <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md">
          <thead className="bg-blue-600 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="py-2 px-4 cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " ⬆️"
                      : header.column.getIsSorted() === "desc"
                      ? " ⬇️"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
