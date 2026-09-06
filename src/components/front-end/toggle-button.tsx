export default function ToggleButton({
  label = "Xem tất cả",
}: {
  label?: string;
}) {
  return (
    <button
      className="rounded-full border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 text-sm transition-colors hover:bg-blue-50"
      type="button"
    >
      {label}
    </button>
  );
}
