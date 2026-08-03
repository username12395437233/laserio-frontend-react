import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { CartBadge } from "../cart/CartBadge";
import { Breadcrumbs } from "../navigation/Breadcrumbs";
import { GlobalProductSearch } from "../products/GlobalProductSearch";
import { useToastStore } from "../../store/toastStore";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = location.pathname === "/";
  const isProductPage = location.pathname.startsWith("/products/");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {toasts.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 top-16 z-50 flex flex-col items-end gap-2 px-4 sm:top-20">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto flex max-w-xs items-start gap-2 rounded-xl bg-slate-900/95 px-4 py-3 text-xs text-slate-50 shadow-lg ring-1 ring-slate-700/80"
            >
              <div
                className={`mt-0.5 h-2 w-2 flex-shrink-0 rounded-full ${toast.type === "success" ? "bg-emerald-400" : "bg-rose-400"
                  }`}
              />
              <div className="flex-1">{toast.message}</div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="ml-2 text-[11px] text-slate-300 hover:text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <header className="gradient-header text-white fixed inset-x-0 top-0 z-40">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
          <div className="flex min-w-0 items-center gap-6 lg:gap-10">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
            >
              <img
                src="/ось_мира_white.svg"
                alt="Ось мира"
                className="h-8 w-auto sm:h-10"
              />
              <span className="sr-only">Ось мира</span>
            </button>

            <nav className="hidden items-center gap-6 text-sm text-sky-100/90 lg:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-colors hover:text-white ${isActive ? "text-white" : ""
                  }`
                }
              >
                Главная
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `transition-colors hover:text-white ${isActive ? "text-white" : ""
                  }`
                }
              >
                Каталог
              </NavLink>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  `transition-colors hover:text-white ${isActive ? "text-white" : ""
                  }`
                }
              >
                Контакты
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block lg:w-80">
              <GlobalProductSearch />
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10 lg:hidden"
            >
              <span className="sr-only">Меню</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
                {isMenuOpen ? (
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>

            {/* <CartBadge /> */}
          </div>

          {isMenuOpen && (
            <div className="absolute inset-x-0 top-full border-t border-white/10 bg-laser-blue px-4 py-4 shadow-xl lg:hidden">
              <nav className="flex flex-col gap-1 text-sm text-sky-100">
                <NavLink to="/" className={({ isActive }) => `rounded-lg px-3 py-2.5 transition hover:bg-white/10 ${isActive ? "bg-white/10 text-white" : ""}`}>
                  Главная
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => `rounded-lg px-3 py-2.5 transition hover:bg-white/10 ${isActive ? "bg-white/10 text-white" : ""}`}>
                  Каталог
                </NavLink>
                <NavLink to="/contacts" className={({ isActive }) => `rounded-lg px-3 py-2.5 transition hover:bg-white/10 ${isActive ? "bg-white/10 text-white" : ""}`}>
                  Контакты
                </NavLink>
              </nav>
              <div className="mt-3 border-t border-white/10 pt-3">
                <GlobalProductSearch />
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex min-h-screen flex-col pt-16 sm:pt-20 md:pt-24">
        <main className="page-inner flex-1">
          {!isHome && (
            <div className="mb-4 flex items-center justify-between">
              {isProductPage ? (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                >
                  <span className="text-sm">←</span>
                  <span>Назад</span>
                </button>
              ) : (
                <Breadcrumbs />
              )}
            </div>
          )}
          {children}
        </main>

        <footer className="gradient-header-reverse py-6 text-xs text-sky-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/ось_мира_white.svg"
                  alt="Ось мира"
                  className="h-8 w-auto"
                />
              </div>

              <div className="grid gap-4 text-[11px]">

                <div className="space-y-2">
                  <div className="font-semibold uppercase tracking-wide text-sky-100/90">
                    Разделы сайта
                  </div>
                  <nav className="flex flex-col gap-1">
                    <NavLink
                      to="/products"
                      className="text-sky-100/90 hover:text-white"
                    >
                      Каталог товаров
                    </NavLink>
                    <NavLink
                      to="/contacts"
                      className="text-sky-100/90 hover:text-white"
                    >
                      Контакты
                    </NavLink>
                  </nav>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-sky-200/20 pt-3 text-[10px] text-sky-100/70">
              © {new Date().getFullYear()} Ось мира. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
