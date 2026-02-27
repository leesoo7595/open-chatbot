export type ClassValue = string | number | boolean | null | undefined | ClassValue[];

function normalizeClassValue(value: ClassValue): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value.trim().split(/\s+/).filter(Boolean);
  }

  if (typeof value === "number") {
    return [String(value)];
  }

  if (typeof value === "boolean") {
    return [];
  }

  return value.flatMap((item) => normalizeClassValue(item));
}

export function cn(...values: ClassValue[]): string {
  return values.flatMap((value) => normalizeClassValue(value)).join(" ");
}
