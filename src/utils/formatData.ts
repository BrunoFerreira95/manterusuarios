import { format } from 'date-fns';

export function formatDate(dateString) {
  if (typeof dateString === 'string') {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const dd = parts[0];
      const mm = parts[1];
      const yyyy = parts[2];
      return `${yyyy}-${mm}-${dd}`;
    }
  }
  return dateString; // Retorna a data no mesmo formato se não corresponder ao padrão brasileiro
}



export function formatDateToBr(dateString) {
  // Converte a string de data em um objeto de data
  const date = new Date(dateString);

  // Formata a data no formato brasileiro "dd/MM/yyyy"
  const formattedDate = format(date, 'dd/MM/yyyy');

  return formattedDate;
}

export function formatDataBrasileiraParaISO(dataString) {
  if (typeof dataString === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
    // Divida a data brasileira nos componentes dia, mês e ano
    const [dia, mes, ano] = dataString.split('/');

    // Crie uma nova data no formato ISO (yyyy-MM-dd)
    const dataISO = `${ano}-${mes}-${dia}`;

    return dataISO;
  } else {
    // Lida com casos em que a data não é uma string válida no formato esperado
    return null; // Ou outro valor padrão ou tratamento de erro, dependendo das necessidades
  }
}

