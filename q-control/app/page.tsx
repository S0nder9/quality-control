import { PdfsBlock } from "@/components/pdfsBlock";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <PdfsBlock/>
    </div>
  );
}
