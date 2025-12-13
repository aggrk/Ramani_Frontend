import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import SiteCard from "./SiteCard";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";

export default function SiteList() {
  const { user } = useAuth();
  const { role } = user?.data;
  const { data, isPending, isError, error } = useFetch(
    "sites",
    `${role === "engineer" ? "/sites/getMySites" : "/sites"}`,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const sites =
    role === "engineer" ? data?.data?.site : data?.data?.sites || [];

  const filteredSites = useMemo(() => {
    if (searchTerm.trim() === "") {
      return sites;
    }
    return sites.filter(
      (site) =>
        site.siteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (site.location &&
          site.location.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [searchTerm, sites]);

  return (
    <div className="min-h-screen bg-bgcolor">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-2xl font-bold text-textcolor">
              Available Sites
            </h2>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-bgfooter" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full rounded-lg border border-textcolor/20 bg-textcolor py-2 pl-10 pr-4 text-bgfooter outline-none placeholder:text-bgfooter/30 focus:border-bgfooter focus:ring-1 focus:ring-textsecondary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search construction sites"
                  disabled={isPending}
                />
              </div>
              <button
                className="flex items-center justify-center gap-2 rounded-lg border border-textcolor bg-textcolor px-4 py-2 hover:bg-bgfooter hover:text-textcolor"
                aria-label="Filter sites"
                disabled={isPending}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Loading and Error States */}
          {isPending && (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-ping rounded-full border-2 border-textcolor"></div>
            </div>
          )}

          {/* {isError && (
            <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
              {error.message}
            </div>
          )} */}

          <div className="mt-6 space-y-4">
            {!isPending && !isError && filteredSites.length > 0
              ? filteredSites.map((site) => (
                  <SiteCard key={site._id || site.id} site={site} />
                ))
              : !isPending &&
                !isError && (
                  <div className="py-8 text-center">
                    <p className="text-textlight">
                      {searchTerm.trim()
                        ? "No sites match your search."
                        : "No sites available."}
                    </p>
                  </div>
                )}
          </div>
        </div>
      </main>
    </div>
  );
}
