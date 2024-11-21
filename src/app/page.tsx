"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const frameworksList = [
  {
    value: "AbbVie - ABBV500 - Phase 2 Liver Cancer - M24-600",
    label: "AbbVie - ABBV500 - Phase 2 Liver Cancer - M24-600",
    icon: Icons.dog,
  },
  {
    value: "AbbVie - ABBV500 - Phase 2 Liver Cancer Master Protocol - M24-601",
    label: "AbbVie - ABBV500 - Phase 2 Liver Cancer Master Protocol - M24-601",
    icon: Icons.cat,
  },
  {
    value: "AbbVie - ABBV500 - Phase 2/3 Breast Cancer - M25-300",
    label: "AbbVie - ABBV500 - Phase 2/3 Breast Cancer - M25-300",
    icon: Icons.turtle,
  },
  {
    value: "AbbVie - Phase 3 Depression - 3112-302-002",
    label: "AbbVie - Phase 3 Depression - 3112-302-002",
    icon: Icons.turtle,
  },
  {
    value: "Amgen - Phase 3 NSCLC - 20190400 (CODEBREAK-203)",
    label: "Amgen - Phase 3 NSCLC - 20190400 (CODEBREAK-203)",
    icon: Icons.turtle,
  },
  {
    value: "Amgen - Phase 3 SCLC - 20230020",
    label: "Amgen - Phase 3 SCLC - 20230020",
    icon: Icons.turtle,
  },
  {
    value: "AstraZeneca - Phase 3 Asthma - D9180C00020 (MIRACLE)",
    label: "AstraZeneca - Phase 3 Asthma - D9180C00020 (MIRACLE)",
    icon: Icons.turtle,
  },
  {
    value: "AstraZeneca - Phase 3 Heart Disease - D6402C00020 (BalanceH)",
    label: "AstraZeneca - Phase 3 Heart Disease - D6402C00020 (BalanceH)",
    icon: Icons.turtle,
  },
  {
    value: "Biogen - Phase 3 Lupus - 230LE305/306 (TOPAZ2)",
    label: "Biogen - Phase 3 Lupus - 230LE305/306 (TOPAZ2)",
    icon: Icons.rabbit,
  },
  {
    value: "d0e1f2a3-b4c5-6789-3456-012345678901",
    label:
      "Eli Lilly - LILLYBDL - Phase 3 Cardiovascular Outcomes and Renal Function in Adults Living with Diabetes - J1I-MC-GZBP",
    icon: Icons.fish,
  },
  {
    value: "Eli Lilly - Phase 3 NSCLC - J3M-MC-JZQC",
    label: "Eli Lilly - Phase 3 NSCLC - J3M-MC-JZQC",
    icon: Icons.dog,
  },
  {
    value: "Eli Lilly - Phase 3 Rheumatoid Arthritis - I1F-MC-RHDC",
    label: "Eli Lilly - Phase 3 Rheumatoid Arthritis - I1F-MC-RHDC",
    icon: Icons.cat,
  },
  {
    value: "EMD Serono - Phase 3 Multiple Sclerosis - MS700570",
    label: "EMD Serono - Phase 3 Multiple Sclerosis - MS700570",
    icon: Icons.turtle,
  },
  {
    value: "GSK - Phase 3 - Pediatric Measles Vaccine - 214003",
    label: "GSK - Phase 3 - Pediatric Measles Vaccine - 214003",
    icon: Icons.turtle,
  },
  {
    value: "GSK - Phase 3 mRNA combo",
    label: "GSK - Phase 3 mRNA combo",
    icon: Icons.turtle,
  },
  {
    value: "GSK - Phase 3 mRNA Flu - FLU SV MRNA-007 -218131",
    label: "GSK - Phase 3 mRNA Flu - FLU SV MRNA-007 -218131",
    icon: Icons.turtle,
  },
  {
    value: "e7f8a9b0-c1d2-3456-0123-789012345678",
    label:
      "Pfizer - Phase 3 Relapsed/Refractory Leukemia - C1071033 (MagnetisMM-33)",
    icon: Icons.turtle,
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
                      variant="secondary"
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
