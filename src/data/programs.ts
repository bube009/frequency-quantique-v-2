export type Program = {
  id: string
  title: string
  freq: number
  min: number
  note?: string
  category?: string
}

export const programs: Program[] = [
  { id: 'stress_general', title: 'Stress — Général', freq: 396, min: 15, category: 'Énergie' },
  { id: 'anxiete', title: 'Anxiété', freq: 417, min: 21, category: 'Énergie' },
  { id: 'sommeil_profond', title: 'Sommeil profond', freq: 174, min: 15, category: 'Sommeil' },
  { id: 'detox', title: 'Détoxification', freq: 528, min: 20, category: 'Énergie' },
  { id: 'meditation', title: 'Méditation', freq: 432, min: 16, category: 'Esprit' },

  { id: 'concentration', title: 'Concentration', freq: 852, min: 10, category: 'Esprit' },
  { id: 'memoire', title: 'Mémoire', freq: 741, min: 20, category: 'Esprit' },
  { id: 'creativite', title: 'Créativité', freq: 963, min: 15, category: 'Esprit' },
  { id: 'joie_humeur', title: 'Joie / Humeur', freq: 639, min: 20, category: 'Émotion' },
  { id: 'immunite', title: 'Immunité', freq: 285, min: 15, category: 'Corps' },

  { id: 'digestion', title: 'Digestion', freq: 528, min: 20, category: 'Corps' },
  { id: 'coeur', title: 'Cœur', freq: 528, min: 15, category: 'Corps' },
  { id: 'poumons', title: 'Poumons', freq: 741, min: 15, category: 'Corps' },
  { id: 'foie', title: 'Foie', freq: 317, min: 20, category: 'Corps' },
  { id: 'reins', title: 'Reins', freq: 319, min: 15, category: 'Corps' },

  { id: 'intestin', title: 'Intestin', freq: 341, min: 15, category: 'Corps' },
  { id: 'chakra_racine', title: 'Chakra Racine', freq: 396, min: 15, category: 'Chakras' },
  { id: 'chakra_sacral', title: 'Chakra Sacral', freq: 417, min: 15, category: 'Chakras' },
  { id: 'chakra_plexus', title: 'Chakra Plexus', freq: 528, min: 15, category: 'Chakras' },
  { id: 'chakra_coeur', title: 'Chakra Cœur', freq: 639, min: 15, category: 'Chakras' },

  { id: 'chakra_gorge', title: 'Chakra Gorge', freq: 741, min: 15, category: 'Chakras' },
  { id: 'chakra_3e_oeil', title: 'Chakra 3e Œil', freq: 852, min: 15, category: 'Chakras' },
  { id: 'chakra_couronne', title: 'Chakra Couronne', freq: 963, min: 15, category: 'Chakras' },
  { id: 'anti_fatigue', title: 'Anti-fatigue', freq: 528, min: 15, category: 'Énergie' },
  { id: 'calme', title: 'Calme profond', freq: 432, min: 20, category: 'Émotion' },
]
