import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function SessionDeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
}: {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
}) {
  return (
    <Modal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <Modal.Content className="z-999">
        <Modal.Header>
          <VisuallyHidden asChild>
            <Modal.Title>세션을 삭제하시겠습니까?</Modal.Title>
          </VisuallyHidden>
        </Modal.Header>
        <Modal.Description>
          삭제 후에는 되돌릴 수 없어요 정말 삭제하시겠어요?
        </Modal.Description>
        <Modal.Footer>
          <Button variant="neutral" onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </Button>
          <Button onClick={() => setIsDeleteModalOpen(false)}>확인</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
