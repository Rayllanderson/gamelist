export function getFirstError(error: string) {
  const comingError = error + '';
  return comingError.split('.')[0].replace('name', 'Nome');
}