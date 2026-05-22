"use client";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[var(--muted-foreground)]">
          <p>© 2026 Нормоконтроль.</p>
        </div>
      </div>
    </footer>
  );
}
