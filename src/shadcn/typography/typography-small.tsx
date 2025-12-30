import type {PropsWithChildren} from "react";

export function TypographySmall({children}: PropsWithChildren) {
  return <small className="text-xs leading-none font-medium text-muted-foreground">{children}</small>;
}
