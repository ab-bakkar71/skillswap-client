"use client";
import { postTask } from '@/lib/actions/client';
import { generateAITask } from '@/lib/actions/ai';
import {
    Select,
    Button,
    Calendar,
    DateField,
    DatePicker,
    Description,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    ListBox,
    Surface,
    TextArea,
    TextField,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoSparkles } from 'react-icons/io5';
import { toast } from 'react-toastify';

const QUICK_PROMPTS = [
    "Fix responsive layout & mobile CSS bugs",
    "Design modern SaaS landing page UI in Figma",
    "Write 3 SEO-optimized blog articles for tech startup",
    "Build full-stack Next.js app with MongoDB",
    "Clean and organize eCommerce product data in Excel",
];

const PostTaskClient = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("web-fixing");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const router = useRouter();

    const handleAIGenerate = async (overridePrompt) => {
        const promptToUse = (overridePrompt || aiPrompt || title || "").trim();
        if (!promptToUse) {
            toast.warning("Please type a short idea or title above first! 💡");
            return;
        }

        setIsGeneratingAI(true);
        try {
            const res = await generateAITask({
                prompt: promptToUse,
                category,
                budget,
            });

            if (res?.success && res?.data) {
                if (res.data.title) setTitle(res.data.title);
                if (res.data.category) setCategory(res.data.category);
                if (res.data.description) setDescription(res.data.description);
                if (res.data.budget) setBudget(String(res.data.budget));
                toast.success("Task requirements generated with AI! 🚀");
            } else {
                toast.error(res?.message || "Failed to generate task with AI.");
            }
        } catch (err) {
            toast.error("Error generating task with AI.");
        } finally {
            setIsGeneratingAI(false);
        }
    };

    const handelTaskPost = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        const finalData = {
            title: rawData.title || title,
            description: rawData.description || description,
            budget: Number(rawData.budget || budget),
            category: rawData.category || category || "web-fixing",
            deadline: rawData.deadline ? rawData.deadline.toString() : "",
            status: "open",
            clientEmail: user.email,
            clientName: user.name,
        };

        const res = await postTask(finalData);
        if (res?.insertedId) {
            toast.success('Task Added Successfully! 🚀');
            router.push('/dashboard/client/my-task');
        } else {
            toast.error(res?.message || "Failed to post task. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div>
            <div className="flex items-center justify-center rounded-3xl p-4 sm:p-6 md:p-10 min-h-[calc(100vh-80px)] w-full">
                <Surface className="w-full max-w-2xl bg-zinc-900/40 border border-brand-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-violet-500/5">
                    
                    {/* AI Task Assistant Banner */}
                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-violet-950/60 via-purple-900/30 to-zinc-950/80 border border-violet-500/30 shadow-lg shadow-violet-950/20">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-violet-600/30 text-violet-300 border border-violet-500/30">
                                    <IoSparkles className="w-4 h-4 text-violet-300 animate-pulse" />
                                </span>
                                <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                                    AI Task Assistant
                                </h3>
                            </div>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 font-medium">
                                Smart Generator
                            </span>
                        </div>
                        <p className="text-xs text-zinc-300 mb-3">
                            Describe your need in 1 line, or pick a suggestion. AI will craft the title, scope, deliverables, and budget estimate!
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={aiPrompt}
                                onChange={(e) => setAiPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAIGenerate();
                                    }
                                }}
                                placeholder="e.g. Build an eCommerce store for fashion with cart & Stripe..."
                                className="flex-1 bg-zinc-950/80 border border-zinc-700/80 focus:border-violet-500 rounded-xl px-3.5 py-2 text-xs md:text-sm text-white placeholder-zinc-500 outline-none transition-colors"
                            />
                            <Button
                                type="button"
                                onClick={() => handleAIGenerate()}
                                disabled={isGeneratingAI}
                                className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-md shadow-violet-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                            >
                                <IoSparkles className={`w-3.5 h-3.5 ${isGeneratingAI ? "animate-spin" : ""}`} />
                                <span>{isGeneratingAI ? "Generating..." : "Generate with AI ✨"}</span>
                            </Button>
                        </div>

                        {/* Quick Prompt Suggestion Chips */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            <span className="text-[10px] text-zinc-400 self-center">Try:</span>
                            {QUICK_PROMPTS.map((p, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                        setAiPrompt(p);
                                        handleAIGenerate(p);
                                    }}
                                    className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-violet-900/40 text-zinc-300 hover:text-violet-200 border border-zinc-700/50 hover:border-violet-600/50 transition-colors cursor-pointer text-left"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Form onSubmit={handelTaskPost} className="w-full">
                        <Fieldset className="w-full space-y-6">
                            <div>
                                <Fieldset.Legend className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                                    Post a New Task
                                </Fieldset.Legend>
                                <Description className="text-xs md:text-sm text-zinc-400 mt-1">
                                    Review and refine the details below to find the perfect freelancer.
                                </Description>
                            </div>

                            <Fieldset.Group className="w-full flex flex-col gap-5">

                                {/* Hidden input for category to ensure proper form submission */}
                                <input type="hidden" name="category" value={category} />

                                {/* Title  */}
                                <TextField
                                    isRequired
                                    name="title"
                                    className="w-full flex flex-col gap-2"
                                >
                                    <Label className="text-xs md:text-sm font-semibold text-zinc-300">Task Title</Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Design a responsive landing page..."
                                        className="w-full bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-600"
                                        variant="secondary"
                                    />
                                    <FieldError className="text-xs font-medium text-rose-500 mt-1" />
                                </TextField>

                                {/* 2. Category  */}
                                <div className="w-full flex flex-col gap-2">
                                    <Label className="text-xs md:text-sm font-semibold text-zinc-300">Category</Label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 cursor-pointer"
                                    >
                                        <option value="web-fixing" className="bg-zinc-900 text-white">Web & Bug Fixing</option>
                                        <option value="graphics-design" className="bg-zinc-900 text-white">Graphics & Logo Design</option>
                                        <option value="content-writing" className="bg-zinc-900 text-white">Content & Article Writing</option>
                                        <option value="ui-ux" className="bg-zinc-900 text-white">UI/UX Component Design</option>
                                        <option value="data-entry" className="bg-zinc-900 text-white">Virtual Assistant & Data Entry</option>
                                    </select>
                                </div>

                                {/* Description  */}
                                <TextField
                                    isRequired
                                    name="description"
                                    className="w-full flex flex-col gap-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs md:text-sm font-semibold text-zinc-300">Description</Label>
                                        <button
                                            type="button"
                                            onClick={() => handleAIGenerate()}
                                            disabled={isGeneratingAI}
                                            className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-medium transition-colors"
                                        >
                                            <IoSparkles className="w-3 h-3" />
                                            Re-generate with AI
                                        </button>
                                    </div>
                                    <TextArea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Provide a detailed description of the tasks, requirements, and scope..."
                                        className="w-full min-h-[140px] bg-zinc-950/80 border border-brand-border focus:border-brand-accent text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all duration-200 placeholder-zinc-600 resize-y"
                                        variant="secondary"
                                        rows={6}
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
                                            value={budget}
                                            onChange={(e) => setBudget(e.target.value)}
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
                                    onClick={() => {
                                        setTitle("");
                                        setDescription("");
                                        setBudget("");
                                        setAiPrompt("");
                                    }}
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