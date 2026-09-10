import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  className?: string;
  href?: string;
  icon?: React.ReactNode;
  title: string;
}

export default function CustomButton({
  title,
  icon,
  href,
  className = "",
}: CustomButtonProps) {
  const baseClassName = `rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`;

  if (href) {
    return (
      <Link href={href}>
        <Button className={baseClassName} variant="default">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </Button>
      </Link>
    );
  }

  return (
    <Button className={baseClassName} variant="default">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </Button>
  );
}
