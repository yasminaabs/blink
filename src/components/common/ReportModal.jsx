import { useState } from "react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";

const REASONS = [
  "Contrefaçon de marque",
  "Produit non conforme à la description",
  "Qualité insuffisante",
  "Contenu inapproprié",
  "Autre",
];

// Implémente le cas d'utilisation "Signaler un article" (voir rapport de conception,
// diagrammes de séquence "signaler un article").
function ReportModal({ isOpen, onClose, articleName, onSubmitted }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setReason("");
    setDescription("");
    setError("");
    setSubmitted(false);
    onClose();
  };

  const handleValidate = () => {
    if (!reason || !description.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setError("");
    setSubmitted(true);
    onSubmitted?.({ articleName, reason, description, date: new Date().toISOString() });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(107, 114, 128, 0.5)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => e.target === e.currentTarget && resetAndClose()}
    >
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Signaler cet article
          </h3>
          <button onClick={resetAndClose} aria-label="Fermer" className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <p className="font-medium text-gray-900">Signalement effectué avec succès</p>
            <p className="text-sm text-gray-500">Merci, notre équipe va examiner votre signalement.</p>
            <button
              onClick={resetAndClose}
              className="mt-2 rounded-md bg-[#B01736] px-4 py-2 text-sm font-medium text-white hover:bg-[#9e1430]"
            >
              Fermer
            </button>
          </div>
        ) : (
          <div className="p-6">
            {articleName && (
              <p className="mb-4 text-sm text-gray-500">
                Article : <span className="font-medium text-gray-800">{articleName}</span>
              </p>
            )}

            <label className="mb-1 block text-sm font-medium text-gray-700">Motif du signalement</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#B01736] focus:outline-none focus:ring-1 focus:ring-[#B01736]"
            >
              <option value="">Sélectionner un motif</option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Décrivez le problème rencontré avec cet article..."
              className="mb-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#B01736] focus:outline-none focus:ring-1 focus:ring-[#B01736]"
            />

            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={resetAndClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleValidate}
                className="rounded-md bg-[#B01736] px-4 py-2 text-sm font-medium text-white hover:bg-[#9e1430]"
              >
                Valider
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportModal;
