import UserInfo from "@/components/UserInfo";
import OnboardingTaskListWrapper from "@/components/onboarding/OnboardingTaskListWrapper";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-5">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-4">
            <div className="grid gap-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2">
              <OnboardingTaskListWrapper />
              <div>Statistiques d'envoi
Nombre total de notifications envoyées
Nombre de notifications réussies/échouées
Taux de réussite d'envoi
Graphiques montrant l'évolution des envois dans le temps
Gestion des destinataires
Liste des destinataires (individus ou groupes)
Possibilité d'ajouter, modifier ou supprimer des destinataires
Filtres et recherche pour trouver facilement des destinataires spécifiques
Historique des notifications
Liste chronologique des notifications envoyées
Détails de chaque notification (objet, contenu, destinataires, date/heure d'envoi, statut)
Possibilité de filtrer et rechercher dans l'historique
Paramètres des notifications
Modèles de notification prédéfinis
Personnalisation du contenu (texte, images, pièces jointes)
Planification des envois (immédiat, différé, récurrent)
Priorité des notifications
Rapports et analyses
Rapports détaillés sur les performances des campagnes de notification
Analyses des taux d'ouverture, de clics et d'interactions
Identification des destinataires les plus engagés
Intégrations
Connexion avec d'autres systèmes ou bases de données pour synchroniser les destinataires
Intégration avec des services de messagerie tiers pour l'envoi de notifications
Paramètres de sécurité et de confidentialité
Gestion des autorisations d'accès et des rôles utilisateurs
Conformité aux réglementations sur la protection des données
Assistance et documentation
Centre d'aide avec des guides d'utilisation et des FAQ
Formulaire de contact pour le support technique</div>
            </div>
        </div>
        </main>
  );
}
