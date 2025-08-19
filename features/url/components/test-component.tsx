"use client"

import { useGetShortUrl } from "../queries"

export const TestComponent = () => {
    const { data: urlData, isLoading, error } = useGetShortUrl("650SyY")

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error || !urlData) {
        return <div className="text-lg text-[#666666]">URL não encontrada</div>
    }

    console.log(urlData)

    return (
        <div className="text-lg text-[#666666]">
            URL: {urlData.shortId}
        </div>
    )
}