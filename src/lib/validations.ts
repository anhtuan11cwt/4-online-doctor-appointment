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

export const settingsSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
  name: z
    .string()
    .trim()
    .min(1, "Tên là bắt buộc")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được vượt quá 100 ký tự")
    .regex(
      /^[a-zA-ZÀ-ỹ]+(?: [a-zA-ZÀ-ỹ]+)*$/,
      "Tên chỉ được chứa chữ cái và khoảng trắng giữa các từ",
    )
    .refine((val) => !/[0-9]/.test(val), "Tên không được chứa số")
    .refine(
      (val) => !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(val),
      "Tên không được chứa ký tự đặc biệt",
    )
    .refine(
      (val) => !/(.)\1{2,}/.test(val),
      "Tên không được chứa 3 ký tự liên tiếp giống nhau",
    ),
  phone: phoneValidation,
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type SettingsSchema = z.infer<typeof settingsSchema>;

export const bioDataSchema = z.object({
  address: z
    .string()
    .trim()
    .min(1, "Địa chỉ là bắt buộc")
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(200, "Địa chỉ không được vượt quá 200 ký tự"),
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
    ),
  gender: z.enum(["male", "female"], {
    message: "Vui lòng chọn giới tính",
  }),
  phone: phoneValidation,
});

export type BioDataSchema = z.infer<typeof bioDataSchema>;

export const profileInfoSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(1, "Tiểu sử là bắt buộc")
    .min(10, "Tiểu sử phải có ít nhất 10 ký tự")
    .max(500, "Tiểu sử không được vượt quá 500 ký tự"),
  medicalLicense: z
    .string()
    .trim()
    .min(1, "Số giấy phép hành nghề là bắt buộc")
    .max(50, "Số giấy phép hành nghề không được vượt quá 50 ký tự")
    .regex(
      /^\d{6}\/[A-Z]{2}-GPHN$/,
      "Định dạng mã số GPHN phải là 6 chữ số/2 chữ hoa-GPHN (ví dụ: 000001/HN-GPHN)",
    )
    .refine((val) => {
      const numPart = val.split("/")[0];
      return Number.parseInt(numPart, 10) > 0;
    }, "Số giấy phép phải lớn hơn 000000"),
});

export type ProfileInfoSchema = z.infer<typeof profileInfoSchema>;

export const contactInfoSchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, "Thành phố là bắt buộc")
    .max(100, "Thành phố không được vượt quá 100 ký tự"),
  district: z
    .string()
    .trim()
    .min(1, "Quận/Huyện là bắt buộc")
    .max(100, "Quận/Huyện không được vượt quá 100 ký tự"),
  emergencyContactName: z
    .string()
    .trim()
    .min(1, "Tên người liên hệ khẩn cấp là bắt buộc")
    .max(100, "Tên không được vượt quá 100 ký tự"),
  emergencyContactPhone: z
    .string()
    .trim()
    .min(1, "Số điện thoại liên hệ khẩn cấp là bắt buộc")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa chữ số")
    .length(10, "Số điện thoại phải có đúng 10 chữ số"),
  emergencyContactRelationship: z
    .string()
    .trim()
    .min(1, "Mối quan hệ là bắt buộc")
    .max(50, "Mối quan hệ không được vượt quá 50 ký tự"),
  ward: z
    .string()
    .trim()
    .max(100, "Phường/Xã không được vượt quá 100 ký tự")
    .optional()
    .or(z.literal("")),
});

export type ContactInfoSchema = z.infer<typeof contactInfoSchema>;

export const professionalInfoSchema = z.object({
  certifications: z
    .array(z.string().trim().min(1))
    .optional()
    .or(z.literal("")),
  consultationFee: z
    .number({ message: "Phí tư vấn phải là số" })
    .min(0, "Phí tư vấn phải lớn hơn hoặc bằng 0"),
  languages: z
    .array(z.string().trim().min(1))
    .min(1, "Phải chọn ít nhất 1 ngôn ngữ"),
  specialization: z
    .string()
    .trim()
    .min(1, "Chuyên khoa là bắt buộc")
    .max(100, "Chuyên khoa không được vượt quá 100 ký tự"),
  subSpecialization: z
    .string()
    .trim()
    .max(100, "Chuyên khoa phụ không được vượt quá 100 ký tự")
    .optional()
    .or(z.literal("")),
  yearsOfExperience: z
    .number({ message: "Số năm kinh nghiệm phải là số" })
    .min(0, "Số năm kinh nghiệm phải lớn hơn hoặc bằng 0")
    .max(60, "Số năm kinh nghiệm không được vượt quá 60"),
});

