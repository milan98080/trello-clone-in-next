"use client";

import { MoreHorizontal, XIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" px-0 pt-3 pb-3 " side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-500 pb-4 ">
          BoardActions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <XIcon className=" h-3 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          className=" rounded-none w-full h-auto px-5 justify-start font-normal text-sm"
          disabled={isLoading}
        >
          Delete This Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
