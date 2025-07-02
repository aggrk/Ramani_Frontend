import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-accent/10 py-8 sm:py-12 lg:py-16 px-4 border-b border-accent/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="block sm:inline text-primary">
                  Get a Job Instantly
                </span>
                <span className="hidden sm:inline mx-2 lg:mx-3 text-textdark/40">
                  |
                </span>
                <span className="block sm:inline text-secondary mt-2 sm:mt-0">
                  Order Construction Materials
                </span>
                <span className="hidden sm:inline mx-2 lg:mx-3 text-textdark/40">
                  |
                </span>
                <span className="block sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2 sm:mt-0">
                  Attract Customers Now
                </span>
              </h1>

              <p className="text-textlight text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
                Ramani connects you with trusted hardware suppliers and
                construction professionals across Tanzania. Whether you're
                looking for a job in construction, searching for materials, an
                engineer needing handymen, or a supplier wanting to promote your
                business — this is where you belong.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                <Link
                  to=""
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg font-semibold border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300 shadow-sm text-center"
                >
                  Find a job
                </Link>
                <Link
                  to=""
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg font-semibold bg-primary text-white hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg text-center"
                >
                  Explore Hardware
                </Link>
                <Link
                  to=""
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg font-semibold bg-secondary text-white hover:bg-secondary-dark transition-all duration-300 shadow-md hover:shadow-lg text-center"
                >
                  Post a site
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="hidden md:flex justify-center lg:flex-1 lg:justify-end">
              <img
                src="images/building.svg"
                alt="Construction Illustration"
                className="w-full max-w-md lg:max-w-none h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20 px-5 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center">
            {/* Heading with responsive sizing and spacing */}
            <div className="w-full max-w-3xl text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textdark leading-tight">
                <span className="text-primary">What is </span>
                <span className="text-secondary">Ramani </span>
                <span className="text-primary">all about?</span>
              </h2>
            </div>

            {/* Content with responsive text sizing and spacing */}
            <div className="w-full max-w-3xl space-y-4 sm:space-y-5">
              <p className="text-base sm:text-lg text-textlight leading-relaxed sm:leading-loose">
                Ramani is a digital platform that connects users with trusted
                hardware suppliers, construction professionals, and job
                opportunities across Tanzania. It brings together the essential
                players in the construction industry, making access to resources
                and services fast and reliable.
              </p>
              <p className="text-base sm:text-lg text-textlight leading-relaxed sm:leading-loose">
                Whether you're looking to buy construction materials, hire
                handymen, find construction jobs, or promote your services as a
                supplier or engineer — Ramani provides everything you need in
                one place.
              </p>
            </div>

            {/* Optional CTA button - responsive sizing */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <Link
                to="/register"
                className="inline-block px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base font-medium rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
