export const Button = ({ label, onClick, variant = 'primary', disabled }) => {
  let classes = '';

  switch (variant) {
    case 'icon':
      classes = 'p-4 hover:bg-slate-100/50 rounded-full cursor-pointer';
      break;
    // everything else is primary button
    default:
      classes =
        'px-8 py-4 bg-fuchsia-200 text-fuchsia-900 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-default';
  }

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {label}
    </button>
  );
};
