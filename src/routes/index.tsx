import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  
  Mic2,
  Ticket,
  Sun,
  Coffee,
  Beer,
  Check,
  Clock,
  Camera,
} from "lucide-react";
import { useRef, useState } from "react";

import { Ed, EditProvider } from "@/components/Editable";
import adlerPhoto from "@/assets/adler-martins.jpg.asset.json";
import anaPhoto from "@/assets/ana-freitas.jpg.asset.json";
import brunoPhoto from "@/assets/bruno-vasconcelos.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizonte Global Summit 2026 — Ingressos" },
      {
        name: "description",
        content:
          "Um dia inteiro de imersão com líderes e inovadores em Belo Horizonte, MG. Brunch completo, happy hour com chopp artesanal e apenas 70 ingressos. Garanta o seu.",
      },
      { property: "og:title", content: "Horizonte Global Summit 2026" },
      {
        property: "og:description",
        content:
          "Um dia inteiro de imersão em Belo Horizonte, MG. Apenas 70 ingressos disponíveis — garanta o seu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});


function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-24 text-center">
        <div className="flex flex-col items-center text-center">


          <h1 className="font-display mt-8 text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
            <Ed id="hero.title1">
              O poder de levar sua família e patrimônio para fora do Brasil é
              crucial nos tempos de hoje.
            </Ed>
          </h1>

          <Ed
            as="p"
            id="hero.sub"
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Participe de um dos primeiros eventos em Belo Horizonte sobre
            holdings, offshores, acesso aos melhores bancos do exterior, vistos
            e passaportes com profissionais renomados para tirar suas dúvidas.
          </Ed>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" />
              <Ed id="hero.date">10 de outubro de 2026</Ed>
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              <Ed id="hero.place">Belo Horizonte · MG</Ed>
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#ingressos"
              className="animate-pulse-ring font-display inline-flex items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-cta-foreground transition-transform hover:scale-105"
            >
              <Ed id="hero.cta1">Garantir meu ingresso</Ed>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <Ed id="hero.cta2">Conhecer o evento</Ed>
            </a>
          </div>

          <Ed as="p" id="hero.note" className="mt-5 text-xs text-muted-foreground">
            Lote 1 disponível · Apenas 70 ingressos
          </Ed>
        </div>

      </div>
    </section>
  );
}

const stats = [
  { id: "s1", icon: Ticket, value: "70", label: "ingressos disponíveis" },
  { id: "s2", icon: Mic2, value: "3", label: "palestrantes especiais" },
  { id: "s3", icon: Sun, value: "1", label: "dia inteiro de imersão" },
  { id: "s4", icon: Coffee, value: "Brunch", label: "completo incluso" },
  { id: "s5", icon: Beer, value: "Happy Hour", label: "com chopp artesanal" },
];

function StatsBar() {
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.id} className="flex flex-col items-center text-center">
            <s.icon className="mb-3 h-6 w-6 text-gold" />
            <Ed
              id={`stats.${s.id}.value`}
              className="font-display text-3xl font-extrabold sm:text-4xl"
            >
              {s.value}
            </Ed>
            <Ed
              id={`stats.${s.id}.label`}
              className="mt-1 text-sm text-muted-foreground"
            >
              {s.label}
            </Ed>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <Ed
        as="p"
        id="about.eyebrow"
        className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase"
      >
        Sobre o evento
      </Ed>
      <h2 className="font-display mt-4 text-4xl font-extrabold text-balance text-highlight sm:text-5xl">
        <Ed id="about.title">
          A Reforma Tributária aconteceu e não é um novo governo que vai
          resolver os problemas que ela gerou.
        </Ed>
      </h2>
      <Ed
        as="p"
        id="about.body"
        className="mt-6 text-lg leading-relaxed text-muted-foreground"
      >
        {
          "A inflação continuará crescendo, as empresas pagarão mais impostos e o rombo que o atual governo fez continuará aí…\n\n\nMas é possível com estratégia e inteligência se proteger do Brasil.\n\n\nSeja através da internacionalização de patrimônio, enviando para os bancos mais antigos e seguros do mundo.\n\nComo também se preparando para se mudar daqui com os melhores vistos e passaportes existentes.\n\nO Brasil não é e não será seguro politicamente e economicamente.\n\nOs inteligentes estarão preparados para o pior com a estratégia pronta. Já com grande parte do patrimônio lá fora longe da inflação e com segurança jurídica."
        }
      </Ed>
    </section>
  );
}

