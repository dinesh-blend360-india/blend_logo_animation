/** Creator: <dinesh_blend360_india> <dinesh.marre@blend360.com> */
// JavaScript version of useLoadingLogoTurn.ts.
// Only one Blend loading logo is on screen at a time. The first loading view that wants to show takes the
// turn; the others wait and show when it lets go. Use it when more than one loading view can be open at once.
import { useEffect, useRef, useState } from "react";

let activeOwner = null;
const listeners = new Set();

function setActiveOwner(next) {
  if (activeOwner === next) return;
  activeOwner = next;
  listeners.forEach((listen) => listen());
}

/** True when this loading view may show its logo right now. */
export function useLoadingLogoTurn(wantsToShow) {
  const idRef = useRef(Symbol("loading-logo"));
  const [owner, setOwner] = useState(activeOwner);

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
