// lib/bass/validator.ts
// Ajv validation functions for BASS schemas

import Ajv, { DefinedError } from 'ajv';
import addFormats from 'ajv-formats';
import { bassSchema, quizSchema, miniPlanSchema, evidenceSchema } from '../schemas';
import type { Bass, QuizInput, MiniPlan, EvidenceLedger } from './types';

const ajv = new Ajv({ allErrors: true, removeAdditional: 'failing' });
addFormats(ajv);

// Precompile validators
const validateBass = ajv.compile(bassSchema);
const validateQuiz = ajv.compile(quizSchema);
const validateMiniPlan = ajv.compile(miniPlanSchema);
const validateEvidence = ajv.compile(evidenceSchema);

export function validateBassData(data: unknown): { ok: true; value: Bass } | { ok: false; errors: DefinedError[] } {
  const valid = validateBass(data);
  if (!valid) {
    return { ok: false, errors: (validateBass.errors ?? []) as DefinedError[] };
  }
  return { ok: true, value: data as Bass };
}

export function validateQuizData(data: unknown): { ok: true; value: QuizInput } | { ok: false; errors: DefinedError[] } {
  const valid = validateQuiz(data);
  if (!valid) {
    return { ok: false, errors: (validateQuiz.errors ?? []) as DefinedError[] };
  }
  return { ok: true, value: data as QuizInput };
}

export function validateMiniPlanData(data: unknown): { ok: true; value: MiniPlan } | { ok: false; errors: DefinedError[] } {
  const valid = validateMiniPlan(data);
  if (!valid) {
    return { ok: false, errors: (validateMiniPlan.errors ?? []) as DefinedError[] };
  }
  return { ok: true, value: data as MiniPlan };
}

export function validateEvidenceData(data: unknown): { ok: true; value: EvidenceLedger } | { ok: false; errors: DefinedError[] } {
  const valid = validateEvidence(data);
  if (!valid) {
    return { ok: false, errors: (validateEvidence.errors ?? []) as DefinedError[] };
  }
  return { ok: true, value: data as EvidenceLedger };
}

// Helper function to format validation errors for user display
export function formatValidationErrors(errors: DefinedError[]): string[] {
  return errors.map(error => {
    const path = error.instancePath || 'root';
    return `${path}: ${error.message}`;
  });
}
