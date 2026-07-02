export type Riddle = {
  id: string;
  order: number;
  prompt: string;
  answer: string;
  successMessage?: string;
};

export type DateExperience = {
  id: string;
  version: 1;
  title: string;
  teaser: string;
  scheduledAt: string;
  startingLocation?: string;
  finalSurpriseText: string;
  finalSurpriseLocation?: string;
  riddles: Riddle[];
  createdAt: string;
  updatedAt: string;
};

export type GuestProgress = {
  dateId: string;
  solvedRiddleIds: string[];
  currentRiddleIndex: number;
  isFinalUnlocked: boolean;
  lastUpdatedAt: string;
};

export type HostRiddleDraft = {
  prompt: string;
  answer: string;
  successMessage: string;
};

export type HostFormDraft = {
  title: string;
  teaser: string;
  scheduledAt: string;
  startingLocation: string;
  finalSurpriseText: string;
  finalSurpriseLocation: string;
  riddles: [HostRiddleDraft, HostRiddleDraft, HostRiddleDraft];
};
