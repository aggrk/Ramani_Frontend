import { useParams, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Edit, Trash2 } from "lucide-react";

export default function UsersList() {
  const [params] = useSearchParams();
  const paramsObject = Object.fromEntries([...params]);
  const { data } = useFetch("users", "/users", paramsObject);
  const users = data?.data;

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 overflow-x-auto px-4 py-6 sm:px-6 lg:px-8">
      <table className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
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
            <tr
              key={user._id}
              className="border-b transition-colors last:border-none hover:bg-neutral"
            >
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.phone}</td>
              <td className="px-6 py-3">{user.role}</td>

              <td className="px-6 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    user.status === "active"
                      ? "bg-secondary text-white"
                      : "bg-warning text-white"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* Actions */}
              <td className="flex items-center justify-center gap-4 px-6 py-3">
                {/* Edit */}
                <button
                  onClick={() => handleEdit(user)}
                  className="text-secondary transition-colors hover:text-primary"
                >
                  <Edit className="h-5 w-5" />
                </button>

                {/* Delete */}
                <button className="text-warning transition-colors hover:text-primary">
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
