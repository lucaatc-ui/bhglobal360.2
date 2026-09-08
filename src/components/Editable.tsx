import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Pencil,
  Check,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const STORAGE_KEY = "landing-copy-v1";

type Align = "left" | "center" | "right";
type Entry = { text?: string; align?: Align };
type Values = Record<string, Entry>;

type EditCtx = {
  editing: boolean;
  get: (id: string) => Entry | undefined;
  setText: (id: string, value: string) => void;
  setAlign: (id: string, align: Align) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const Ctx = createContext<EditCtx>({
  editing: false,
  get: () => undefined,
  setText: () => {},
  setAlign: () => {},
  activeId: null,
  setActiveId: () => {},
});

function normalize(raw: unknown): Values {
  const out: Values = {};
  if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === "string") out[k] = { text: v };
      else if (v && typeof v === "object") out[k] = v as Entry;
    }
  }
  return out;
}

export function EditProvider({ children }: { children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState<Values>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValues(normalize(JSON.parse(raw)));
    } catch {
      /* ignore */
    }
  }, []);

  const patch = useCallback((id: string, part: Entry) => {
    setValues((prev) => {
      const next = { ...prev, [id]: { ...prev[id], ...part } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setText = useCallback(
    (id: string, value: string) => patch(id, { text: value }),
    [patch],
  );
  const setAlign = useCallback(
    (id: string, align: Align) => patch(id, { align }),
    [patch],
  );
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

  const alignBtns: { a: Align; icon: typeof AlignLeft; label: string }[] = [
    { a: "left", icon: AlignLeft, label: "Alinhar à esquerda" },
    { a: "center", icon: AlignCenter, label: "Centralizar" },
    { a: "right", icon: AlignRight, label: "Alinhar à direita" },
  ];

  return (
    <Ctx.Provider
      value={{ editing, get, setText, setAlign, activeId, setActiveId }}
    >
      {children}

      {editing && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background/95 px-2 py-2 shadow-xl backdrop-blur print:hidden">
          {alignBtns.map(({ a, icon: Icon, label }) => {
            const active = activeId ? get(activeId)?.align === a : false;
            return (
              <button
                key={a}
                type="button"
                title={label}
                aria-label={label}
                disabled={!activeId}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => activeId && setAlign(activeId, a)}
                className={`rounded-full p-2 transition-colors disabled:opacity-40 ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
          <span className="px-2 text-xs text-muted-foreground">
            {activeId
              ? "Enter cria um novo parágrafo"
              : "Clique num texto para alinhar"}
          </span>
        </div>
      )}

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
          onClick={() => {
            setEditing((v) => !v);
            setActiveId(null);
          }}
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

/** Texto clicável e editável, com alinhamento e parágrafos, salvo no navegador. */
export function Ed({ id, children, as = "span", className }: EdProps) {
  const { editing, get, setText, activeId, setActiveId } = useContext(Ctx);
  const ref = useRef<HTMLElement>(null);
  const entry = get(id);
  const value = entry?.text ?? children;
  const align = entry?.align;

  useEffect(() => {
    const el = ref.current;
    if (el && el.innerText !== value && document.activeElement !== el) {
      el.textContent = value;
    }
  }, [value]);

  const Tag = as as "span";
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : align === "left"
          ? "text-left"
          : "";

  return (
    <Tag
      ref={ref as never}
      className={[
        className,
        alignClass,
        "whitespace-pre-line",
        as !== "span" || align ? "block" : "",
        editing
          ? "cursor-text rounded-sm outline-2 outline-offset-2 outline-dashed outline-primary/50 focus:outline-solid focus:outline-primary"
          : "",
        editing && activeId === id ? "outline-solid outline-primary" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      contentEditable={editing}
      suppressContentEditableWarning
      spellCheck={false}
      onFocus={() => setActiveId(id)}
      onClick={() => editing && setActiveId(id)}
      onBlur={(e) => setText(id, e.currentTarget.innerText ?? "")}
      onKeyDown={(e) => {
        if (e.key === "Escape") (e.currentTarget as HTMLElement).blur();
        if (e.key === "Enter") {
          // permite parágrafos: quebra de linha simples
          e.preventDefault();
          document.execCommand("insertLineBreak");
        }
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
      style={align ? { textAlign: align } : undefined}
      data-align={align}
    >
      {value}
    </Tag>
  );
}
