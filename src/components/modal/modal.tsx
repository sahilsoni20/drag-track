import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence} from 'framer-motion'

interface ModalProps {
  showModal: boolean;
  containerClass?: string;
  children: React.ReactNode;
  setShowModal: (value: boolean) => void;
}

const Modal = ({
  showModal,
  containerClass,
  children,
  setShowModal,
}: ModalProps) => {
  const desktopModalRef = useRef(null);
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])

  return (
    <AnimatePresence>
        {showModal && (
            <>
                
            </>
        )}
    </AnimatePresence>
  );
};

export default Modal;
