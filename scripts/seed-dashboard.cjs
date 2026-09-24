/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const services = [
  { imageUrl: "", slug: "telehealth-visit", title: "Khám từ xa" },
  {
    imageUrl: "",
    slug: "video-prescription-refill",
    title: "Cấp lại đơn qua video",
  },
  {
    imageUrl: "",
    slug: "in-person-doctor-visit",
    title: "Khám trực tiếp",
  },
  { imageUrl: "", slug: "uti-consult", title: "Tư vấn nhiễm trùng tiểu" },
  {
    imageUrl: "",
    slug: "mental-health-consult",
    title: "Tư vấn sức khỏe tâm thần",
  },
  { imageUrl: "", slug: "ed-consult", title: "Tư vấn rối loạn cương dương" },
];

const specialties = [
  { slug: "imaging-and-radiology", title: "Chẩn đoán hình ảnh và X-quang" },
  { slug: "primary-care", title: "Chăm sóc sức khỏe ban đầu" },
  { slug: "dermatology", title: "Da liễu" },
  { slug: "pediatrics", title: "Nhi khoa" },
  { slug: "psychiatry", title: "Tâm thần học" },
  { slug: "cardiology", title: "Tim mạch" },
  { slug: "neurology", title: "Thần kinh học" },
];

async function main() {
  for (const service of services) {
    const existing = await prisma.service.findUnique({
      where: { slug: service.slug },
    });
    if (!existing) {
      await prisma.service.create({ data: service });
      console.log(`ĐÃ TẠO dịch vụ: ${service.slug}`);
      continue;
    }
    if (existing.title !== service.title) {
      await prisma.service.update({
        data: { title: service.title },
        where: { id: existing.id },
      });
      console.log(`ĐÃ CẬP NHẬT dịch vụ: ${service.slug}`);
      continue;
    }
    console.log(`BỎ QUA dịch vụ: ${service.slug}`);
  }

  for (const specialty of specialties) {
    const existing = await prisma.specialty.findUnique({
      where: { slug: specialty.slug },
    });
    if (!existing) {
      await prisma.specialty.create({ data: specialty });
      console.log(`ĐÃ TẠO chuyên khoa: ${specialty.slug}`);
      continue;
    }
    if (existing.title !== specialty.title) {
      await prisma.specialty.update({
        data: { title: specialty.title },
        where: { id: existing.id },
      });
      console.log(`ĐÃ CẬP NHẬT chuyên khoa: ${specialty.slug}`);
      continue;
    }
    console.log(`BỎ QUA chuyên khoa: ${specialty.slug}`);
  }

  const serviceCount = await prisma.service.count();
  const specialtyCount = await prisma.specialty.count();
  console.log(`TỔNG dịch vụ: ${serviceCount}`);
  console.log(`TỔNG chuyên khoa: ${specialtyCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
