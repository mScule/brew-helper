import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBrewer } from "@/react-query/hooks/brewer/use-create-brewer";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "@/shadcn/ui/field";
import { Input } from "@/shadcn/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import z from "zod";

const BrewerCreationFormSchema = z.object({
  name: z.string(),
  cupInMillilitres: z.string(),
});

export function BrewerCreationForm() {
  const createBrewer = useCreateBrewer();

  const form = useForm({
    resolver: zodResolver(BrewerCreationFormSchema),
    defaultValues: {
      name: "",
      cupInMillilitres: "",
    },
  });

  async function submitCreateBrewer(
    brewer: z.infer<typeof BrewerCreationFormSchema>
  ) {
    try {
      const created = await createBrewer.mutateAsync({
        brewer: {
          name: brewer.name,
          cupInMillilitres: Number(brewer.cupInMillilitres),
        },
      });
      toast.success(`Brewer ${created.name} added`);
      form.reset();
    } catch {
      toast.error(`Error creating brewer`);
    }
  }

  return (
    <Dialog>
      <form
        id="brewer-creation-form"
        onSubmit={form.handleSubmit(submitCreateBrewer)}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Add brewer</Button>
        </DialogTrigger>
        <DialogContent>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="cupInMillilitres"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Cup size in millilitres</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />
            <Button type="submit" form="brewer-creation-form">
              Add
            </Button>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  );
}
