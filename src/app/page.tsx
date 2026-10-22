import { Explorer } from "@/components/Explorer";
import { TipeHub } from "@/components/TipeHub";
import { getRepoFiles } from "@/lib/repo";
export default async function Home() {
  return <Explorer repoFiles={await getRepoFiles()}><TipeHub /></Explorer>;
}
