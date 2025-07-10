import {create } from "zustand"
export const useNoteStore = create( (set) =>({

     notes: [],
      setNotes: (notes) => set({ notes }),

         createNotes: async (newNote) => {
        if (!newNote.name) {
            return {
                success: false,
                message: "Please fill  input."
            }
        }
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
        const data = await res.json()
        set((state) => ({notes: [...state.notes, data.message] })) // message from backend data 
       return {
                success: true,
                message: "Note created successfully"
            }
    },

     fetchNotes: async ()=>{
             const res=await fetch("/api/notes")
             const data = await res.json()
             set({notes: data.message})
    },

      deleteNote: async (pid) => {
		const res = await fetch(`/api/notes/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ notes: state.notes.filter((note) => note._id !== pid) }));
		return { success: true, message: data.message };
	},

       updateNote: async (pid, updatedNote) => {
		const res = await fetch(`/api/notes/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedNote),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			notes: state.notes.map((note) => (note._id === pid ? data.message : note)),
		}));

		return { success: true, message: data.message };
	},
}))