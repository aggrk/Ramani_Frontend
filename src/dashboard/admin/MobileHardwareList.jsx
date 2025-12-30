import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function MobileHardwareList({ hardware }) {
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
    <div className="rounded-xl bg-textcolor p-4 shadow">
      <div className="mb-2 font-semibold text-bgcolor">{hardware.name}</div>

      <div className="space-y-1 text-sm text-bgfooter">
        <p>
          <span className="font-semibold">Email: </span>
          {hardware.email}
        </p>
        <p>
          <span className="font-semibold">Phone: </span>
          {hardware.phone}
        </p>
        <p>
          <span className="font-semibold">Address: </span>
          {hardware.address.city}, {hardware.address.street}
        </p>
        <p>
          <span className="font-semibold">Status: </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              hardware.status === "verified"
                ? "bg-bgfooter text-textcolor"
                : "text-warning"
            }`}
          >
            {hardware.status}
          </span>
        </p>

        <p>
          <span className="font-semibold">Licence: </span>
          <Link
            to={`${apiUrl}/files/${filename}`}
            target="_blank"
            className="underline"
          >
            View Document
          </Link>
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={mutation.isPending}
          onClick={() => handleApproveHardware(hardware._id)}
          className={`${mutation.isPending && "opacity-50"} bg-secondary rounded-full px-3 py-1 text-sm text-textalt`}
        >
          {mutation.isPending ? "Approving..." : "Approve"}
        </button>

        <button
          onClick={() => deleteMutation.mutate(hardware._id)}
          className="text-warning"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
