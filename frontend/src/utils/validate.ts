/* eslint-disable no-throw-literal */
export function validadeForm(username: string, password: string) {
  if (username.length < 1) {
    throw 'Username é obrigatório';
  }
  if (username.trim().length < 1) {
    throw 'username não deve ser apenas espaços vazios.';
  }
  if (password.length < 1) {
    throw 'Senha precisa ter no mínimo 1 caractere.';
  }
}
export function validadeField(field: string, fieldName: string) {
  if (field.length < 1) {
    throw fieldName + ' é obrigatório';
  }
}