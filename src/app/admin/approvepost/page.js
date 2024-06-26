import styles from "./page.module.css";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import Hero from "../../../../components/Hero";
import Image from "next/image";
import CardNewsHeader from "../../../../components/CardNewsHeader"
import { notFound, redirect } from "next/navigation";
import ProtectedPage from "./protectedPage";
import { cookies } from "next/headers";

export default async function newPost() {
  await getData();
  
  return (
    <ProtectedPage />
  )
}


export async function getData() {
  // Esegui una richiesta API lato server
  const email = cookies().get('email')?.value;
  const auth = cookies().get('authToken')?.value;
  console.log(auth, email)
  const res = await fetch(`http://localhost:3000/api/adminCheck?email=${email}&authToken=${auth}`);

  if(res.status === 200) {
    const {admin_level} = await res.json();
    console.log(admin_level)
    if(admin_level >= 3) {
      return true;
    } else {
      return redirect("/");
    }
  } else {
    return redirect("/admin/login");
  }
}