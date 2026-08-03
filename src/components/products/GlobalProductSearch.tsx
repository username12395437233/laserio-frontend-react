import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProductsList } from '../../lib/hooks'
import { normalizeImageUrl } from '../../lib/api'

const PAGE_SIZE_OPTIONS = [20, 50, 100] as const

export function GlobalProductSearch() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZE_OPTIONS)[number]>(
    20,
  )
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const enabled = query.trim().length > 0

  const { data, loading, error } = useProductsList({
    q: query || undefined,
    sort: 'new',
    page,
    limit: pageSize,
    enabled,
  })

  const meta = data?.meta
  const products = data?.products ?? []

  const handleChange = (value: string) => {
    setQuery(value)
    setPage(1)
    if (value.trim().length > 0) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(
      `/products?${new URLSearchParams({
        q: query,
        page: '1',
        limit: String(pageSize),
      }).toString()}`,
    )
    setOpen(false)
  }

  const handleClear = () => {
    setQuery('')
    setPage(1)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return
      if (
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const showDropdown = enabled && open

  return (
    <div ref={rootRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-xs text-sky-100 shadow-sm ring-1 ring-white/15"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => {
            if (query.trim().length > 0) {
              setOpen(true)
            }
          }}
          placeholder="Поиск товара по каталогу"
          className="min-w-0 flex-1 border-none bg-transparent text-xs text-sky-50 placeholder:text-sky-200/70 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px] text-white hover:bg-white/20"
            aria-label="Очистить поиск"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="ml-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-laser-blue hover:bg-white"
        >
          Искать
        </button>
      </form>

      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-full min-w-[min(22rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-2xl bg-white/95 p-3 text-xs text-slate-800 shadow-card ring-1 ring-slate-200 sm:w-[360px]"
          onMouseLeave={() => setOpen(false)}
        >
          {loading && (
            <div className="p-2 text-slate-500">Ищем товары...</div>
          )}
          {error && (
            <div className="p-2 text-rose-600">
              Ошибка загрузки: {error}
            </div>
          )}
          {!loading && !error && products.length === 0 && (
            <div className="p-2 text-slate-500">
              Ничего не найдено по запросу «{query}».
            </div>
          )}
          {!loading && !error && products.length > 0 && (
            <>
              <ul className="max-h-72 space-y-2 overflow-y-auto pr-1">
                {products.map((p) => (
                  <li key={p.id}>
                    <Link
                      to={`/products/${encodeURIComponent(p.slug)}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                        {normalizeImageUrl(
                          p.primary_image_url ?? p.image ?? null,
                        ) ? (
                          <img
                            src={
                              normalizeImageUrl(
                                p.primary_image_url ?? p.image ?? null,
                              )!
                            }
                            alt={p.name}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-400">
                            Нет фото
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[11px] font-medium text-slate-900">
                          {p.name}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {meta && (
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={meta.page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="rounded-full border border-slate-300 bg-white px-2 py-0.5 disabled:opacity-40"
                    >
                      ‹
                    </button>
                    <span>
                      {meta.page}/{meta.pages}
                    </span>
                    <button
                      type="button"
                      disabled={meta.page >= meta.pages}
                      onClick={() =>
                        setPage((p) =>
                          meta.pages ? Math.min(meta.pages, p + 1) : p + 1,
                        )
                      }
                      className="rounded-full border border-slate-300 bg-white px-2 py-0.5 disabled:opacity-40"
                    >
                      ›
                    </button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>По:</span>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        setPageSize(
                          (Number(e.target.value) ||
                            20) as (typeof PAGE_SIZE_OPTIONS)[number],
                        )
                      }
                      className="rounded-full border border-slate-300 bg-white px-2 py-0.5 text-[11px]"
                    >
                      {PAGE_SIZE_OPTIONS.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}


