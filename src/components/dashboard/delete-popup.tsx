"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeletePopupProps {
  handleDelete: (id: string) => Promise<void>;
  id: string;
  title: string;
}

export default function DeletePopup({
  title,
  id,
  handleDelete,
}: DeletePopupProps) {
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    await handleDelete(id);
    setOpen(false);
  };

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger
        render={
          <Button size="icon-sm" type="button" variant="destructive">
            <Trash2 />
          </Button>
        }
      />
      <AlertDialogContent className="w-[calc(100%-1rem)] max-w-xs sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
          <AlertDialogDescription className="break-words">
            Hành động này không thể hoàn tác. &quot;{title}&quot; sẽ bị xóa vĩnh
            viễn khỏi hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-full sm:w-auto" type="button">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-full sm:w-auto"
            onClick={onDelete}
            type="button"
          >
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
