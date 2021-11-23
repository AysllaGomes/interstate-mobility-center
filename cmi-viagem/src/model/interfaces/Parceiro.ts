export interface IParceiro {
  _id: string;
  nome: string;
  codigoParceiro: string;
  cnpj: string;
  cor: string
  ativo: boolean;
  parametros?: object;
  token?: string;
}
