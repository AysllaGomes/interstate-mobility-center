export enum MotivoDaInconsistenciaEnum {
    INCOSISTENCIA_NA_VIAGEM__CONTRATO_NAO_ENCONTRADO = "Contrato não encontrado",
    INCOSISTENCIA_NA_VIAGEM__CONTRATO_NAO_VIGENTE = "Contrato não vigente",
    INCOSISTENCIA_NA_VIAGEM__CENTRO_DE_CUSTO_NAO_VINCULADO_AO_CONTRATO = "Centro de custo não vinculado ao contrato",
    INCOSISTENCIA_NA_VIAGEM__CENTRO_DE_CUSTO_NAO_LOCALIZADO = "Centro de custo não localizado",
    INCOSISTENCIA_NA_VIAGEM__CENTRO_DE_CUSTO_NAO_VIGENTE = "Centro de custo não vigente",
    INCOSISTENCIA_NA_VIAGEM__VIAGEM_NAO_CONCLUIDA = "Viagem não concluída",
    INCOSISTENCIA_NA_VIAGEM__DADOS_DE_FATURAMENTO_NAO_INFORMADOS = "Dados de faturamento não informados",
    INCOSISTENCIA_NA_VIAGEM__VIAGEM_JA_FATURADA = "A Viagem já foi faturada nesse centro de custo",

    // eslint-disable-next-line max-len
    INCOSISTENCIA_NA_FATURA__QTD_DE_VIAGENS_DIFERENTE_DAS_VIAGENS_REALIZADAS_NO_PERIODO_DE_REFERENCIA = "Quantidadade de viagens da fatura é diferente da quantidade realizada no período de referência",
    // eslint-disable-next-line max-len
    INCOSISTENCIA_NA_FATURA__VALOR_DA_FATURA_DIFERENTE_DO_VALOR_DAS_VIAGENS_REALIZADAS_NO_PERIODO_DE_REFERENCIA = "Valor da fatura é diferente do valor das viagens realizadas no período de referência",
    INCOSISTENCIA_NA_FATURA__FATURA_NAO_LOCALIZADA = "Fatura não localizada",
    // eslint-disable-next-line max-len
    INCOSISTENCIA_NA_FATURA__VALOR_TOTAL_DOS_CENTROS_DE_CUSTO_NA_FATURA_DIFERENTE_DO_VALOR_DAS_VIAGENS_POR_CENTRO_DE_CUSTOS = "Valor total por centro de custo na fatura  é diferente do valor total das viagens por centro de custos",
    INCOSISTENCIA_NA_FATURA__FATURA_NAO_LOCALIZADA_NAS_VIAGENS_DO_CONTRATO = "Fatura não localizada nas viagens do contrato",

    INCOSISTENCIA_NO_CONTRATO_FATURA_EM_ABERTO_NESTE_PERIODO = "Contrato para a fatura em aberto neste período.",
}
