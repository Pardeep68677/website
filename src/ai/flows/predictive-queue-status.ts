'use server';
/**
 * @fileOverview A Genkit flow for predicting queue status at the "AapakaNai" barber salon.
 *
 * - predictQueueStatus - A function that estimates the waiting time and provides suggestions for less busy times.
 * - PredictiveQueueStatusInput - The input type for the predictQueueStatus function.
 * - PredictiveQueueStatusOutput - The return type for the predictQueueStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveQueueStatusInputSchema = z.object({
  day: z.string().default('Sunday').describe('The day for which the queue status is requested (e.g., "Sunday", "Monday", "Today").'),
  time: z.string().optional().describe('Optional: Specific time of day (e.g., "10 AM", "afternoon").'),
  service: z.string().optional().describe('Optional: Specific service (e.g., "cutting", "shaving", "facial and grooming").'),
});
export type PredictiveQueueStatusInput = z.infer<typeof PredictiveQueueStatusInputSchema>;

const PredictiveQueueStatusOutputSchema = z.object({
  estimatedWaitingTime: z.string().describe('An estimate of the current or expected waiting time (e.g., "2-3 customers", "approximately 45 minutes").'),
  queueStatusExplanation: z.string().describe('A natural language explanation of the queue status, including suggestions for less busy times.'),
});
export type PredictiveQueueStatusOutput = z.infer<typeof PredictiveQueueStatusOutputSchema>;

export async function predictQueueStatus(input: PredictiveQueueStatusInput): Promise<PredictiveQueueStatusOutput> {
  return predictiveQueueStatusFlow(input);
}

const queueStatusPrompt = ai.definePrompt({
  name: 'predictiveQueueStatusPrompt',
  input: {schema: PredictiveQueueStatusInputSchema},
  output: {schema: PredictiveQueueStatusOutputSchema},
  prompt: `You are an AI assistant for "AapakaNai" barber salon. Your task is to provide an estimated waiting time and suggest less busy times based on the requested day and service.
The salon is known for being very busy on Sundays, especially from late morning to late afternoon. Weekdays are generally less busy.
Here are the services offered and their approximate durations:
- cutting: ~20-30 mins
- shaving: ~15-20 mins
- massage (for head only): ~30 mins
- fire cutting: ~30-40 mins
- facial and grooming: ~45-60 mins

Historical data:
- Sundays (10 AM - 6 PM): Very High traffic, expect long waits (3+ customers, 60-90+ minutes).
- Sundays (early morning before 10 AM, late evening after 6 PM): High traffic, moderate waits (1-2 customers, 30-60 minutes).
- Weekdays (all day, except lunch hours): Moderate to Low traffic, short waits (0-1 customer, 0-30 minutes).
- Weekdays (lunch hours, 1 PM - 3 PM): Moderate traffic, slight waits (1 customer, 15-30 minutes).

Given the following request:
Day: {{{day}}}
{{#if time}}Time: {{{time}}}
{{/if}}{{#if service}}Service: {{{service}}}
{{/if}}

Provide an estimated waiting time for the requested day and time, and offer natural language suggestions for when it might be less busy. Make the explanation customer-friendly.`,
});

const predictiveQueueStatusFlow = ai.defineFlow(
  {
    name: 'predictiveQueueStatusFlow',
    inputSchema: PredictiveQueueStatusInputSchema,
    outputSchema: PredictiveQueueStatusOutputSchema,
  },
  async (input) => {
    const {output} = await queueStatusPrompt(input);
    return output!;
  }
);