export type ProfessionalInfoSchema = z.infer<typeof professionalInfoSchema>;

export const educationSchema = z.object({
  additionalCourses: z
    .array(z.string().trim().min(1))
    .optional()
    .or(z.literal("")),
  degree: z
    .string()
    .trim()
    .min(1, "Bằng cấp là bắt buộc")
    .max(100, "Bằng cấp không được vượt quá 100 ký tự"),
  graduationYear: z
    .number({ message: "Năm tốt nghiệp phải là số" })
    .min(1950, "Năm tốt nghiệp phải lớn hơn 1950")
    .max(new Date().getFullYear(), "Năm tốt nghiệp không được lớn hơn năm nay"),
  university: z
    .string()
    .trim()
    .min(1, "Trường đại học là bắt buộc")
    .max(200, "Tên trường không được vượt quá 200 ký tự"),
});

export type EducationSchema = z.infer<typeof educationSchema>;

export const practiceInfoSchema = z.object({
  department: z
    .string()
    .trim()
    .max(100, "Khoa/Phòng không được vượt quá 100 ký tự")
    .optional()
    .or(z.literal("")),
  hospitalName: z
    .string()
    .trim()
    .min(1, "Tên bệnh viện/phòng khám là bắt buộc")
    .max(200, "Tên không được vượt quá 200 ký tự"),
  isCurrentWorkplace: z.boolean().optional(),
  position: z
    .string()
    .trim()
    .max(100, "Chức vụ không được vượt quá 100 ký tự")
    .optional()
    .or(z.literal("")),
  practiceAddress: z
    .string()
    .trim()
    .min(1, "Địa chỉ thực hành là bắt buộc")
    .max(300, "Địa chỉ không được vượt quá 300 ký tự"),
});

export type PracticeInfoSchema = z.infer<typeof practiceInfoSchema>;

export const additionalInfoSchema = z.object({
  additionalNotes: z
    .string()
    .trim()
    .max(500, "Ghi chú thêm không được vượt quá 500 ký tự")
    .optional()
    .or(z.literal("")),
  awards: z.array(z.string().trim().min(1)).optional().or(z.literal("")),
  professionalMemberships: z
    .array(z.string().trim().min(1))
    .optional()
    .or(z.literal("")),
  publications: z.array(z.string().trim().min(1)).optional().or(z.literal("")),
  researchInterests: z
    .string()
    .trim()
    .max(500, "Lĩnh vực nghiên cứu không được vượt quá 500 ký tự")
    .optional()
    .or(z.literal("")),
});

export type AdditionalInfoSchema = z.infer<typeof additionalInfoSchema>;

export const availabilitySchema = z.object({
  schedule: z
    .array(
      z.object({
        day: z.enum(
          [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          { message: "Ngày không hợp lệ" },
        ),
        endTime: z
          .string()
          .regex(/^\d{2}:\d{2}$/, "Định dạng giờ phải là HH:MM"),
        isActive: z.boolean(),
        startTime: z
          .string()
          .regex(/^\d{2}:\d{2}$/, "Định dạng giờ phải là HH:MM"),
      }),
    )
    .min(1, "Phải có ít nhất 1 lịch trình"),
  timezone: z.string().min(1, "Múi giờ là bắt buộc"),
});

export type AvailabilitySchema = z.infer<typeof availabilitySchema>;

export const onboardingSchemas = {
  additional: additionalInfoSchema,
  availability: availabilitySchema,
  biodata: bioDataSchema,
  contact: contactInfoSchema,
  education: educationSchema,
  practice: practiceInfoSchema,
  professional: professionalInfoSchema,
  profile: profileInfoSchema,
} as const;

export type OnboardingStep = keyof typeof onboardingSchemas;
