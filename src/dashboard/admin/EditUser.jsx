import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ActivityIndicator from "../../components/ActivityIndicator";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { ErrorMessage } from "@hookform/error-message";
import { motion } from "motion/react";

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
        <h1 className="mb-6 text-2xl font-bold uppercase text-textcolor">
          Update User
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-textcolor">Name</label>
            <input
              type="text"
              defaultValue={user.name}
              {...register("name", { required: "The name is required" })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
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
            <label className="text-sm font-semibold text-textcolor">
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              {...register("email", { required: "The email is required" })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
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
            <label className="text-sm font-semibold text-textcolor">
              Phone
            </label>
            <input
              type="text"
              defaultValue={user.phone}
              {...register("phone", { required: "The phone is required" })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
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
            <label className="text-sm font-semibold text-textcolor">Role</label>
            <input
              type="text"
              defaultValue={user.role}
              {...register("role", { required: "The role is required" })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
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
            <label className="text-sm font-semibold text-textcolor">
              Status
            </label>
            <input
              type="text"
              defaultValue={user.status}
              {...register("status", { required: "The status is required" })}
              className="mt-1 rounded-md border border-textcolor bg-bgfooter px-3 py-2 text-textcolor outline-none"
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
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9, y: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              type="submit"
              className="w-full rounded-md bg-textsecondary py-2 font-semibold text-bgcolor"
            >
              {mutation.isPending ? (
                <ActivityIndicator size="xs" />
              ) : (
                "Save Changes"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
