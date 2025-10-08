import Image from "next/image";
import Loginpage from "./login/page";
import { redirect } from "next/navigation";
import Home from "./home/page"

export default function Homepage() {
  return (
    redirect('/home')
  );
}
