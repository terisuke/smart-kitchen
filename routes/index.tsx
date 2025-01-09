import { Head } from "$fresh/runtime.ts";
import SmartKitchenAdvisor from "../islands/SmartKitchenAdvisor.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Smart Kitchen Advisor</title>
      </Head>
      <SmartKitchenAdvisor />
    </>
  );
}