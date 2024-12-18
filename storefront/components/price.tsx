export default function Price({
  amount,
  currencyCode,
}: {
  amount: string;
  currencyCode: string;
}) {
  return (
    <>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}{" "}
      <span className="sr-only">{`${currencyCode}`}</span>
    </>
  );
}
