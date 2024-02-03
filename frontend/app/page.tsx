import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <main className="flex flex-1 items-center justify-center text-center">
        <div className="space-y-4 bg-white p-16 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold">Welcome to Real Time Chat!</h1>
          <p className="text-xl text-gray-500">
            We are happy to have you here. Lets get started.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row items-center justify-center">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
