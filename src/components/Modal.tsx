import { ReactNode } from "react";
import { IoCloseCircle } from "react-icons/io5";

function Modal({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: VoidFunction;
  children: ReactNode;
}) {
  const handleOnClose = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (document.getElementById("container") == event.target) {
      onClose();
    }
  };

  if (!visible) return null;
  return (
    <div
      id="container"
      onClick={(e) => handleOnClose(e)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <div className="max-h-[95%] w-[90%] overflow-auto rounded-lg bg-white px-7 py-4 md:w-4/5 xl:w-1/2 xl:px-16 xl:py-7 relative">
        <div
          onClick={onClose}
          className="text-red-500 hover:text-red-700 active:text-red-900 text-3xl absolute right-4 top-4 cursor-pointer z-50"
        >
          <IoCloseCircle />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
