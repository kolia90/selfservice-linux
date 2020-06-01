

const translation = (params, lang) => {
  const language = lang || 'uk';
  return params[language] || ''
};

export default translation;
