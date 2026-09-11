import { useMemo, useState } from "react";
import CellScene from "./components/CellScene";
import { ORGANELLES } from "./data/organelles";
import type { Organelle } from "./data/organelles";

type Phase = "intro" | "explore" | "finished";

export default function App() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [selected, setSelected] = useState<Organelle | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [attempted, setAttempted] = useState(false);

  const total = ORGANELLES.length;
  const progress = Math.round((completed.size / total) * 100);

  const openOrganelle = (o: Organelle) => {
    setSelected(o);
    setQuizOpen(false);
    setAnswer(null);
    setAttempted(false);
  };

  const startQuiz = () => {
    setQuizOpen(true);
    setAnswer(null);
    setAttempted(false);
  };

  const submitAnswer = () => {
    if (answer === null || !selected) return;
    setAttempted(true);
    if (answer === selected.quiz.correct) {
      if (!completed.has(selected.id)) {
        const next = new Set(completed);
        next.add(selected.id);
        setCompleted(next);
        setScore((s) => s + 10);
        if (next.size === total) {
          setTimeout(() => setPhase("finished"), 1200);
        }
      }
    }
  };

  const closePanel = () => {
    setSelected(null);
    setQuizOpen(false);
  };

  const nextUncompleted = useMemo(() => {
    return ORGANELLES.find((o) => !completed.has(o.id)) ?? null;
  }, [completed]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050914] text-white select-none">
      {/* 3D Scene */}
      {phase !== "intro" && (
        <CellScene
          activeId={selected?.id ?? null}
          completed={completed}
          onSelect={openOrganelle}
        />
      )}

      {/* ===== INTRO ===== */}
      {phase === "intro" && (
        <IntroScreen onStart={() => setPhase("explore")} total={total} />
      )}

      {/* ===== HUD ===== */}
      {phase === "explore" && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 md:p-6">
            <div className="pointer-events-auto rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <h1 className="text-sm font-bold tracking-wide md:text-base">
                  Célula Vegetal VR
                </h1>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 w-40 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-emerald-300">
                  {completed.size}/{total}
                </span>
              </div>
            </div>

            <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-amber-300/30 bg-amber-500/10 px-4 py-3 backdrop-blur-md">
              <span className="text-xl">⭐</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-amber-200/80">
                  Puntos
                </div>
                <div className="text-lg font-bold leading-none text-amber-200">{score}</div>
              </div>
            </div>
          </div>

          {/* Bottom hint / next checkpoint */}
          {!selected && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-3 p-5">
              <div className="pointer-events-auto rounded-full border border-white/10 bg-slate-900/70 px-5 py-2 text-center text-xs text-slate-300 backdrop-blur-md md:text-sm">
                🖱️ Arrastra para orbitar · rueda para acercar · haz clic en un organelo para explorarlo
              </div>
              {nextUncompleted && (
                <button
                  onClick={() => openOrganelle(nextUncompleted)}
                  className="pointer-events-auto rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-900/40 transition hover:bg-emerald-400"
                >
                  Ir al siguiente checkpoint →
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* ===== INFO / QUIZ PANEL ===== */}
      {phase === "explore" && selected && (
        <div className="absolute inset-y-0 right-0 z-30 flex w-full max-w-md flex-col">
          <div className="m-3 flex flex-1 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/85 shadow-2xl backdrop-blur-xl md:m-4">
            {/* header */}
            <div
              className="relative p-5"
              style={{
                background: `linear-gradient(135deg, ${selected.color}cc, ${selected.color}44)`,
              }}
            >
              <button
                onClick={closePanel}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white transition hover:bg-black/45"
                aria-label="Cerrar"
              >
                ✕
              </button>
              <div className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Checkpoint {ORGANELLES.findIndex((o) => o.id === selected.id) + 1} / {total}
              </div>
              <h2 className="mt-1 text-2xl font-extrabold drop-shadow">{selected.name}</h2>
              <p className="text-sm font-medium text-white/90">{selected.subtitle}</p>
              {completed.has(selected.id) && (
                <span className="mt-2 inline-block rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-bold">
                  ✓ Completado
                </span>
              )}
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto p-5">
              {!quizOpen ? (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate-200">
                    {selected.description}
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                      💡 ¿Sabías que...?
                    </div>
                    <p className="text-sm text-slate-300">{selected.fact}</p>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 py-3 text-sm font-bold text-slate-900 shadow-lg transition hover:brightness-110"
                  >
                    {completed.has(selected.id)
                      ? "🔁 Repasar pregunta"
                      : "🎯 Responder pregunta"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-base font-semibold leading-snug text-white">
                    {selected.quiz.question}
                  </p>
                  <div className="space-y-2">
                    {selected.quiz.options.map((opt, i) => {
                      const isCorrect = i === selected.quiz.correct;
                      const chosen = answer === i;
                      let cls =
                        "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10";
                      if (attempted) {
                        if (isCorrect)
                          cls = "border-emerald-400 bg-emerald-500/20 text-emerald-100";
                        else if (chosen)
                          cls = "border-rose-400 bg-rose-500/20 text-rose-100";
                        else cls = "border-white/10 bg-white/5 opacity-60";
                      } else if (chosen) {
                        cls = "border-emerald-400 bg-emerald-500/15";
                      }
                      return (
                        <button
                          key={i}
                          disabled={attempted && answer === selected.quiz.correct}
                          onClick={() => !attempted && setAnswer(i)}
                          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${cls}`}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                          {attempted && isCorrect && <span className="ml-auto">✓</span>}
                          {attempted && chosen && !isCorrect && (
                            <span className="ml-auto">✕</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {attempted && (
                    <div
                      className={`rounded-2xl p-4 text-sm ${
                        answer === selected.quiz.correct
                          ? "bg-emerald-500/15 text-emerald-100"
                          : "bg-rose-500/15 text-rose-100"
                      }`}
                    >
                      <div className="font-bold">
                        {answer === selected.quiz.correct
                          ? "✅ ¡Correcto! +10 puntos"
                          : "❌ Inténtalo de nuevo"}
                      </div>
                      <p className="mt-1 text-slate-200">{selected.quiz.explanation}</p>
                    </div>
                  )}

                  {!attempted ? (
                    <button
                      onClick={submitAnswer}
                      disabled={answer === null}
                      className="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-bold text-white transition enabled:hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Comprobar respuesta
                    </button>
                  ) : answer === selected.quiz.correct ? (
                    <div className="flex gap-2">
                      <button
                        onClick={closePanel}
                        className="flex-1 rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-bold transition hover:bg-white/10"
                      >
                        Seguir explorando
                      </button>
                      {nextUncompleted && (
                        <button
                          onClick={() => openOrganelle(nextUncompleted)}
                          className="flex-1 rounded-2xl bg-emerald-500 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                        >
                          Siguiente →
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAttempted(false);
                        setAnswer(null);
                      }}
                      className="w-full rounded-2xl bg-amber-500 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-400"
                    >
                      Reintentar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== FINISHED ===== */}
      {phase === "finished" && (
        <FinishScreen
          score={score}
          total={total}
          onRestart={() => {
            setCompleted(new Set());
            setScore(0);
            setSelected(null);
            setPhase("explore");
          }}
        />
      )}
    </div>
  );
}

function IntroScreen({ onStart, total }: { onStart: () => void; total: number }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-6">
      <div className="max-w-2xl text-center">
        <div className="mb-4 text-6xl">🔬🌱</div>
        <h1 className="bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-400 bg-clip-text text-4xl font-black text-transparent md:text-6xl">
          Célula Vegetal VR
        </h1>
        <p className="mt-3 text-lg text-slate-300">
          Un viaje interactivo en 3D por el interior de una célula vegetal
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
          Navega libremente por el espacio celular, visita cada uno de los{" "}
          <span className="font-semibold text-emerald-300">{total} organelos</span> como
          checkpoints, aprende su función y responde una pregunta para desbloquear cada
          logro. ¡Consigue el máximo puntaje!
        </p>

        <div className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            { icon: "🧭", t: "Explora", d: "Orbita y acércate a cada organelo en 3D" },
            { icon: "📍", t: "Checkpoints", d: "Visita las 14 partes de la célula" },
            { icon: "🎯", t: "Aprende", d: "Responde preguntas y suma puntos" },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
            >
              <div className="text-2xl">{c.icon}</div>
              <div className="mt-1 font-bold text-white">{c.t}</div>
              <div className="text-xs text-slate-400">{c.d}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="mt-8 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 px-10 py-4 text-lg font-black text-slate-900 shadow-xl shadow-emerald-900/50 transition hover:scale-105 hover:brightness-110"
        >
          🚀 Comenzar aventura
        </button>
        <p className="mt-4 text-xs text-slate-500">
          Basado en la vista explosionada de una célula vegetal (Lilium sp.)
        </p>
      </div>
    </div>
  );
}

function FinishScreen({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) {
  const max = total * 10;
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 p-6">
      <div className="max-w-lg text-center">
        <div className="mb-4 text-7xl">🏆</div>
        <h1 className="text-4xl font-black text-emerald-300">¡Felicitaciones!</h1>
        <p className="mt-2 text-slate-300">
          Has explorado y aprendido las {total} partes de la célula vegetal.
        </p>
        <div className="mx-auto mt-6 inline-flex flex-col rounded-3xl border border-amber-300/30 bg-amber-500/10 px-10 py-6">
          <span className="text-xs uppercase tracking-widest text-amber-200/80">
            Puntaje final
          </span>
          <span className="text-5xl font-black text-amber-200">
            {score}
            <span className="text-2xl text-amber-200/60">/{max}</span>
          </span>
        </div>
        <div className="mt-6">
          <button
            onClick={onRestart}
            className="rounded-full bg-emerald-500 px-8 py-3 font-bold text-white transition hover:bg-emerald-400"
          >
            🔁 Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
