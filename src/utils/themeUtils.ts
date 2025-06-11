export type TimePeriod = 'morning' | 'day' | 'afternoon' | 'evening' | 'night';

export function getTimePeriod(): TimePeriod {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 15) return 'day';
  if (hour >= 15 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 20) return 'evening';
  return 'night';
}

export function applyTimeTheme(): void {
  const period = getTimePeriod();
  const className = `theme-${period}`;

  if (!document.body.classList.contains(className)) {
    // Bersihin semua kelas theme-* dulu
    document.body.classList.forEach((cls) => {
      if (cls.startsWith('theme-')) {
        document.body.classList.remove(cls);
      }
    });
    document.body.classList.add(className);
  }
}
