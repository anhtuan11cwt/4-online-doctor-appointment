"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateDoctorProfileWithService } from "@/actions/services";
import { Button } from "@/components/ui/button";

type PriceUpdateFormProps = {
  hourlyWage?: number | null;
  profileId?: string;
};

export default function PriceUpdateForm({
  hourlyWage,
  profileId,
}: PriceUpdateFormProps) {
  const router = useRouter();
  const [savingPrice, setSavingPrice] = useState(false);
  const [price, setPrice] = useState(hourlyWage ?? 15000);

  const handleUpdatePrice = async () => {
    if (!profileId) {
      toast.error(
        "Không tìm thấy hồ sơ bác sĩ. Vui lòng hoàn tất đăng ký trước.",
      );
      return;
    }

    setSavingPrice(true);
    try {
      const result = await updateDoctorProfileWithService(profileId, {
        hourlyWage: price,
      });

      if (result.status === 201) {
        toast.success("Đã cập nhật giá theo giờ");
        router.refresh();
      } else {
        toast.error((result.error as string) ?? "Đã có lỗi xảy ra");
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setSavingPrice(false);
    }
  };

  return (
    <section className="rounded-md border border-slate-200 bg-card p-3 shadow-sm min-[360px]:p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 className="break-words font-bold text-base">Giá theo giờ</h2>
          <p className="break-words text-muted-foreground text-xs">
            Cập nhật mức phí bạn muốn tính cho mỗi lần khám.
          </p>
        </div>
        <Button
          className="w-full justify-center min-[480px]:w-auto"
          disabled={savingPrice}
          onClick={handleUpdatePrice}
          size="sm"
          type="button"
        >
          {savingPrice && <Loader2 className="mr-2 size-4 animate-spin" />}
          Cập nhật giá
        </Button>
      </div>

      <div className="flex items-center gap-2 py-3">
        <span className="font-medium text-muted-foreground text-sm">₫</span>
        <input
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          id="price"
          min={0}
          name="price"
          onChange={(e) => setPrice(+e.target.value)}
          type="number"
          value={price}
        />
      </div>
    </section>
  );
}
