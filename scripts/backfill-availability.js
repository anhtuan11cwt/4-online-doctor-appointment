const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const DEFAULT_TIMES = ["7", "8", "9", "10", "11", "12", "1", "2", "3", "4"];

async function backfillAvailability() {
  const profiles = await prisma.doctorProfile.findMany({
    select: {
      availability: true,
      id: true,
      userId: true,
    },
  });

  let touched = 0;

  for (const profile of profiles) {
    const label = profile.userId;
    const data = { doctorProfileId: profile.id };
    let hasEmptyDay = false;

    for (const day of DAYS) {
      const current = profile.availability?.[day];
      if (!current || current.length === 0) {
        data[day] = DEFAULT_TIMES;
        hasEmptyDay = true;
      }
    }

    if (!hasEmptyDay) {
      console.log(`Bỏ qua (đã đủ lịch): ${label}`);
      continue;
    }

    if (profile.availability) {
      await prisma.availability.update({
        data,
        where: { doctorProfileId: profile.id },
      });
    } else {
      await prisma.availability.create({ data });
    }

    console.log(`Đã bổ sung lịch trống: ${label}`);
    touched += 1;
  }

  console.log(`Hoàn tất. Đã cập nhật ${touched} bác sĩ.`);
}

backfillAvailability()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
