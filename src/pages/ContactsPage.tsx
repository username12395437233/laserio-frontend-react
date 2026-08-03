import { useState } from 'react'

const EMAIL = 'axisworld@inbox.ru'
const USER_AGREEMENT_URL = encodeURI('/Пользовательское_соглашение_ПДн_ООО_ОСЬ_МИРА.pdf')
const PRIVACY_POLICY_URL = encodeURI('/Политика_обработки_ПДн_ООО_ОСЬ_МИРА.pdf')
const AGREEMENT_POLICY_URL  = encodeURI('/СОГЛАСИЕ.pdf')
const COMPANY_DETAILS_URL = encodeURI('/Карточка ООО ОСЬ МИРА.pdf')

export function ContactsPage() {
  const [hasConsent, setHasConsent] = useState(false)
  const [isEmailVisible, setIsEmailVisible] = useState(false)

  const handleConsentChange = (isChecked: boolean) => {
    setHasConsent(isChecked)
    if (!isChecked) setIsEmailVisible(false)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white/95 p-5 shadow-card ring-1 ring-slate-200 md:p-6">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Контакты</h1>

        <div className="space-y-4 text-sm text-slate-700">
          <label className="flex cursor-pointer items-start gap-2 leading-relaxed">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={(event) => handleConsentChange(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-laser-accent focus:ring-laser-accent"
            />
            <span>
              Я принимаю условия «
              <a
                href={USER_AGREEMENT_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-400 underline-offset-2 transition hover:text-laser-accent"
              >
                Пользовательского соглашения
              </a>
              » и даю{' '}
              <a
                href={AGREEMENT_POLICY_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-400 underline-offset-2 transition hover:text-laser-accent"
              >
                «согласие»
              </a> на обработку «
              <a
                href={PRIVACY_POLICY_URL}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-slate-400 underline-offset-2 transition hover:text-laser-accent"
              >
                персональных данных
              </a>
              ».
            </span>
          </label>

          <div className="pl-6 text-xs leading-relaxed text-slate-600">
            <p className="mb-1">Я ознакомлен и согласен, что:</p>
            <ul className="space-y-0.5">
              <li>· расчеты производятся только по безналичному расчету на р/с Продавца;</li>
              <li>· вся юридически значимая переписка ведется по электронной почте;</li>
              <li>
                · цена и сроки фиксируются в индивидуальном коммерческом предложении и не
                являются публичной офертой.
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-3 md:items-center">
          <div className="md:justify-self-start">
            {!isEmailVisible ? (
              <button
                type="button"
                onClick={() => setIsEmailVisible(true)}
                disabled={!hasConsent}
                className="rounded-full bg-laser-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Показать электронную почту
              </button>
            ) : (
              <p className="animate-[reveal-email_200ms_ease-out] text-sm text-slate-800">
                Электронная почта:{' '}
                <a href={`mailto:${EMAIL}`} className="text-laser-accent hover:text-sky-700">
                  {EMAIL}
                </a>
              </p>
            )}
          </div>

          <p className="text-center text-sm text-slate-700">Время работы: 06:00 – 17:00 МСК</p>

          <div className="md:justify-self-end">
            <a
              href={COMPANY_DETAILS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-laser-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              Реквизиты
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
