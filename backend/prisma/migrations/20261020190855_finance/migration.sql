-- HU015/RF012 (receitas) e HU016/RF013 (despesas).
CREATE TYPE "revenue_category_enum" AS ENUM ('AJUDA_DE_CUSTO', 'PATROCINIO_DOACAO', 'TAXA_INSCRICAO_CAMPEONATO', 'OUTROS');
CREATE TYPE "payment_method_enum" AS ENUM ('PIX', 'DINHEIRO', 'TRANSFERENCIA', 'CARTAO', 'OUTRO');
CREATE TYPE "expense_category_enum" AS ENUM ('ALUGUEL', 'INSCRICAO_CAMPEONATO', 'TRANSPORTE', 'MATERIAIS', 'OUTROS');
CREATE TYPE "expense_status_enum" AS ENUM ('PAGA', 'PENDENTE');

CREATE TABLE "revenues" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category" "revenue_category_enum" NOT NULL,
    "title" VARCHAR(80),
    "amount" DECIMAL(10,2) NOT NULL,
    "date" DATE NOT NULL,
    "paymentMethod" "payment_method_enum" NOT NULL,
    "description" VARCHAR(500) NOT NULL DEFAULT '',
    "studentId" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "expenses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "category" "expense_category_enum" NOT NULL,
    "title" VARCHAR(80),
    "amount" DECIMAL(10,2) NOT NULL,
    "date" DATE NOT NULL,
    "status" "expense_status_enum" NOT NULL,
    "description" VARCHAR(500) NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "revenues" ADD CONSTRAINT "revenues_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
