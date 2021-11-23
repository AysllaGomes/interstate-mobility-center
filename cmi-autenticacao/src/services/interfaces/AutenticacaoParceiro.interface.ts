import { NextFunction } from "express";

export interface IAutenticacaoParceiroInterface {
  nomeParceiro: string;
  token?: string;

  retornaToken():Promise<string|undefined>;
  gerarNovoToken(next: NextFunction):Promise<object|undefined>;
  definirDataVencimento(res:any|void):Promise<Date>;
  health():Promise<string>;
}
