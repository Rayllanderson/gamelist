export function getFirstError(error: string) {
  const comingError = error + '';
  return comingError.split('.')[0].replace('name', 'Nome');
}


export const getErrMessage = ((err: any) => {
  const serverIsOffline = !err.response
  if (!!serverIsOffline) {
    return 'Servidor está dormindo, mas já estamos acordando ele. Tente de novo em alguns segundos.';
  } else {
    return getFirstError(err.response.data.message);
  }
})