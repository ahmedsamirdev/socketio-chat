export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white h-[500px] mb-4">
      <div className="mx-auto max-w-7xl h-full">
        <div className="mx-auto max-w-2xl h-full rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
          <div className="-mt-2 p-2 h-full lg:mt-0 lg:w-full">
            <div className="h-full rounded-2xl bg-gray-50 overflow-auto py-10 px-4 ring-1 ring-gray-900/5 ring-inset lg:flex lg:flex-col lg:py-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
