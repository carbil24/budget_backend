import Rule from "../models/Rule";

export const createRules = async () => {
  try {
    const count = await Rule.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Rule({
        description: "Cada miembro aportara el mismo porcentaje",
      }).save(),
      new Rule({
        description: "Cada miembro aportara un porcentaje acordado",
      }).save(),
      new Rule({
        description:
          "Cada miembro aportara de acuerdo a sus ingresos individuales",
      }).save(),
      new Rule({
        description:
          "El aporte se hara en base a los ingresos individuales, descontando todos los gastos personales",
      }).save(),
      new Rule({
        description:
          "El aporte se hara en base a los ingresos individuales, descontando solo los gastos basicos personales",
      }).save(),
      new Rule({
        description:
          "Compartir los ingresos individuales de cada miembro con el grupo",
      }).save(),
      new Rule({
        description:
          "Compartir los gastos basicos personales de cada miembro con el grupo",
      }).save(),
      new Rule({
        description:
          "Compartir los gastos no basicos personales de cada miembro con el grupo",
      }).save(),
    ]);
  } catch (error) {
    console.error(error);
  }
};
