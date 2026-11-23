/** Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com> */
import { useEffect, useRef, useState } from 'react';

// Only one Blend loading logo is on screen at a time. The first loading view that wants to show takes the
// turn; the others wait and show when it lets go. This stops two logos appearing together (a loading modal
// and the editor's own start logo, for example).
let activeOwner: symbol | null = null;
const listeners = new Set<() => void>();

function setActiveOwner(next: symbol | null): void {
  if (activeOwner === next) return;
  activeOwner = next;
  listeners.forEach((listen) => listen());
}

/** True when this loading view may show its logo right now. */
export function useLoadingLogoTurn(wantsToShow: boolean): boolean {
  const idRef = useRef<symbol>(Symbol('loading-logo'));
  const [owner, setOwner] = useState<symbol | null>(activeOwner);

  useEffect(() => {
    const listen = () => setOwner(activeOwner);
    listeners.add(listen);
    listen();
    return () => {
      listeners.delete(listen);
    };
  }, []);

  useEffect(() => {
    if (wantsToShow && (activeOwner === null || activeOwner === idRef.current)) {
      setActiveOwner(idRef.current);
    } else if (!wantsToShow && activeOwner === idRef.current) {
      setActiveOwner(null);
    }
  }, [wantsToShow, owner]);

  useEffect(() => () => {
    if (activeOwner === idRef.current) setActiveOwner(null);
  }, []);

  return wantsToShow && owner === idRef.current;
}
