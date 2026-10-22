-- HU018 / RN011: identificação obrigatória do doador/patrocinador em PATROCINIO_DOACAO.
ALTER TABLE "revenues" ADD COLUMN "donor" VARCHAR(80);
