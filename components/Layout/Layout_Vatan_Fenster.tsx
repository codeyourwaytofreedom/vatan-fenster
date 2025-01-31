
import { ReactNode } from "react";
import PageBanner from "../Page_Banner/Page_Banner";
import style from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Template({ children }: LayoutProps) {
  return (
<>
    <PageBanner />
    <div className={style.wrapper}>
      <main>{children}</main>
    </div>
</>
  );
}
