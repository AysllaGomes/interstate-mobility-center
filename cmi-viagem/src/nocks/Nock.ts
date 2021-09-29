import nock from "nock";
import { environment } from "../config/environment";
import { variaveisDeAmbienteNock } from "../util/middleware";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsonRetornaCotacao = require("./jsonParceiros/retornaCotacao.json");

export class Nock {
  static indiceStatus = 0;

  static setarStatusCancelarViagem = false;
}

export const nockRetornaCotacao = (): string | void => {
  nock(`${environment.parceiros.host}`)
    .get((uri: string) => uri.includes("/estimate/"))
    .reply(200, jsonRetornaCotacao);
};

export const nockSolicitaViagem = ((): string | void => {
  nock(environment.parceiros.host)
    .post("/rides/")
    .reply(200, {
      rideID: "333333",
      smsDriverCanceledSent: false,
      smsStartedSent: false,
    });
});

export const nockCancelaViagem = ((): string | void => {
  nock(environment.parceiros.host)
    .delete((uri: string) => uri.includes("/rides/"))
    .reply(200, () => {
      Nock.setarStatusCancelarViagem = true;
      return {};
    });
});

export const nockRequestStatus = ((): string | void => {
  nock(environment.parceiros.host)
    .get((uri: string) => uri.includes("/rides/"))
    .reply(200, async () => {
      const variaveisNock = await variaveisDeAmbienteNock();
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
      const cenarioViagem = await require(`./jsonParceiros/listaStatus_${variaveisNock?.habilitaNock?.cenarioDaViagem.cenario}.json`);

      // Tratamento para iniciar a lista de status novamente depois que finalizar a viagem
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const statusJson = cenarioViagem[Nock.indiceStatus].status;
      if (Nock.indiceStatus >= cenarioViagem.length - 1
        || statusJson === "RIDE_ENDED" || statusJson === "CANCELED_BY_DRIVER") {
        const jsonRetorno = cenarioViagem[Nock.indiceStatus];
        Nock.indiceStatus = 0;
        return jsonRetorno;
      }
      Nock.indiceStatus += 1;

      // Tratamento para verificar se deve ser retornado o status corrente ou cancelado
      if (!Nock.setarStatusCancelarViagem) {
        return cenarioViagem[Nock.indiceStatus - 1];
      }
      Nock.indiceStatus = 0;
      Nock.setarStatusCancelarViagem = false;
      return {
        status: "CANCELED_BY_PASSENGER",
      };
    });
});

export const executaNocks = (): string | void => {
  nockRetornaCotacao();
  nockSolicitaViagem();
  nockCancelaViagem();
  nockRequestStatus();
};
