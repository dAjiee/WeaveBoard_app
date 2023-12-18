import * as z from 'zod';

export const WeaveValidation = z.object({
    weave: z.string().nonempty().min(3, {message: 'Minimum 3 characters'}),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    weave: z.string().nonempty().min(3, {message: 'Minimum 3 characters'}),
})