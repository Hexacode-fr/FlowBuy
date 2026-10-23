import type { LucideIcon } from "lucide-solid"
import { A } from "@solidjs/router"
import "../css/MenuCard.css"

interface Props {
  label: string
  Icon: LucideIcon
  path: string
}

export default function MenuCard({ label, Icon, path }: Props) {
  return (
    <A href={path} end class="menu-card" activeClass="active">
      <Icon class="menu-card-icon" />
      <h5 class="menu-card-label">{label}</h5>
    </A>
  )
}