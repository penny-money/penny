import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/design-system/components/ui/sheet';
import { Plus } from 'lucide-react';
import type { FC, PropsWithChildren } from 'react';

interface AppSheetProps {
  description: string;
  title: string;
}

export const AppSheet: FC<PropsWithChildren<AppSheetProps>> = ({
  children,
  description,
  title,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Plus />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="sr-only">{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
