import { PdfsBlock } from "@/components/pdfsBlock";
import styles from "./page.module.css";
import { HeaderBlock } from "@/components/blocks/HeaderBlock";
import { FooterBlock } from "@/components/blocks/FooterBlocks";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <HeaderBlock status="ready" />
      <PdfsBlock />
      <FooterBlock />
    </div>
  );
}
