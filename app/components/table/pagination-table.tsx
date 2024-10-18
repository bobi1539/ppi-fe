import { Pagination } from "@nextui-org/pagination";

interface PaginationTableProps {
  total: number;
  handlePageChange: (page: number) => void;
}

export default function PaginationTable(props: Readonly<PaginationTableProps>) {
  return (
    <Pagination
      isCompact
      showControls
      total={props.total}
      initialPage={1}
      onChange={props.handlePageChange}
      classNames={{
        wrapper: "gap-0 overflow-visible h-8 rounded border border-divider",
        item: "w-8 h-8 text-sm text-secondary-700 font-medium rounded-none bg-transparent hover:text-white hover:bg-secondary-700 transition duration-200",
        cursor: "w-8 h-8 text-white font-bold bg-secondary-700 rounded-none",
        prev: "text-secondary-700 w-8 h-8 hover:text-white hover:bg-secondary-700 transition duration-200",
        next: "text-secondary-700 w-8 h-8 hover:text-white hover:bg-secondary-700 transition duration-200",
        chevronNext: "rotate-180",
      }}
    />
  );
}
