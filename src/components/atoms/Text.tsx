import React, { HtmlHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "p";
type Size = "LT1" | "LT2" | "T1" | "T2" | "T3" | "T4";

type TextProps = {
  as: Variant;
  className?: string;
  styleVariant?: Size;
  children: React.ReactNode;
} & HtmlHTMLAttributes<HTMLElement>;

const DEFAULT_CLASSNAMES = `font-poppins text-base dark:text-base-dark`;

const variantStyles: Record<Variant, string> = {
  h1: "",
  p: "",
};

const styleVariants: Record<Size, string> = {
  LT1: "text-2xl font-medium",
  LT2: "text-2xl font-medium",
  T1: "text-lg",
  T2: "text-base",
  T3: "text-sm",
  T4: "text-xs",
};

const Typography: React.FC<TextProps> = ({
  as: Tag,
  className,
  styleVariant,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        DEFAULT_CLASSNAMES,
        variantStyles[Tag],
        styleVariant ? styleVariants[styleVariant] : "",
        className
      )}
      {...props}
    ></Tag>
  );
};

export default Typography;
