"use client"
import { postTask } from '@/lib/actions/client';
import { Select, Button, Calendar, DateField, DatePicker, Description, FieldError, Fieldset, Form, Input, Label, ListBox, Surface, TextArea, TextField } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const PostTaskClient = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handelTaskPost = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const finalData = {
            title: rawData.title,
            description: rawData.description,
            budget: Number(rawData.budget),
            category: rawData.category || "web-fixing",
            deadline: rawData.deadline ? rawData.deadline.toString() : "",
            status: "open",
            clientEmail: user.email,
            clientName: user.name
        }
        const res = await postTask(finalData)
        if(res.insertedId){
            toast.success('Task Added Successful!');
            router.push('/dashboard/client/my-task')
        }else{
            toast.error(error.message)
        }
        setIsLoading(false)
    }


    return (
        <div>
            <div className="flex items-center justify-center rounded-3xl p-4 sm:p-6 md:p-10 min-h-[calc(100vh-80px)] w-full">
                <Surface className="w-full max-w-2xl bg-zinc-900/40 border border-brand-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/5">
                    <Form onSubmit={handelTaskPost} className="w-full">
                        <Fieldset className="w-full space-y-6">
                            <div>
                                <Fieldset.Legend className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                                    Post a New Task
                                </Fieldset.Legend>
                                <Description className="text-xs md:text-sm text-zinc-400 mt-1">
                                    Provide the details below to find the perfect freelancer for your task.
                                </Description>
                            </div>

                            <Fieldset.Group className="w-full flex flex-col gap-5">

                                {/* Title  */}
                                <TextField
                                    isRequired
                                    name="title"
                                    className="w-full flex flex-col gap-2"
                                >
                                    <Label className="text-xs md:text-sm font-semibold text-zinc-300">Task Title</Label>
                                    <Input
                                        placeholder="e.g., Design a responsive landing page..."
                                        className="w-full bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-600"
                                        variant="secondary"
                                    />
                                    <FieldError className="text-xs font-medium text-rose-500 mt-1" />
                                </TextField>

                                {/* 2. Category  */}
                                <Select
                                    className="w-full flex flex-col gap-2"
                                    variant="secondary"
                                    placeholder="Select Category"
                                    name="category"
                                >
                                    <Label className="text-xs md:text-sm font-semibold text-zinc-300">Category</Label>
                                    <Select.Trigger className="w-full flex items-center justify-between bg-zinc-950/80 border border-brand-border focus-within:border-brand-accent text-zinc-400 rounded-xl px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer">
                                        <Select.Value className="text-white" />
                                        <Select.Indicator className="text-zinc-500" />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-black border border-brand-border rounded-xl shadow-2xl overflow-hidden z-50">
                                        <ListBox className="py-1 max-h-60 overflow-y-auto text-zinc-300">
                                            <ListBox.Item id="web-fixing" textValue="web-fixing" className="px-4 py-2 text-sm hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer flex items-center justify-between transition-colors">
                                                Web & Bug Fixing
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="graphics-design" textValue="graphics-design" className="px-4 py-2 text-sm hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer flex items-center justify-between transition-colors">
                                                Graphics & Logo Design
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="content-writing" textValue="content-writing" className="px-4 py-2 text-sm hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer flex items-center justify-between transition-colors">
                                                Content & Article Writing
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="ui-ux" textValue="ui-ux" className="px-4 py-2 text-sm hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer flex items-center justify-between transition-colors">
                                                UI/UX Component Design
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                            <ListBox.Item id="data-entry" textValue="data-entry" className="px-4 py-2 text-sm hover:bg-brand-accent/10 hover:text-brand-accent cursor-pointer flex items-center justify-between transition-colors">
                                                Virtual Assistant & Data Entry
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                {/* Description  */}
                                <TextField
                                    isRequired
                                    name="description"
                                    className="w-full flex flex-col gap-2"
                                >
                                    <Label className="text-xs md:text-sm font-semibold text-zinc-300">Description</Label>
                                    <TextArea
                                        placeholder="Provide a detailed description of the tasks, requirements, and scope..."
                                        className="w-full min-h-[120px] bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-600 resize-y"
                                        variant="secondary"
                                    />
                                    <Description className="text-[11px] text-zinc-500">Minimum 10 characters</Description>
                                    <FieldError className="text-xs font-medium text-rose-500 mt-1" />
                                </TextField>

                                {/* 4. Budget & Deadline */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                                    {/* Budget Input */}
                                    <TextField isRequired name="budget" type="number" className="w-full flex flex-col gap-2">
                                        <Label className="text-xs md:text-sm font-semibold text-zinc-300">Budget (USD)</Label>
                                        <Input
                                            placeholder="500"
                                            className="w-full bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-700"
                                            variant="secondary"
                                        />
                                        <FieldError className="text-xs font-medium text-rose-500 mt-1" />
                                    </TextField>

                                    {/* Deadline Datepicker */}
                                    <DatePicker className="w-full flex flex-col gap-2" name="deadline">
                                        <Label className="text-xs md:text-sm font-semibold text-zinc-300">Deadline</Label>
                                        <DateField.Group fullWidth className="w-full flex items-center bg-zinc-950/80 border border-brand-border focus-within:border-brand-accent rounded-xl px-4 py-2.5 text-sm transition-all duration-200 text-white">
                                            <DateField.Input className="w-full bg-transparent outline-none flex gap-1">
                                                {(segment) => <DateField.Segment segment={segment} className="focus:bg-brand-accent/20 focus:text-brand-accent rounded px-0.5" />}
                                            </DateField.Input>
                                            <DateField.Suffix className="text-zinc-500 ml-2">
                                                <DatePicker.Trigger className="cursor-pointer hover:text-brand-accent transition-colors">
                                                    <DatePicker.TriggerIndicator />
                                                </DatePicker.Trigger>
                                            </DateField.Suffix>
                                        </DateField.Group>

                                        {/* dateline */}
                                        <DatePicker.Popover className="bg-black border border-brand-border rounded-2xl shadow-2xl p-4 z-50 text-white">
                                            <Calendar aria-label="Event date" className="w-full">
                                                <Calendar.Header className="flex items-center justify-between mb-4">
                                                    <Calendar.YearPickerTrigger className="flex items-center gap-1.5 font-bold hover:text-brand-accent transition-colors cursor-pointer">
                                                        <Calendar.YearPickerTriggerHeading />
                                                        <Calendar.YearPickerTriggerIndicator />
                                                    </Calendar.YearPickerTrigger>
                                                    <div className="flex gap-1 text-zinc-400">
                                                        <Calendar.NavButton slot="previous" className="p-1.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer" />
                                                        <Calendar.NavButton slot="next" className="p-1.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer" />
                                                    </div>
                                                </Calendar.Header>
                                                <Calendar.Grid className="w-full border-collapse">
                                                    <Calendar.GridHeader className="text-zinc-500 font-semibold text-xs">
                                                        {(day) => <Calendar.HeaderCell className="pb-2">{day}</Calendar.HeaderCell>}
                                                    </Calendar.GridHeader>
                                                    <Calendar.GridBody className="text-sm">
                                                        {(date) => <Calendar.Cell date={date} className="p-2 text-center hover:bg-brand-accent hover:text-white rounded-lg cursor-pointer transition-colors" />}
                                                    </Calendar.GridBody>
                                                </Calendar.Grid>
                                                <Calendar.YearPickerGrid className="w-full mt-2">
                                                    <Calendar.YearPickerGridBody>
                                                        {({ year }) => <Calendar.YearPickerCell year={year} className="p-2 text-center hover:bg-brand-accent hover:text-white rounded-lg cursor-pointer transition-colors" />}
                                                    </Calendar.YearPickerGridBody>
                                                </Calendar.YearPickerGrid>
                                            </Calendar>
                                        </DatePicker.Popover>
                                    </DatePicker>
                                </div>
                            </Fieldset.Group>

                            <Fieldset.Actions className="w-full flex flex-col sm:flex-row-reverse gap-3 pt-4 border-t border-brand-border/40">
                                <Button
                                    type="submit"
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold bg-brand-accent text-white hover:bg-violet-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span>{isLoading ? "Task Posting..." : "Post Task"}</span>
                                </Button>
                                <Button
                                    type="reset"
                                    variant="tertiary"
                                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold border border-brand-border text-zinc-400 hover:text-white hover:bg-zinc-900/60 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center"
                                >
                                    Cancel
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>
                </Surface>
            </div>
        </div>
    );
};

export default PostTaskClient;