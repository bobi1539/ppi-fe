import PaginationSummary from "./pagination-summary";
import PaginationTable from "./pagination-table";

interface FooterTableProps {
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export default function FooterTable(props: Readonly<FooterTableProps>) {
  return (
    <div className="flex flex-col items-end md:flex-row md:justify-between md:items-center gap-2 p-2 mt-2">
      <PaginationSummary numberOfElements={props.numberOfElements} totalElements={props.totalElements} />
      {props.totalElements > 0 && <PaginationTable total={props.totalPages} handlePageChange={props.handlePageChange} />}
    </div>
  );
}
