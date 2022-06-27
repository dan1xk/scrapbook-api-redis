export const defaultErrorMessage = 'Ocorreu um Erro, tente novamente mais tarde';

export const createMessage = (action: string) => {
    return { message: `${action} com sucesso.` };
};

export const fieldSize = (field: string, length: number) =>
    `${field} precisa ter mais de ${length} caracteres.`;

export function field(field: string) {
    return { message: `${field} não está correto` };
}

