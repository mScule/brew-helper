import {useState} from "react";
import {toast} from "sonner";
import {Button} from "@/shadcn/ui/button";
import {FieldGroup} from "@/shadcn/ui/field";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shadcn/ui/dialog";
import type {WithId} from "@/types/with-id";
import type {Brewer} from "@/types/brewer";
import {TrashIcon} from "lucide-react";
import {useDeleteBrewer} from "@/react-query/hooks/brewer/use-delete-brewer";
import {TypographyP} from "@/shadcn/typography/typography-p";

type Props = {
  brewer: WithId<Brewer>;
};

export function BrewerDeletionForm({brewer}: Props) {
  const deleteBrewer = useDeleteBrewer();

  const [isOpen, setIsOpen] = useState(false);

  async function submitDeleteBrewer() {
    try {
      await deleteBrewer.mutateAsync({id: brewer.id});
      toast.success(`Brewer ${brewer.name} deleted`);
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
          <DialogTitle>Update {brewer.name}</DialogTitle>
        </DialogHeader>

        <FieldGroup>
          <TypographyP>
            Do you want to delete <b className="text-destructive">{brewer.name}</b> ?
          </TypographyP>
          <Button variant="outline" type="submit" onClick={submitDeleteBrewer}>
            <span>Delete</span>
            <TrashIcon />
          </Button>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
