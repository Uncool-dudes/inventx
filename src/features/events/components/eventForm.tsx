"use client";
import Image from "next/image";
import { toast } from "sonner";
import { X as RemoveIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger
} from "@/components/ui/multi-select";
import { selectUsers } from '@/db/types';
import { handleEventCreate } from '../utils/handleEventCreate';
import { randomUUID } from 'crypto';

const formSchema = z
    .object( {
        eventName: z.string(),
        startDate: z.coerce.date().min( new Date(), "Start date must be in the future" ),
        endDate: z.coerce.date(),
        eventAttendees: z.array( z.string() ),
        eventDescription: z.string(),
        eventTags: z.array( z.string() ),
    } )
    .refine(
        ( data ) => data.endDate > data.startDate,
        {
            message: "End date must be after start date",
            path: ["endDate"],
        }
    );

export function EventForm ( { users , tags }: { users: selectUsers[]; tags: string[] } ) {
    const form = useForm<z.infer<typeof formSchema>>( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            eventName: "",
            eventAttendees: [],
            startDate: new Date(),
            endDate: new Date(),
            eventDescription: "",
            eventTags: []
        },
    } );

    function onSubmit ( values: z.infer<typeof formSchema> ) {
        try {
            const transformedValues = {
                ...values,
                eventAttendees: values.eventAttendees.map(userId => ({
                    userId,
                    ...users.find(u => u.id === userId)
                }))
            };
            handleEventCreate( transformedValues );
            toast(
                <pre className="mt-2 w-fit rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify( values, null, 2 )}</code>
                </pre>
            );
        } catch ( error ) {
            console.error( "Form submission error", error );
            toast.error( "Failed to submit the form. Please try again." );
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="space-y-8 max-w-3xl w-full mx-auto py-10">
                <FormField
                    control={form.control}
                    name="eventName"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Event Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="..."
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={( { field } ) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date</FormLabel>
                                    <DatetimePicker
                                        {...field}
                                        format={[
                                            ["months", "days", "years"],
                                            ["hours", "minutes", "am/pm"],
                                        ]}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={( { field } ) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Date</FormLabel>
                                    <DatetimePicker
                                        {...field}
                                        format={[
                                            ["months", "days", "years"],
                                            ["hours", "minutes", "am/pm"],
                                        ]}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="eventAttendees"
                    render={( { field } ) => {
                        // Create a wrapper component that transforms the display value
                        const AttendeeSelector = ( props: {
                            values: string[];
                            onValuesChange: ( values: string[] ) => void;
                        } ) => {
                            const displayValues = props.values.map( id => {
                                const user = users.find( u => u.id === id );
                                return user ? `${user.firstName} ${user.lastName}` : id;
                            } );

                            return (
                                <MultiSelector
                                    values={displayValues}
                                    onValuesChange={( newDisplayValues ) => {
                                        // Map display values back to IDs
                                        const newIds = newDisplayValues.map( displayValue => {
                                            const user = users.find( u =>
                                                `${u.firstName} ${u.lastName}` === displayValue
                                            );
                                            return user?.id || displayValue;
                                        } );
                                        props.onValuesChange( newIds );
                                    }}
                                    loop
                                    className="max-w-xs"
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput
                                            placeholder={props.values.length === 0 ? "Select Attendees" : ""}
                                        />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            {users.map( ( user ) => (
                                                <MultiSelectorItem
                                                    key={user.id}
                                                    value={`${user.firstName} ${user.lastName}`}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Image
                                                        src={user.image}
                                                        alt={`${user.firstName} ${user.lastName}`}
                                                        width={24}
                                                        height={24}
                                                        className="rounded-full object-cover"
                                                    />
                                                    {user.firstName} {user.lastName}
                                                </MultiSelectorItem>
                                            ) )}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            );
                        };

                        return (
                            <FormItem>
                                <FormLabel>Attendees</FormLabel>
                                <FormControl>
                                    <AttendeeSelector
                                        values={field.value}
                                        onValuesChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name={"eventTags"}
                    render={( { field } ) => {
                        // Create a wrapper component that handles the tag selection
                        const TagSelectorWrapper = ( props: {
                            values: string[];
                            onValuesChange: ( values: string[] ) => void;
                        } ) => {
                            return (
                                <MultiSelector
                                    values={props.values}
                                    onValuesChange={props.onValuesChange}
                                    loop
                                    className="max-w-xs"
                                >
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput
                                            placeholder={props.values.length === 0 ? "Select Tags" : ""}
                                        />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            {tags.map( ( tag ) => (
                                                <MultiSelectorItem
                                                    key={tag}
                                                    value={tag}
                                                    className="flex items-center gap-2"
                                                >
                                                    {tag}
                                                </MultiSelectorItem>
                                            ) )}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            );
                        };

                        return (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <TagSelectorWrapper
                                        values={field.value}
                                        onValuesChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="eventDescription"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="..."
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
