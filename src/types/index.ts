export type ServiceProps = {
  title: string;
  imageUrl: string;
  slug: string;
};

export type SpecialtyProps = {
  title: string;
  slug: string;
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
