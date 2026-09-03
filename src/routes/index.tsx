import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  ImagePlus,
  Mic2,
  Users,
  Globe2,
  Sparkles,
  Check,
} from "lucide-react";
import { Globe } from "@/components/Globe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Horizonte Global Summit 2026 — Ingressos" },
      {
        name: "description",
        content:
          "O maior encontro de líderes e inovadores da América Latina. Três dias de palestras, networking e negócios globais em São Paulo. Garanta seu ingresso.",
      },
      { property: "og:title", content: "Horizonte Global Summit 2026" },
      {
        property: "og:description",
        content:
          "Três dias de palestras, networking e negócios globais em São Paulo. Garanta seu ingresso.",
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
            Três dias reunindo os líderes mais influentes da América Latina
            para palestras, conexões e oportunidades que atravessam continentes.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-gold" />
              12–14 de novembro de 2026
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
            Lote 1 disponível até 30 de setembro · Vagas limitadas
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
    { icon: Users, value: "+5.000", label: "participantes" },
    { icon: Mic2, value: "60", label: "palestrantes" },
    { icon: Globe2, value: "32", label: "países representados" },
    { icon: Sparkles, value: "3", label: "dias de imersão" },
  ];
  return (
    <section className="border-y border-border bg-surface/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <s.icon className="mb-3 h-6 w-6 text-gold" />
            <span className="font-display text-4xl font-extrabold">{s.value}</span>
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
        Um palco, três dias, conexões que cruzam o planeta
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        O Horizonte Global Summit reúne founders, investidores e executivos para
        discutir tecnologia, expansão internacional e as tendências que vão
        moldar a próxima década. Palestras magistrais, painéis práticos e
        rodadas de networking desenhadas para gerar negócios reais.
      </p>
    </section>
  );
}

const tickets = [
  {
    name: "Experiência",
    price: "R$ 897",
    features: ["Acesso aos 3 dias", "Palestras e painéis", "Área de networking", "Certificado digital"],
    highlight: false,
  },
  {
    name: "Business",
    price: "R$ 1.797",
    features: [
      "Tudo do Experiência",
      "Assentos reservados",
      "Rodadas de negócios",
      "Almoço incluso",
    ],
    highlight: true,
  },
  {
    name: "VIP Global",
    price: "R$ 3.497",
    features: [
      "Tudo do Business",
      "Backstage com palestrantes",
      "Jantar de encerramento",
      "Concierge exclusivo",
    ],
    highlight: false,
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
            Escolha sua experiência
          </h2>
          <p className="mt-4 text-muted-foreground">
            Lote 1 — preços promocionais por tempo limitado
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
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  MAIS ESCOLHIDO
                </span>
              )}
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
      <Tickets />
      <Footer />
    </main>
  );
}
