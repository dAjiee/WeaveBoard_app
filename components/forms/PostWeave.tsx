"use client"

import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { usePathname, useRouter } from 'next/navigation';
import { useOrganization } from '@clerk/nextjs';
import { WeaveValidation } from '@/lib/validations/weave';
import { createWeave } from '@/lib/actions/weave.actions';
// import { useState } from 'react';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    }
    btnTitle: string;
}



function PostWeave({ userId }: { userId: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();
    // const [errorMessage, setErrorMessage] = useState('');

    const form = useForm({
        resolver: zodResolver(WeaveValidation),
        defaultValues: {
            weave: '',
            accountId: userId,
        }
    })

    const onSubmit = async (values: z.infer<typeof WeaveValidation>) => {
        // const response = await fetch('/api/checkPostLimit.ts', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ userId }),
        //   });
        
        // const data = await response.json();

        // if (data.canPost) {
            await createWeave({
                text: values.weave,
                author: userId,
                communityId: organization ? organization.id : null,
                path: pathname,
            });
            router.push("/");
        // } else {
        //     setErrorMessage('Error! Please wait for a while before posting again!');
        // }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col justify-start gap-10"
            >
                {/* {errorMessage && <div className="text-red-500">{errorMessage}</div>} */}
                <FormField
                    control={form.control}
                    name="weave"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    rows={15}

                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit"
                    className="bg-primary-500">
                    Post Weave
                </Button>

            </form>
        </Form>
    )
}

export default PostWeave;