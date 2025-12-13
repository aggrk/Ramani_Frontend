import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <section className="w-full px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
            <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6">
              <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="block text-textcolor sm:inline">
                  Get a Job Instantly
                </span>
                <span className="mx-2 hidden text-neutral sm:inline lg:mx-3">
                  -
                </span>
                <span className="mt-2 block text-textcolor sm:mt-0 sm:inline">
                  Order Construction Materials
                </span>
                <span className="mx-2 hidden text-neutral sm:inline lg:mx-3">
                  -
                </span>
                <span className="mt-2 block text-textcolor sm:mt-0 sm:inline">
                  Attract Customers Now
                </span>
              </h1>

              <p className="mx-auto text-base text-textcolor sm:max-w-4xl sm:text-lg lg:mx-0">
                Ramani connects you with trusted hardware suppliers and
                construction professionals across Tanzania. Whether you're
                looking for a job in construction, searching for materials, an
                engineer needing handymen, or a supplier wanting to promote your
                business — this is where you belong.
              </p>

              <div className="flex w-full flex-col flex-wrap justify-center gap-3 pt-4 sm:flex-row sm:gap-4">
                <Link
                  to=""
                  className="w-full rounded-lg border-2 border-textcolor px-4 py-3 text-center font-semibold text-textcolor shadow-sm transition-all duration-300 hover:border-none hover:bg-textsecondary hover:text-bgcolor sm:w-auto sm:px-6"
                >
                  Find a job
                </Link>
                <Link
                  to=""
                  className="w-full rounded-lg border-2 border-textcolor px-4 py-3 text-center font-semibold text-textcolor shadow-sm transition-all duration-300 hover:border-none hover:bg-textsecondary hover:text-bgcolor sm:w-auto sm:px-6"
                >
                  Explore Hardware
                </Link>
                <Link
                  to=""
                  className="w-full rounded-lg border-2 border-textcolor px-4 py-3 text-center font-semibold text-textcolor shadow-sm transition-all duration-300 hover:border-none hover:bg-textsecondary hover:text-bgcolor sm:w-auto sm:px-6"
                >
                  Post a site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full px-5 py-12 sm:px-6 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center">
            <div className="mb-8 w-full max-w-3xl text-center">
              <h2 className="text-2xl font-bold leading-tight text-textcolor sm:text-3xl md:text-4xl">
                <span className="text-textcolor">What is </span>
                <span className="text-textsecondary">Ramani </span>
                <span className="text-textcolor">all about?</span>
              </h2>
            </div>

            <div className="w-full max-w-3xl space-y-4 sm:space-y-5">
              <p className="text-base leading-relaxed text-textcolor sm:text-lg sm:leading-loose">
                Ramani is a digital platform that connects users with trusted
                hardware suppliers, construction professionals, and job
                opportunities across Tanzania. It brings together the essential
                players in the construction industry, making access to resources
                and services fast and reliable.
              </p>
              <p className="text-base leading-relaxed text-textcolor sm:text-lg sm:leading-loose">
                Whether you're looking to buy construction materials, hire
                handymen, find construction jobs, or promote your services as a
                supplier or engineer — Ramani provides everything you need in
                one place.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 md:mt-12">
              <Link
                to="/register"
                className="hover:bg-primary-dark inline-block rounded-lg bg-textcolor px-6 py-3 text-sm font-medium text-bgcolor shadow-sm transition-colors duration-300 hover:shadow-md sm:px-8 sm:py-3.5 sm:text-base"
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
