'use client'

import Link from 'next/link'
import {
  type LucideIcon,
  ArrowRight,
  Search,
  X,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  Mountain,
  FileText,
  ClipboardList,
  Users,
  Mail,
} from 'lucide-react'
import type { ReactNode } from 'react'

type NavItem = {
  href: string
  label: string
  shortLabel: string
  description: string
  icon: LucideIcon
  exact?: boolean
  accent: string
}

type Action = {
  label: string
  onClick?: () => void
  href?: string
  icon?: LucideIcon
}

type Stat = {
  label: string
  value: string | number
  hint?: string
}

type MetaItem = {
  label: string
  value: string
}

type Badge = {
  label: string
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info'
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const toneClasses: Record<NonNullable<Badge['tone']>, string> = {
  neutral: 'bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.55)]',
  success: 'bg-[rgba(76,175,121,0.18)] text-[#4caf79]',
  warning: 'bg-[rgba(200,146,42,0.18)] text-[#e8b84b]',
  danger: 'bg-[rgba(239,68,68,0.15)] text-[rgba(248,113,113,1)]',
  info: 'bg-[rgba(59,130,246,0.15)] text-[rgba(147,197,253,1)]',
}

export const adminSurface = {
  shell: 'bg-[radial-gradient(circle_at_top_right,_rgba(45,122,79,0.1),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(200,146,42,0.05),_transparent_25%),linear-gradient(180deg,_#0a1f12_0%,_#0d2b1a_100%)]',
  panel: 'border border-[rgba(76,175,121,0.1)] bg-[rgba(255,255,255,0.03)] shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur',
  panelSoft: 'border border-[rgba(76,175,121,0.08)] bg-[rgba(255,255,255,0.02)] shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur',
}

export function AdminPageFrame({
  eyebrow,
  title,
  description,
  primaryAction,
  stats,
  toolbar,
  children,
}: {
  eyebrow?: string
  title: string
  description: string
  primaryAction?: Action
  stats?: Stat[]
  toolbar?: ReactNode
  children: ReactNode
}) {
  const ActionIcon = primaryAction?.icon

  return (
    <div className="space-y-6">
      <section className={cx('overflow-hidden rounded-[30px] p-6 sm:p-8', adminSurface.panel)}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[rgba(76,175,121,0.8)]">
                {eyebrow}
              </p>
            )}
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-[2.15rem]">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[rgba(255,255,255,0.5)]">{description}</p>
          </div>

          {primaryAction && (
            primaryAction.href ? (
              <Link
                href={primaryAction.href}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a4d2e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2d7a4f]"
              >
                {ActionIcon && <ActionIcon size={16} />}
                {primaryAction.label}
              </Link>
            ) : (
              <button
                onClick={primaryAction.onClick}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1a4d2e] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2d7a4f]"
              >
                {ActionIcon && <ActionIcon size={16} />}
                {primaryAction.label}
              </button>
            )
          )}
        </div>

        {(stats?.length || toolbar) && (
          <div className="mt-6 flex flex-col gap-4 border-t border-[rgba(76,175,121,0.1)] pt-5 xl:flex-row xl:items-center xl:justify-between">
            {stats?.length ? (
              <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-[rgba(76,175,121,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-3">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.3)]">{stat.label}</div>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-2xl font-semibold text-white">{stat.value}</span>
                      {stat.hint && <span className="pb-1 text-xs text-[rgba(255,255,255,0.3)]">{stat.hint}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {toolbar ? <div className="xl:w-[320px]">{toolbar}</div> : null}
          </div>
        )}
      </section>

      {children}
    </div>
  )
}

export function AdminSearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-[rgba(76,175,121,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3 transition focus-within:border-[rgba(76,175,121,0.4)] focus-within:ring-2 focus-within:ring-[rgba(76,175,121,0.08)]">
      <Search size={16} className="text-[rgba(255,255,255,0.3)]" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[rgba(255,255,255,0.2)]"
      />
    </label>
  )
}

export function AdminEmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode
  title: string
  description: string
  action?: Action
}) {
  const ActionIcon = action?.icon

  return (
    <div className={cx('rounded-[28px] px-6 py-12 text-center', adminSurface.panel)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(76,175,121,0.12)] text-[#4caf79]">
        {icon}
      </div>
      <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[rgba(255,255,255,0.45)]">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#1a4d2e] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2d7a4f]"
          >
            {ActionIcon && <ActionIcon size={15} />}
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#1a4d2e] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2d7a4f]"
          >
            {ActionIcon && <ActionIcon size={15} />}
            {action.label}
          </button>
        )
      )}
    </div>
  )
}

export function AdminCardGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">{children}</div>
}

