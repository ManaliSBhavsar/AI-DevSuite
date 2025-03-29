import { create } from "zustand";

const toolStore = create((set) => ({
  prompt: "", // UI generation
  code: "", // Code for debugging
  description: "", // Wireframe description
  setPrompt: (input: string) => set({ prompt: input }),
  setCode: (input: string) => set({ code: input }),
  setDescription: (input: string) => set({ description: input }),
}));

export default toolStore;
