CREATE TABLE "professores" (
	"nome_do_professor" varchar(64) NOT NULL,
	"horario_de_atendimento" varchar(64) NOT NULL,
	"periodo" varchar(16) NOT NULL,
	"sala" varchar(8) NOT NULL,
	"predio" text[] NOT NULL
);
