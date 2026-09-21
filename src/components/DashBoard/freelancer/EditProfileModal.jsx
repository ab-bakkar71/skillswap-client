"use client";

import React, { useState } from 'react';
import { Button, FieldError, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/lib/actions/freelancer';
import { TbUserEdit } from 'react-icons/tb';

const EditProfileModal = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isFreelancer = currentUser?.role === "freelancer";

  const handelUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const updateData = Object.fromEntries(formData.entries());

    const updateSkills = isFreelancer && updateData.skills
      ? updateData.skills.split(",").map(skill => skill.trim()).filter(Boolean)
      : currentUser?.skills || [];

    const finalData = {
      name: updateData.name,
      image: updateData.image,
      bio: updateData.bio,
      ...(isFreelancer ? {
        hourlyRate: updateData.hourlyRate,
        skills: updateSkills,
      } : {}),
    };

    try {
      if (currentUser?.email) {
        const result = await updateProfile(currentUser.email, finalData);

        if (result && (result.modifiedCount > 0 || result.matchedCount > 0 || result.success)) {
          toast.success("Profile updated successfully! 🎉");
          router.refresh();
        } else {
          toast.info("No changes made.");
        }
      }
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal>
        <Button className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-brand-accent hover:bg-violet-600 border border-brand-accent/20 text-white transition-all duration-200 cursor-pointer shadow-lg shadow-violet-500/10 active:scale-95">
          Edit Profile
        </Button>

        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md bg-zinc-950 border border-zinc-900 rounded-3xl text-white">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-brand-accent/10 text-brand-accent">
                  <TbUserEdit className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Edit Your Profile</Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Surface variant="default" className="bg-transparent">
                  <form onSubmit={handelUpdateProfile} className="flex flex-col gap-4">

                    {/* name */}
                    <TextField isRequired name="name" className="w-full" defaultValue={currentUser?.name}>
                      <Label className="text-zinc-400 text-xs font-medium">Full Name</Label>
                      <Input placeholder="Enter Your Name" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" required />
                      <FieldError className="text-rose-400 text-xs mt-1" />
                    </TextField>

                    {/* image */}
                    <TextField isRequired name="image" type="text" defaultValue={currentUser?.image}>
                      <Label className="text-zinc-400 text-xs font-medium">Image URL</Label>
                      <Input placeholder="https://example.com/avatar.jpg" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" required />
                      <FieldError className="text-rose-400 text-xs mt-1" />
                    </TextField>

                    {/* Bio Field */}
                    <TextField name="bio" defaultValue={currentUser?.bio}>
                      <Label className="text-zinc-400 text-xs font-medium">Bio / About</Label>
                      <Input placeholder="Tell others about yourself..." className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                      <FieldError className="text-rose-400 text-xs mt-1" />
                    </TextField>

                    {/* Skills Field (Only for Freelancers) */}
                    {isFreelancer && (
                      <TextField name="skills" defaultValue={Array.isArray(currentUser?.skills) ? currentUser.skills.join(", ") : currentUser?.skills}>
                        <Label className="text-zinc-400 text-xs font-medium">Skills <span className="text-zinc-500 text-[10px]">(comma-separated)</span></Label>
                        <Input placeholder="React, Node.js, Design" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                        <FieldError className="text-rose-400 text-xs mt-1" />
                      </TextField>
                    )}

                    {/* Hourly Rate Field (Only for Freelancers) */}
                    {isFreelancer && (
                      <TextField name="hourlyRate" type="number" defaultValue={currentUser?.hourlyRate}>
                        <Label className="text-zinc-400 text-xs font-medium">Hourly Rate (USD)</Label>
                        <Input placeholder="50" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                        <FieldError className="text-rose-400 text-xs mt-1" />
                      </TextField>
                    )}

                    <Modal.Footer className="mt-2">
                      <Button slot="close" variant="secondary" className="rounded-xl border border-zinc-800 text-zinc-400">
                        Cancel
                      </Button>
                      <Button type="submit" isDisabled={isLoading} className="bg-brand-accent text-white rounded-xl font-semibold">
                        {isLoading ? "Saving..." : "Save Changes"}
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

export default EditProfileModal;