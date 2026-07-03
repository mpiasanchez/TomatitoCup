export type AppLanguage = "en" | "es";

const LANGUAGE_STORAGE_KEY = "tomatitocup.language";

const localeByLanguage: Record<AppLanguage, string> = {
  en: "en-US",
  es: "es-419",
};

const appCopy = {
  en: {
    brand: {
      name: "Mystery Date",
      ariaLabel: "Mystery Date home",
    },
    common: {
      languageSelector: "Select language",
      languageEnglish: "English",
      languageSpanish: "Spanish",
      backToCreator: "Back to creator",
      createYours: "Create yours",
      backToEdit: "Back to edit",
    },
    host: {
      skipToForm: "Skip to date form",
      createTitle: "Create a mystery date",
      createSubtitle: "Hide the surprise behind three playful clues.",
      navLabel: "Form sections",
      sectionDateDetails: "Date details",
      sectionFinalReveal: "The final reveal",
      sectionClue: "Clue",
      summaryTitle: "Your mystery date",
      summaryScheduled: "Scheduled",
      summaryStartingLocation: "Starting location",
      summaryRequiredDetails: "Required details",
      notScheduled: "Not scheduled yet",
      notSet: "Not set",
      requiredReady: "ready",
      shareLinkTitle: "Share link",
      shareLinkSubtitle: "Generate a link to send the mystery with your guest.",
      noLinkYet: "No link generated yet",
      mobileBuilderTitle: "Mystery builder",
      mobileBuilderSubtitle: "Your date is saved when you generate its link.",
      buttonPreviewExperience: "Preview experience",
      buttonGenerateShareLink: "Generate share link",
      buttonReset: "Reset",
      errorSummaryTitle: "A few details need your attention.",
      errorSummaryText: "Check the highlighted fields below, then try again.",
      fieldDateTitle: "Date title",
      placeholderDateTitle: "A night to remember",
      fieldDateTeaser: "Date teaser",
      placeholderDateTeaser: "Get ready for a surprise made just for you...",
      fieldScheduledAt: "Scheduled date and time",
      fieldStartingLocation: "Starting location (optional)",
      placeholderStartingLocation: "Our apartment, the main entrance...",
      fieldFinalSurprise: "Final surprise",
      placeholderFinalSurprise: "Rooftop dinner, a concert, a weekend getaway...",
      fieldFinalLocation: "Final location (optional)",
      placeholderFinalLocation: "Seaside Bistro, The Music Hall...",
      fieldRiddlePrompt: "Riddle prompt",
      placeholderRiddlePromptFirst: "Where stories are told and books come alive...",
      placeholderRiddlePromptDefault: "Write a clue only they will understand...",
      fieldRiddleAnswer: "Correct answer",
      placeholderRiddleAnswer: "Library",
      fieldRiddleSuccess: "Success message (optional)",
      placeholderRiddleSuccessLast: "You did it! The big surprise awaits.",
      placeholderRiddleSuccessDefault: "You're on the right track!",
      shareLinkCardSubtitle: "Generate a link to share your mystery date.",
      generatedShareLinkLabel: "Generated share link",
      generatedShareLinkPlaceholder: "Your generated link will appear here",
      buttonCopyLink: "Copy link",
      footerHint: "Your guest will solve the clues in order to reveal the surprise.",
      buttonPreview: "Preview",
      buttonRegenerateLink: "Regenerate link",
      statusDetailsChanged: "Your details changed. Generate a fresh share link when you're ready.",
      statusFixFields: "Please fix the highlighted fields.",
      statusGenerated: "Share link generated and saved on this device.",
      statusCopied: "Share link copied to your clipboard.",
      statusCopyFailed: "Copy failed. Select the link and copy it manually.",
      statusReset: "Form reset. Ready for a new mystery.",
    },
    guest: {
      brokenLinkTitle: "This mystery link needs a second look.",
      brokenLinkText: "Date details are missing or the link was damaged in transit. Ask your partner to generate a new one.",
      brokenLinkButton: "Go to Mystery Date",
      skipToMystery: "Skip to mystery",
      introKicker: "A surprise is waiting for you.",
      startsAt: "Starts at",
      riddleGridLabel: "Mystery clues",
      oneClueLeft: "Only one clue stands between you and the surprise.",
      emptyAnswer: "Write your best answer first.",
      wrongAnswer: "Almost. Try again, the mystery is still secure.",
      allSolved: "You solved all three clues. The surprise is unlocked.",
      defaultCorrect: "Correct! You are one step closer.",
    },
    progress: {
      navLabel: "Mystery date progress",
      clueLabel: "Clue",
      surpriseLabel: "Surprise",
      statusComplete: "Complete",
      statusCurrent: "Current",
      statusLocked: "Locked",
    },
    riddleCard: {
      statusSolved: "Solved",
      statusCurrent: "Current",
      statusLocked: "Locked",
      answerLabel: "Your answer",
      answerPlaceholder: "Type your answer here",
      submitButton: "Check my answer",
      punctuationHint: "Punctuation and capitalization do not affect your answer.",
      lockedMessage: "Solve the previous clue to continue.",
    },
    surprise: {
      unlockedTitle: "Surprise unlocked.",
      unlockedSubtitle: "The mystery was worth it.",
      unlockedFooter: "I can't wait to see you.",
      lockedTitle: "Final surprise locked",
      lockedSubtitle: "Solve all 3 riddles to unlock the final reveal.",
    },
    validation: {
      titleRequired: "Add a title for your mystery date.",
      teaserRequired: "Add a short teaser for your partner.",
      scheduledRequired: "Choose a date and time.",
      scheduledInvalid: "Choose a valid date and time.",
      finalSurpriseRequired: "Describe the final surprise.",
      riddlesRequired: "A mystery date needs exactly three clues.",
      riddlePromptRequired: (index: number) => `Add a prompt for clue ${index}.`,
      riddleAnswerRequired: (index: number) => `Add the correct answer for clue ${index}.`,
    },
  },
  es: {
    brand: {
      name: "Cita Misteriosa",
      ariaLabel: "Inicio de Cita Misteriosa",
    },
    common: {
      languageSelector: "Seleccionar idioma",
      languageEnglish: "Ingles",
      languageSpanish: "Espanol",
      backToCreator: "Volver al creador",
      createYours: "Crea la tuya",
      backToEdit: "Volver a editar",
    },
    host: {
      skipToForm: "Saltar al formulario",
      createTitle: "Crea una cita misteriosa",
      createSubtitle: "Esconde la sorpresa detras de tres pistas divertidas.",
      navLabel: "Secciones del formulario",
      sectionDateDetails: "Detalles de la cita",
      sectionFinalReveal: "La revelacion final",
      sectionClue: "Pista",
      summaryTitle: "Tu cita misteriosa",
      summaryScheduled: "Programada",
      summaryStartingLocation: "Ubicacion inicial",
      summaryRequiredDetails: "Detalles obligatorios",
      notScheduled: "Aun sin programar",
      notSet: "Sin definir",
      requiredReady: "listos",
      shareLinkTitle: "Enlace para compartir",
      shareLinkSubtitle: "Genera un enlace para enviar el misterio a tu pareja.",
      noLinkYet: "Aun no hay enlace generado",
      mobileBuilderTitle: "Constructor de misterio",
      mobileBuilderSubtitle: "Tu cita se guarda cuando generas el enlace.",
      buttonPreviewExperience: "Previsualizar experiencia",
      buttonGenerateShareLink: "Generar enlace",
      buttonReset: "Reiniciar",
      errorSummaryTitle: "Hay algunos detalles por corregir.",
      errorSummaryText: "Revisa los campos marcados y vuelve a intentarlo.",
      fieldDateTitle: "Titulo de la cita",
      placeholderDateTitle: "Una noche para recordar",
      fieldDateTeaser: "Descripcion breve",
      placeholderDateTeaser: "Preparate para una sorpresa hecha solo para ti...",
      fieldScheduledAt: "Fecha y hora programadas",
      fieldStartingLocation: "Ubicacion inicial (opcional)",
      placeholderStartingLocation: "Nuestro departamento, la entrada principal...",
      fieldFinalSurprise: "Sorpresa final",
      placeholderFinalSurprise: "Cena en azotea, concierto, escapada de fin de semana...",
      fieldFinalLocation: "Ubicacion final (opcional)",
      placeholderFinalLocation: "Bistro Costero, Sala de Conciertos...",
      fieldRiddlePrompt: "Enunciado de la pista",
      placeholderRiddlePromptFirst: "Donde se cuentan historias y los libros cobran vida...",
      placeholderRiddlePromptDefault: "Escribe una pista que solo tu pareja entienda...",
      fieldRiddleAnswer: "Respuesta correcta",
      placeholderRiddleAnswer: "Biblioteca",
      fieldRiddleSuccess: "Mensaje de acierto (opcional)",
      placeholderRiddleSuccessLast: "Lo lograste. La gran sorpresa te espera.",
      placeholderRiddleSuccessDefault: "Vas por muy buen camino.",
      shareLinkCardSubtitle: "Genera un enlace para compartir tu cita misteriosa.",
      generatedShareLinkLabel: "Enlace generado",
      generatedShareLinkPlaceholder: "Tu enlace generado aparecera aqui",
      buttonCopyLink: "Copiar enlace",
      footerHint: "Tu pareja resolvera las pistas para revelar la sorpresa.",
      buttonPreview: "Previsualizar",
      buttonRegenerateLink: "Regenerar enlace",
      statusDetailsChanged: "Tus datos cambiaron. Genera un enlace nuevo cuando estes lista/o.",
      statusFixFields: "Corrige los campos marcados.",
      statusGenerated: "Enlace generado y guardado en este dispositivo.",
      statusCopied: "Enlace copiado al portapapeles.",
      statusCopyFailed: "No se pudo copiar. Selecciona el enlace y copialo manualmente.",
      statusReset: "Formulario reiniciado. Listo para un nuevo misterio.",
    },
    guest: {
      brokenLinkTitle: "Este enlace misterioso necesita una segunda mirada.",
      brokenLinkText: "Faltan los detalles de la cita o el enlace se dañó en el camino. Pídele a tu pareja que genere uno nuevo.",
      brokenLinkButton: "Ir a Cita Misteriosa",
      skipToMystery: "Saltar al misterio",
      introKicker: "Hay una sorpresa esperandote.",
      startsAt: "Empieza en",
      riddleGridLabel: "Pistas del misterio",
      oneClueLeft: "Solo queda una pista entre tu y la sorpresa.",
      emptyAnswer: "Primero escribe tu mejor respuesta.",
      wrongAnswer: "Casi. Intentalo de nuevo: el misterio sigue a salvo.",
      allSolved: "Resolvieron las tres pistas. La sorpresa esta desbloqueada.",
      defaultCorrect: "Correcto. Estas un paso mas cerca.",
    },
    progress: {
      navLabel: "Progreso de la cita misteriosa",
      clueLabel: "Pista",
      surpriseLabel: "Sorpresa",
      statusComplete: "Completado",
      statusCurrent: "Actual",
      statusLocked: "Bloqueado",
    },
    riddleCard: {
      statusSolved: "Resuelta",
      statusCurrent: "Actual",
      statusLocked: "Bloqueada",
      answerLabel: "Tu respuesta",
      answerPlaceholder: "Escribe tu respuesta aqui",
      submitButton: "Revisar mi respuesta",
      punctuationHint: "La puntuacion y las mayusculas no te van a afectar.",
      lockedMessage: "Resuelve la pista anterior para poder continuar.",
    },
    surprise: {
      unlockedTitle: "Sorpresa desbloqueada.",
      unlockedSubtitle: "El misterio valio la pena.",
      unlockedFooter: "No puedo esperar para verte.",
      lockedTitle: "Sorpresa final bloqueada",
      lockedSubtitle: "Resuelve las 3 adivinanzas para desbloquear la revelacion final.",
    },
    validation: {
      titleRequired: "Agrega un titulo para tu cita misteriosa.",
      teaserRequired: "Agrega una descripcion breve para tu pareja.",
      scheduledRequired: "Elige una fecha y hora.",
      scheduledInvalid: "Elige una fecha y hora validas.",
      finalSurpriseRequired: "Describe la sorpresa final.",
      riddlesRequired: "Una cita misteriosa necesita exactamente tres pistas.",
      riddlePromptRequired: (index: number) => `Agrega el enunciado de la pista ${index}.`,
      riddleAnswerRequired: (index: number) =>
        `Agrega la respuesta correcta de la pista ${index}.`,
    },
  },
} as const;

export interface ValidationCopy {
  titleRequired: string;
  teaserRequired: string;
  scheduledRequired: string;
  scheduledInvalid: string;
  finalSurpriseRequired: string;
  riddlesRequired: string;
  riddlePromptRequired: (index: number) => string;
  riddleAnswerRequired: (index: number) => string;
}

export function isAppLanguage(value: string | null): value is AppLanguage {
  return value === "en" || value === "es";
}

export function getStoredLanguage(): AppLanguage {
  if (typeof window === "undefined") {
    return "en";
  }

  const fromStorage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return isAppLanguage(fromStorage) ? fromStorage : "en";
}

export function saveStoredLanguage(language: AppLanguage): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

export function getLocale(language: AppLanguage): string {
  return localeByLanguage[language];
}

export function getAppCopy(language: AppLanguage) {
  return appCopy[language];
}
