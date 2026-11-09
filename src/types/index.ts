export type DoctorProfileAvailability = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type DoctorProfile = {
  accomplishments: string[];
  availability: DoctorProfileAvailability | null;
  bio: string | null;
  gender: string;
  hospitalAddress: string | null;
  hospitalName: string | null;
  hoursOfOperation: string | null;
  hourlyWage: number;
  insuranceAccepted: string | null;
  languagesSpoken: string[];
  operationMode: string | null;
  otherSpecialties: string[];
  primarySpecialization: string | null;
  profilePicture: string | null;
  servicesOffered: string[];
  yearsOfExperience: number | null;
};

export type Doctor = {
  doctorProfile: DoctorProfile | null;
  email: string | null;
  id: string;
  name: string | null;
  phone: string | null;
  slug: string;
};

export type DoctorProfileDetail = DoctorProfile & {
  educationHistory: string | null;
  email: string | null;
  firstName: string;
  lastName: string;
  medicalLicense: string | null;
  middleName: string | null;
  phone: string | null;
  publishedWork: string | null;
  service: { title: string } | null;
  specialty: { title: string } | null;
};

export type DoctorDetail = Omit<Doctor, "doctorProfile"> & {
  doctorProfile: DoctorProfileDetail | null;
};

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

export type AppointmentProps = {
  appointmentDate?: string;
  appointmentReason: string;
  appointmentTime?: string;
  charge?: number;
  dob?: Date | null;
  doctorId?: string;
  doctorName?: string | null;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  location: string;
  medicalDocuments?: string[];
  occupation: string;
  phone: string;
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
