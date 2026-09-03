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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizonte Global Summit 2026 — Ingressos" },
      {
        name: "description",
        content:
          "Um dia inteiro de imersão com líderes e inovadores em São Paulo. Brunch completo, happy hour com chopp artesanal e apenas 70 ingressos. Garanta o seu.",
      },
      { property: "og:title", content: "Horizonte Global Summit 2026" },
      {
        property: "og:description",
        content:
          "Um dia inteiro de imersão em São Paulo. Apenas 70 ingressos disponíveis — garanta o seu.",
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
        <p className="font-display text-sm font-bold tracking-widest text-gold uppercase">
          Sua logo aqui
        </p>
        <p className="text-xs text-muted-foreground">
          Espaço reservado — 320 × 96 px recomendado
        </p>
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
            O futuro dos negócios{" "}
            <span className="text-gold">não tem fronteiras.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Um dia inteiro de imersão reunindo líderes e inovadores para
            palestras, conexões e oportunidades que atravessam continentes.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" />
              12 de novembro de 2026
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              São Paulo · Expo Center Norte
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#ingressos"
              className="animate-pulse-ring inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-base font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Garantir meu ingresso
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Conhecer o evento
            </a>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Lote 1 disponível · Apenas 70 ingressos
          </p>
        </div>

        {/* Globo interativo */}
        <div className="relative order-1 lg:order-2">
          <Globe className="mx-auto aspect-square w-full max-w-[520px]" />
          <p className="pointer-events-none mt-2 text-center text-xs tracking-widest text-muted-foreground uppercase">
            Arraste para explorar o globo
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: Ticket, value: "70", label: "ingressos disponíveis" },
    { icon: Mic2, value: "2", label: "palestrantes especiais" },
    { icon: Sun, value: "1", label: "dia inteiro de imersão" },
    { icon: Coffee, value: "Brunch", label: "completo incluso" },
    { icon: Beer, value: "Happy Hour", label: "com chopp artesanal" },
  ];
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <s.icon className="mb-3 h-6 w-6 text-gold" />
            <span className="font-display text-3xl font-extrabold sm:text-4xl">
              {s.value}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <p className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase">
        Sobre o evento
      </p>
      <h2 className="font-display mt-4 text-4xl font-extrabold text-balance sm:text-5xl">
        Um palco, um dia, conexões que cruzam o planeta
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        O Horizonte Global Summit reúne founders, investidores e executivos para
        discutir tecnologia, expansão internacional e as tendências que vão
        moldar a próxima década — tudo em um único dia de imersão, com brunch
        completo e happy hour com chopp artesanal para fechar com chave de ouro.
      </p>
    </section>
  );
}

const agenda = [
  { time: "09h00", title: "Credenciamento e brunch completo de boas-vindas" },
  { time: "10h30", title: "Keynote de abertura: O mundo em 2030" },
  { time: "12h00", title: "Adler Martins — palestra especial" },
  { time: "14h00", title: "Ana Freitas — palestra especial" },
  { time: "16h00", title: "Painel: Expansão internacional sem medo" },
  { time: "17h30", title: "Rodada de networking global" },
  { time: "19h00", title: "Happy Hour com chopp artesanal" },
];

function Agenda() {
  return (
    <section id="cronograma" className="border-t border-border py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase">
            Cronograma
          </p>
          <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">
            Um dia, uma jornada completa
          </h2>
          <p className="mt-4 text-muted-foreground">
            12 de novembro de 2026 · Programação sujeita a ajustes
          </p>
        </div>

        <ul className="mt-14 space-y-5">
          {agenda.map((item) => (
            <li
              key={item.time}
              className="flex items-center gap-5 rounded-2xl border border-border bg-card/60 px-6 py-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
                <Clock className="h-3 w-3" />
                {item.time}
              </span>
              <span className="text-sm text-muted-foreground sm:text-base">
                {item.title}
              </span>
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
  },
  {
    id: "ana",
    name: "Ana Freitas",
    role: "Palestrante especial",
    topic: "Keynote",
  },
];

function SpeakerCard({
  speaker,
}: {
  speaker: (typeof speakers)[number];
}) {
  const [photo, setPhoto] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card/60 transition-transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {photo ? (
          <img
            src={photo}
            alt={`Foto de ${speaker.name}`}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            <span className="text-xs">Clique para enviar a foto de {speaker.name.split(" ")[0]}</span>
          </button>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          {speaker.topic}
        </span>
        {photo && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute right-3 bottom-3 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-secondary"
          >
            Trocar foto
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="font-display text-xl font-bold">{speaker.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{speaker.role}</p>
      </div>
    </article>
  );
}

function Speakers() {
  return (
    <section id="palestrantes" className="border-t border-border py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <p className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase">
            Palestrantes
          </p>
          <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">
            Quem vai subir ao palco
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dois palestrantes especiais para um dia inesquecível
          </p>
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
          <p className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase">
            Ingressos
          </p>
          <h2 className="font-display mt-4 text-4xl font-extrabold sm:text-5xl">
            Apenas 70 ingressos, três lotes
          </h2>
          <p className="mt-4 text-muted-foreground">
            Lote 1 disponível — o preço sobe a cada lote
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl border p-8 transition-transform hover:-translate-y-1 ${
                t.highlight
                  ? "border-gold bg-card"
                  : "border-border bg-card/60"
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
                {t.tag}
              </span>
              <h3 className="font-display text-xl font-bold">{t.name}</h3>
              <p className="mt-4">
                <span className="font-display text-4xl font-extrabold text-gold">
                  {t.price}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  ou 12× no cartão
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-sm font-bold transition-transform hover:scale-105 ${
                  t.highlight
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-secondary"
                }`}
              >
                Comprar agora
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
        <p className="font-display font-bold tracking-widest text-foreground uppercase">
          Horizonte Global Summit 2026
        </p>
        <p>São Paulo · Brasil — Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <StatsBar />
      <About />
      <Agenda />
      <Tickets />
      <Speakers />
      <Footer />
    </main>
  );
}
