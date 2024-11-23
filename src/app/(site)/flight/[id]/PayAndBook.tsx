import Button from "@/components/Button/Button";
import useHTTP from "@/hooks/useHTTP";
import getPayload, { PayloadProps } from "./getPayload";
import redirectToCheckout from "@/config/redirectToCheckout";

interface PropsType {
  values: PayloadProps;
}

export default function PayAndBook(props: PropsType) {
  const { loading, submit } = useHTTP(``);
  const onClick = async () => {
    const data = await getPayload(props.values);
    if (data) {
      submit(
        `${process.env.NEXT_PUBLIC_API_URL}/flight/booking/paymentIntent`,
        {
          data,
          method: "POST",
          cb: (data) => redirectToCheckout(data.result.id),
        }
      );
    }
  };
  return (
    <Button onClick={onClick} type="button" disabled={loading}>
      Pay and Book
    </Button>
  );
}
