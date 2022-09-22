export function currencyFormat(currency: number) {
  return currency.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export function dateFormatter(date: Date) {
  return  Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(date);
}

export function dateFormatterCard(date: Date) {
  return  Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
}