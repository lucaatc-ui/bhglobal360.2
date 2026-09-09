import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  ImagePlus,
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
import { Globe } from "@/components/Globe";
import { Ed, EditProvider } from "@/components/Editable";

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

/* ------------------------------------------------------------------ */
/* Espaço estratégico para a logo — troque o conteúdo deste componente */
/* pela imagem da sua logo (ex.: <img src={logo} alt="Logo" />)        */
/* ------------------------------------------------------------------ */
function LogoSlot() {
  return (
    <div className="animate-float-slow inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gold/50 bg-surface/60 px-10 py-5 backdrop-blur-sm">
      <ImagePlus className="h-6 w-6 text-gold" />
      <div className="text-left">
        <Ed
          as="p"
          id="logo.title"
          className="font-display text-sm font-bold tracking-widest text-gold uppercase"
        >
          Sua logo aqui
        </Ed>
        <Ed as="p" id="logo.sub" className="text-xs text-muted-foreground">
          Espaço reservado — 320 × 96 px recomendado
        </Ed>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pt-14 pb-20 lg:grid-cols-2 lg:gap-6 lg:pt-20">
        {/* Coluna de texto */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <LogoSlot />

          <h1 className="font-display mt-8 text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl">
            <Ed id="hero.title1">O futuro dos negócios</Ed>{" "}
            <Ed id="hero.title2" className="text-gold">
              não tem fronteiras.
            </Ed>
          </h1>

          <Ed
            as="p"
            id="hero.sub"
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Um dia inteiro de imersão reunindo líderes e inovadores para
            palestras, conexões e oportunidades que atravessam continentes.
          </Ed>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" />
              <Ed id="hero.date">10 de outubro de 2026</Ed>
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              <Ed id="hero.place">Belo Horizonte · MG</Ed>
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#ingressos"
              className="animate-pulse-ring font-display inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-105"
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

        {/* Globo interativo */}
        <div className="relative order-1 lg:order-2">
          <Globe className="mx-auto aspect-square w-full max-w-[520px]" />
          <Ed
            as="p"
            id="hero.globe"
            className="mt-2 block text-center text-xs tracking-widest text-muted-foreground uppercase"
          >
            Arraste para explorar o globo
          </Ed>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { id: "s1", icon: Ticket, value: "70", label: "ingressos disponíveis" },
  { id: "s2", icon: Mic2, value: "2", label: "palestrantes especiais" },
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
      <h2 className="font-display mt-4 text-4xl font-extrabold text-balance sm:text-5xl">
        <Ed id="about.title">Um palco, um dia, conexões que cruzam o planeta</Ed>
      </h2>
      <Ed
        as="p"
        id="about.body"
        className="mt-6 text-lg leading-relaxed text-muted-foreground"
      >
        O Horizonte Global Summit reúne founders, investidores e executivos para
        discutir tecnologia, expansão internacional e as tendências que vão
        moldar a próxima década — tudo em um único dia de imersão, com brunch
        completo e happy hour com chopp artesanal para fechar com chave de ouro.
      </Ed>
    </section>
  );
}

const agenda = [
  { id: "a1", time: "09h00", title: "Credenciamento e brunch completo de boas-vindas" },
  { id: "a2", time: "10h30", title: "Keynote de abertura: O mundo em 2030" },
  { id: "a3", time: "12h00", title: "Adler Martins — palestra especial" },
  { id: "a4", time: "14h00", title: "Ana Freitas — palestra especial" },
  { id: "a8", time: "15h30", title: "Palestra especial — a definir" },
  { id: "a5", time: "16h00", title: "Painel: Expansão internacional sem medo" },
  { id: "a6", time: "17h30", title: "Rodada de networking global" },
  { id: "a7", time: "19h00", title: "Happy Hour com chopp artesanal" },
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
          <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">
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
    bio: "Empreendedor e referência em expansão internacional, Adler já conduziu operações em mais de 15 países. Em seu keynote, compartilha frameworks práticos para escalar negócios além das fronteiras brasileiras.",
  },
  {
    id: "ana",
    name: "Ana Freitas",
    role: "Palestrante especial",
    topic: "Keynote",
    bio: "Estrategista de inovação e investidora-anjo, Ana atua no ecossistema de startups há mais de uma década. Sua palestra aborda tendências de tecnologia e como antecipar os movimentos que vão moldar a próxima década.",
  },
];

function SpeakerCard({ speaker }: { speaker: (typeof speakers)[number] }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [adjusting, setAdjusting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(
    null,
  );

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setZoom(1);
    setPos({ x: 50, y: 50 });
    setAdjusting(true);
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
    setPos({
      x: Math.min(100, Math.max(0, nx)),
      y: Math.min(100, Math.max(0, ny)),
    });
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
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
              aria-label={`Zoom da foto de ${speaker.name}`}
            />
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPos({ x: 50, y: 50 });
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
          <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">
            <Ed id="speakers.title">Quem vai subir ao palco</Ed>
          </h2>
          <Ed as="p" id="speakers.sub" className="mt-4 text-muted-foreground">
            Dois palestrantes especiais para um dia inesquecível
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
  {
    id: "l3",
    name: "Lote 3",
    price: "R$ 1.497",
    features: [
      "Acesso ao dia inteiro",
      "Brunch completo incluso",
      "Happy Hour com chopp artesanal",
      "Certificado digital",
    ],
    highlight: false,
    tag: "Últimos ingressos",
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
          <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">
            <Ed id="tickets.title">Apenas 70 ingressos, três lotes</Ed>
          </h2>
          <Ed as="p" id="tickets.sub" className="mt-4 text-muted-foreground">
            Lote 1 disponível — o preço sobe a cada lote
          </Ed>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.id}
              className={`relative flex flex-col rounded-3xl border p-8 transition-transform hover:-translate-y-1 ${
                t.highlight ? "border-gold bg-card" : "border-border bg-card/60"
              }`}
              style={t.highlight ? { boxShadow: "var(--glow-gold)" } : undefined}
            >
              <span
                className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold ${
                  t.highlight
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground"
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
              <a
                href="#"
                className={`font-display mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-105 ${
                  t.highlight
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                <Ed id={`tickets.${t.id}.cta`}>Comprar agora</Ed>
              </a>
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
