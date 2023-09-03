import { format } from 'date-fns';

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

export function formatDateToBr(dateString) {
  // Converte a string de data em um objeto de data
  const date = new Date(dateString);

  // Formata a data no formato brasileiro "dd/MM/yyyy"
  const formattedDate = format(date, 'dd/MM/yyyy');

  return formattedDate;
}