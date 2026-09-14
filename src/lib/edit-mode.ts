import { useEffect, useState } from "react";

/** Modo de edição: só ativo quando a URL contém ?edit=1 */
export function useEditMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      setEnabled(params.get("edit") === "1");
    } catch {
      setEnabled(false);
    }
  }, []);

  return enabled;
}
