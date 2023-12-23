'use client';

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function useGetPostViews(slug: string) {
	return useQuery(['post-views', slug], () => {
		return fetch(`/api/blog/${slug}/track`).then((res) => res.json());
	}, {
		staleTime: 5 * 60 * 1000,  // stale time of five minutes...
	});
}

function useTrackPost(slug: string) {
	return useMutation(() => {
		return fetch(`/api/blog/${slug}/track`,{method: 'POST'}).then((res) => res.json());
	});
}

export default function PostViews({ slug }: { slug: string }) {
	const { data } = useGetPostViews(slug);
	const { mutate: trackPost } = useTrackPost(slug);

	useEffect(() => {
		trackPost();
	}, []);

	return data?.views?._count?.slug > 0 ? <span className="text-xs md:text-sm">{' '}Views: {data?.views?._count?.slug}</span> : null;
}
