"use client";
import { createContext, useState, useContext, cloneElement } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [current, setCurrent] = useState(null);

  return (
    <ModalContext.Provider value={{ current, setCurrent }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, openName }) {
  const { setCurrent } = useContext(ModalContext);

  return <button onClick={() => setCurrent(openName)}>{children}</button>;
}

function Window({ children, windowName, title, showClose }) {
  const { current, setCurrent } = useContext(ModalContext);

  if (current !== windowName) return null;

  const closeModal = () => setCurrent(null);

  // --- هنا بنضيف props للـ children
  const clonedChildren = cloneElement(children, { closeModal });

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/70 z-[999]" onClick={closeModal} />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                      bg-white shadow-lg rounded-xl p-[12px]  z-[1000] w-[90%] max-w-[600px]"
      >
        <div className="flex justify-between items-center bg-teal-800 rounded-md p-5">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {showClose && (
            <button onClick={closeModal} className="bg-white p-1 rounded-md">
              <X className="text-red-500" />
            </button>
          )}
        </div>

        <div className="mt-[20px]">{clonedChildren}</div>
      </div>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

//  <Modal>
//   <Modal.Open openName="OK">
//     <Button For="submit">OPEN</Button>
//   </Modal.Open>

//   <Modal.Window windowName="OK" title="Title">
//     <div>محتوى المودال</div>
//   </Modal.Window>
// </Modal>
