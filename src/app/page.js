import Image from "next/image";
import Loginpage from "./login/page";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    redirect('/login')
  );
}
