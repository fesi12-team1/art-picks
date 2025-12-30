'use client';

import { ChevronLeft } from 'lucide-react';
import CrewCreateForm from '@/components/crew/CrewForm';
import Modal from '@/components/ui/Modal';
import { Crew } from '@/types';

interface CrewModalProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Crew;
}

export default function CrewModal({
  mode,
  open,
  onOpenChange,
  initialData,
}: CrewModalProps) {
  const closeModal = () => onOpenChange(false);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="tablet:w-[484px] tablet:gap-4 tablet:h-fit tablet:overflow-hidden tablet:items-center h-dvh w-full items-start bg-gray-800">
        <Modal.Header className="relative flex items-center justify-center">
          <button
            className="tablet:hidden absolute left-0"
            onClick={closeModal}
          >
            <ChevronLeft aria-label="뒤로 가기" className="size-6 text-white" />
          </button>

          <Modal.Title className="tablet:m-0 ml-7">
            {mode === 'create' ? '크루 생성하기' : '크루 수정하기'}
          </Modal.Title>
        </Modal.Header>

        <Modal.CloseButton
          onClick={closeModal}
          className="tablet:block top-[26px] right-6 hidden"
        />

        <div className="scrollbar-hidden w-full overflow-y-auto px-0.5">
          {open && (
            <CrewCreateForm />
            // <CrewForm
            //   mode={mode}
            //   initialValues={initialData}
            //   onSuccess={closeModal}
            // />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}
