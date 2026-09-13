export default function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-extrabold text-4xl text-gray-900 dark:text-white">
        {title}
      </h1>
    </div>
  );
}
