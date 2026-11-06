import { Button, type ButtonProps } from "@/components/ui/button";

export type GreenButtonProps = ButtonProps;

export function GreenButton(props: GreenButtonProps) {
  return <Button {...props} />;
}

export { Button };
export default GreenButton;
