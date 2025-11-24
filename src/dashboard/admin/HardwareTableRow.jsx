import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUrl } from "../../utils/utils";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../../utils/api";
import toast from "react-hot-toast";

export default function HardwareTableRow({ hardware }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/hardware/approveHardware/${id}`);
    },
    onSuccess: async () => {
      toast.success("Hardware approved succesfully");
      await queryClient.invalidateQueries([{ queryKey: "hardware" }]);
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Unable to approve hardware");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/hardware/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([{ queryKey: "hardware" }]);
      toast.success("Harware deleted succesfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Unable to approve hardware");
    },
  });

  const handleApproveHardware = (id) => {
    mutation.mutate(id);
  };

  const filename = hardware.licenseUpload.split("/")[1];

  return (
    <tr className="border-b transition-colors last:border-none hover:bg-neutral">
      <td className="px-6 py-3">{hardware.name}</td>
      <td className="px-6 py-3">{hardware.email}</td>
      <td className="px-6 py-3">{hardware.phone}</td>
      <td className="px-6 py-3">
        {hardware.address.city}, {hardware.address.street}
      </td>
      <td className="px-6 py-3">
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            hardware.status === "verified"
              ? "bg-secondary text-white"
              : "bg-warning text-white"
          }`}
        >
          {hardware.status}
        </span>
      </td>
      <td className="px-6 py-3">
        <Link
          to={`${apiUrl}/files/${filename}`}
          target="_blank"
          className="text-base text-textdark underline"
        >
          View Document
        </Link>
      </td>

      <td className="flex items-center justify-center gap-4 px-6 py-3">
        <button
          disabled={mutation.isPending}
          onClick={() => handleApproveHardware(hardware._id)}
          className={`${mutation.isPending && "opacity-50"} rounded-full bg-secondary px-3 py-1 text-sm text-neutral`}
        >
          {mutation.isPending ? "Approving..." : "Approve"}
        </button>

        <button
          onClick={() => deleteMutation.mutate(hardware._id)}
          className="text-warning transition-colors hover:text-primary"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}
