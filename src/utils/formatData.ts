export function formatDate(dateString) {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const dd = parts[0];
    const mm = parts[1];
    const yyyy = parts[2];
    return `${yyyy}-${mm}-${dd}`;
  }
  return dateString;
}
