import { Table } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";

export const TablePlaceholder = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"><Skeleton /></TableHead>
          <TableHead><Skeleton /></TableHead>
          <TableHead className="hidden sm:table-cell"><Skeleton /></TableHead>
          <TableHead className="hidden sm:table-cell"><Skeleton /></TableHead>
          <TableHead className="text-right"><Skeleton /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 3 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell className="hidden sm:table-cell"><Skeleton /></TableCell>
            <TableCell className="hidden sm:table-cell"><Skeleton /></TableCell>
            <TableCell className="text-right"><Skeleton /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  