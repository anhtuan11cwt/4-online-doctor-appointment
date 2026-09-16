/* eslint-disable @typescript-eslint/no-require-imports */
const db = require("vietnam-address-database");

export const provinces: { province_code: string; name: string }[] = db[2].data;
export const allWards: {
  ward_code: string;
  name: string;
  province_code: string;
}[] = db[3].data;

export const provinceOptions = provinces.map((p) => ({
  label: p.name,
  value: p.name,
}));
