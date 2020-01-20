const beautifyCamelCase = (text: string): string => {
  return (
    text
      // insert a space before all caps
      .replace(/([A-Z])/g, " $1")
      // uppercase the first character
      .replace(/^./, str => str.toUpperCase())
  );
};

export default beautifyCamelCase;
