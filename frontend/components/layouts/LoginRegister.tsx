import Link from "next/link";

interface LoginRegisterLayoutProps {
  children: React.ReactNode;
  title: string;
  alternativeOptionText: string;
  alternativeOptionLink: string;
}

export default function LoginRegisterLayout({
  children,
  title,
  alternativeOptionText,
  alternativeOptionLink,
}: LoginRegisterLayoutProps) {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto w-[90%] lg:w-[500px] space-y-6 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold mb-5">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {alternativeOptionText}
            </p>
          </div>
          {children}
          <div className="mt-4 text-center text-sm">
            <Link href={alternativeOptionLink} className="underline">
              {alternativeOptionText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
