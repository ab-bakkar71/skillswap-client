"use client"
import { parseDate } from "@internationalized/date";
import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextField, Select, TextArea, Description, DatePicker, DateField, Calendar } from '@heroui/react';
import React, { useState } from 'react';
import { FaEdit, FaRegEdit } from 'react-icons/fa';
import { editTask } from "@/lib/actions/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TaskEdit = ({ task }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData(e.currentTarget);
        const updateData = Object.fromEntries(formData.entries());

        const updatedTask = {
            title: updateData.title,
            category: updateData.category,
            description: updateData.description,
            budget: Number(updateData.budget),
            deadline: updateData.deadline,
        };

     
        const response = await editTask(task._id, updatedTask);
        if (response && (response.modifiedCount > 0 || response.matchedCount > 0)) {

            toast.success("Task updated successfully!");
            // router.refresh();
            // router.push("/dashboard/client/my-task");
            window.location.reload(); // Refresh the page to reflect changes


        } else {
            toast.error("No changes made or failed to update.");
        }
        setIsLoading(false);


    };

    return (
        <div>
            <Modal>

                <Button
                    size="sm"
                    variant="primary"
                    className="border-zinc-800 text-zinc-300 hover:border-purple-500 hover:text-white rounded-xl font-bold text-xs h-9 px-4"
                >
                    <FaEdit className="text-sm" />
                    Edit Task
                </Button>

                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md bg-zinc-900 border border-zinc-900 rounded-3xl text-white">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-brand-accent/10 text-brand-accent">
                                    <FaEdit className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Edit Task Details</Modal.Heading>
                            </Modal.Header>

                            <Modal.Body className="p-6">
                                <Surface variant="default" className="bg-transparent">
                                    <form className="flex flex-col gap-4" onSubmit={handleUpdateTask}>

                                        {/* Title  */}
                                        <TextField
                                            isRequired
                                            name="title"
                                            className="w-full flex flex-col gap-2"
                                            defaultValue={task.title} >
                                            <Label className="text-xs md:text-sm font-semibold text-zinc-300">Task Title</Label>
                                            <Input
                                                placeholder="e.g., Design a responsive landing page..."
                                                className="w-full bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-600"
                                                variant="secondary"
                                            />
                                            <FieldError className="text-xs font-medium text-rose-500 mt-1" />
                                        </TextField>

                                        {/* Category Field */}
                                        <Select
                                            className="w-full flex flex-col gap-2"
                                            variant="secondary"
                                            placeholder="Select Category"
                                            name="category"
                                            defaultValue={task.category}
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

                                        {/* description Field */}
                                        <TextField
                                            isRequired
                                            name="description"
                                            defaultValue={task.description}
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
                                        {/* Budget Input */}

                                        <TextField isRequired defaultValue={task.budget} name="budget" type="number" className="w-full flex flex-col gap-2">
                                            <Label className="text-xs md:text-sm font-semibold text-zinc-300">Budget (USD)</Label>
                                            <Input
                                                placeholder="500"
                                                className="w-full bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-700"
                                                variant="secondary"
                                            />
                                            <FieldError className="text-xs font-medium text-rose-500 mt-1" />
                                        </TextField>
                                        {/* Deadline Datepicker */}
                                        <DatePicker defaultValue={task?.deadline ? parseDate(task.deadline) : undefined}
                                            className="w-full flex flex-col gap-2"
                                            name="deadline">
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

                                        <Modal.Footer className="mt-2">
                                            <Button slot="close" variant="secondary" className="rounded-xl border border-zinc-800 text-zinc-400">
                                                Cancel
                                            </Button>
                                            <Button type='submit' slot="close" className="bg-brand-accent text-white rounded-xl font-semibold">
                                                {isLoading ? "Updating..." : "Update Task"}
                                            </Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default TaskEdit;