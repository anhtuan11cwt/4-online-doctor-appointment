"use client";

import type { Service } from "@prisma/client";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteService } from "@/actions/services";
import DeletePopup from "@/components/dashboard/delete-popup";

export default function ServiceCard({ service }: { service: Service }) {
  const handleDelete = async (id: string) => {
    const result = await deleteService(id);
    if (result.status === 200) {
      toast.success("Xóa dịch vụ thành công");
    } else {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="mb-2 flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-2 py-2.5 text-xs shadow-sm sm:gap-4 sm:py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        {service.imageUrl && (
          <Image
            alt={service.title}
            className="size-10 shrink-0 rounded-md object-cover sm:size-14"
            height={56}
            src={service.imageUrl}
            width={56}
          />
        )}
        <h2 className="min-w-0 truncate font-medium dark:text-slate-100">
          {service.title}
        </h2>
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Link
          aria-label="Cập nhật dịch vụ"
          className="flex size-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950"
          href={`/dashboard/services/update/${service.slug}`}
        >
          <Pencil className="size-4" />
        </Link>
        <DeletePopup
          handleDelete={handleDelete}
          id={service.id}
          title={service.title}
        />
      </div>
    </div>
  );
}