const agenda = [
  { id: "a1", time: "09h00", title: "Credenciamento e brunch completo de boas-vindas" },
  { id: "a2", time: "11h30", title: "Abertura: O que o Brasil se tornou na economia mundial de hoje?" },
  { id: "a3", time: "12h00", title: "Ana Freitas — Mobilidade Global: a estratégia que conecta patrimônio, negócios e liberdade internacional" },
  { id: "a4", time: "13h00", title: "Tira dúvidas sobre a palestra Mobilidade Global." },
  { id: "a5", time: "13h40", title: "Pausa de 20 minutos" },
  { id: "a6", time: "14h00", title: "Adler Martins - As novas estratégias de proteção de patrimonial para empresários e famílias - Imposto de Dividendos, Exportações, Contas Bancárias Estrangeiras" },
  { id: "a7", time: "15h00", title: "Tira dúvidas com Adler Martins" },
  { id: "a8", time: "16h00", title: "Happy Hour com chopp artesanal e acesso aos palestrantes" },
];

function Agenda() {
  return (
    <section id="cronograma" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Ed
            as="p"
            id="agenda.eyebrow"
            className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase"
          >
            Cronograma
          </Ed>
          <h2 className="font-display mt-4 text-4xl font-extrabold text-highlight sm:text-5xl">
            <Ed id="agenda.title">Um dia, uma jornada completa</Ed>
          </h2>
          <Ed as="p" id="agenda.sub" className="mt-4 text-muted-foreground">
            10 de outubro de 2026 · Belo Horizonte, MG · Programação sujeita a ajustes
          </Ed>
        </div>

        <ul className="mt-14 space-y-5">
          {agenda.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-5 rounded-2xl border border-border bg-card/60 px-6 py-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
                <Clock className="h-3 w-3" />
                <Ed
                  id={`agenda.${item.id}.time`}
                  className="min-w-[3.5rem] text-center"
                >
                  {item.time}
                </Ed>
              </span>
              <Ed
                as="div"
                id={`agenda.${item.id}.title`}
                className="min-w-0 flex-1 text-sm text-muted-foreground sm:text-base"
              >
                {item.title}
              </Ed>
            </li>

          ))}
        </ul>
      </div>
    </section>
  );
}

const speakers = [
  {
    id: "adler",
    name: "Adler Martins",
    role: "Palestrante especial",
    topic: "Keynote",
    photo: adlerPhoto.url,
...
    id: "bruno",
    name: "Bruno Vasconcelos",
    role: "Palestrante especial",
    topic: "Keynote",
    bio: "",
    photo: brunoPhoto.url,
  },
];

type SpeakerPhotoData = {
  src: string;
  zoom: number;
  pos: { x: number; y: number };
};

function loadPhoto(id: string): SpeakerPhotoData | null {
  try {
    const raw = localStorage.getItem(`speaker-photo-${id}`);
    return raw ? (JSON.parse(raw) as SpeakerPhotoData) : null;
  } catch {
    return null;
  }
}

function persistPhoto(id: string, data: SpeakerPhotoData | null) {
  try {
    if (data) localStorage.setItem(`speaker-photo-${id}`, JSON.stringify(data));
    else localStorage.removeItem(`speaker-photo-${id}`);
  } catch {
    /* armazenamento cheio — ignora */
  }
}

