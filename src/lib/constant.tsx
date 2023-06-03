export const languageOptions = [
  { label: "English", value: "en-US" },
  { label: "French", value: "fr-FR" },
];

export const languageContent = {
  textReadEnglish:
    "You understand that by using the site or site services, you agree to be bound by this agreement. If you do not accept this agreement in its entirety, you must not access or use the site or the site services",
  textReadAgreeEnglish: `Do you agree to this agreement? Please respond by saying "Yes" or "No"`,
  textReadFrench:
    "Vous comprenez qu'en utilisant le site ou les services du site, vous acceptez d'être lié par cet accord. Si vous n'acceptez pas cet accord dans son intégralité, vous ne devez pas accéder ou utiliser le site ou les services du site",
  textReadAgreeFrench: `Êtes-vous d'accord avec cet accord ? Veuillez répondre en disant "Oui" ou "Non"`,
  RetryEnglish: "Retry",
  RetryFrench: "Recommencez",
  SaveEnglish: "Save",
  SaveFrench: "Sauvegarder",
  LanguageEn: "Language",
  LanguageFr: "Langue",
  DetailEn: "Detail",
  DetailFr: "DétailFr",
  ConsentGiveEn: "Consent Given",
  ConsentGiveFr: "Consentement Donné",
  YouResEn: "You responded",
  YouResFr: "Vous avez répondu",
  ConsentFormEn: "Consent Form",
  ConsentFormFr: "Formulaire de consentement",
  AllConsentEn: "All Consents",
  AllConsentFr: "Tous les consentements",
  HomeEn: "Home",
  HomeFr: "Maison",
  ConsentEn: "Consent",
  ConsentFr: "Consentement",
  NameEn: "Name",
  NameFr: "Nom",
  EnterNameEn: "Enter your name",
  EnterNameFr: "Entrez votre nom",
  SelectLanguageEn: "Select language",
  SelectLanguageFr: "Choisir la langue",
  NextEn: "Next",
  NextFr: "Suivante",
};

export interface IDataConsent {
  id: string;
  name: string;
  language: string;
  content: string;
}
