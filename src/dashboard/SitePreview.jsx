import { Link } from "react-router-dom";
import { HardHat } from "lucide-react";

const sampleSites = [
  {
    id: 1,
    name: "Nairobi Office Complex",
    location: "Nairobi, Kenya",
    image: "https://via.placeholder.com/300x200?text=Office+Complex",
    applicants: 15,
    progress: 65,
  },
  {
    id: 2,
    name: "Mombasa Bridge Project",
    location: "Mombasa, Kenya",
    image: "https://via.placeholder.com/300x200?text=Bridge+Project",
    applicants: 8,
    progress: 20,
  },
  {
    id: 3,
    name: "Kisumu Residential Estate",
    location: "Kisumu, Kenya",
    image: "https://via.placeholder.com/300x200?text=Residential+Estate",
    applicants: 12,
    progress: 45,
  },
];

export default function SitePreview() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-accent/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[clamp(1rem,5vw,1.125rem)] font-semibold text-textdark">
          My Sites
        </h3>
        <Link to="/sites/new" className="text-sm text-primary hover:underline">
          Add New Site
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 sm:gap-6">
        {sampleSites.map((site) => (
          <div
            key={site.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-accent/10 hover:shadow-md transition-all"
          >
            <img
              src={site.image}
              alt={site.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
              loading="lazy"
            />
            <h4 className="text-sm font-medium text-textdark truncate">
              {site.name}
            </h4>
            <p className="text-xs text-textlight mb-2">{site.location}</p>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <HardHat className="w-4 h-4 text-primary" />
                <span className="text-xs text-textdark">
                  {site.applicants} Applicants
                </span>
              </div>
              <Link
                to={`/sites/${site.id}`}
                className="text-xs text-primary hover:underline"
              >
                View Details
              </Link>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-[#F59E0B] h-2.5 rounded-full"
                style={{ width: `${site.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
