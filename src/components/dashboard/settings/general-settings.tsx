"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { updateSettings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
};

export default function GeneralSettings() {
  const { data: session, update } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: string, value: string): string | undefined => {
    if (field === "name") {
      if (!value.trim()) return "Tên là bắt buộc";
      if (value.trim().length < 2) return "Tên phải có ít nhất 2 ký tự";
      if (value.trim().length > 100) return "Tên không được vượt quá 100 ký tự";
      if (!/^[a-zA-ZÀ-ỹ]+(?: [a-zA-ZÀ-ỹ]+)*$/.test(value.trim()))
        return "Tên chỉ được chứa chữ cái và khoảng trắng giữa các từ";
      if (/[0-9]/.test(value)) return "Tên không được chứa số";
      if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(value))
        return "Tên không được chứa ký tự đặc biệt";
      if (/(.)\1{2,}/.test(value))
        return "Tên không được chứa 3 ký tự liên tiếp giống nhau";
    }
    if (field === "email") {
      if (!value.trim()) return "Email là bắt buộc";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Email không hợp lệ";
    }
    if (field === "phone") {
      if (!value) return "Số điện thoại là bắt buộc";
      if (/\D/.test(value)) return "Số điện thoại chỉ được chứa chữ số";
      if (value.length !== 10) return "Số điện thoại phải có đúng 10 chữ số";
      if (!value.startsWith("0")) return "Số điện thoại phải bắt đầu bằng số 0";
      if (!/^0(3[2-9]|5[2-9]|7[0-9]|8[0-9]|9[0-9])/.test(value))
        return "Số điện thoại phải là đầu số di động hợp lệ (03x, 05x, 07x, 08x, 09x)";
      if (/^0(\d)\1{8,}$/.test(value))
        return "Số điện thoại không được lặp cùng 1 chữ số";
    }
    return undefined;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = field === "phone" ? phone : field === "name" ? name : email;
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(raw);
    if (touched.phone) {
      const error = validateField("phone", raw);
      setErrors((prev) => ({ ...prev, phone: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateField("name", name);
    const emailError = validateField("email", email);
    const phoneError = validateField("phone", phone);

    setErrors({ email: emailError, name: nameError, phone: phoneError });
    setTouched({ email: true, name: true, phone: true });

    if (nameError || emailError || phoneError) {
      toast.error("Vui lòng kiểm tra lại thông tin");
      return;
    }

    if (!user?.id) {
      toast.error("Không tìm thấy thông tin người dùng");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateSettings(user.id, { email, name, phone });

      if (result.success) {
        toast.success(result.message);
        await update({ email, name });
      } else {
        if (result.errors) {
          setErrors((prev) => ({ ...prev, ...result.errors }));
        }
        toast.error(result.message);
      }
    } catch {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Tên</Label>
          <Input
            id="name"
            onBlur={() => handleBlur("name")}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.name) {
                setErrors((prev) => ({
                  ...prev,
                  name: validateField("name", e.target.value),
                }));
              }
            }}
            placeholder="Nhập tên của bạn"
            value={name}
          />
          {touched.name && errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            onBlur={() => handleBlur("email")}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) {
                setErrors((prev) => ({
                  ...prev,
                  email: validateField("email", e.target.value),
                }));
              }
            }}
            placeholder="Nhập email của bạn"
            value={email}
          />
          {touched.email && errors.email && (
            <p className="text-destructive text-sm">{errors.email}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            inputMode="numeric"
            maxLength={10}
            onBlur={() => handleBlur("phone")}
            onChange={handlePhoneChange}
            placeholder="Nhập số điện thoại"
            value={phone}
          />
          {touched.phone && errors.phone && (
            <p className="text-destructive text-sm">{errors.phone}</p>
          )}
          <p className="text-muted-foreground text-xs">
            Ví dụ: 0912345678 (10 chữ số, đầu số hợp lệ)
          </p>
        </div>
      </div>
      <Separator />
      <div className="grid gap-2">
        <Button className="w-fit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>
      </div>
    </form>
  );
}
