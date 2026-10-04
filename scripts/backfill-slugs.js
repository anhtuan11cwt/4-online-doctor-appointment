const { PrismaClient } = require("@prisma/client");
const { generateSlug } = require("./lib/slug");

const prisma = new PrismaClient();

async function backfillSlugs() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, slug: true },
    where: { role: "DOCTOR" },
  });

  const usedSlugs = new Set();

  for (const user of users) {
    if (user.slug) {
      usedSlugs.add(user.slug);
    }
  }

  let updated = 0;

  for (const user of users) {
    if (user.slug) continue;

    const baseSlug = generateSlug(user.name || user.id) || user.id;
    let slug = baseSlug;
    let counter = 2;

    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    usedSlugs.add(slug);

    await prisma.user.update({
      data: { slug },
      where: { id: user.id },
    });

    console.log(`Updated slug for ${user.name}: ${slug}`);
    updated += 1;
  }

  console.log(`Done. Updated ${updated} doctor(s).`);
}

backfillSlugs()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
