import { AuthApiError, isAuthApiError } from '@supabase/supabase-js'

const errorAuthMessages: Record<string, string> = {
  anonymous_provider_disabled: "Les connexions anonymes sont désactivées.",
  bad_code_verifier: "Retour de l'authentification PKCE où le vérificateur de code fourni ne correspond pas à celui attendu. Indique un bug dans l'implémentation de la bibliothèque cliente.",
  bad_json: "Utilisé généralement lorsque le corps de la requête HTTP n'est pas un JSON valide.",
  bad_jwt: "Le JWT envoyé dans l'en-tête Authorization n'est pas valide.",
  bad_oauth_callback: "Le rappel OAuth du fournisseur à Auth ne contient pas tous les attributs requis (state). Indique un problème avec le fournisseur OAuth ou l'implémentation de la bibliothèque cliente.",
  bad_oauth_state: "L'état OAuth (données renvoyées par le fournisseur OAuth à Supabase Auth) n'est pas au bon format. Indique un problème avec l'intégration du fournisseur OAuth.",
  captcha_failed: "Le défi Captcha n'a pas pu être vérifié avec le fournisseur de captcha. Vérifiez votre intégration captcha.",
  conflict: "Conflit général de base de données, tel que des requêtes concurrentes sur des ressources qui ne devraient pas être modifiées simultanément. Peut souvent se produire lorsque vous avez trop de requêtes de rafraîchissement de session pour un utilisateur. Vérifiez votre application pour des problèmes de concurrence, et si détecté, reculez de manière exponentielle.",
  email_address_not_authorized: "L'envoi d'e-mails n'est pas autorisé pour cette adresse car votre projet utilise le service SMTP par défaut. Les e-mails ne peuvent être envoyés qu'aux membres de votre organisation Supabase. Si vous souhaitez envoyer des e-mails à d'autres, veuillez configurer un fournisseur SMTP personnalisé.",
  email_conflict_identity_not_deletable: "Dissocier cette identité entraîne un changement de compte utilisateur vers une adresse e-mail déjà utilisée par un autre compte utilisateur. Indique un problème où l'utilisateur a deux comptes différents utilisant des adresses e-mail principales différentes. Vous devrez peut-être migrer les données utilisateur vers l'un de leurs comptes dans ce cas.",
  email_exists: "L'adresse e-mail existe déjà dans le système.",
  email_not_confirmed: "La connexion n'est pas autorisée pour cet utilisateur car l'adresse e-mail n'est pas confirmée.",
  email_provider_disabled: "Les inscriptions sont désactivées pour l'e-mail et le mot de passe.",
  flow_state_expired: "L'état du flux PKCE auquel la requête API se rapporte a expiré. Demandez à l'utilisateur de se reconnecter.",
  flow_state_not_found: "L'état du flux PKCE auquel la requête API se rapporte n'existe plus. Les états de flux expirent après un certain temps et sont nettoyés progressivement, ce qui peut causer cette erreur. Les requêtes réessayées peuvent causer cette erreur, car la requête précédente a probablement détruit l'état du flux. Demandez à l'utilisateur de se reconnecter.",
  hook_payload_over_size_limit: "La charge utile de Auth dépasse la limite de taille maximale.",
  hook_timeout: "Impossible d'atteindre le hook dans le temps maximum alloué.",
  hook_timeout_after_retry: "Impossible d'atteindre le hook après le nombre maximum de tentatives.",
  identity_already_exists: "L'identité à laquelle l'API se rapporte est déjà liée à un utilisateur.",
  identity_not_found: "L'identité à laquelle l'appel API se rapporte n'existe pas, comme lorsqu'une identité est dissociée ou supprimée.",
  insufficient_aal: "Pour appeler cette API, l'utilisateur doit avoir un niveau d'assurance d'authentification plus élevé. Pour résoudre ce problème, demandez à l'utilisateur de résoudre un défi MFA.",
  invite_not_found: "L'invitation est expirée ou déjà utilisée.",
  invalid_credentials: "Les identifiants de connexion ou le type de subvention ne sont pas reconnus.",
  manual_linking_disabled: "L'appel de supabase.auth.linkUser() et des API associées n'est pas activé sur le serveur Auth.",
  mfa_challenge_expired: "La réponse à un défi MFA doit se faire dans un délai fixe. Demandez un nouveau défi en cas de rencontre de cette erreur.",
  mfa_factor_name_conflict: "Les facteurs MFA pour un seul utilisateur ne doivent pas avoir le même nom convivial.",
  mfa_factor_not_found: "Le facteur MFA n'existe plus.",
  mfa_ip_address_mismatch: "Le processus d'enrôlement pour les facteurs MFA doit commencer et se terminer avec la même adresse IP.",
  mfa_verification_failed: "Le défi MFA n'a pas pu être vérifié - mauvais code TOTP.",
  mfa_verification_rejected: "La vérification MFA supplémentaire est rejetée. Renvoyé uniquement si le hook de tentative de vérification MFA renvoie une décision de rejet.",
  mfa_verified_factor_exists: "Un facteur de téléphone vérifié existe déjà pour un utilisateur. Désinscrivez le facteur de téléphone vérifié existant pour continuer.",
  mfa_totp_enroll_disabled: "L'enrôlement des facteurs MFA TOTP est désactivé.",
  mfa_totp_verify_disabled: "La connexion via des facteurs TOTP et la vérification de nouveaux facteurs TOTP sont désactivées.",
  mfa_phone_enroll_disabled: "L'enrôlement des facteurs de téléphone MFA est désactivé.",
  mfa_phone_verify_disabled: "La connexion via des facteurs de téléphone et la vérification de nouveaux facteurs de téléphone sont désactivées.",
  no_authorization: "Cette requête HTTP nécessite un en-tête Authorization, qui n'est pas fourni.",
  not_admin: "L'utilisateur accédant à l'API n'est pas administrateur, c'est-à-dire que le JWT ne contient pas de revendication de rôle qui les identifie comme administrateur du serveur Auth.",
  oauth_provider_not_supported: "Utilisation d'un fournisseur OAuth désactivé sur le serveur Auth.",
  otp_disabled: "La connexion avec des OTP (lien magique, OTP par e-mail) est désactivée. Vérifiez la configuration de votre serveur.",
  otp_expired: "Le code OTP pour cette connexion a expiré. Demandez à l'utilisateur de se reconnecter.",
  over_email_send_rate_limit: "Trop d'e-mails ont été envoyés à cette adresse e-mail. Demandez à l'utilisateur d'attendre un moment avant de réessayer.",
  over_request_rate_limit: "Trop de requêtes ont été envoyées par ce client (adresse IP). Demandez à l'utilisateur de réessayer dans quelques minutes. Parfois, cela peut indiquer un bug dans votre application qui envoie par erreur trop de requêtes (comme un hook useEffect React mal écrit).",
  over_sms_send_rate_limit: "Trop de messages SMS ont été envoyés à ce numéro de téléphone. Demandez à l'utilisateur d'attendre un moment avant de réessayer.",
  phone_exists: "Le numéro de téléphone existe déjà dans le système.",
  phone_not_confirmed: "La connexion n'est pas autorisée pour cet utilisateur car le numéro de téléphone n'est pas confirmé.",
  phone_provider_disabled: "Les inscriptions sont désactivées pour le téléphone et le mot de passe.",
  provider_disabled: "Le fournisseur OAuth est désactivé pour utilisation. Vérifiez la configuration de votre serveur.",
  provider_email_needs_verification: "Tous les fournisseurs OAuth ne vérifient pas l'adresse e-mail de leurs utilisateurs. Supabase Auth nécessite que les e-mails soient vérifiés, donc cette erreur est envoyée lorsqu'un e-mail de vérification est envoyé après avoir terminé le flux OAuth.",
  reauthentication_needed: "Un utilisateur doit se réauthentifier pour changer son mot de passe. Demandez à l'utilisateur de se réauthentifier en appelant l'API supabase.auth.reauthenticate().",
  reauthentication_not_valid: "La vérification d'une réauthentification a échoué, le code est incorrect. Demandez à l'utilisateur de saisir un nouveau code.",
  request_timeout: "Le traitement de la requête a pris trop de temps. Réessayez la requête.",
  same_password: "Un utilisateur qui met à jour son mot de passe doit utiliser un mot de passe différent de celui actuellement utilisé.",
  saml_assertion_no_email: "L'assertion SAML (informations utilisateur) a été reçue après la connexion, mais aucune adresse e-mail n'a été trouvée, ce qui est requis. Vérifiez la cartographie des attributs et/ou la configuration du fournisseur.",
  saml_assertion_no_user_id: "L'assertion SAML (informations utilisateur) a été reçue après la connexion, mais un identifiant utilisateur (appelé NameID) n'a pas été trouvé, ce qui est requis. Vérifiez la configuration du fournisseur d'identité SAML.",
  saml_entity_id_mismatch: "(API Admin.) La mise à jour des métadonnées SAML pour un fournisseur d'identité SAML n'est pas possible, car l'identifiant d'entité dans la mise à jour ne correspond pas à l'identifiant d'entité dans la base de données. Cela équivaut à créer un nouveau fournisseur d'identité, et vous devriez le faire à la place.",
  saml_idp_already_exists: "(API Admin.) Ajout d'un fournisseur d'identité SAML déjà ajouté.",
  saml_idp_not_found: "Fournisseur d'identité SAML non trouvé. Le plus souvent renvoyé après une connexion initiée par IdP avec un fournisseur d'identité SAML non enregistré dans Supabase Auth.",
  saml_metadata_fetch_failed: "(API Admin.) L'ajout ou la mise à jour d'un fournisseur SAML a échoué car ses métadonnées n'ont pas pu être récupérées à partir de l'URL fournie.",
  saml_provider_disabled: "L'utilisation de SSO d'entreprise avec SAML 2.0 n'est pas activée sur le serveur Auth.",
  saml_relay_state_expired: "L'état de relais SAML est un objet qui suit la progression d'une requête supabase.auth.signInWithSSO(). Le fournisseur d'identité SAML devrait répondre après un délai fixe, après quoi cette erreur est affichée. Demandez à l'utilisateur de se reconnecter.",
  saml_relay_state_not_found: "Les états de relais SAML sont nettoyés progressivement après leur expiration, ce qui peut causer cette erreur. Demandez à l'utilisateur de se reconnecter.",
  session_not_found: "La session à laquelle la requête API se rapporte n'existe plus. Cela peut se produire si l'utilisateur s'est déconnecté, ou si l'entrée de session dans la base de données a été supprimée d'une autre manière.",
  signup_disabled: "Les inscriptions (création de nouveaux comptes) sont désactivées sur le serveur.",
  single_identity_not_deletable: "Chaque utilisateur doit avoir au moins une identité attachée, donc la suppression (dissociation) d'une identité n'est pas autorisée si c'est la seule pour l'utilisateur.",
  sms_send_failed: "L'envoi d'un message SMS a échoué. Vérifiez la configuration de votre fournisseur de SMS.",
  sso_domain_already_exists: "(API Admin.) Un seul domaine SSO peut être enregistré par fournisseur d'identité SSO.",
  sso_provider_not_found: "Fournisseur SSO non trouvé. Vérifiez les arguments dans supabase.auth.signInWithSSO().",
  too_many_enrolled_mfa_factors: "Un utilisateur ne peut avoir qu'un nombre fixe de facteurs MFA inscrits.",
  unexpected_audience: "(Fonctionnalité obsolète non disponible via les bibliothèques clientes Supabase.) La revendication X-JWT-AUD de la requête ne correspond pas à l'audience du JWT.",
  unexpected_failure: "Le service Auth est dégradé ou un bug est présent, sans raison spécifique.",
  user_already_exists: "Un utilisateur avec ces informations (adresse e-mail, numéro de téléphone) ne peut pas être créé à nouveau car il existe déjà.",
  user_banned: "L'utilisateur auquel la requête API se rapporte a une propriété banned_until qui est toujours active. Aucune autre requête API ne doit être tentée tant que ce champ n'est pas effacé.",
  user_not_found: "L'utilisateur auquel la requête API se rapporte n'existe plus.",
  user_sso_managed: "Lorsqu'un utilisateur provient de SSO, certains champs de l'utilisateur ne peuvent pas être mis à jour (comme l'e-mail).",
  validation_failed: "Les paramètres fournis ne sont pas dans le format attendu.",
  weak_password: "L'utilisateur s'inscrit ou change son mot de passe sans respecter les critères de force du mot de passe. Utilisez la classe AuthWeakPasswordError pour accéder à plus d'informations sur ce qu'ils doivent faire pour que le mot de passe soit accepté."
}

export const useErrorSystem = () => {
  const toast = useToast()

  function getErrorMessage(error: AuthApiError | Error | string) {
    if (isAuthApiError(error) && error.code && error.code in errorAuthMessages) {
      return errorAuthMessages[error.code]
    } else if (error instanceof Error) {
      return error.message
    } else {
      return error
    }
  }

  function showErrorPage(error: AuthApiError | Error | string, defaultMessage = 'Une erreur est survenue') {
    if (!error) return

    const message = getErrorMessage(error) || defaultMessage
    console.error(message)

    showError({
      statusCode: error.status || 500,
      statusMessage: message,
    })
  }

  function showErrorToast(error: AuthApiError | Error | string, title = 'Une erreur est survenue') {
    if (!error) return

    const message = getErrorMessage(error)
    console.error(title, message)

    toast.add({
      color: 'red',
      description: message,
      title,
    })
  }

  return {
    getErrorMessage,
    showErrorPage,
    showErrorToast,
  }
}