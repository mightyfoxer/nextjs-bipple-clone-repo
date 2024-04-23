"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";


export const Confirm = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "confirm";



  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-tr rounded-2xl from-[#2e272c] to-[#151415] text-black overflow-hidden flex flex-col gap-10">
        <p className="text-white text-center text-[20px]">Are you sure you want to buy <br />Claynosaur#2341 for 225 SOL?</p>
        <div className="flex justify-around">
          <Button
            className="text-red-700 w-2/5 bg-stone-900"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="text-white w-2/5 bg-stone-900"
            onClick={() => onOpen("confirm")}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
