import './styles.css';

export const CssStylesheetExample = () => {
  return (
    <div className='card'>
      <h1>This is CSS Stylesheets Example component</h1>
      <p className='card__text'>Good old CSS files. You create a separate .css file and import it into your React component. It keeps your styles organized and separate from your JavaScript, which can be neat and tidy.</p>
    </div>
  );
};