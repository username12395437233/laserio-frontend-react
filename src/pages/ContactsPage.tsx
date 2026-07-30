import { useState } from 'react'

const EMAIL = 'axisworld@inbox.ru'

export function ContactsPage() {
  const [hasConsent, setHasConsent] = useState(false)
  const [isEmailVisible, setIsEmailVisible] = useState(false)

  const handleShowEmail = () => {
    if (hasConsent) {
      setIsEmailVisible(true)
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white/95 p-6 shadow-card ring-1 ring-slate-200">
        <h1 className="mb-4 text-2xl font-semibold text-slate-900">
          Контакты
        </h1>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4 text-sm">
            <div className="space-y-3">
              <label className="flex cursor-pointer items-start gap-2 text-slate-700">
                <input
                  type="checkbox"
                  checked={hasConsent}
                  onChange={(event) => {
                    const isChecked = event.target.checked
                    setHasConsent(isChecked)
                    if (!isChecked) setIsEmailVisible(false)
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-laser-accent focus:ring-laser-accent"
                />
                <span>Согласен с политикой конфиденциальности</span>
              </label>

              {!isEmailVisible ? (
                <button
                  type="button"
                  onClick={handleShowEmail}
                  disabled={!hasConsent}
                  className="rounded-full bg-laser-accent px-4 py-2 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Показать электронную почту
                </button>
              ) : (
                <p className="animate-[reveal-email_200ms_ease-out] text-slate-800">
                  Электронная почта:{' '}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-laser-accent hover:text-sky-700"
                  >
                    {EMAIL}
                  </a>
                </p>
              )}
            </div>

            <p className="text-slate-800">Время работы: 8:00 – 17:00</p>
          </div>
        </div>
      </section>
    </div>
  )
}
