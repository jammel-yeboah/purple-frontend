import * as React from "react";
import Link from "next/link";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Button,
  Text,
  chakra,
  Box
} from "@chakra-ui/react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  SortingState,
  getPaginationRowModel
} from "@tanstack/react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

export default function CoinTable({ coins = [] }) {
  const columnHelper = createColumnHelper();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("symbol", {
        header: "Symbol",
        cell: (info) => {
          const symbolValue = info.getValue() || "";
          const rowData = info.row.original;

          return (
            <Link href={`/coins/${rowData.id}`} style={{ fontWeight: "bold" }}>
              {symbolValue.toUpperCase()}
            </Link>
          );
        },
        meta: { isNumeric: false }
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        meta: { isNumeric: false } // Ensures left alignment
      }),
      columnHelper.accessor("interactions_24h", {
        header: "Interactions (24h)",
        cell: ({ getValue }) => getValue().toLocaleString(),
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: ({ getValue }) =>
          getValue().toLocaleString(undefined, {
            style: "currency",
            currency: "USD"
          }),
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("volume_24h", {
        header: "Volume (24h)",
        cell: ({ getValue }) => getValue().toLocaleString(),
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("percent_change_24h", {
        header: "24h Change (%)",
        cell: ({ getValue }) => {
          const value = getValue();
          const color =
            value > 0 ? "green.500" : value < 0 ? "red.500" : "inherit";
          return <Text color={color}>{value.toFixed(2)}%</Text>;
        },
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("percent_change_7d", {
        header: "7d Change (%)",
        cell: ({ getValue }) => {
          const value = getValue();
          const color =
            value > 0 ? "green.500" : value < 0 ? "red.500" : "inherit";
          return <Text color={color}>{value.toFixed(2)}%</Text>;
        },
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("market_cap", {
        header: "Market Cap",
        cell: ({ getValue }) => {
          const val = getValue();
          return val.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
          });
        },
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("social_volume_24h", {
        header: "Social Vol (24h)",
        cell: ({ getValue }) => getValue().toLocaleString(),
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("social_dominance", {
        header: "Social Dominance",
        cell: ({ getValue }) => getValue().toFixed(2) + "%",
        meta: { isNumeric: true }
      }),
      columnHelper.accessor("sentiment", {
        header: "Sentiment",
        cell: ({ getValue }) => getValue() + "%",
        meta: { isNumeric: true }
      })
    ],
    [columnHelper]
  );

  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data: coins,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 15
      }
    }
  });

  return (
    <Box overflowX="auto">
      <Table variant="simple" size="md" mt={4}>
        {/* Improved Header */}
        <Thead bg="gray.700">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    cursor="pointer"
                    userSelect="none"
                    fontSize="sm"
                    fontWeight="bold"
                    color="white"
                    borderBottom="2px solid gray"
                    py={3} // Increased padding
                    textAlign={meta?.isNumeric ? "right" : "left"} // Align headers properly
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>

        {/* Table Body with Row Striping */}
        <Tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <Tr
              key={row.id}
              bg={rowIndex % 2 === 0 ? "gray.800" : "transparent"} // Zebra striping
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta;
                return (
                  <Td
                    key={cell.id}
                    textAlign={meta?.isNumeric ? "right" : "left"} // Align data properly
                    borderBottom="1px solid gray"
                    py={3} // Increased padding
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Pagination Controls */}
      <HStack mt={4} justifyContent="center" spacing={4} p={4}>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          colorScheme="accent"
          variant="outline"
        >
          Previous
        </Button>
        <Text>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          colorScheme="accent"
          variant="outline"
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
}
