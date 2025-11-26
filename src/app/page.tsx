'use client';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Dialog>
        <Dialog.DialogTrigger>Open</Dialog.DialogTrigger>
        <Dialog.DialogContent>
          <Dialog.DialogHeader>
            <Dialog.DialogTitle>Are you absolutely sure?</Dialog.DialogTitle>
            <Dialog.DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </Dialog.DialogDescription>
          </Dialog.DialogHeader>
        </Dialog.DialogContent>
      </Dialog>
    </div>
  );
}
