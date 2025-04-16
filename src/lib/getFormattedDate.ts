export function getFormattedDate() {
  const date = new Date();
  return date.toISOString().split("T")[0];
}
