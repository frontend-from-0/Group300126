import styles from './ScssExample.module.scss';

export const ScssExample = () => {
  return (
    <div className={styles.card}>
      <h1>This is SCSS Example component</h1>
      <p className={styles.card__text}>If you're already using CSS but want more power (like variables, mixins, nesting), Sass or SCSS is a great choice. You write in the Sass syntax, and it compiles down to regular CSS.</p>
    </div>
  );
};