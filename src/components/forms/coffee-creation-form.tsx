import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCoffee } from "@/react-query/hooks/coffee/use-create-coffee";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "@/shadcn/ui/field";
import { Input } from "@/shadcn/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import z from "zod";

const CoffeeCreationFormSchema = z.object({
  name: z.string(),
  cupInMillilitres: z.string(),
  coffeeInGrams: z.string(),
});

export function CoffeeCreationForm() {
  const createCoffee = useCreateCoffee();

  const form = useForm({
    resolver: zodResolver(CoffeeCreationFormSchema),
    defaultValues: {
      name: "",
      cupInMillilitres: "",
      coffeeInGrams: "",
    },
  });

  async function submitCreateCoffee(
    coffee: z.infer<typeof CoffeeCreationFormSchema>
  ) {
    try {
      const created = await createCoffee.mutateAsync({
        coffee: {
          name: coffee.name,
          cupInMillilitres: Number(coffee.cupInMillilitres),
          coffeeInGrams: Number(coffee.coffeeInGrams),
        },
      });
      toast.success(`Coffee ${created.name} added`);
      form.reset();
    } catch {
      toast.error(`Error creating coffee`);
    }
  }

  return (
    <Dialog>
      <form
        id="coffee-creation-form"
        onSubmit={form.handleSubmit(submitCreateCoffee)}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Add Coffee</Button>
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
            <Controller
              control={form.control}
              name="coffeeInGrams"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Coffee in grams per cup</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />
            <Button type="submit" form="coffee-creation-form">
              Add
            </Button>
          </FieldGroup>
        </DialogContent>
      </form>
    </Dialog>
  );
}
