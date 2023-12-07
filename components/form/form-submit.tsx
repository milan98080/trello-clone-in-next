"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "default"
    | "outline"
    | "destructive"
    | "ghost"
    | "link";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "primary",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      className={cn(className)}
      variant={variant}
      size="sm"
    >
      {children}
    </Button>
  );
};
