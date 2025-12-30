import {useState} from "react";
import {toast} from "sonner";
import {Button} from "@/shadcn/ui/button";
import {FieldGroup} from "@/shadcn/ui/field";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import type {WithId} from "@/types/with-id";
import {TrashIcon} from "lucide-react";
import {TypographyP} from "@/shadcn/typography/typography-p";
import type {Coffee} from "@/types/coffee";
import {useDeleteCoffee} from "@/react-query/hooks/coffee/use-delete-coffee";

type Props = {
  coffee: WithId<Coffee>;
};

export function CoffeeDeletionForm({coffee}: Props) {
  const deleteCoffee = useDeleteCoffee();

  const [isOpen, setIsOpen] = useState(false);

  async function submitDeleteCoffee() {
    try {
      await deleteCoffee.mutateAsync({id: coffee.id});
      toast.success(`Coffee ${coffee.name} deleted`);
      setIsOpen(false);
    } catch {
      toast.error(`Error creating brewer`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TrashIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update {coffee.name}</DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <TypographyP>
            Do you want to delete <b className="text-destructive">{coffee.name}</b> ?
          </TypographyP>
          <Button variant="outline" type="submit" onClick={submitDeleteCoffee}>
            <span>Delete</span>
            <TrashIcon />
          </Button>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
