import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function RootLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
