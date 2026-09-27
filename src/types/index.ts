export type DoctorProfileSummary = {
  hospitalAddress: string | null;
  hourlyWage: number;
  operationMode: string | null;
  primarySpecialization: string | null;
  profilePicture: string | null;
};

export type DoctorWithProfile = {
  doctorProfile: DoctorProfileSummary | null;
  id: string;
  name: string | null;
};

export type ServiceProps = {
  imageUrl: string | null;
  slug: string;
  title: string;
};

export type SpecialtyProps = {
  slug: string;
  title: string;
};

export type SymptomProps = {
  slug: string;
  title: string;
};

export type TabbedItemProps = {
  id: string;
  imageUrl?: string | null;
  slug?: string | null;
  title: string;
};

export type NullableServiceId = string | null;
export type NullableSpecialtyId = string | null;
export type NullableSymptomIds = string[];

export type SelectOption = {
  label: string;
  value: string;
};

export type RegisterInputProps = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  plan?: string;
};

export type LoginInputProps = {
  email: string;
  password: string;
};
