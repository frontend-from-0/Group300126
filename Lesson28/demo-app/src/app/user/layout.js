export const metadata = {
  title: "Demo app - User pages",
};


// Layout function must be exported as default export (NEXTJS rule)
export default function UserLayout({children}) {
  // Object descructuing is used to get children property form parameters passed to RootLayout
  // const children = params.children;
  // const {children} = params;

  return (
    // JSX
    <div>
      <h1 className='text-center'>User pages</h1>
      {children}
    </div>
  );
}
