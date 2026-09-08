import { z } from "zod";

const passwordValidation = z
  .string()
  .min(1, "Mật khẩu là bắt buộc")
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(100, "Mật khẩu không được vượt quá 100 ký tự")
  .refine(
    (val) => val.trim().length > 0,
    "Mật khẩu không được chỉ chứa khoảng trắng",
  )
  .refine(
    (val) => val === val.trim(),
    "Mật khẩu không được có khoảng trắng ở đầu hoặc cuối",
  )
  .refine(
    (val) => /[A-Z]/.test(val),
    "Mật khẩu phải chứa ít nhất 1 chữ hoa (A-Z)",
  )
  .refine(
    (val) => /[a-z]/.test(val),
    "Mật khẩu phải chứa ít nhất 1 chữ thường (a-z)",
  )
  .refine(
    (val) => /[0-9]/.test(val),
    "Mật khẩu phải chứa ít nhất 1 chữ số (0-9)",
  )
  .refine(
    (val) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(val),
    "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*...)",
  )
  .refine(
    (val) => !/(.)\1{7,}/.test(val),
    "Mật khẩu không được lặp cùng 1 ký tự quá nhiều lần",
  );

const phoneValidation = z
  .string()
  .trim()
  .min(1, "Số điện thoại là bắt buộc")
  .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số")
  .length(10, "Số điện thoại phải có đúng 10 chữ số")
  .startsWith("0", "Số điện thoại phải bắt đầu bằng số 0")
  .refine(
    (val) => /^0(3[2-9]|5[2-9]|7[0-9]|8[0-9]|9[0-9])/.test(val),
    "Số điện thoại phải là đầu số di động hợp lệ (03x, 05x, 07x, 08x, 09x)",
  )
  .refine(
    (val) => !/^0(\d)\1{8,}$/.test(val),
    "Số điện thoại không được lặp cùng 1 chữ số",
  );

export const loginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export const registerSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  fullName: z
    .string()
    .trim()
    .min(1, "Họ và tên là bắt buộc")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự")
    .max(100, "Họ và tên không được vượt quá 100 ký tự")
    .regex(
      /^[a-zA-ZÀ-ỹ]+(?: [a-zA-ZÀ-ỹ]+)*$/,
      "Họ và tên chỉ được chứa chữ cái và khoảng trắng giữa các từ",
    )
    .refine((val) => !/[0-9]/.test(val), "Họ và tên không được chứa số")
    .refine(
      (val) => !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(val),
      "Họ và tên không được chứa ký tự đặc biệt",
    )
    .refine(
      (val) => !/(.)\1{2,}/.test(val),
      "Họ và tên không được chứa 3 ký tự liên tiếp giống nhau",
    ),
  password: passwordValidation,
  phone: phoneValidation,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
