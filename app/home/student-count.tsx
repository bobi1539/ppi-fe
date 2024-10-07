export default function StudentCount() {
  return (
    <section>
      <div className="py-8 sm:py-18 bg-secondary-600">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <dl className="grid gap-x-4 gap-y-4 text-center grid-cols-2 md:grid-cols-4">
            <div className="mx-auto flex max-w-xs flex-col gap-y-1">
              <dt className="text-base leading-7 text-white">students</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white sm:text-5xl">100+</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-1">
              <dt className="text-base leading-7 text-white">events</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white sm:text-5xl">16</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-1">
              <dt className="text-base leading-7 text-white">newsletter</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white sm:text-5xl">2</dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-1">
              <dt className="text-base leading-7 text-white">home</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white sm:text-5xl">1</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
