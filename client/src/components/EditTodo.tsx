import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.tsx";
import { Label } from "./ui/label.tsx";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const EditTodo = ({
  title,
  id,
  handleUpdate,
}: {
  title: string;
  id: string;
  handleUpdate: (formData: any) => Promise<void>;
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [open, setOpen] = useState(false);

  const onSubmit = async (formData: any) => {
    try {
      await handleUpdate(formData);
      setOpen(false);
    } catch {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <FaEdit className='iconHover' />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form action={onSubmit} className='flex flex-col gap-2'>
          <input type='hidden' value={id} name='id' />
          <Label htmlFor='title'>Previous Todo</Label>
          <Input
            id='title'
            name='title'
            value={updatedTitle}
            onChange={(e: any) => setUpdatedTitle(e.target.value)}
            className='col-span-3'
          />
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodo;
