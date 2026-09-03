import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Pencil, Check, RotateCcw } from "lucide-react";

const STORAGE_KEY = "landing-copy-v1";

type EditCtx = {
  editing: boolean;
  get: (id: string) => string | undefined;
  set: (id: string, value: string) => void;
};

const Ctx = createContext<EditCtx>({
  editing: false,
  get: () => undefined,
  set: () => {},
});

export function EditProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues(JSON.parse(raw) as Record<string, string>);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const set = useCallback((id: string, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [id]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const get = useCallback((id: string) => values[id], [values]);

  const reset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setValues({});
    setEditing(false);
    if (typeof window !== "undefined") window.location.reload();
  };

  return (
    <Ctx.Provider value={{ editing, get, set }}>
      {ready ? children : children}
      <div className="fixed right-5 bottom-5 z-50 flex items-center gap-2 print:hidden">
        {editing && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2.5 text-xs font-semibold text-muted-foreground shadow-lg backdrop-blur transition-colors hover:bg-secondary"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restaurar textos
          </button>
        )}
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="font-display inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-xl transition-transform hover:scale-105"
        >
          {editing ? (
            <>
              <Check className="h-4 w-4" />
              Concluir edição
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4" />
              Editar textos
            </>
          )}
        </button>
      </div>
    </Ctx.Provider>
  );
}

type EdProps = {
  id: string;
  children: string;
  as?: "span" | "p" | "div";
  className?: string;
};

/** Texto clicável e editável, persistido no navegador. */
export function Ed({ id, children, as = "span", className }: EdProps) {
  const { editing, get, set } = useContext(Ctx);
  const ref = useRef<HTMLElement>(null);
  const stored = get(id);
  const value = stored ?? children;

  // Mantém o DOM sincronizado sem quebrar o cursor durante a digitação.
  useEffect(() => {
    const el = ref.current;
    if (el && el.textContent !== value && document.activeElement !== el) {
      el.textContent = value;
    }
  }, [value]);

  const Tag = as as "span";

  return (
    <Tag
      ref={ref as never}
      className={[
        className,
        editing
          ? "cursor-text rounded-sm outline-2 outline-offset-2 outline-dashed outline-primary/50 focus:outline-solid focus:outline-primary"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) => set(id, e.currentTarget.textContent ?? "")}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}
