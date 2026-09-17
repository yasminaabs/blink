import { Store, Users, TrendingUp, Percent } from "lucide-react";

// Vue "Tableau de bord" de l'admin (voir rapport de conception, figure "gestion des vendeurs").
const stats = [
  { label: "Total vendeurs", value: "8", hint: "+2 ce mois-ci", icon: Store },
  { label: "Vendeurs actifs", value: "6", hint: "75% du total", icon: Users },
  { label: "Ventes totales", value: "82 600 €", hint: "+8% vs mois dernier", icon: TrendingUp },
  { label: "Commissions", value: "8 705 €", hint: "Revenus plateforme", icon: Percent },
];

export default function DashboardHome() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{stat.label}</span>
            <stat.icon className="h-5 w-5 text-orange-500" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
          <p className="mt-1 text-xs text-gray-400">{stat.hint}</p>
        </div>
      ))}
    </div>
  );
}
