import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ActivityIndicator from "../../components/ActivityIndicator";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";

export default function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const { data } = useFetch("user", `/users/${id}`);
  const user = data?.data;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await api.patch(`/users/${id}`, data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([{ queryKey: "users" }]);
      toast.success("User updated succesfully");
    },
    onError: (err) =>
      toast.error(err.response.data.message || "Failed to updated user"),
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center">
        <ActivityIndicator size="lg" />
      </div>
    );

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-2xl font-bold uppercase text-gray-800">
          Update User
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              defaultValue={user.name}
              {...register("name", { required: "The name is required" })}
              className="mt-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={user.email}
              {...register("email", { required: "The email is required" })}
              className="mt-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              defaultValue={user.phone}
              {...register("phone", { required: "The phone is required" })}
              className="mt-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Role</label>
            <input
              type="text"
              defaultValue={user.role}
              {...register("role", { required: "The role is required" })}
              className="mt-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage
              errors={errors}
              name="role"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Status
            </label>
            <input
              type="text"
              defaultValue={user.status}
              {...register("status", { required: "The status is required" })}
              className="mt-1 rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage
              errors={errors}
              name="status"
              render={({ message }) => (
                <p className="text-warning">{message}</p>
              )}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-md bg-[#B22222] py-2 font-semibold text-white transition hover:bg-[#d33]"
            >
              {mutation.isPending ? (
                <ActivityIndicator size="xs" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