/** Reduz a imagem para caber no armazenamento do navegador. */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 900;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function SpeakerCard({ speaker }: { speaker: (typeof speakers)[number] }) {
  const [initialPhoto] = useState<SpeakerPhotoData | null>(() =>
    loadPhoto(speaker.id),
  );
  const [photo, setPhoto] = useState<string | null>(initialPhoto?.src ?? null);
  const [zoom, setZoom] = useState(initialPhoto?.zoom ?? 1);
  const [pos, setPos] = useState(initialPhoto?.pos ?? { x: 50, y: 50 });
  const [adjusting, setAdjusting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const saveTimer = useRef<number | null>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(
    null,
  );

  const scheduleSave = (src: string, z: number, p: { x: number; y: number }) => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(
      () => persistPhoto(speaker.id, { src, zoom: z, pos: p }),
      300,
    );
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    void fileToDataUrl(file).then((dataUrl) => {
      const z = 1;
      const p = { x: 50, y: 50 };
      setPhoto(dataUrl);
      setZoom(z);
      setPos(p);
      setAdjusting(true);
      persistPhoto(speaker.id, { src: dataUrl, zoom: z, pos: p });
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!adjusting) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = d.px - ((e.clientX - d.x) / rect.width) * 100;
    const ny = d.py - ((e.clientY - d.y) / rect.height) * 100;
    const p = {
      x: Math.min(100, Math.max(0, nx)),
      y: Math.min(100, Math.max(0, ny)),
    };
    setPos(p);
    if (photo) scheduleSave(photo, zoom, p);
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card/60 transition-transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {photo ? (
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`aspect-square w-full bg-surface ${adjusting ? "cursor-grab active:cursor-grabbing" : ""}`}
            style={{
              backgroundImage: `url(${photo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoom * 100}%`,
              backgroundPosition: `${pos.x}% ${pos.y}%`,
            }}
            role="img"
            aria-label={`Foto de ${speaker.name}`}
          />
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square w-full flex-col items-center justify-center gap-3 bg-surface/60 text-muted-foreground transition-colors hover:bg-surface"
            aria-label={`Selecionar foto de ${speaker.name}`}
          >
            <Camera className="h-10 w-10 text-gold" />
            <span className="text-sm font-semibold text-foreground">
              Selecionar foto
            </span>
            <span className="text-xs">
              Clique para enviar a foto de {speaker.name.split(" ")[0]}
            </span>
          </button>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          <Ed id={`speakers.${speaker.id}.topic`}>{speaker.topic}</Ed>
        </span>
        {photo && (
          <div className="absolute right-3 bottom-3 flex gap-2">
            <button
              type="button"
              onClick={() => setAdjusting((v) => !v)}
              className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-secondary"
            >
              {adjusting ? "Concluir" : "Ajustar foto"}
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-secondary"
            >
              Trocar foto
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {photo && adjusting && (
        <div className="border-t border-border bg-surface/50 px-5 py-4 text-left">
          <p className="text-xs text-muted-foreground">
            Arraste a foto para reposicionar e use o controle para aproximar.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xs font-semibold">Zoom</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => {
                const z = Number(e.target.value);
                setZoom(z);
                if (photo) scheduleSave(photo, z, pos);
              }}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
              aria-label={`Zoom da foto de ${speaker.name}`}
            />
            <button
              type="button"
              onClick={() => {
                const z = 1;
                const p = { x: 50, y: 50 };
                setZoom(z);
                setPos(p);
                if (photo) scheduleSave(photo, z, p);
              }}
              className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-semibold transition-colors hover:bg-secondary"
            >
              Redefinir
            </button>
          </div>
        </div>
      )}
      <div className="p-5 text-center">
        <h3 className="font-display text-xl font-bold">
          <Ed id={`speakers.${speaker.id}.name`}>{speaker.name}</Ed>
        </h3>
        <Ed
          as="p"
          id={`speakers.${speaker.id}.role`}
          className="mt-1 text-sm text-muted-foreground"
        >
          {speaker.role}
        </Ed>
        <Ed
          as="p"
          id={`speakers.${speaker.id}.bio`}
          className="mt-3 text-sm leading-relaxed text-muted-foreground"
        >
          {speaker.bio}
        </Ed>
      </div>
    </article>
  );
}

function Speakers() {
  return (
    <section id="palestrantes" className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <Ed
            as="p"
            id="speakers.eyebrow"
            className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase"
          >
            Palestrantes
          </Ed>
          <h2 className="font-display mt-4 text-4xl font-extrabold text-highlight sm:text-5xl">
            <Ed id="speakers.title">Quem vai subir ao palco</Ed>
          </h2>
          <Ed as="p" id="speakers.sub" className="mt-4 text-muted-foreground">
            Três palestrantes especiais para um dia inesquecível
          </Ed>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl gap-6 sm:grid-cols-2">
          {speakers.map((s) => (
            <SpeakerCard key={s.id} speaker={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

const tickets = [
  {
    id: "l1",
    name: "Lote 1",
    price: "R$ 897",
    features: [
      "Acesso ao dia inteiro",
      "Brunch completo incluso",
      "Happy Hour com chopp artesanal",
      "Certificado digital",
    ],
    highlight: false,
    tag: "Disponível agora",
  },
  {
    id: "l2",
    name: "Lote 2",
    price: "R$ 1.197",
    features: [
      "Acesso ao dia inteiro",
      "Brunch completo incluso",
      "Happy Hour com chopp artesanal",
      "Certificado digital",
    ],
    highlight: true,
    tag: "Em breve",
  },
];

function Tickets() {
  return (
    <section id="ingressos" className="border-t border-border bg-surface/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <Ed
            as="p"
            id="tickets.eyebrow"
            className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase"
          >
            Ingressos
          </Ed>
          <h2 className="font-display mt-4 text-4xl font-extrabold text-highlight sm:text-5xl">
            <Ed id="tickets.title">Apenas 70 ingressos, dois lotes</Ed>
          </h2>
          <Ed as="p" id="tickets.sub" className="mt-4 text-muted-foreground">
            Lote 1 disponível — o preço sobe a cada lote
          </Ed>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className={`relative flex flex-col rounded-3xl border p-8 transition-transform ${
                t.highlight
                  ? "border-border bg-card/40 opacity-60"
                  : "border-border bg-card/60 hover:-translate-y-1"
              }`}
            >
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold ${
                  t.highlight
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <Ed id={`tickets.${t.id}.tag`}>{t.tag}</Ed>
              </span>
              <h3 className="font-display text-xl font-bold">
                <Ed id={`tickets.${t.id}.name`}>{t.name}</Ed>
              </h3>
              <p className="mt-4">
                <Ed
                  id={`tickets.${t.id}.price`}
                  className="font-display text-4xl font-extrabold text-gold"
                >
                  {t.price}
                </Ed>
                <Ed
                  id={`tickets.${t.id}.installments`}
                  className="ml-2 text-sm text-muted-foreground"
                >
                  ou 12× no cartão
                </Ed>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f, i) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <Ed id={`tickets.${t.id}.f${i}`}>{f}</Ed>
                  </li>
                ))}
              </ul>
              {t.highlight ? (
                <span className="font-display mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold bg-muted text-muted-foreground cursor-not-allowed">
                  <Ed id={`tickets.${t.id}.cta`}>Em breve</Ed>
                </span>
              ) : (
                <a
                  href="https://pay.kiwify.com.br/IQiYP8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-105 bg-cta text-cta-foreground"
                >
                  <Ed id={`tickets.${t.id}.cta`}>Comprar agora</Ed>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center text-sm text-muted-foreground">
        <Ed
          as="p"
          id="footer.brand"
          className="font-display font-bold tracking-widest text-foreground uppercase"
        >
          Horizonte Global Summit 2026
        </Ed>
        <Ed as="p" id="footer.rights">
          Belo Horizonte · MG — Todos os direitos reservados
        </Ed>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <EditProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Hero />
        <StatsBar />
        <About />
        <Agenda />
        <Tickets />
        <Speakers />
        <Footer />
      </main>
    </EditProvider>
  );
}
