"use client";

import qs from "query-string";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChannelType } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Price is required.",
    })
    .refine((name) => name !== "general", {
      message: "Price cannot be 'general'",
    }),
});

export const BuyCardModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const { onOpen } = useModal();

  const isModalOpen = isOpen && type === "buyCard";
  const { channel, server } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type || ChannelType.TEXT,
    },
  });

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel.name);
      form.setValue("type", channel.type);
    }
  }, [form, channel]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.patch(url, values);
      
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-stone-800 rounded-[10px] from-[#2e272c] to-[#151415] text-black overflow-hidden p-5">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold"></DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-stone-500 font-sans font-extralight">
                      Price
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <img
                          src="/images/market/Mark-gr.svg"
                          alt="price"
                          className="absolute mx-[10px] w-[20px] h-[20px]"
                        />
                        <Input
                          disabled
                          className="bg-stone-800 border border-white placeholder-white focus-visible:ring-0 focus-visible:ring-offset-0 relative pl-[40px] "
                          placeholder="85"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-stone-500 font-sans font-extralight">Expiration Date</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="text-white">
                        <div className="flex items-center relative">
                          <CalendarIcon className="absolute ml-[10px] text-white" />
                          <SelectTrigger className="bg-neutral-900 border-0 focus:ring-0 text-white ring-offset-0 focus:ring-offset-0 capitalize outline-none relative">
                            <SelectValue placeholder="Select a expiration date" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent >
                        {expirationDates.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="capitalize text-white"
                          >
                            {type.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="primary"
                disabled={isLoading}
                className="w-full my-[30px] bg-cyan-400 text-black"
                onClick={() => onOpen("confirm")}
              >
                Confirm the offer
              </Button>
            </div>
          </form>
        </Form>
        <DialogFooter className="h-[30px]"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const expirationDates = [
  { value: "30 days" },
  { value: "3 months" },
  { value: "6 months" },
  { value: "1 year" },
  { value: "forever" },
];
