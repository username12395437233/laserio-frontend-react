import { Link } from 'react-router-dom'

const advantages = [
  {
    text: 'Каталог прецизионного оборудования',
    color: 'from-slate-950/70 to-slate-900/50',
  },
  {
    text: 'Прямые контракты с передовыми производителями',
    color: 'from-slate-900/60 to-blue-900/45',
  },
  {
    text: 'Инжиниринговый консалтинг: технический подбор и аудит совместимости.',
    color: 'from-blue-900/55 to-sky-800/45',
  },
  {
    text: 'Выбор оптимальной юрисдикции для финансового взаимодействия.',
    color: 'from-sky-900/50 to-cyan-800/40',
  },
  {
    text: 'Полный цикл сопровождения: контроль и ответственность на каждом этапе.',
    color: 'from-cyan-800/45 to-sky-700/35',
  },
]

export function HomePage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-laser-blue/90 to-sky-700 px-6 py-9 text-white shadow-card md:px-10 md:py-12">
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),transparent_55%)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-8">
          <div>
            <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-[2.6rem]">
              Каталог прецизионного высокоточного оборудования
            </h1>
            <p className="max-w-xl text-sm text-sky-100/90 md:text-[15px]">
              Прямые контракты с производителями ТОП-уровня
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-sky-900/40 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-lg"
          >
            Перейти к каталогу
            <span className="text-sky-500">→</span>
          </Link>

          <div className="flex gap-3 overflow-x-auto pb-1 text-[11px] text-sky-100/85">
            {advantages.map(({ text, color }) => (
              <div
                key={text}
                className={`min-w-52 flex-1 rounded-xl border border-white/10 bg-gradient-to-br ${color} px-3 py-2.5 backdrop-blur`}
              >
                <p className="text-sm font-medium leading-relaxed text-sky-100">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
