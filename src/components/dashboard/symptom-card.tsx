"use client";

import type { Symptom } from "@prisma/client";
import { Pencil } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { deleteSymptom } from "@/actions/symptoms";
import DeletePopup from "@/components/dashboard/delete-popup";

export default function SymptomCard({ symptom }: { symptom: Symptom }) {
  const handleDelete = async (id: string) => {
    const result = await deleteSymptom(id);
    if (result.status === 200) {
      toast.success("Xóa triệu chứng thành công");
    } else {
      toast.error("Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="mb-2 flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-white px-2 py-2.5 text-xs shadow-sm sm:py-3 min-[360px]:gap-4 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
      <h2 className="min-w-0 flex-1 truncate font-medium dark:text-slate-100">
        {symptom.title}
      </h2>
      <div className="flex shrink-0 items-center gap-2 min-[360px]:gap-4">
        <Link
          aria-label="Cập nhật triệu chứng"
          className="flex size-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950"
          href={`/dashboard/symptoms/update/${symptom.slug}`}
        >
          <Pencil className="size-4" />
        </Link>
        <DeletePopup
          handleDelete={handleDelete}
          id={symptom.id}
          title={symptom.title}
        />
      </div>
    </div>
  );
}
