export const errorMessage = (inOptions = '') => ({
  required: 'O campo :attribute é obrigatório.',
  in: `As opções válidas para o campo :attribute são: ${inOptions}`
});
