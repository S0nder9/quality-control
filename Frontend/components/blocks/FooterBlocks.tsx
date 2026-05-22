export const FooterBlock = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--primary)] rounded-md flex items-center justify-center">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-sm font-medium text-[var(--foreground)]">
            QC Checker
          </span>
        </div>

        {/* Центр — статус системы */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Все системы работают
        </div>

        {/* Правая часть — копирайт */}
        <p className="text-xs text-[var(--muted-foreground)]">
          © {currentYear} QC Checker. Все права защищены.
        </p>
      </div>
    </footer>
  );
};