import z from "zod";

const ShiftRequestParser = z.object({
  userID: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

export type ShiftRequest = z.infer<typeof ShiftRequestParser>;

export const parseAsShiftRequest = (data: any): ShiftRequest | Error => {
  const validationResponse = ShiftRequestParser.safeParse(data);
  return validationResponse.success
    ? validationResponse.data
    : validationResponse.error;
};
