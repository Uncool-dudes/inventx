"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { selectUsers } from '@/db/types';
import Image from "next/image";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DatetimePicker } from "@/components/ui/datetime-picker";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { InsertProject } from '../db/insertProject';

// Define types for the form options
interface ProjectFormOptions {
    industries: Array<{
        id: string;
        name: string;
    }>;
    projectSizes: Array<{
        id: string;
        name: string;
    }>;
    developmentStages: Array<{
        id: string;
        name: string;
    }>;
    users: Array<selectUsers>;
}

const formSchema = z.object( {
    projectName: z
        .string()
        .min( 2, "Project name must be at least 2 characters" )
        .max( 100, "Project name cannot exceed 100 characters" ),
    projectTagline: z
        .string()
        .max( 150, "Tagline cannot exceed 150 characters" )
        .optional(),
    projectStage: z.string( {
        required_error: "Please select a development stage",
    } ),
    projectSize: z.string( {
        required_error: "Please select a project size",
    } ),
    projectPitch: z
        .string()
        .min( 20, "Pitch must be at least 50 characters" )
        .max( 500, "Pitch cannot exceed 500 characters" ),
    projectNonProfitStatus: z.boolean().default( false ),
    projectStartDate: z.coerce
        .date()
        .min( new Date( "2020-01-01" ), "Date cannot be before 2020" )
        .max( new Date( "2030-12-31" ), "Date cannot be after 2030" )
        .optional(),
    projectDescription: z
        .string()
        .max( 2000, "Description cannot exceed 2000 characters" )
        .optional(),
    projectIndustries: z.array( z.string() ).min( 1, "Select at least one industry" ),
    projectLocation: z
        .string()
        .max( 100, "Location cannot exceed 100 characters" )
        .optional(),
    projectMembers: z.array(z.string()).min(1, "Select at least one team member"),
} );

export type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
    options: ProjectFormOptions;
}

export function ProjectForm ( { options }: ProjectFormProps ) {
    const form = useForm<ProjectFormValues>( {
        resolver: zodResolver( formSchema ),
        defaultValues: {
            projectName: "",
            projectTagline: "",
            projectStage: "",
            projectSize: "",
            projectPitch: "",
            projectNonProfitStatus: false,
            projectStartDate: new Date(),
            projectDescription: "",
            projectIndustries: [],
            projectLocation: "",
            projectMembers: [],
        },
    } );

    function handleSubmit ( values: ProjectFormValues ) {
        try {
            const status = InsertProject( values );
            console.log(status);
            console.log( "Form submitted successfully", values );
            toast.success( "Form submitted successfully" );
        } catch ( error ) {
            console.error( "Form submission error", error );
            toast.error( "Failed to submit the form. Please try again." );
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( handleSubmit )} className="space-y-8 max-w-3xl mx-auto py-10">
                <div>
                    <FormField
                        control={form.control}
                        name="projectName"
                        render={( { field } ) => (
                            <FormItem className="">
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your project name"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectTagline"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Tagline</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="A short, catchy description of your project"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="projectStage"
                            render={( { field } ) => (
                                <FormItem>
                                    <FormLabel>Development Stage</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select stage" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {options.developmentStages.map( ( stage ) => (
                                                <SelectItem key={stage.id} value={stage.id}>
                                                    {stage.name}
                                                </SelectItem>
                                            ) )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormField
                            control={form.control}
                            name="projectSize"
                            render={( { field } ) => (
                                <FormItem>
                                    <FormLabel>Project Size</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {options.projectSizes.map( ( size ) => (
                                                <SelectItem key={size.id} value={size.id}>
                                                    {size.name}
                                                </SelectItem>
                                            ) )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectPitch"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>High Level Pitch</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="What is your product about (50-500 characters)"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectNonProfitStatus"
                        render={( { field } ) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel>Non profit</FormLabel>
                                    <FormDescription>Is your project a non-profit?</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectStartDate"
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
                <div>
                    <FormField
                        control={form.control}
                        name="projectDescription"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Detailed description of your project"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectIndustries"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                    <MultiSelector
                                        values={field.value}
                                        onValuesChange={field.onChange}
                                        loop
                                        className="max-w-xs"
                                    >
                                        <MultiSelectorTrigger>
                                            <MultiSelectorInput placeholder="Select industries" />
                                        </MultiSelectorTrigger>
                                        <MultiSelectorContent>
                                            <MultiSelectorList>
                                                {options.industries.map( ( industry ) => (
                                                    <MultiSelectorItem key={industry.id} value={industry.id}>
                                                        {industry.name}
                                                    </MultiSelectorItem>
                                                ) )}
                                            </MultiSelectorList>
                                        </MultiSelectorContent>
                                    </MultiSelector>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectLocation"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Project location"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="projectMembers"
                        render={( { field } ) => {
                            const MemberSelector = ( props: {
                                values: string[];
                                onValuesChange: ( values: string[] ) => void;
                            } ) => {
                                const displayValues = props.values.map( id => {
                                    const user = options.users.find( u => u.id === id );
                                    return user ? `${user.firstName} ${user.lastName}` : id;
                                } );

                                return (
                                    <MultiSelector
                                        values={displayValues}
                                        onValuesChange={( newDisplayValues ) => {
                                            const newIds = newDisplayValues.map( displayValue => {
                                                const user = options.users.find( u =>
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
                                                placeholder={props.values.length === 0 ? "Select Team Members" : ""}
                                            />
                                        </MultiSelectorTrigger>
                                        <MultiSelectorContent>
                                            <MultiSelectorList>
                                                {options.users.map( ( user ) => (
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
                                    <FormLabel>Team Members</FormLabel>
                                    <FormControl>
                                        <MemberSelector
                                            values={field.value}
                                            onValuesChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
