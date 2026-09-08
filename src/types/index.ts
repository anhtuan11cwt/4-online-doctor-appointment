export type ServiceProps = {
  title: string;
  image: string;
  slug: string;
};

export type RegisterInputProps = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginInputProps = {
  email: string;
  password: string;
};
