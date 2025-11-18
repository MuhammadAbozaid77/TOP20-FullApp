import Modal from "@/ui/Modal";
import AddCategoriesForm from "./AddCategoriesForm";
import Button from "@/ui/Button";

export default function AddCategoriesModal() {
  //=============================================================================

  return (
    <Modal>
      <Modal.Open openName="OK">
        <Button For="normal"> Add Categories </Button>
      </Modal.Open>

      <Modal.Window windowName="OK" title="Add New Category" showClose={false}>
        <AddCategoriesForm />
      </Modal.Window>
    </Modal>
  );
}
