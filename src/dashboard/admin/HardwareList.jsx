import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ActivityIndicator from "../../components/ActivityIndicator";
import MobileHardwareList from "./MobileHardwareList";
import HardwareTableRow from "./HardwareTableRow";

export default function HardwareList() {
  const [params] = useSearchParams();
  const paramsObject = Object.fromEntries([...params]);
  const { data } = useFetch(
    "shops-list",
    "/hardware/getAllHardwareForAdmin",
    paramsObject,
  );

  const hardware = data?.data?.hardware;
  if (!hardware)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <table className="hidden w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:table">
          <thead className="bg-bgmobile text-textmobile">
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Address
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase">
                Licence
              </th>
              <th className="px-6 py-3 text-center font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-textdark">
            {hardware?.map((hardware) => (
              <HardwareTableRow key={hardware._id} hardware={hardware} />
            ))}
          </tbody>
        </table>
        <div className="space-y-4 md:hidden">
          {hardware?.map((hardware) => (
            <MobileHardwareList key={hardware._id} hardware={hardware} />
          ))}
        </div>
      </div>
    </div>
  );
}
