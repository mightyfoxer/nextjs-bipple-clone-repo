"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import { ImSpinner11 } from "react-icons/im";
import { Member, Message, Profile } from "@prisma/client";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { currentProfile } from "@/lib/current-profile";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const content = form.watch("content");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                    className="absolute  top-[22px] cursor-pointer hover:opacity-80 left-6 h-[40px] w-[40px] transition rounded-full p-1 flex items-center justify-center"
                  >
                    <FiPlusCircle size={"24"} />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="py-6 rounded-xl bg-transparent border-2 border-[#283643] px-14 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/20"
                    placeholder={`Write a message...`}
                    {...field}
                  />
                  <div className="absolute flex items-center gap-5 top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                    {isLoading ? (
                      <>
                        <div className="transition delay-75 cursor-not-allowed animate-pulse text-white/70">
                          <IoSend size="24" />
                        </div>
                      </>
                    ) : (
                      <>
                        {content && content.trim() !== "" ? (
                          <div
                            onClick={form.handleSubmit(onSubmit)}
                            className="transition delay-75 cursor-pointer hover:opacity-80 "
                          >
                            <IoSend size="24" />
                          </div>
                        ) : (
                          <div className="transition delay-75 cursor-not-allowed text-white/10">
                            <IoSend size="24" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div></div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
