import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Pagination from "@/components/pagination";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import MembersCard from "@/components/members/card";
import useData from "@/hooks/useData";
import { useDebouncedCallback } from "@/lib/utils";
import SearchIcon from "./icons/SearchIcon";

interface MembersSearchState {
  keyword: string;
  page: number;
}

export default function MembersSearch() {
  const [searchState, setSearchState] = useState<MembersSearchState>({
    keyword: "",
    page: 1,
  });

  const debouncedSearch = useDebouncedCallback(filterByText, 500);

  const { data: users, loading } = useData(
    `/api/users?page=${searchState.page}&keyword=${searchState.keyword}`
  );

  function filterByText(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchState((prev) => ({ ...prev, page: 1, keyword: e.target.value }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" bg-white relative p-1.5 border rounded-lg flex items-center cursor-pointer">
          <MagnifyingGlassIcon className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <span className="font-xs ml-6 text-gray-300 font-light">Search</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-lg		">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mt-3">
            <div>Search someone to chat with...</div>
            <div>
              <div className="flex items-center w-full max-w-md">
                <div className="relative w-full">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm font-light focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:focus:border-gray-400 dark:focus:ring-gray-400"
                    placeholder="Search..."
                    type="search"
                    onChange={debouncedSearch}
                  />
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-5 overflow-auto py-5">
          <div className="grid grid-cols-4 gap-2 overflow-auto max-h-[440px]">
            {loading
              ? "Loading..."
              : users.data.map((user) => {
                  return <MembersCard key={user.id} user={user} />;
                })}
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Pagination
            currentPage={users.page}
            lastPage={users.last_page}
            onPageChange={(pageNumber) =>
              setSearchState((prev) => ({ ...prev, page: pageNumber }))
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
