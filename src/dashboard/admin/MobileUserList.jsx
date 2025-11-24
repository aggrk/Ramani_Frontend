import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../../utils/api";

export default function MobileUserList({ user }) {
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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow">
      <div className="mb-2 font-semibold text-textmobile">{user.name}</div>

      <div className="space-y-1 text-sm text-textdark">
        <p>
          <span className="font-semibold">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="font-semibold">Phone: </span>
          {user.phone}
        </p>
        <p>
          <span className="font-semibold">Role: </span>
          {user.role}
        </p>
        <p>
          <span className="font-semibold">Status: </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              user.status === "active"
                ? "bg-secondary text-white"
                : "bg-warning text-white"
            }`}
          >
            {user.status}
          </span>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
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
      </div>
    </div>
  );
}
