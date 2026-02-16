// Anti-spam utilities for form submissions

export function isHoneypotFilled(formData: Record<string, unknown>): boolean {
  // If the hidden honeypot field has a value, it's a bot
  return Boolean(formData._hp);
}
