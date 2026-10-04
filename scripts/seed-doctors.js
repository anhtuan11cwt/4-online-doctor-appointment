const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const { generateSlug } = require("./lib/slug");

const prisma = new PrismaClient();

const PASSWORD = "password";

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

const legacyEmails = [
  "lucas.doctor@example.com",
  "emily.harris@example.com",
  "asuman.doctor@example.com",
];

const seedDoctors = [
  {
    address: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    bio: "BS. Nguyễn Văn An là bác sĩ đa khoa với 4 năm kinh nghiệm trong lĩnh vực khám và điều trị bệnh tổng quát. Ông cam kết mang đến dịch vụ chăm sóc sức khỏe toàn diện cho bệnh nhân.",
    email: "nguyen.van.an@doctor.vn",
    firstName: "An",
    gender: "male",
    hospitalName: "Bệnh viện Chợ Rẫy",
    hourlyWage: 500000,
    lastName: "Nguyễn",
    medicalLicense: "VN-2010-0041",
    middleName: "Văn",
    name: "BS. Nguyễn Văn An",
    operationMode: "Khám từ xa",
    phone: "+84 90 123 4567",
    profilePicture: "/doc1.png",
    serviceSlug: "telehealth-visit",
    specialtyTitle: "Chăm sóc sức khỏe ban đầu",
    yearsOfExperience: 4,
  },
  {
    address: "78 Hai Bà Trưng, Hoàn Kiếm, Hà Nội",
    bio: "BS. Lê Minh Châu là bác sĩ đa khoa chuyên khoa da liễu với 1 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý về da, tóc và móng.",
    email: "le.minh.chau@doctor.vn",
    firstName: "Châu",
    gender: "female",
    hospitalName: "Bệnh viện Bạch Mai",
    hourlyWage: 300000,
    lastName: "Lê",
    medicalLicense: "VN-2014-0198",
    middleName: "Minh",
    name: "BS. Lê Minh Châu",
    operationMode: "Khám trực tiếp",
    phone: "+84 91 234 5678",
    profilePicture: "/doc3.png",
    serviceSlug: "in-person-doctor-visit",
    specialtyTitle: "Da liễu",
    yearsOfExperience: 1,
  },
  {
    address: "56 Trần Phú, Hà Đông, Hà Nội",
    bio: "BS. Phạm Đức Dũng là bác sĩ đa khoa chuyên khoa nhi với 2 năm kinh nghiệm. Ông chuyên khám và điều trị các bệnh lý cho trẻ em từ sơ sinh đến tuổi vị thành niên.",
    email: "pham.duc.dung@doctor.vn",
    firstName: "Dũng",
    gender: "male",
    hospitalName: "Bệnh viện Nhi Trung ương",
    hourlyWage: 400000,
    lastName: "Phạm",
    medicalLicense: "VN-2015-0276",
    middleName: "Đức",
    name: "BS. Phạm Đức Dũng",
    operationMode: "Khám trực tiếp",
    phone: "+84 92 345 6789",
    profilePicture: "/doc4.png",
    serviceSlug: "in-person-doctor-visit",
    specialtyTitle: "Nhi khoa",
    yearsOfExperience: 2,
  },
];

async function cleanupLegacy() {
  for (const email of legacyEmails) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) continue;

    await prisma.user.delete({ where: { id: existing.id } });
    console.log(`Đã xóa bác sĩ cũ ${email}`);
  }
}

async function main() {
  await cleanupLegacy();

  const services = await prisma.service.findMany();
  const specialties = await prisma.specialty.findMany();
  const symptoms = await prisma.symptom.findMany();

  const passwordHash = await bcrypt.hash(PASSWORD, 10);
  const symptomIds = symptoms.slice(0, 4).map((item) => item.id);

  for (const doctor of seedDoctors) {
    const service = services.find((item) => item.slug === doctor.serviceSlug);
    const specialty = specialties.find(
      (item) => item.title === doctor.specialtyTitle,
    );

    const user = await prisma.user.upsert({
      create: {
        email: doctor.email,
        isVerified: true,
        name: doctor.name,
        onboardingPage: "{}",
        password: passwordHash,
        phone: doctor.phone,
        role: "DOCTOR",
        slug: generateSlug(doctor.name),
      },
      update: {
        isVerified: true,
        name: doctor.name,
        onboardingPage: "{}",
        phone: doctor.phone,
        role: "DOCTOR",
        slug: generateSlug(doctor.name),
      },
      where: { email: doctor.email },
    });

    let profile = await prisma.doctorProfile.findUnique({
      where: { userId: user.id },
    });

    const profileData = {
      bio: doctor.bio,
      email: doctor.email,
      firstName: doctor.firstName,
      gender: doctor.gender,
      hospitalAddress: doctor.address,
      hospitalName: doctor.hospitalName,
      hourlyWage: doctor.hourlyWage,
      lastName: doctor.lastName,
      medicalLicense: doctor.medicalLicense,
      middleName: doctor.middleName,
      operationMode: doctor.operationMode,
      page: "additional",
      phone: doctor.phone,
      primarySpecialization: doctor.specialtyTitle,
      profilePicture: doctor.profilePicture,
      serviceId: service?.id ?? null,
      specialtyId: specialty?.id ?? null,
      symptomIds,
      yearsOfExperience: doctor.yearsOfExperience,
    };

    if (profile) {
      await prisma.doctorProfile.update({
        data: profileData,
        where: { id: profile.id },
      });
      console.log(`Đã cập nhật ${doctor.name} (${doctor.email})`);
    } else {
      profile = await prisma.doctorProfile.create({
        data: {
          ...profileData,
          trackingNumber: `TRK-${doctor.email.split("@")[0].toUpperCase()}`,
          userId: user.id,
        },
      });
      console.log(`Đã tạo ${doctor.name} (${doctor.email})`);
    }

    const existingAvailability = await prisma.availability.findUnique({
      where: { doctorProfileId: profile.id },
    });

    const availabilityData = { doctorProfileId: profile.id };
    let hasEmptyDay = false;

    for (const day of DAYS) {
      const current = existingAvailability?.[day];
      if (!current || current.length === 0) {
        availabilityData[day] = DEFAULT_TIMES;
        hasEmptyDay = true;
      }
    }

    if (hasEmptyDay) {
      if (existingAvailability) {
        await prisma.availability.update({
          data: availabilityData,
          where: { doctorProfileId: profile.id },
        });
      } else {
        await prisma.availability.create({ data: availabilityData });
      }
      console.log(`Đã thêm lịch làm việc cho ${doctor.name}`);
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
