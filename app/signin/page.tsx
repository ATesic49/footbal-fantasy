import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import arrow from "@/app/signin/arrow.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${"/error"}?error=${error.type}`);
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <Card className="">
            <CardHeader>
              <CardTitle>Uloguj se</CardTitle>
              <CardDescription>
                Klikni na dugme. <br />
                <span className="text-[10px] text-gray-400">
                  (klikni na dugme)
                </span>
                <br />
                <span className="text-[8px] text-gray-300">
                  (klikni na dugme)
                </span>
                <br />
                <span className="text-[6px] text-gray-200">
                  (klikni na dugme)
                </span>
                <br />
                <span className="text-[4px] text-gray-100">
                  (klikni na dugme)
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="aspect-video w-32">
              <Image
                src={arrow}
                className={"ml-10 object-contain object-right"}
                alt=""
              ></Image>
            </CardContent>
            <CardFooter>
              {" "}
              <Button type="submit">
                <span>Klikni ovde</span>
              </Button>
            </CardFooter>
          </Card>
        </form>
      ))}
    </div>
  );
}
