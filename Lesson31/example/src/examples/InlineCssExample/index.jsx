export const InlineCssExample = () => {
  // This is a plain JS object!
  const divStyle = {
    color: 'var(--color-primary)',
    textAlign: 'center',
    backgroundColor: 'var(--color-lighter)',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px'
};

const pStyle = {
  color: 'var(--color-default)',
};

  return (
    <div style={divStyle}>
      <h1>This is inline CSS Example component</h1>
      <p style={pStyle}>It's like adding styles directly in your JSX. You use a style attribute with an object where the keys are camelCased versions of the style name. It's super direct but not always the most scalable or maintainable, especially for complex components.</p>
    </div>
  );
};