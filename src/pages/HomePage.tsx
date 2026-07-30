import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-10 md:space-y-12">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-laser-blue/90 to-sky-700 px-6 py-9 text-white shadow-card md:px-10 md:py-12">
        {/* фон-сетка */}
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),transparent_55%)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-stretch md:justify-between">
          {/* Левая часть */}
          <div className="flex flex-1 flex-col justify-between gap-6">
            <div>
              <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.6rem]">
                КАТАЛОГ ПРЕЦИЗИОННОГО ВЫСОКОТОЧНОГО ОБОРУДОВАНИЯ
              </h1>

              <p className="max-w-xl text-sm text-sky-100/90 md:text-[15px]">
                Прямые ОЕМ - контракты с производителями ТОР - уровня
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-sky-900/40 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg"
              >
                Перейти к каталогу
                <span className="text-sky-500">↗</span>
              </Link>
            </div>

            <div className="grid gap-3 text-[11px] text-sky-100/85 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2.5 backdrop-blur">
                <p className="text-sm font-medium leading-relaxed text-sky-100">
                  Инжиниринговый консалтинг, решение для технического подбора и
                  совместимости
                </p>
              </div>
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-3 py-2.5 backdrop-blur">
                <p className="text-sm font-medium leading-relaxed text-emerald-100">
                  Выбор юрисдикции для финансового взаимодействия и
                  сотрудничества.
                </p>
              </div>
              <div className="rounded-xl border border-sky-400/25 bg-slate-900/40 px-3 py-2.5 backdrop-blur">
                <p className="text-sm font-medium leading-relaxed text-sky-100">
                  Полный цикл сопровождения, контроль и ответственность на
                  каждом этапе.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
