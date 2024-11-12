export default function InternalServerError() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-secondary-700 text-9xl">500</h1>
      <h1 className="font-bold text-gray-500 text-4xl">Internal Server Error</h1>
    </div>
  );
}
