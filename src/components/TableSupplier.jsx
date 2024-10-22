import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./Icons/EyeIcon";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import useTruncateText from "../hook/useTruncateText";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import { supabase } from "../utils/SupaSupplier";

const columns = [
  {
    key: "logo_supplier",
    label: "Logo Supplier",
  },
  {
    key: "nama_supplier",
    label: "Nama Supplier",
  },
  {
    key: "no_hp",
    label: "No HP",
  },
  {
    key: "alamat",
    label: "Alamat",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function TableSupplier({ allSupplier }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(allSupplier?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allSupplier?.slice(start, end);
  }, [page, allSupplier]);

  const { truncateText } = useTruncateText();

  const deleteBarangById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await supabase
            .from("supplier")
            .delete()
            .eq("id_supplier", id)
            .select();

          if (data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => window.location.reload());

            window.location.reload();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}> {col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id_supplier}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "action" ? (
                  <div className="relative flex items-center gap-2">
                    <Link to={`/detail-supplier/${item.id_supplier}`}>
                      <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Link to={`/edit-supplier/${item.id_supplier}`}>
                      <Tooltip content="Ubah Data Supplier">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Hapus Data Supplier">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => deleteBarangById(item.id_supplier)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                ) : columnKey === "no_hp" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "nama_supplier" ? (
                  truncateText(getKeyValue(item, columnKey), 10)
                ) : columnKey === "alamat" ? (
                  truncateText(getKeyValue(item, columnKey), 10)
                ) : columnKey === "email" ? (
                  truncateText(getKeyValue(item, columnKey), 10)
                ) : columnKey === "logo_supplier" ? (
                  <img
                    className="w-8"
                    src={getKeyValue(item, columnKey)}
                    alt={getKeyValue(item, "nama_supplier")}
                  />
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
