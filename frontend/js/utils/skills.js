// Maps the DB skill level (basic | intermediate | advanced) to visuals.
export const LEVELS = [
  { value: 'basic', label: 'Básico', order: 1, width: 33 },
  { value: 'intermediate', label: 'Intermedio', order: 2, width: 66 },
  { value: 'advanced', label: 'Avanzado', order: 3, width: 100 },
];

export function levelInfo(value) {
  return LEVELS.find((l) => l.value === value) || LEVELS[0];
}

// Turns a category name into the CSS modifier used by .sc-cat.
export function categorySlug(category) {
  return (category || 'others').toLowerCase();
}

const CATEGORY_GRADIENT = {
  frontend: 'linear-gradient(135deg,#2563eb,#1d4ed8)',
  backend: 'linear-gradient(135deg,#16a34a,#15803d)',
  devops: 'linear-gradient(135deg,#d97706,#b45309)',
  database: 'linear-gradient(135deg,#7c3aed,#6d28d9)',
  mobile: 'linear-gradient(135deg,#db2777,#be185d)',
  others: 'linear-gradient(135deg,#475569,#334155)',
};

export function categoryGradient(category) {
  return CATEGORY_GRADIENT[categorySlug(category)] || CATEGORY_GRADIENT.others;
}
