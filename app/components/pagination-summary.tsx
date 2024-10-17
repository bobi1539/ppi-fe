interface PaginationSummaryProps {
  numberOfElements?: number;
  totalElements?: number;
}

export default function PaginationSummary(props: Readonly<PaginationSummaryProps>) {
  return (
    <span className="text-sm font-normal text-gray-500 mr-2 md:ml-2">
      Showing{" "}
      <span className="font-semibold text-gray-900">
        {props.numberOfElements} of {props.totalElements}
      </span>
    </span>
  );
}