export function AdminRecordCard({
  title,
  subtitle,
  description,
  icon,
  accent,
  badges,
  metadata,
  onClick,
  secondaryAction,
}: {
  title: string
  subtitle?: string
  description?: string
  icon?: ReactNode
  accent?: string
  badges?: Badge[]
  metadata?: MetaItem[]
  onClick?: () => void
  secondaryAction?: ReactNode
}) {
  return (
    <article
      className={cx(
        'group rounded-[26px] p-5 transition duration-200',
        adminSurface.panel,
        onClick && 'cursor-pointer hover:-translate-y-0.5 hover:border-[rgba(76,175,121,0.2)] hover:shadow-[0_26px_60px_rgba(0,0,0,0.4)]',
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(76,175,121,0.15)] text-lg"
            style={{
              background: accent ?? 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(15,23,42,0.08))',
            }}
          >
            {icon}
          </div>

          <div className="min-w-0">
            {subtitle && <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.3)]">{subtitle}</div>}
            <h2 className="mt-1 truncate text-lg font-semibold text-white">{title}</h2>
            {description && <p className="mt-2 text-sm leading-6 text-[rgba(255,255,255,0.5)]">{description}</p>}
          </div>
        </div>

        <div className="flex shrink-0 items-start gap-2">
          {secondaryAction}
          {onClick && (
            <div className="rounded-full border border-[rgba(255,255,255,0.08)] p-2 text-[rgba(255,255,255,0.25)] transition group-hover:border-[rgba(76,175,121,0.3)] group-hover:text-[#4caf79]">
              <ArrowRight size={14} />
            </div>
          )}
        </div>
      </div>

      {(badges?.length || metadata?.length) && (
        <div className="mt-5 flex flex-col gap-3 border-t border-[rgba(76,175,121,0.1)] pt-4">
          {badges?.length ? (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={`${badge.label}-${badge.tone ?? 'neutral'}`}
                  className={cx('inline-flex rounded-full px-2.5 py-1 text-xs font-medium', toneClasses[badge.tone ?? 'neutral'])}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          ) : null}

          {metadata?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {metadata.map((item) => (
                <div key={`${item.label}-${item.value}`} className="rounded-2xl bg-[rgba(255,255,255,0.04)] px-3 py-2.5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.3)]">{item.label}</div>
                  <div className="mt-1 text-sm text-[rgba(255,255,255,0.65)]">{item.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </article>
  )
}

export function AdminDrawer({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
      <button aria-label="Close panel" className="hidden flex-1 sm:block" onClick={onClose} />
      <div className="flex h-full w-full flex-col sm:max-w-2xl sm:border-l sm:border-[rgba(76,175,121,0.12)] bg-[linear-gradient(180deg,_#0d2b1a_0%,_#0a1f12_100%)] shadow-[0_32px_120px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4 border-b border-[rgba(76,175,121,0.1)] px-6 py-5 sm:px-7">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {description && <p className="mt-1 text-sm leading-6 text-[rgba(255,255,255,0.45)]">{description}</p>}
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-[rgba(76,175,121,0.15)] p-2 text-[rgba(255,255,255,0.4)] transition hover:border-[rgba(76,175,121,0.3)] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-7">{children}</div>
        {footer ? <div className="border-t border-[rgba(76,175,121,0.1)] bg-[rgba(255,255,255,0.02)] px-6 py-4 sm:px-7">{footer}</div> : null}
      </div>
    </div>
  )
}

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block space-y-2.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[rgba(255,255,255,0.3)]">{label}</span>
      {children}
      {hint && <span className="block text-xs leading-5 text-[rgba(255,255,255,0.25)]">{hint}</span>}
    </label>
  )
}

export function adminInputClassName(multiline = false) {
  return cx(
    'w-full rounded-2xl border border-[rgba(76,175,121,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[rgba(255,255,255,0.2)] focus:border-[rgba(76,175,121,0.4)] focus:ring-4 focus:ring-[rgba(76,175,121,0.08)]',
    multiline && 'resize-y',
  )
}

export const adminNavItems: NavItem[] = [
  {
    href: '/admin',
    label: 'Dashboard',
    shortLabel: 'Overview',
    description: 'Quick actions, content counts, and entry points.',
    icon: LayoutDashboard,
    exact: true,
    accent: 'linear-gradient(135deg, rgba(15,23,42,0.12), rgba(16,185,129,0.18))',
  },
  {
    href: '/admin/announcements',
    label: 'Announcements',
    shortLabel: 'Ticker',
    description: 'Homepage marquee messages and urgent notices.',
    icon: Megaphone,
    accent: 'linear-gradient(135deg, rgba(245,158,11,0.22), rgba(251,191,36,0.1))',
  },
  {
    href: '/admin/news',
    label: 'News',
    shortLabel: 'Stories',
    description: 'Articles, events, updates, and featured posts.',
    icon: Newspaper,
    accent: 'linear-gradient(135deg, rgba(59,130,246,0.18), rgba(125,211,252,0.12))',
  },
  {
    href: '/admin/tourism',
    label: 'Tourism',
    shortLabel: 'Spots',
    description: 'Destinations and tourism highlights on the site.',
    icon: Mountain,
    accent: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(45,212,191,0.12))',
  },
  {
    href: '/admin/documents',
    label: 'Documents',
    shortLabel: 'Transparency',
    description: 'Compliance files, archives, and public records.',
    icon: FileText,
    accent: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(168,85,247,0.12))',
  },
  {
    href: '/admin/forms',
    label: 'Service Forms',
    shortLabel: 'Forms',
    description: 'Resident-facing downloadable forms and requests.',
    icon: ClipboardList,
    accent: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(103,232,249,0.12))',
  },
  {
    href: '/admin/officials',
    label: 'Officials',
    shortLabel: 'Leaders',
    description: 'Officials, positions, badges, and ordering.',
    icon: Users,
    accent: 'linear-gradient(135deg, rgba(236,72,153,0.16), rgba(251,113,133,0.12))',
  },
  {
    href: '/admin/contacts',
    label: 'Contact Inbox',
    shortLabel: 'Inbox',
    description: 'Resident messages and reply-ready contact details.',
    icon: Mail,
    accent: 'linear-gradient(135deg, rgba(20,184,166,0.18), rgba(34,197,94,0.12))',
  },
]
