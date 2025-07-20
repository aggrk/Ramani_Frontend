import { useEffect, useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import SiteCard from "./SiteCard";
import useFetch from "../../hooks/useFetch";

export default function SiteList() {
  const { data, isPending, isError, error } = useFetch("sites", "/sites");
  const [searchTerm, setSearchTerm] = useState("");
  const sites = data?.data?.sites || [];

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
    <div className="min-h-screen bg-neutral/5">
      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-2xl font-bold text-textdark">
              Available Sites
            </h2>
            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-textlight" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full rounded-lg border border-accent/20 py-2 pl-10 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search construction sites"
                  disabled={isPending}
                />
              </div>
              <button
                className="flex items-center justify-center gap-2 rounded-lg border border-accent/20 bg-white px-4 py-2 hover:bg-neutral/5"
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
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            </div>
          )}

          {isError && (
            <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {/* Site Cards */}
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
