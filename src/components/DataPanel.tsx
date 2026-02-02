"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import type { DataPanelProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Memoized table row component for better performance
const TableRowMemo = React.memo(
  ({ record }: { record: any }) => (
    <TableRow className="border-b hover:bg-muted/30 transition-colors">
      <TableCell className="py-4">
        <div className="space-y-2.5">
          <div className="font-semibold text-base leading-snug pr-4">
            {record.title}
          </div>
          <Badge className="text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 border border-green-300/50 shadow-sm px-2.5 py-1">
            {record.cat} / {record.subCat}
          </Badge>
        </div>
      </TableCell>
      <TableCell className="py-4 font-medium">{record.freq}</TableCell>
      <TableCell className="py-4 font-medium">{record.unit}</TableCell>
    </TableRow>
  ),
  (prevProps, nextProps) => prevProps.record.id === nextProps.record.id
);
TableRowMemo.displayName = "TableRowMemo";

function DataPanel({ economicData, loading = false }: DataPanelProps) {
  const records = economicData.frequent;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const showSkeleton = loading;

  // Memoize total pages calculation
  const totalPages = useMemo(
    () => Math.ceil(records.length / recordsPerPage),
    [records.length, recordsPerPage]
  );

  // Memoize current page records to avoid recalculation on every render
  const currentRecords = useMemo(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    return records.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [records, currentPage, recordsPerPage]);

  // Memoize page change handler
  const handlePageChange = useCallback(
    (pageNumber: number) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
        // Scroll to top of table on page change for better UX
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [economicData]);

  // Memoize pagination numbers generation
  const pageNumbers = useMemo((): (number | string)[] => {
    const pages: (number | string)[] = [];
    const siblingCount = 2;
    const totalVisiblePages = siblingCount * 2 + 3;

    if (totalPages <= totalVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 2);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages - 1
      );

      if (leftSiblingIndex > 2) {
        pages.push("...");
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i);
      }

      if (rightSiblingIndex < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="p-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Economic Data
        </h1>
        <p className="text-muted-foreground">
          Browse through economic indicators and metrics
          {!showSkeleton && records.length > 0 && (
            <span className="ml-2 text-sm">
              ({records.length.toLocaleString()} records)
            </span>
          )}
        </p>
      </div>
      <div className="rounded-lg border-2 bg-card shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-muted/50 border-b-2">
              <TableHead className="w-[50%] font-bold text-base py-4">
                New Release
              </TableHead>
              <TableHead className="font-bold text-base py-4">
                Frequency
              </TableHead>
              <TableHead className="font-bold text-base py-4">Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showSkeleton
              ? Array.from({ length: recordsPerPage }).map((_, i) => (
                  <TableRow key={`sk-${i}`} className="border-b">
                    <TableCell className="py-4">
                      <div className="space-y-2.5">
                        <Skeleton className="h-5 w-[80%]" />
                        <Skeleton className="h-5 w-[55%]" />
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-5 w-24" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-5 w-20" />
                    </TableCell>
                  </TableRow>
                ))
              : currentRecords.map((record) => (
                  <TableRowMemo
                    key={
                      record.id ||
                      `${record.cat}-${record.subCat}-${record.title}`
                    }
                    record={record}
                  />
                ))}
          </TableBody>
        </Table>
      </div>
      {showSkeleton ? (
        <div className="mt-8 flex justify-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-24" />
        </div>
      ) : (
        <Pagination className="mt-8">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-accent transition-colors"
                }
              />
            </PaginationItem>
            {pageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis className="text-muted-foreground" />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page as number);
                    }}
                    isActive={currentPage === page}
                    className="cursor-pointer min-w-[2.5rem] transition-all hover:scale-105"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer hover:bg-accent transition-colors"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default DataPanel;
