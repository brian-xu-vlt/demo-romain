"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { MultiSelect } from "@/components/multi-select";

const frameworksList = [
  {
    value: "972e5c02-ad62-5a4c-b7e7-d426ceca98da",
    label: "bright_explanation-hefhusi@ilamujaw.tj",
    icon: Icons.dog,
  },
  {
    value: "e1ce425b-09d2-539a-8aab-c38ca8bd553b",
    label: "room_roar-vabitam@hajba.ne",
    icon: Icons.cat,
  },
  {
    value: "e731b280-5db0-5e4f-a321-a368da83ac46",
    label: "like_rise-bonewi@lic.sx",
    icon: Icons.turtle,
  },
  {
    value: "4044634c-71ff-5d8b-ac70-c15de234d4b1",
    label: "distance_rubber-zudevego@giw.kz",
    icon: Icons.turtle,
  },
  {
    value: "61630937-5e2b-58df-a14b-a8672d17f1eb",
    label: "diagram_first-azunih@ruwrus.kg",
    icon: Icons.turtle,
  },
  {
    value: "648e9929-5897-5c97-8139-a966d8fcea4f",
    label: "electricity_combine-jaw@sado.sg",
    icon: Icons.turtle,
  },
  {
    value: "2371a0a8-c723-5554-88c6-f895b9581430",
    label: "red_while-ic@jupococo.rs",
    icon: Icons.turtle,
  },
  {
    value: "22708fbe-9d52-5355-be73-9126b0ebb016",
    label: "bicycle_success-lagik@ejfodid.pa",
    icon: Icons.turtle,
  },
  {
    value: "9aa44acf-2691-5a18-8a9e-44ba69ef5bd0",
    label: "size_package-irjuli@ibpi.za",
    icon: Icons.turtle,
  },
  {
    value: "5f3ac954-b24e-56ee-a901-779de5dd14c3",
    label: "crew_strange-evius@ni.im",
    icon: Icons.turtle,
  },
  {
    value: "d7ace5ba-18f7-549a-9585-248ad28aed04",
    label: "very_declared-azfesuj@row.gb",
    icon: Icons.turtle,
  },
  {
    value: "e6f6c3e0-afba-5867-8df7-91eac86a6963",
    label: "instrument_habit-ucnepek@bonoima.kr",
    icon: Icons.turtle,
  },
  {
    value: "e3e6e9ae-d66c-55f1-a298-6682b6082565",
    label: "voyage_writer-sozuvun@job.gb",
    icon: Icons.rabbit,
  },
  {
    value: "196c5a3f-fd8c-5e9f-b4f5-b5647d0b3450",
    label: "breath_replace-ukpud@zuf.ye",
    icon: Icons.fish,
  },
  {
    value: "856bca5d-698d-561b-b757-051ad0a58fc7",
    label: "congress_along-mecipev@geavik.lt",
    icon: Icons.dog,
  },
  {
    value: "714f9fdd-76fc-587b-a271-f2a84775a079",
    label: "blood_were-ako@vohpejej.dk",
    icon: Icons.cat,
  },
  {
    value: "7d5d814c-f645-58c5-b7c9-19ad6225813a",
    label: "log_number-iw@buro.org",
    icon: Icons.turtle,
  },
  {
    value: "cb5abc2e-2f8b-527b-b792-5ac17e3e8983",
    label: "principle_term-kap@lesil.hr",
    icon: Icons.turtle,
  },
  {
    value: "ddbee05c-6021-5b3d-a085-e8cfbf3a45ed",
    label: "noted_serve-vitu@tinka.cf",
    icon: Icons.turtle,
  },
  {
    value: "88dd1106-edd7-5acf-a224-68c444dd8bdb",
    label: "slave_public-hiud@dogpeka.tr",
    icon: Icons.turtle,
  },
  {
    value: "e3381817-f7c7-54ca-9b60-2bc89089b6e5",
    label: "current_feet-tig@devcosju.eu",
    icon: Icons.turtle,
  },
  {
    value: "35003019-0c0a-5986-8d14-5b31815fb63d",
    label: "because_habit-ber@ruahmu.md",
    icon: Icons.turtle,
  },
  {
    value: "e1ca7262-f745-504a-9aee-14dfb141d265",
    label: "slight_led-zictuj@juhpid.mz",
    icon: Icons.turtle,
  },
  {
    value: "f5b9c33a-be89-55fc-a15c-568be20b6d3a",
    label: "choose_underline-puhsi@mibpabohi.cg",
    icon: Icons.turtle,
  },
  {
    value: "ff1c2ed7-9297-5ecb-ac2f-4bebe7e53505",
    label: "thank_sail-danco@mowvec.cv",
    icon: Icons.turtle,
  },
  {
    value: "51992671-c92d-5617-8ab4-e3398f8160b4",
    label: "scientist_clay-usukom@mulzoisu.ar",
    icon: Icons.turtle,
  },
  {
    value: "c074627b-71d7-5bcc-a182-d3267b3ffc71",
    label: "volume_liquid-bees@mozehke.sv",
    icon: Icons.rabbit,
  },
  {
    value: "37c1090c-69a6-554e-812d-e4b93568bfcf",
    label: "division_fish-howoj@je.sc",
    icon: Icons.fish,
  },
];

const FormSchema = z.object({
  frameworks: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one framework."),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(
      `You have selected following frameworks: ${data.frameworks.join(", ")}.`
    );
  }

  return (
    <main className="flex min-h-screen:calc(100vh - 3rem) flex-col items-center justify-start space-y-3 p-3">
      <PageHeader>
        <PageHeaderHeading>Multi select component</PageHeaderHeading>
        <PageHeaderDescription>assembled with shadcn/ui</PageHeaderDescription>
        <PageActions>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://github.com/sersavan/shadcn-multi-select-component"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
      </PageHeader>
      <Card className="w-full max-w-5xl p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="frameworks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frameworks</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={frameworksList}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      // animation={1}
                      maxCount={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the frameworks you are interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="default" type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
