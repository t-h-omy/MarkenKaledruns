import type { Request } from '../models';

export function runValidation(allRequests: Request[]): void {
  // allRequests is provided as parameter
  const errors: string[] = [];

  // Collect all request IDs
  const requestIds = new Set<string>();
  const duplicateIds: string[] = [];

  for (const request of allRequests) {
    // Check 1: Info and reminder requests must have exactly 1 option, all others must have exactly 2.
    // REPAIRV4 START requests are informational and also have exactly 1 option.
    // FIREV4 START requests must have 2 options — they present an immediate player decision.
    const isSingleOptionRequest =
      request.id.startsWith('INFO_') ||
      request.id.startsWith('REMINDER_') ||
      request.isSingleOptionChainNode === true;
    const expectedOptions = isSingleOptionRequest ? 1 : 2;
    if (request.options.length !== expectedOptions) {
      errors.push(
        `Request "${request.id}" has ${request.options.length} options, expected exactly ${expectedOptions}`
      );
    }

    // Check 2: Request IDs must be unique
    if (requestIds.has(request.id)) {
      duplicateIds.push(request.id);
    }
    requestIds.add(request.id);

    // Check 3: No empty title, text, or option labels
    if (!request.title || request.title.trim() === '') {
      errors.push(`Request "${request.id}" has empty title`);
    }
    if (!request.text || request.text.trim() === '') {
      errors.push(`Request "${request.id}" has empty text`);
    }

    for (let optionIndex = 0; optionIndex < request.options.length; optionIndex++) {
      const option = request.options[optionIndex];
      if (!option.text || option.text.trim() === '') {
        errors.push(
          `Request "${request.id}" option ${optionIndex} has empty text`
        );
      }
    }

    // Note: FollowUp candidate ID validation happens after all IDs are collected
  }

  // Report duplicate IDs
  if (duplicateIds.length > 0) {
    errors.push(
      `Duplicate request IDs found: ${duplicateIds.join(', ')}`
    );
  }

  // Check 4: Validate followUp candidate IDs exist
  for (const request of allRequests) {
    if (request.followUps) {
      for (const followUp of request.followUps) {
        for (const candidate of followUp.candidates) {
          if (!requestIds.has(candidate.requestId)) {
            errors.push(
              `Request "${request.id}" has followUp candidate with non-existent ID: "${candidate.requestId}"`
            );
          }
        }
      }
    }
  }

  // Throw error if any validation failed
  if (errors.length > 0) {
    throw new Error(
      `Request validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }
}
