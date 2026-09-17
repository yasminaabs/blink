import { Euro, ShoppingBag, Clock, Package } from "lucide-react";

// Vue "Tableau de bord" du vendeur (voir rapport de conception, figure "interface my store").
const stats = [
  { label: "Revenu total", value: "599.88 €", hint: "+12% par rapport au mois dernier", icon: Euro },
  { label: "Commandes", value: "5", hint: "+8% par rapport au mois dernier", icon: ShoppingBag },
  { label: "Commandes en attente", value: "1", hint: "-5% par rapport au mois dernier", icon: Clock },
  { label: "Produits", value: "4", hint: "+2 nouveaux produits", icon: Package },
];

const recentSales = [
  { client: "Jean Dupont", date: "20 Mar, 2023", amount: "89.97 €", status: "En cours" },
  { client: "Marie Martin", date: "18 Mar, 2023", amount: "149.98 €", status: "Livré" },
];

const topProducts = [
  { name: "Classic Monochrome Tees", category: "T-shirts", price: "29.99 €" },
  { name: "Monochromatic Wardrobe", category: "Ensembles", price: "89.99 €" },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-medium text-gray-800">Ventes récentes</h3>
          <p className="text-xs text-gray-400 mb-4">Les 5 dernières commandes</p>
          <ul className="divide-y divide-gray-100">
            {recentSales.map((sale) => (
              <li key={sale.client} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="font-medium text-gray-800">{sale.client}</p>
                  <p className="text-xs text-gray-400">{sale.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{sale.amount}</p>
                  <p className="text-xs text-gray-400">{sale.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <h3 className="font-medium text-gray-800">Produits populaires</h3>
          <p className="text-xs text-gray-400 mb-4">Les produits les plus vendus</p>
          <ul className="divide-y divide-gray-100">
            {topProducts.map((product) => (
              <li key={product.name} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
                <p className="font-medium text-gray-800">{product.price}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
