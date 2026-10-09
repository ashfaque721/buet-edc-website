"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface GalleryPhoto {
	id: string;
	imageUrl: string;
	caption: string;
	eventDate: string;
	eventName?: string;
	showOnHomepage: boolean;
}

interface GalleryContextType {
	photos: GalleryPhoto[];
	loading: boolean;
	addPhoto: (photo: Omit<GalleryPhoto, "id">) => Promise<GalleryPhoto | null>;
	updatePhoto: (id: string, updates: Partial<GalleryPhoto>) => Promise<void>;
	deletePhoto: (id: string) => Promise<void>;
	toggleHomepage: (id: string) => Promise<void>;
	refreshPhotos: () => Promise<void>;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
	const res = await fetch("/api/gallery");
	if (!res.ok) throw new Error("Failed to fetch gallery photos");
	const data = await res.json();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return data.map((p: any) => ({
		...p,
		eventDate:
			typeof p.eventDate === "string"
				? p.eventDate.split("T")[0]
				: p.eventDate,
	}));
}

export function GalleryProvider({ children }: { children: React.ReactNode }) {
	const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPhotos = React.useCallback(async () => {
		try {
			const data = await getGalleryPhotos();
			setPhotos(data);
		} catch (error) {
			console.error("Failed to fetch gallery photos from API:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;

		async function init() {
			try {
				const data = await getGalleryPhotos();
				if (isMounted) {
					setPhotos(data);
				}
			} catch (error) {
				console.error("Failed to fetch gallery photos from API:", error);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		}

		init();

		return () => {
			isMounted = false;
		};
	}, []);

	const addPhoto = async (
		photo: Omit<GalleryPhoto, "id">,
	): Promise<GalleryPhoto | null> => {
		try {
			const res = await fetch("/api/gallery", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(photo),
			});
			if (res.ok) {
				const created = await res.json();
				const formatted = {
					...created,
					eventDate:
						typeof created.eventDate === "string"
							? created.eventDate.split("T")[0]
							: created.eventDate,
				};
				setPhotos((prev) => [formatted, ...prev]);
				return formatted;
			}
		} catch (e) {
			console.error("Failed to add gallery photo:", e);
		}
		return null;
	};

	const updatePhoto = async (id: string, updates: Partial<GalleryPhoto>) => {
		// Optimistic update
		setPhotos((prev) =>
			prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
		);
		try {
			await fetch(`/api/gallery/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updates),
			});
		} catch (e) {
			console.error("Failed to update photo:", e);
			fetchPhotos(); // Revert on failure
		}
	};

	const deletePhoto = async (id: string) => {
		setPhotos((prev) => prev.filter((p) => p.id !== id));
		try {
			await fetch(`/api/gallery/${id}`, {
				method: "DELETE",
			});
		} catch (e) {
			console.error("Failed to delete photo:", e);
			fetchPhotos();
		}
	};

	const toggleHomepage = async (id: string) => {
		const photo = photos.find((p) => p.id === id);
		if (!photo) return;
		await updatePhoto(id, { showOnHomepage: !photo.showOnHomepage });
	};

	return (
		<GalleryContext.Provider
			value={{
				photos,
				loading,
				addPhoto,
				updatePhoto,
				deletePhoto,
				toggleHomepage,
				refreshPhotos: fetchPhotos,
			}}
		>
			{children}
		</GalleryContext.Provider>
	);
}

export function useGallery() {
	const context = useContext(GalleryContext);
	if (context === undefined) {
		throw new Error("useGallery must be used within a GalleryProvider");
	}
	return context;
}
