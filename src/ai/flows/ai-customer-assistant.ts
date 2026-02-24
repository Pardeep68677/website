'use server';
/**
 * @fileOverview An AI customer assistant for the AapakaNai salon.
 *
 * - aiCustomerAssistant - A function that handles customer inquiries.
 * - AiCustomerAssistantInput - The input type for the aiCustomerAssistant function.
 * - AiCustomerAssistantOutput - The return type for the aiCustomerAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiCustomerAssistantInputSchema = z
  .string()
  .describe('The customer\'s question about the AapakaNai salon.');
export type AiCustomerAssistantInput = z.infer<typeof AiCustomerAssistantInputSchema>;

const AiCustomerAssistantOutputSchema = z
  .string()
  .describe('The AI assistant\'s answer to the customer\'s question.');
export type AiCustomerAssistantOutput = z.infer<typeof AiCustomerAssistantOutputSchema>;

export async function aiCustomerAssistant(input: AiCustomerAssistantInput): Promise<AiCustomerAssistantOutput> {
  return aiCustomerAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCustomerAssistantPrompt',
  input: { schema: AiCustomerAssistantInputSchema },
  output: { schema: AiCustomerAssistantOutputSchema },
  prompt: `You are an AI customer assistant for AapakaNai, a retro-themed men's hair salon in India.
Your goal is to provide helpful, friendly, and accurate information to customers based on the details provided below.
Always maintain a polite and welcoming tone.

Salon Name: AapakaNai
Services Offered (for men only):
- Cutting: 100rs
- Shaving: 50rs
- Head Massage: 180rs
- Fire Cutting: 200rs
- Facial and Grooming: 250rs + GST

Salon Hours:
- Monday to Saturday: 9 AM to 9 PM
- Sundays: 10 AM to 6 PM (Sundays are especially busy, expect queues).

Special Offers:
- Currently, there are no special offers. Please check our website or visit the salon for future updates.

Additional Information:
- We specialize in men's hairstyles, including traditional and modern cuts, and can handle any type of men's hair.
- Our salon has a playlist full of old songs, giving it a retro vibe.
- We are dedicated to delivering a good customer experience.
- Our gallery features styles inspired by Bollywood heroes, old heroes, and Fauji cutting.

Customer's Question: {{{this}}}`,
});

const aiCustomerAssistantFlow = ai.defineFlow(
  {
    name: 'aiCustomerAssistantFlow',
    inputSchema: AiCustomerAssistantInputSchema,
    outputSchema: AiCustomerAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
