import classes from './CssModulesExample.module.css';

export const CssModulesExample = () => {
  return (
    <div className={classes.card}>
      <h1>This is CSS Modules Example component</h1>
      <p className={classes.card__text}>A step up from regular CSS. With CSS Modules, you still write CSS in separate files, but when you import them into your React component, they're scoped to that component only. This means no more worrying about class name conflicts across your app!</p>
    </div>
  );
};