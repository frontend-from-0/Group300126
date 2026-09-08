export default async function OrderPage({params}) {

  const paramsValues = await params;
  const orderId = paramsValues.orderId;
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>This is the order page for order id: {orderId}</h1>
      </main>
    </div>
  );
}
