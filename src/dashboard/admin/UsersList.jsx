import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ActivityIndicator from "../../components/ActivityIndicator";
import MobileUserList from "./MobileUserList";
import UserTableRow from "./UserTableRow";
import NoData from "../../components/NoData";

export default function UsersList() {
  const [params] = useSearchParams();
  const paramsObject = Object.fromEntries([...params]);
  const { data } = useFetch("users", "/users", paramsObject);
  const users = data?.data;
  console.log(users);

  if (!users)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <>
      {users.length > 0 ? (
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="hidden w-full overflow-hidden rounded-xl shadow-md md:table">
              <thead className="text-textcolor">
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
                    Role
                  </th>
                  <th className="px-6 py-3 text-left font-semibold uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="text-textdark">
                {users?.map((user) => (
                  <UserTableRow key={user._id} user={user} />
                ))}
              </tbody>
            </table>
            <div className="space-y-4 md:hidden">
              {users?.map((user) => (
                <MobileUserList user={user} key={user._id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NoData
          message="No users"
          linkMessage="Go back to dashboard"
          link="../"
        />
      )}
    </>
  );
}
