export default function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-2xl text-gray-900">{title}</h2>
    </div>
  );
}
