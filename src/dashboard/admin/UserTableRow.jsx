import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";

export default function UserTableRow({ user }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([{ queryKey: "users" }]);
      toast.success("Deleted user succesfully!");
    },
    onError: (error) =>
      toast.error(error.response.data.message || "Unable to delete user"),
  });

  const handleDeleteUser = (id) => {
    mutation.mutate(id);
  };

  return (
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

      <td className="flex items-center justify-center gap-4 px-6 py-3">
        <Link
          to={`${user._id}`}
          className="text-secondary transition-colors hover:text-primary"
        >
          <Edit className="h-5 w-5" />
        </Link>

        <button
          onClick={() => handleDeleteUser(user._id)}
          className="text-warning transition-colors hover:text-primary"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
